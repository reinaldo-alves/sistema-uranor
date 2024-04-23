import { useContext, useState, useEffect } from 'react'
import logo from '../../assets/jaguar.jpg'
import { LoginCard, LoginCardContainer, LoginError, LoginForm, LoginHeader, TitleContainer } from './styles'
import { UserContext } from 'src/contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'src/utilities/popups'
import { handleEnterPress } from 'src/utilities/functions'

function Login() {
    const { handleLogin, login, errorMessage, setErrorMessage } = useContext(UserContext)
    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const loginButtonFunc = async () => {
        if(name.trim() && password.trim()){
            try {
                setErrorMessage('Aguarde...');
                await handleLogin(name, password);
                if(errorMessage === 'Autenticado com sucesso') {
                    navigate('/');
                }
            } catch (error) {
                console.log('Não foi possível fazer o login', error);
                Alert('Não foi possível fazer o login', 'error');
            }
        } else {
            setErrorMessage('Preencha todos os dados corretamente')
        }
    }

    useEffect(() => {
        if(login) {
            navigate('/')
        }
        setErrorMessage('');
    }, [])
    
    return (
        <>
            <LoginHeader>
                <img className='logoHeader' src={logo} alt=''/>
                <TitleContainer>
                    <p>URANOR DO AMANHECER</p>
                    <p>CASTELO DOS DEVAS</p>
                </TitleContainer>
            </LoginHeader>
            <LoginCardContainer>
                <LoginCard>
                    <h2>Login</h2>
                    <LoginForm>
                        <label>Usuário:</label>
                        <input type="text" name="user" value={name} onKeyUp={(e) => handleEnterPress(e, () => loginButtonFunc())} onChange={(e) => setName(e.target.value)} />
                        <label>Senha:</label>
                        <input type="password" name="password" value={password} onKeyUp={(e) => handleEnterPress(e, () => loginButtonFunc())} onChange={(e) => setPassword(e.target.value)} />
                        <button id='button-login' onClick={loginButtonFunc}>Entrar</button>
                    </LoginForm>
                    <LoginError>{errorMessage}</LoginError>
                </LoginCard>
            </LoginCardContainer>
        </>
    )
}

export default Login