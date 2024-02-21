import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { CardsContainer, PageButton } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import MainContainer from "src/components/MainContainer/MainContainer";

function Maintenance() {
    const navigate = useNavigate();

    const docs = [
        {name: 'Ministros', link: '/manutencao/ministros'},
        {name: 'Cavaleiros', link: '/manutencao/cavaleiros'},
        {name: 'Guias Missionárias', link: '/manutencao/guias'},
        {name: 'Adjuntos', link: '/manutencao/adjuntos'},
        {name: 'Templos', link: '/manutencao/templos'},
        {name: 'Falanges Missionárias', link: '/manutencao/falanges'},
        {name: 'Usuários', link: '/manutencao/usuarios'},
        {name: 'Backup', link: '/manutencao/backup'}
    ]
    
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Sistema Uranor - Manutenção">
                <CardsContainer>
                    {docs.map((item, index) => (
                        <PageButton key={index} height='3em' onClick={() => navigate(item.link)}>{item.name}</PageButton>
                    ))}
                </CardsContainer>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Maintenance