import logo from '../../assets/jaguar.jpg'
import hamburger from '../../assets/menu-aberto.png'
import { HamburgerIcon, HeaderButton, HeaderButtonContainer, HeaderContainer, InfoContainer, LogoImage, TitleContainer, UserContainer } from './styles'

function Header() {
    const user = 'Reinaldo Alves'
    const level = 'Administrador'
    return (
        <HeaderContainer>
            <InfoContainer>
                <HamburgerIcon src={hamburger} alt='Hamburger' />
                <LogoImage src={logo} alt='Logo'/>
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