import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButtonPDF from "src/components/GridButtonPDF/GridButtonPDF";
import PH1 from "src/assets/pdf/PH01-AHistoriaManoelTruncado.pdf";
import PH2 from "src/assets/pdf/PH02-NaraSuicida.pdf";
import PH3 from "src/assets/pdf/PH03-MensagemAmigoRecemDesencarnado.pdf";
import PH4 from "src/assets/pdf/PH04-ANoivinhaDesencarnada.pdf";
import PH5 from "src/assets/pdf/PH05-OVelhoCoronel.pdf";
import PH6 from "src/assets/pdf/PH06-OPequenoPaje.pdf";
import PH7 from "src/assets/pdf/PH07-UmHomemDoisMundos.pdf";
import PH8 from "src/assets/pdf/PH08-MeusPrimeirosPassosCanalVermelho.pdf";
import PH9 from "src/assets/pdf/PH09-OPresidiarioConselheiro.pdf";
import PH10 from "src/assets/pdf/PH10-AVoltaCiganos.pdf";
import PH11 from "src/assets/pdf/PH11-OAmanhecerPrincesas.pdf";
import PH12 from "src/assets/pdf/PH12-TiaozinhoJustininha.pdf";
import PH13 from "src/assets/pdf/PH13-AlmasGemeas.pdf";
import PH14 from "src/assets/pdf/PH14-AsVidasLenhador.pdf";
import Tab from "src/assets/pdf/TabelaLivros.pdf";

function PequenasHistorias() {
    
    const docs = [
        {name: '01 - A História de Manoel Truncado', link: PH1},
        {name: '02 - Nara, a Suicida', link: PH2},
        {name: '03 - Mensagem de um Amigo Recém-Desencarnado', link: PH3},
        {name: '04 - A Noivinha Desencarnada', link: PH4},
        {name: '05 - O Velho Coronel', link: PH5},
        {name: '06 - O Pequeno Pajé', link: PH6},
        {name: '07 - Um Homem de Dois Mundos', link: PH7},
        {name: '08 - Meus Primeiros Passos no Canal Vermelho', link: PH8},
        {name: '09 - O Presidiário Conselheiro', link: PH9},
        {name: '10 - A Volta dos Ciganos', link: PH10},
        {name: '11 - O Amanhecer das Princesas na Cachoeira do Jaguar', link: PH11},
        {name: '12 - Tiãozinho e Justininha', link: PH12},
        {name: '13 - Almas Gêmeas', link: PH13},
        {name: '14 - As Vidas do Lenhador', link: PH14},
        {name: 'Tabela de Livros e Período Indicado', link: Tab},
        
    ]
    
    const menuList = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Biblioteca', click: '/biblioteca'},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Pequenas Histórias" >
                <GridButtonPDF docs={docs} fontSize={20}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default PequenasHistorias