import logo from '../../assets/jaguar.jpg'
import { LoginCard, LoginCardContainer, LoginError, LoginForm, LoginHeader, TitleContainer } from './styles'

function Login() {
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
                        <input type="text" name="user" id='input-login'/>
                        <label id='label-login'>Senha:</label>
                        <input type="password" name="password" id='input-login' />
                        <button id='button-login'>Entrar</button>
                    </LoginForm>
                    <LoginError>{''}<br /></LoginError>
                </LoginCard>
            </LoginCardContainer>
        </>
    )
}

export default Login