import ButtonDoc from "src/components/ButtonDoc/ButtonDoc";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { CardsContainer, DocsContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";

function DocumentosUteis() {

    const docs = [
        {name: 'Chamada Oficial das Falanges Missionárias', link: ''},
        {name: 'Prefixos das Falanges Missionárias', link: ''},
        {name: 'Relação de Turnos de Trabalho', link: ''},
        {name: 'Calendário de Atividades Doutrinárias', link: ''},
        {name: 'Escala dos Devas', link: ''},
        {name: 'Formulário para Ficha Mediúnica', link: ''}
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