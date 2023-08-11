import { useContext, useState } from 'react'
import logo from '../../assets/jaguar.jpg'
import { LoginCard, LoginCardContainer, LoginError, LoginForm, LoginHeader, TitleContainer } from './styles'
import { UserContext } from 'src/contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { handleLogin } = useContext(UserContext)
    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const loginButtonFunc = () => {
        handleLogin(name, password);
        navigate('/');
    }
    
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
                        <input type="text" name="user" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Senha:</label>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button id='button-login' onClick={loginButtonFunc}>Entrar</button>
                    </LoginForm>
                    <LoginError>{''}<br /></LoginError>
                </LoginCard>
            </LoginCardContainer>
        </>
    )
}

export default Login