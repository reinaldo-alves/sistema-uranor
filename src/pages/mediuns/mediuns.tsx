import { Outlet } from "react-router-dom";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { MainContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";

function Mediuns() {
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <Outlet />
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
    )
}

export default Mediuns