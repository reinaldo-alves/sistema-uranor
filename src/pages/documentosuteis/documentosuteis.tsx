import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { ButtonUtilDoc, CardsContainer, DocsContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { generateChamadaOficial, generatePrefixos, generateTurnos } from "src/utilities/createDocs";
import { useContext } from "react";
import { ListContext } from "src/contexts/ListContext";

function DocumentosUteis() {

    const { falMiss } = useContext(ListContext);
    
    const docs = [
        {name: 'Chamada Oficial das Falanges Missionárias', link: () => generateChamadaOficial(falMiss)},
        {name: 'Prefixos das Falanges Missionárias', link: () => generatePrefixos(falMiss)},
        {name: 'Relação de Turnos de Trabalho', link: () => generateTurnos()},
        {name: 'Calendário de Atividades Doutrinárias', link: () => {}},
        {name: 'Escala dos Devas', link: () => {}},
        {name: 'Formulário para Ficha Mediúnica', link: () => {}}
    ]
    
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <DocsContainer>
                <MainTitle content="Documentos Úteis" />
                <CardsContainer>
                    {docs.map((item, index) => (
                        <ButtonUtilDoc key={index} onClick={item.link}>{item.name}</ButtonUtilDoc>
                    ))}
                </CardsContainer>
            </DocsContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default DocumentosUteis