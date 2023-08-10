import Header from "src/components/header/header";
import { MainContainer } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";

function Backup() {
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Módulo em Desenvolvimento" /> 
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
    )
}

export default Backup