import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";

function ElevacaoCurso() {
    const menuList = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/cursos'},
        {title: 'Iniciação', click: '/cursos/iniciacao'},
        {title: 'Elevação', click: '/cursos/elevacao'},
        {title: 'Centúria', click: '/cursos/centuria'},
        {title: 'Sétimo Raio', click: '/cursos/setimo'}
    ]
    
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

export default ElevacaoCurso