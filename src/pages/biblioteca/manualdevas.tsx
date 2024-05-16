import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButtonPDF from "src/components/GridButtonPDF/GridButtonPDF";
import Cen from "src/assets/pdf/MANUALDEVAS-CENTURIA.pdf";
import Cee from "src/assets/pdf/MANUALDEVAS-CENTURIAESPECIAL.pdf";
import Cfm from "src/assets/pdf/MANUALDEVAS-CONSAGRACAOFALANGESMESTRADO.pdf";
import Ccl from "src/assets/pdf/MANUALDEVAS-CRITERIOSRECLASSIFICACOES.pdf";
import Dha from "src/assets/pdf/MANUALDEVAS-FILHOSDEDEVAS.pdf";
import Ele from "src/assets/pdf/MANUALDEVAS-ELEVACAO.pdf";
import Eee from "src/assets/pdf/MANUALDEVAS-ELEVACAOESPECIAL.pdf";
import Enl from "src/assets/pdf/MANUALDEVAS-ENLEVO.pdf";
import EEn from "src/assets/pdf/MANUALDEVAS-ENTREGAENERGIAS.pdf";
import Ime from "src/assets/pdf/MANUALDEVAS-IMANTRACAOEXTERNA.pdf";
import Rec from "src/assets/pdf/MANUALDEVAS-RECLASSIFICACAO.pdf";
import Ree from "src/assets/pdf/MANUALDEVAS-RECLASSIFICACAOESPECIAL.pdf";
import Rea from "src/assets/pdf/MANUALDEVAS-RECONSAGRACAOADJUNTOS.pdf";
import Pma from "src/assets/pdf/MANUALDEVAS-1DEMAIO.pdf";

function ManualDevas() {
    
    const docs = [
        {name: 'Centúria', link: Cen},
        {name: 'Centúria Especial', link: Cee},
        {name: 'Consagração de Falange de Mestrado', link: Cfm},
        {name: 'Critérios para Classificações', link: Ccl},
        {name: 'Devas: Histórico e Atribuições', link: Dha},
        {name: 'Elevação de Espadas', link: Ele},
        {name: 'Elevação de Espadas Especial', link: Eee},
        {name: 'Enlevo', link: Enl},
        {name: 'Entrega de Energias', link: EEn},
        {name: 'Imantração Externa', link: Ime},
        {name: 'Reclassificação', link: Rec},
        {name: 'Reclassificação Especial', link: Ree},
        {name: 'Reconsagração de Adjuntos', link: Rea},
        {name: '1º de Maio', link: Pma},
    ]
    
    const menuList = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Biblioteca', click: '/biblioteca'},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Manual de Orientação para Devas (2006)" >
                <GridButtonPDF docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default ManualDevas