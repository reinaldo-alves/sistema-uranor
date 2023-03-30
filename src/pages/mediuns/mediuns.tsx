import { Outlet } from "react-router-dom";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { MainContainer } from "./styles";

function Mediuns() {
    return (
        <>
            <Header />
            <SubMenu list={[
                {title: 'Página Inicial', click: '/'},
                {title: 'Consultar Médium', click: '/mediuns/consulta'},
                {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
                {title: 'Médium Menor', click: '/mediuns/menor'}
            ]}/>
            <MainContainer>
                <Outlet />
            </MainContainer>
        </>
    )
}

export default Mediuns