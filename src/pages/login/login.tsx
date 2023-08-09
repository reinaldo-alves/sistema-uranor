import { useContext, useState } from 'react'
import logo from '../../assets/jaguar.jpg'
import { LoginCard, LoginCardContainer, LoginError, LoginForm, LoginHeader, TitleContainer } from './styles'
import { UserContext } from 'src/contexts/UserContext'

function Login() {
    const { handleLogin } = useContext(UserContext)
    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
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
                        <label id='label-login'>Usuário:</label>
                        <input type="text" name="user" id='input-login' value={name} onChange={(e) => setName(e.target.value)} />
                        <label id='label-login'>Senha:</label>
                        <input type="password" name="password" id='input-login' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button id='button-login' onClick={() => handleLogin(name, password)}>Entrar</button>
                    </LoginForm>
                    <LoginError>{''}<br /></LoginError>
                </LoginCard>
            </LoginCardContainer>
        </>
    )
}

export default Login