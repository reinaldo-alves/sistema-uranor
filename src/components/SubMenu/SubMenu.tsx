import { useNavigate } from 'react-router-dom'
import { SubMenuContainer, SubMenuContent, SubMenuItem } from './styles'

interface ISubMenu {
    list: Array<{
        title: string,
        click: string
    }>
}

function SubMenu(props: ISubMenu) {
    
    const navigate = useNavigate();
    
    return (
        <SubMenuContainer>
            <nav>
                <SubMenuContent>
                    {props.list.map((item) => (
                        <SubMenuItem onClick={() => navigate(item.click)}>{item.title}</SubMenuItem>
                    ))}
                </SubMenuContent>
            </nav>
        </SubMenuContainer>
    )
}

export default SubMenu