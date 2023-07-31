import { useContext } from 'react'
import { UserContext } from 'src/contexts/UserContext'
import logo from '../../assets/jaguar.jpg'
import hamburger from '../../assets/menu-aberto.png'
import { HamburgerIcon, HeaderButton, HeaderButtonContainer, HeaderContainer, InfoContainer, LogoImage, TitleContainer, UserContainer } from './styles'
import { MenuContext } from 'src/contexts/MenuContext'

function Header() {
    const { user } = useContext(UserContext);
    const { setOpenMenu } = useContext(MenuContext);

    return (
        <HeaderContainer>
            <InfoContainer>
                <HamburgerIcon src={hamburger} alt='Hamburger' onClick={() => setOpenMenu(true)} />
                <LogoImage src={logo} alt='Logo'/>
                <TitleContainer>
                    <p>URANOR DO AMANHECER</p>
                    <p>CASTELO DOS DEVAS</p>
                </TitleContainer>
            </InfoContainer>
            <UserContainer>
                <p>Usuário: {user.name}</p>
                <p>Nível: {user.level}</p>
                <HeaderButtonContainer>
                    <HeaderButton>{user.level === 'Administrador' ? 'Manutenção' : 'Alterar Senha'}</HeaderButton>
                    <HeaderButton>Sair</HeaderButton>
                </HeaderButtonContainer>
            </UserContainer>
        </HeaderContainer>
    )
}

export default Header