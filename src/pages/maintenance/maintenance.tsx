import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";

function Maintenance() {
    const navigate = useNavigate();

    const docs = [
        {name: 'Ministros', link: () => navigate('/manutencao/ministros')},
        {name: 'Cavaleiros', link: () => navigate('/manutencao/cavaleiros')},
        {name: 'Guias Missionárias', link: () => navigate('/manutencao/guias')},
        {name: 'Adjuntos', link: () => navigate('/manutencao/adjuntos')},
        {name: 'Templos', link: () => navigate('/manutencao/templos')},
        {name: 'Falanges Missionárias', link: () => navigate('/manutencao/falanges')},
        {name: 'Usuários', link: () => navigate('/manutencao/usuarios')},
        {name: 'Backup', link: () => navigate('/manutencao/backup')}
    ]
    
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Sistema Uranor - Manutenção">
                <GridButton docs={docs} />
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Maintenance