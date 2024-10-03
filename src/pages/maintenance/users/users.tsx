import { useState, useContext, useEffect, useRef } from "react";
import { InfoCard, InputContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, UserCapsLock } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IMedium, IUser } from "src/types/types";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { useNavigate } from "react-router-dom";
import { Alert, Confirm } from "src/utilities/popups";
import { defaultMedium, defaultUser } from "src/utilities/default";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { formatInputText, handleCapsLock, handleEnterPress, removeDiacritics } from "src/utilities/functions";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import MainContainer from "src/components/MainContainer/MainContainer";

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
    const [isCapsLockOnPass, setIsCapsLockOnPass] = useState(false);
    const [isCapsLockOnConf, setIsCapsLockOnConf] = useState(false);
    
    const { users, token, loadUser, setUserChangePassword, getUser } = useContext(UserContext);
    const { mediuns } = useContext(MediumContext);

    const passRef = useRef<HTMLInputElement>(null);
    const confRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadUser(token)
    },[loadUser, token])

    useEffect(() => {
        const mediumObject = mediuns.find((item: IMedium) => item?.medium_id === dropMedium?.medium_id);
        updateProps('medium_id', mediumObject? mediumObject.medium_id : 0);
    }, [dropMedium, mediuns])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    
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
        const exists = users.some((item: IUser) => item.name.toLowerCase() === name.toLowerCase());
        if(name.trim() && password[0].trim() && password[1].trim() && level && medium) {
            if (exists) {
                Alert('Já existe um usuário com o mesmo nome', 'error');
            } else if (password[0] === password[1]) {
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

    const deleteUser = async (user_id: number) => {
        await Confirm('ATENÇÃO! O usuário será excluído do sistema. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                await api.delete(`/user/delete?user_id=${user_id}`, {headers:{Authorization: token}})
                Alert('Usuário excluído com sucesso', 'success');
                await loadUser(token);
                closeModal();
            } catch (error) {
                console.log('Erro ao excluir usuário', error);
                Alert('Erro ao excluir usuário', 'error');
            }
        });
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
            <MainContainer title="Usuários - Manutenção">
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
                        <InfoContent>Clique sobre um usuário para EDITAR ou EXCLUIR</InfoContent>
                        <InfoContent>
                            Resultados encontrados: {users
                                .filter((item: IUser) => removeDiacritics(item.name).includes(removeDiacritics(searchName)))
                                .filter((item: IUser) => item.level.includes(searchLevel))
                                .length}
                        </InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {users
                            .filter((item: IUser) => removeDiacritics(item.name).includes(removeDiacritics(searchName)))
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
                        <input type="text" value={edited.name} onKeyUp={edit? (e) => handleEnterPress(e, async () => await editUser(edited, selected, token)) : (e) => handleEnterPress(e, async () => await handleAddUser(edited.name, [password1, password2], edited.level, edited.medium_id))} onChange={(e) => updateProps('name', formatInputText(e.target.value))} />
                    </InputContainer>
                    <InputContainer>
                        <label>Médium</label>
                        <AutocompleteInput 
                            label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                            default={defaultMedium}
                            disabledOptions={(option) => option? users.some((item: IUser) => item?.medium_id === option?.medium_id) : false}
                            options={mediuns.filter((item: IMedium) => Boolean(item.dtElevacao) === true)}
                            equality={(option, value) => option?.medium_id === value?.medium_id}
                            value={dropMedium}
                            setValue={setDropMedium}
                            inputValue={searchMedium}
                            setInputValue={setSearchMedium}
                            onKeyUp={edit? async () => await editUser(edited, selected, token) : async () => await handleAddUser(edited.name, [password1, password2], edited.level, edited.medium_id)}
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
                        <div style={{display: 'flex', gap: '20px'}}>
                            <ModalButton color="red" onClick={async () => {await deleteUser(selected.user_id)}}>Excluir</ModalButton>
                            <ModalButton color="green" onClick={() => {
                                setUserChangePassword(selected);
                                navigate('/manutencao/usuarios/alterarsenha');
                            }}>Alterar Senha</ModalButton>
                        </div>
                    : 
                        <>         
                            <InputContainer>
                                <label>Senha</label>
                                <input type="password" value={password1} ref={passRef} onKeyUp={(e) => handleEnterPress(e, async () => await handleAddUser(edited.name, [password1, password2], edited.level, edited.medium_id))} onChange={(e) => setPassword1(e.target.value)} onFocus={handleCapsLock(setIsCapsLockOnPass, passRef).focus} onBlur={handleCapsLock(setIsCapsLockOnPass, passRef).blur} />
                                <UserCapsLock>{isCapsLockOnPass ? 'Caps Lock ativo' : ''}</UserCapsLock>
                            </InputContainer>
                            <InputContainer>
                                <label>Confirmar Senha</label>
                                <input type="password" value={password2} ref={confRef} onKeyUp={(e) => handleEnterPress(e, async () => await handleAddUser(edited.name, [password1, password2], edited.level, edited.medium_id))} onChange={(e) => setPassword2(e.target.value)} onFocus={handleCapsLock(setIsCapsLockOnConf, confRef).focus} onBlur={handleCapsLock(setIsCapsLockOnConf, confRef).blur} />
                                <UserCapsLock>{isCapsLockOnConf ? 'Caps Lock ativo' : ''}</UserCapsLock>
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