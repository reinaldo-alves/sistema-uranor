import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";

function Biblioteca() {
    const menuList = [{title: 'Página Inicial', click: '/'}];
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Módulo em Desenvolvimento">
                <p></p>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Biblioteca