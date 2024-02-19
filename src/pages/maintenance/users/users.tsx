import { useState, useContext, useEffect } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IMedium, IUser } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { useNavigate } from "react-router-dom";
import { Alert } from "src/utilities/popups";
import { defaultMedium, defaultUser } from "src/utilities/default";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { alphabeticOrder } from "src/utilities/functions";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";

function Users() {
    const [searchName, setSearchName] = useState('');
    const [searchLevel, setSearchLevel] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultUser);
    const [edited, setEdited] = useState(defaultUser);
    const [showModal, setShowModal] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [dropMedium, setDropMedium] = useState(defaultMedium);
    const [searchMedium, setSearchMedium] = useState('');
    
    const { users, token, loadUser, setUserChangePassword, getUser } = useContext(UserContext);
    const { mediuns } = useContext(MediumContext);

    const navigate = useNavigate();

    useEffect(() => {
        loadUser(token)
    },[])

    useEffect(() => {
        const mediumObject = mediuns.find((item: IMedium) => item?.medium_id === dropMedium?.medium_id);
        updateProps('medium_id', mediumObject? mediumObject.medium_id : 0);
    }, [dropMedium])
    
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
        setDropMedium(defaultMedium);
        setSearchMedium('');
        setShowModal(true);
    }

    const modalEditUser = (user: IUser) => {
        setEdit(true);
        setEdited(user);
        setSelected(user);
        setDropMedium(mediuns.find((item: IMedium) => item.medium_id === user.medium_id));
        setSearchMedium(mediuns.find((item: IMedium) => item.medium_id === user.medium_id)?.nome || '');
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultUser);
        setSelected(defaultUser);
    }

    const addUser = async (name: string, password: string, level: string, medium: number, token: string) => {
        try {
            const mediumObject = await mediuns.find((item: IMedium) => item.medium_id === Number(medium));
            const userSex = mediumObject ? mediumObject.sex : '';
            const newUser = {name: name, password: password, level: level, medium_id: medium, sex: userSex};
            await api.post('/user/create', newUser, {headers:{Authorization: token}})
            Alert('Usuário adicionado com sucesso', 'success');
            await loadUser(token);
            closeModal();
        } catch (error) {
            console.log('Não foi possível adicionar o usuário', error);
            Alert('Não foi possível adicionar o usuário', 'error');
        }
    }

    const handleAddUser = async (name: string, password: Array<string>, level: string, medium: number) => {
        if(name.trim() && password[0].trim() && password[1].trim() && level && medium) {
            if (password[0] === password[1]) {
                const finalPassword = password[1];
                await addUser(name, finalPassword, level, medium, token)
            } else {
                Alert('As senhas não são iguais. Tente novamente.', 'error')
            }
        } else {
            Alert('Preencha todos os dados corretamente.', 'info')
        }
    }

    const editUser = async (newUser: IUser, oldUser: IUser, token: string) => {
        const changedFields = {} as any
        for (const key in newUser){
            if (key !== 'password' && newUser[key as keyof IUser] !== oldUser[key as keyof IUser]){
                changedFields[key as keyof IUser] = newUser[key as keyof IUser]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await api.put('/user/update', {user_id: oldUser.user_id, ...changedFields}, {headers:{Authorization: token}})
                Alert('Usuário editado com sucesso', 'success');
                await loadUser(token);
                await getUser(token);
                setEdited(defaultUser);
                setSelected(defaultUser);
                closeModal();
            } catch (error) {
                console.log('Não foi possível editar o usuário', error);
                Alert('Não foi possível editar o usuário', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no usuário', 'info')
        }
    }
    
    users.sort((userA: IUser, userB: IUser) => {
        const nomeA = userA.name.toLowerCase();
        const nomeB = userB.name.toLowerCase();
        return nomeA.localeCompare(nomeB, 'pt-BR');
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
                        <AutocompleteInput 
                            label={(option) => option.nome}
                            default={defaultMedium}
                            disabledOptions={(option) => option? users.some((item: IUser) => item?.medium_id === option?.medium_id) : false}
                            options={alphabeticOrder(mediuns.filter((item: IMedium) => Boolean(item.dtElevacao) === true))}
                            equality={(option, value) => option?.medium_id === value?.medium_id}
                            value={dropMedium}
                            setValue={setDropMedium}
                            inputValue={searchMedium}
                            setInputValue={setSearchMedium}
                        />
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
                            onClick={() => {
                                setUserChangePassword(selected);
                                navigate('/manutencao/usuarios/alterarsenha');
                            }}
                        >Alterar Senha</ModalButton>
                    : 
                        <>         
                            <InputContainer>
                                <label>Senha</label>
                                <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                            </InputContainer>
                            <InputContainer>
                                <label>Confirmar Senha</label>
                                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                            </InputContainer>
                        </>
                    }
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? async () => await editUser(edited, selected, token) : async () => await handleAddUser(edited.name, [password1, password2], edited.level, edited.medium_id)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Users