import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import { MainContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";

function Centuria() {
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/consagracoes'},
        {title: 'Iniciação', click: '/consagracoes/iniciacao'},
        {title: 'Elevação', click: '/consagracoes/elevacao'},
        {title: 'Centúria', click: '/consagracoes/centuria'},
        {title: 'Reclassificação', click: '/consagracoes/reclassificacao'},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Módulo em Desenvolvimento (Centúria)" />
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default Centuria