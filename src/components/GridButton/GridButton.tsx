import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../header/header";
import { ButtonUtilDoc, CardsContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import { generateChamadaOficial, generateFicha, generatePrefixos, generateTurnos } from "src/utilities/createDocs";
import { useContext } from "react";
import { ListContext } from "src/contexts/ListContext";
import MainContainer from "src/components/MainContainer/MainContainer";

function DocumentosUteis() {

    const { falMiss } = useContext(ListContext);

    const nullFunction = () => {};
    
    const docs = [
        {name: 'Chamada Oficial das Falanges Missionárias', link: () => generateChamadaOficial(falMiss)},
        {name: 'Prefixos das Falanges Missionárias', link: () => generatePrefixos(falMiss)},
        {name: 'Relação de Turnos de Trabalho', link: () => generateTurnos()},
        {name: 'Calendário de Atividades Doutrinárias', link: nullFunction},
        {name: 'Escala dos Devas', link: nullFunction},
        {name: 'Formulário para Ficha Mediúnica', link: () => generateFicha()}
    ]
    
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Documentos Úteis" >
                <CardsContainer>
                    {docs.map((item, index) => (
                        <ButtonUtilDoc disabled={item.link === nullFunction} key={index} onClick={item.link}>{item.name}</ButtonUtilDoc>
                    ))}
                </CardsContainer>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default DocumentosUteis