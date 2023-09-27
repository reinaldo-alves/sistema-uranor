import ButtonDoc from "src/components/ButtonDoc/ButtonDoc";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { CardsContainer, DocsContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";

function DocumentosUteis() {

    const defaultCanto = {title: '', text: ['']}
    
    const docs = [
        {name: 'Chamada Oficial das Falanges Missionárias', link: defaultCanto},
        {name: 'Prefixos das Falanges Missionárias', link: defaultCanto},
        {name: 'Relação de Turnos de Trabalho', link: defaultCanto},
        {name: 'Calendário de Atividades Doutrinárias', link: defaultCanto},
        {name: 'Escala dos Devas', link: defaultCanto},
        {name: 'Formulário para Ficha Mediúnica', link: defaultCanto}
    ]
    
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <DocsContainer>
                <MainTitle content="Documentos Úteis" />
                <CardsContainer>
                    {docs.map((item) => (
                        <ButtonDoc name={item.name} link={item.link} height={'3em'} />
                    ))}
                </CardsContainer>
            </DocsContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default DocumentosUteis