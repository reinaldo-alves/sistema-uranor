import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { HamburgerIcon, HeaderButtonContainer, Overlay, SideMenuContainer, SideMenuContent, SideMenuItem, UserContainer } from './styles'
import { UserContext } from 'src/contexts/UserContext'
import { MenuContext } from 'src/contexts/MenuContext'
import exit from '../../assets/marca-cruzada.png'
import { HeaderButton } from '../buttons/buttons'

interface IProps {
    list: Array<{
        title: string,
        click: string
    }>
}

function SideMenu(props: IProps) {
    const { user, logOut } = useContext(UserContext);
    const { openMenu, setOpenMenu } = useContext(MenuContext); 
    const navigate = useNavigate();

    const titleButton = user.level === 'Administrador' ? 'Manutenção' : 'Alterar senha';
    const clickButton = user.level === 'Administrador' ? () => navigate('/manutencao') : () => navigate('/manutencao/usuarios/alterarsenha');
    
    return (
        <>
            <Overlay openMenu={openMenu} onClick={() => setOpenMenu(false)} />
            <SideMenuContainer openMenu={openMenu}>
                <HamburgerIcon src={exit} alt='Exit' onClick={() => setOpenMenu(false)} />
                <UserContainer>
                    <p>Usuário: {user.name}</p>
                    <p>Nível: {user.level}</p>
                    <HeaderButtonContainer>
                        <HeaderButton margin='0px' onClick={() => {
                            clickButton();
                            setOpenMenu(false);
                        }}>{titleButton}</HeaderButton>
                        <HeaderButton margin='0px'
                            onClick={() => {
                                logOut();
                                setOpenMenu(false);
                            }}
                        >Sair</HeaderButton>
                    </HeaderButtonContainer>
                </UserContainer>
                <nav>
                    <SideMenuContent>
                        {props.list.map((item, index) => (
                            <SideMenuItem 
                                key={index}
                                onClick={() => {
                                    navigate(item.click);
                                    setOpenMenu(false);
                                }}
                            >{item.title}</SideMenuItem>
                        ))}
                    </SideMenuContent>
                </nav>
            </SideMenuContainer>
        </>
    )
}

export default SideMenu