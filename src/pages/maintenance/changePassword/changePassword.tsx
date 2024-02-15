import { useContext, useState } from "react";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { MainContainer, PasswordForm } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import MainTitle from "src/components/MainTitle/MainTitle";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert } from "src/utilities/popups";
import { Modal, ModalButton, ModalContent, ModalInputContainer, ModalTitle } from "src/components/Modal/modal";

function ChangePassword() {
    const { user, userChangePassword, loadUser, token } = useContext(UserContext)

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');

    const navigate = useNavigate();
    
    const menuList = user.level === 'Administrador' ? 
        [{title: 'Página Inicial', click: '/'},
         {title: 'Voltar para Usuários', click: '/manutencao/usuarios'}] 
    :
        [{title: 'Página Inicial', click: '/'}] 

    const redirectTo = user.level === 'Administrador' ? '/manutencao/usuarios' : '/';
    
    const closeModal = () => {
        setShowConfirm(false);
        setPassword1('');
        setPassword2('');
        setCurrentPassword('');
    }
    
    const validateChangePassword = () => {
        if(password1.trim() && password2.trim()) {
            if(password1 === password2) {
                setShowConfirm(true);
            } else {
                Alert('As senhas não são iguais. Tente novamente.', 'error')
            }
        } else {
            Alert('Preencha todos os campos corretamente.', 'info')
        }
    }

    const handleChangePassword = async () => {
        try {
            if(currentPassword.trim()) {
                const { data } = await api.post('/user/login', {name: user.name, password: currentPassword})
                if(data.token) {
                    await api.put('/user/change-password', {user_id: userChangePassword.user_id, password: password1}, {headers:{Authorization: token}})
                    Alert('Senha alterada com sucesso!', 'success');
                    await loadUser(token);
                    closeModal();
                    navigate(redirectTo);
                } else {
                    Alert('Senha incorreta. Tente novamente.', 'error');
                    setCurrentPassword('');
                }
            } else {
                Alert('Digite sua senha.', 'info')
            }
        } catch (error) {
            console.log('Não foi possível alterar a senha', error);
            Alert('Não foi possível alterar a senha', 'error');
        }
    }
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer>
                <MainTitle content={`Alterar Senha - Usuário: ${userChangePassword.name}`} />
                <PasswordForm>
                    <label>Nova senha:</label>
                    <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                    <label>Confirme a nova senha:</label>
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    <button id='button-login' onClick={validateChangePassword}>Alterar</button>   
                </PasswordForm>
            </MainContainer>
            <SideMenu list={menuList}/>
            <Modal vis={showConfirm}>
                <ModalContent>
                    <ModalTitle>Confirme com sua senha atual</ModalTitle>
                    <ModalTitle>{`Usuário: ${user.name}`}</ModalTitle>
                    <ModalInputContainer>
                        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </ModalInputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={closeModal}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={handleChangePassword}>Confirmar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ChangePassword