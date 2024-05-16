import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButtonPDF from "src/components/GridButtonPDF/GridButtonPDF";
import F1 from "src/assets/pdf/Instrucoes1.pdf";
import F2 from "src/assets/pdf/Instrucoes2.pdf";
import F3 from "src/assets/pdf/Instrucoes3.pdf";
import F4 from "src/assets/pdf/Instrucoes4.pdf";
import F5 from "src/assets/pdf/Instrucoes5.pdf";
import F6 from "src/assets/pdf/Instrucoes6.pdf";
import F7 from "src/assets/pdf/Instrucoes7.pdf";

function InstrucoesPraticas() {
    
    const docs = [
        {name: 'Fascículo 1', link: F1},
        {name: 'Fascículo 2', link: F2},
        {name: 'Fascículo 3', link: F3},
        {name: 'Fascículo 4', link: F4},
        {name: 'Fascículo 5', link: F5},
        {name: 'Fascículo 6', link: F6},
        {name: 'Fascículo 7', link: F7},        
    ]
    
    const menuList = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Biblioteca', click: '/biblioteca'},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Instruções Práticas" >
                <GridButtonPDF docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default InstrucoesPraticas