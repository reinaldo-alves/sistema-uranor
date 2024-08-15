import { useContext, useRef, useState } from "react";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { PasswordForm, UserCapsLock } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import MainContainer from "src/components/MainContainer/MainContainer";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert } from "src/utilities/popups";
import { Modal, ModalButton, ModalContent, ModalInputContainer, ModalTitle } from "src/components/Modal/modal";
import { handleCapsLock, handleEnterPress } from "src/utilities/functions";
import { LoginCapsLock } from "src/pages/login/styles";

function ChangePassword() {
    const { user, userChangePassword, loadUser, token } = useContext(UserContext)

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [isCapsLockOnPass, setIsCapsLockOnPass] = useState(false);
    const [isCapsLockOnConf, setIsCapsLockOnConf] = useState(false);
    const [isCapsLockOnMod, setIsCapsLockOnMod] = useState(false);

    const passRef = useRef<HTMLInputElement>(null);
    const confRef = useRef<HTMLInputElement>(null);
    const modRef = useRef<HTMLInputElement>(null);

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
            <MainContainer title={`Alterar Senha - Usuário: ${userChangePassword.name}`}>
                <PasswordForm>
                    <label>Nova senha:</label>
                    <input type="password" value={password1} ref={passRef} onKeyUp={(e) => handleEnterPress(e, () => validateChangePassword())} onChange={(e) => setPassword1(e.target.value)} onFocus={handleCapsLock(setIsCapsLockOnPass, passRef).focus} onBlur={handleCapsLock(setIsCapsLockOnPass, passRef).blur} />
                    <UserCapsLock>{isCapsLockOnPass ? 'Caps Lock ativo' : ''}</UserCapsLock>
                    <label>Confirme a nova senha:</label>
                    <input type="password" value={password2} ref={confRef} onKeyUp={(e) => handleEnterPress(e, () => validateChangePassword())} onChange={(e) => setPassword2(e.target.value)} onFocus={handleCapsLock(setIsCapsLockOnConf, confRef).focus} onBlur={handleCapsLock(setIsCapsLockOnConf, confRef).blur} />
                    <UserCapsLock>{isCapsLockOnConf ? 'Caps Lock ativo' : ''}</UserCapsLock>
                    <button id='button-login' onClick={validateChangePassword}>Alterar</button>   
                </PasswordForm>
            </MainContainer>
            <SideMenu list={menuList}/>
            <Modal vis={showConfirm}>
                <ModalContent>
                    <ModalTitle>Confirme com sua senha atual</ModalTitle>
                    <ModalTitle>{`Usuário: ${user.name}`}</ModalTitle>
                    <ModalInputContainer>
                        <input type="password" value={currentPassword} ref={modRef} onKeyUp={(e) => handleEnterPress(e, () => handleChangePassword())} onChange={(e) => setCurrentPassword(e.target.value)} onFocus={handleCapsLock(setIsCapsLockOnMod, modRef).focus} onBlur={handleCapsLock(setIsCapsLockOnMod, modRef).blur} />
                        <UserCapsLock modal>{isCapsLockOnMod ? 'Caps Lock ativo' : ''}</UserCapsLock>
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