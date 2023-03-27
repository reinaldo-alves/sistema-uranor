import logo from '../../assets/jaguar.jpg'
import { HeaderButton, HeaderButtonContainer, HeaderContainer, InfoContainer, TitleContainer, UserContainer } from './styles'

function Header() {
    const user = 'Reinaldo Alves'
    const level = 'Administrador'
    return (
        <HeaderContainer>
            <InfoContainer>
                <img src={logo} alt=''/>
                <TitleContainer>
                    <p>URANOR DO AMANHECER</p>
                    <p>CASTELO DOS DEVAS</p>
                </TitleContainer>
            </InfoContainer>
            <UserContainer>
                <p>Usuário: {user}</p>
                <p>Nível: {level}</p>
                <HeaderButtonContainer>
                    <HeaderButton>{level === 'Administrador' ? 'Manutenção' : 'Alterar Senha'}</HeaderButton>
                    <HeaderButton>Sair</HeaderButton>
                </HeaderButtonContainer>
            </UserContainer>
        </HeaderContainer>
    )
}

export default Header