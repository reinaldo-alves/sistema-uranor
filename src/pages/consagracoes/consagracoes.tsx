import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { MainContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";

function Consagracoes() {
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer>
                <MainTitle content="Módulo em Desenvolvimento" />
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Consagracoes