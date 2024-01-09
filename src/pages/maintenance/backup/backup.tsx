import Header from "src/components/header/header";
import { CardsContainer, MainContainer, PageButton } from "../styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";

function Backup() {
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const docs = [
        {name: 'Criar Backup', link: () => {}},
        {name: 'Restaurar Backup', link: () => {}}
    ]

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Gerenciar Backups" />
                <CardsContainer>
                    {docs.map((item, index) => (
                        <PageButton key={index} height='3em' onClick={item.link}>{item.name}</PageButton>
                    ))}
                </CardsContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default Backup