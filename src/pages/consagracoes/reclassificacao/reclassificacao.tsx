import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import { ButtonReclassDoc, CardsContainer, MainContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";

function Reclassificacao() {
    const docs = [
        {name: 'Documento para reclassificação', link: () => {}},
        {name: 'Autorização para consagrar Devas', link: () => {}},
        {name: 'Autorização para consagrar Trino Solitário', link: () => {}},
        {name: 'Autorização para consagrar Trino Sardyos', link: () => {}}
    ]
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/consagracoes'},
        {title: 'Iniciação', click: '/consagracoes/iniciacao'},
        {title: 'Elevação', click: '/consagracoes/elevacao'},
        {title: 'Centúria', click: '/consagracoes/centuria'},
        {title: 'Reclassificação', click: '/consagracoes/reclassificacao'},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Documentos - Classificações e Consagrações" />
                <CardsContainer>
                    {docs.map((item, index) => (
                        <ButtonReclassDoc key={index} onClick={item.link}>{item.name}</ButtonReclassDoc>
                    ))}
                </CardsContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default Reclassificacao