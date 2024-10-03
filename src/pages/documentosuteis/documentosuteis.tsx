import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import { generateCalendario, generateChamadaOficial, generateEscalaDevas, generateFicha, generatePrefixos, generateTurnos } from "src/utilities/createDocs";
import { useContext } from "react";
import { ListContext } from "src/contexts/ListContext";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";

function DocumentosUteis() {

    const { falMiss, calendario } = useContext(ListContext);
    
    const docs = [
        {name: 'Chamada Oficial das Falanges Missionárias', link: () => generateChamadaOficial(falMiss)},
        {name: 'Prefixos das Falanges Missionárias', link: () => generatePrefixos(falMiss)},
        {name: 'Relação de Turnos de Trabalho', link: () => generateTurnos()},
        {name: 'Calendário de Atividades Doutrinárias', link: () => generateCalendario(calendario)},
        {name: 'Escala dos Devas', link: () => generateEscalaDevas()},
        {name: 'Formulário para Ficha Mediúnica', link: () => generateFicha()}
    ]
    
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Documentos Úteis" >
                <GridButton docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default DocumentosUteis