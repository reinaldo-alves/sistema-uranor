import ButtonDoc from "src/components/ButtonDoc/ButtonDoc";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { CardsContainer, DocsContainer, SectionTitle } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";

function Maintenance() {

    const docs = [
        {name: 'Ministros', link: '/manutencao/ministros'},
        {name: 'Cavaleiros', link: ''},
        {name: 'Guias Missionárias', link: ''},
        {name: 'Adjuntos', link: '/manutencao/adjuntos'},
        {name: 'Templos', link: ''},
        {name: 'Falanges Missionárias', link: ''},
        {name: 'Usuários', link: ''},
        {name: 'Backup', link: ''}
    ]
    
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <DocsContainer>
                <SectionTitle>Sistema Uranor - Manutenção</SectionTitle>
                <CardsContainer>
                    {docs.map((item) => (
                        <ButtonDoc name={item.name} link={item.link} height={'3em'} sameTab />
                    ))}
                </CardsContainer>
            </DocsContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Maintenance