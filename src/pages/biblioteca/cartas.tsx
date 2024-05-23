import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";
import In1 from "src/assets/pdf/CartaIniciação1-BiografiaDoutrinador.pdf";
import In2 from "src/assets/pdf/CartaIniciacao2-OQueEOApara.pdf";
import In3 from "src/assets/pdf/CartaIniciacao3-MensagemAluxaLirios.pdf";
import El1 from "src/assets/pdf/CartaElevacao1-MinhasPalestrascomUmaha.pdf";
import El2 from "src/assets/pdf/CartaElevacao2-OQueEAngical.pdf";
import El3 from "src/assets/pdf/CartaElevacao3-PequenosDetalhes.pdf";
import El4 from "src/assets/pdf/CartaElevacao4-MicroMapa.pdf";
import El6 from "src/assets/pdf/CartaElevacao4-CartaDasForcas.pdf";
import Cti from "src/assets/pdf/CartaTrinoIramar.pdf";
import Ctj from "src/assets/pdf/CartaTrinoJurema.pdf";

function Cartas() {
    
    const docs = [
        {name: 'Iniciação 1ª Aula - Biografia do Doutrinador', pdf: In1},
        {name: 'Iniciação 2ª Aula - O que é o Apará', pdf: In2},
        {name: 'Iniciação 3ª Aula - Mensagem Aluxã (Lírios)', pdf: In3},
        {name: 'Elevação 1ª Aula - Minhas Palestras com Umahã', pdf: El1},
        {name: 'Elevação 2ª Aula - O que é o Angical', pdf: El2},
        {name: 'Elevação 3ª Aula - Pequenos Detalhes', pdf: El3},
        {name: 'Elevação 4ª Aula - Micro Mapa', pdf: El4},
        {name: 'Elevação 4ª Aula - Carta das Forças', pdf: El6},
        {name: 'Trino Iramar', pdf: Cti},
        {name: 'Trino Juremá', pdf: Ctj},
    ]
    
    const menuList = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Biblioteca', click: '/biblioteca'},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Cartas" >
                <GridButton pdf docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Cartas