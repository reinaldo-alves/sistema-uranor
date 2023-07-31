import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { MainContainer, SectionTitle } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";

function Cursos() {
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer>
                <SectionTitle>Módulo em Desenvolvimento</SectionTitle>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Cursos