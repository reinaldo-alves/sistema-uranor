import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButtonPDF from "src/components/GridButtonPDF/GridButtonPDF";
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
        {name: 'Iniciação 1ª Aula - Biografia do Doutrinador', link: In1},
        {name: 'Iniciação 2ª Aula - O que é o Apará', link: In2},
        {name: 'Iniciação 3ª Aula - Mensagem Aluxã (Lírios)', link: In3},
        {name: 'Elevação 1ª Aula - Minhas Palestras com Umahã', link: El1},
        {name: 'Elevação 2ª Aula - O que é o Angical', link: El2},
        {name: 'Elevação 3ª Aula - Pequenos Detalhes', link: El3},
        {name: 'Elevação 4ª Aula - Micro Mapa', link: El4},
        {name: 'Elevação 4ª Aula - Carta das Forças', link: El6},
        {name: 'Trino Iramar', link: Cti},
        {name: 'Trino Juremá', link: Ctj},
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
                <GridButtonPDF docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Cartas