import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";
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
import { useEffect } from "react";

function PequenasHistorias() {
    
    const docs = [
        {name: '01 - A História de Manoel Truncado', pdf: PH1},
        {name: '02 - Nara, a Suicida', pdf: PH2},
        {name: '03 - Mensagem de um Amigo Recém-Desencarnado', pdf: PH3},
        {name: '04 - A Noivinha Desencarnada', pdf: PH4},
        {name: '05 - O Velho Coronel', pdf: PH5},
        {name: '06 - O Pequeno Pajé', pdf: PH6},
        {name: '07 - Um Homem de Dois Mundos', pdf: PH7},
        {name: '08 - Meus Primeiros Passos no Canal Vermelho', pdf: PH8},
        {name: '09 - O Presidiário Conselheiro', pdf: PH9},
        {name: '10 - A Volta dos Ciganos', pdf: PH10},
        {name: '11 - O Amanhecer das Princesas na Cachoeira do Jaguar', pdf: PH11},
        {name: '12 - Tiãozinho e Justininha', pdf: PH12},
        {name: '13 - Almas Gêmeas', pdf: PH13},
        {name: '14 - As Vidas do Lenhador', pdf: PH14},
        {name: 'Tabela de Livros e Período Indicado', pdf: Tab},
        
    ]
    
    const menuList = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Biblioteca', click: '/biblioteca'},
    ]

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Pequenas Histórias" >
                <GridButton docs={docs} pdf fontSize={20}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default PequenasHistorias