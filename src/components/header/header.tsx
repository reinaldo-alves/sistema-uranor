import { useContext } from 'react'
import { UserContext } from 'src/contexts/UserContext'
import logo from '../../assets/jaguar.jpg'
import hamburger from '../../assets/menu-aberto.png'
import { HamburgerIcon, HeaderButton, HeaderButtonContainer, HeaderContainer, InfoContainer, LogoImage, TitleContainer, UserContainer } from './styles'
import { MenuContext } from 'src/contexts/MenuContext'
import { useNavigate } from 'react-router-dom'

function Header() {
    const { user, logOut, setUserChangePassword } = useContext(UserContext);
    const { setOpenMenu } = useContext(MenuContext);
    const navigate = useNavigate();

    const titleButton = user.level === 'Administrador' ? 'Manutenção' : 'Alterar senha';
    const clickButton = user.level === 'Administrador' ? 
        () => navigate('/manutencao')
        :
        () => {
            setUserChangePassword(user);
            navigate('/manutencao/usuarios/alterarsenha');
        };

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
                    <HeaderButton onClick={clickButton}>{titleButton}</HeaderButton>
                    <HeaderButton onClick={() => logOut()}>Sair</HeaderButton>
                </HeaderButtonContainer>
            </UserContainer>
        </HeaderContainer>
    )
}

export default Header