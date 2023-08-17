import { useState, useContext, useEffect } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IMedium, IUser } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";

function Users() {
    const defaultUser = {user_id: 0, name: '', password: '', level: '', medium_id: 0}
    
    const [searchName, setSearchName] = useState('');
    const [searchLevel, setSearchLevel] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultUser);
    const [edited, setEdited] = useState(defaultUser);
    const [showModal, setShowModal] = useState(false);
    
    const { users, token, loadUser } = useContext(UserContext);
    const { mediuns } = useContext(MediumContext);

    useEffect(() => {
        loadUser(token)
    },[])
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const levels = ['Administrador', 'Devas', 'Devas Aspirante']

    const updateProps = (property: string, newValue: any) => {
        setEdited((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };

    const modalAddUser = () => {
        setEdit(false);
        setEdited(defaultUser);
        setSelected(defaultUser);
        setShowModal(true);
    }

    const modalEditUser = (user: IUser) => {
        setEdit(true);
        setEdited(user);
        setSelected(user);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultUser);
        setSelected(defaultUser);
    }

    const addUser = (user: IUser, token: string) => {
        const {user_id, ...newUser} = user;
        api.post('/user/create', newUser, {headers:{Authorization: token}}).then(() => {
            alert('Usuário adicionado com sucesso');
            loadUser(token);
            closeModal();
        }).catch((error) => {
            console.log('Não foi possível adicionar o usuário', error);
        })
    }

    const editUser = (newUser: IUser, oldUser: IUser, token: string) => {
        const changedFields = {} as any
        for (const key in newUser){
            if (newUser[key as keyof IUser] !== oldUser[key as keyof IUser]){
                changedFields[key as keyof IUser] = newUser[key as keyof IUser]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            api.put('/user/update', {user_id: oldUser.user_id, ...changedFields}, {headers:{Authorization: token}}).then(() => {
                alert('Usuário editado com sucesso');
                loadUser(token);
                setEdited(defaultUser);
                setSelected(defaultUser);
                closeModal();
            }).catch((error) => {
                console.log('Não foi possível editar o usuário', error);
            })
        } else {
            alert('Não foi feita nenhuma alteração no usuário')
        }
    }
    
    users.sort((userA: IUser, userB: IUser) => {
        if (userA.name < userB.name) {
          return -1;
        }
        if (userA.name > userB.name) {
          return 1;
        }
        return 0;
      });      

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Usuários - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome</label>
                            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                        </InputContainer>
                        <InputContainer>
                            <label>Nível</label>
                            <select value={searchLevel} onChange={(e) => setSearchLevel(e.target.value)}>
                                <option value=''>Todos</option>
                                {levels.map((item: string, index: number) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </InputContainer>
                        <SearchButton onClick={() => modalAddUser()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um usuário para EDITAR</InfoContent>
                        <InfoContent>
                            Resultados encontrados: {users
                                .filter((item: IUser) => item.name.toLowerCase().includes(searchName.trim().toLowerCase()))
                                .filter((item: IUser) => item.level.includes(searchLevel))
                                .length}
                        </InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {users
                            .filter((item: IUser) => item.name.toLowerCase().includes(searchName.trim().toLowerCase()))
                            .filter((item: IUser) => item.level.includes(searchLevel))
                            .map((item: IUser, index: number) => (
                                <Results key={index} onClick={() => modalEditUser(item)}>
                                    <ResultsTitle>{item.name}</ResultsTitle>
                                    <ResultsDetails>Nível: {item.level}</ResultsDetails>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>{edit? 'Editar Usuário' : 'Novo Usuário'}</ModalTitle>
                    <InputContainer>
                        <label>Nome do Usuário</label>
                        <input type="text" value={edited.name} onChange={(e) => updateProps('name', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Médium</label>
                        <select value={edited.medium_id} onChange={(e) => updateProps('medium_id', e.target.value)}>
                            <option value=''></option>
                            {mediuns.map((item: IMedium, index: number) => (
                                <option key={index} value={item.medium_id}>{item.nome}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label>Nível</label>
                        <select value={edited.level} onChange={(e) => updateProps('level', e.target.value)}>
                            <option value=''></option>
                            {levels.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </InputContainer>
                    {edit? 
                        <ModalButton 
                            color="green"
                            style={{alignSelf: 'center'}}
                            onClick={() => {}
                        }>Alterar Senha</ModalButton>
                    : 
                        <>         
                            <InputContainer>
                                <label>Senha</label>
                                <input type="password" />
                            </InputContainer>
                            <InputContainer>
                                <label>Confirmar Senha</label>
                                <input type="password" />
                            </InputContainer>
                        </>
                    }
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? () => editUser(edited, selected, token) : () => addUser(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Users