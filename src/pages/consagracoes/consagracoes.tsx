import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { MainContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";

function Consagracoes() {
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/'},
        {title: 'Iniciação', click: '/'},
        {title: 'Elevação', click: '/'},
        {title: 'Centúria', click: '/'},
        {title: 'Reclassificação', click: '/'},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Módulo em Desenvolvimento" />
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default Consagracoes