import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { MainContainer, SectionTitle } from "./styles";

function Desenvolvimento() {
    return (
        <>
            <Header />
            <SubMenu list={[{title: 'Página Inicial', click: '/'}]}/>
            <MainContainer>
                <SectionTitle>Módulo em Desenvolvimento</SectionTitle>
            </MainContainer>
        </>
    )
}

export default Desenvolvimento