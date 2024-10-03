import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";
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
import { useEffect } from "react";

function ManualDevas() {
    
    const docs = [
        {name: 'Centúria', pdf: Cen},
        {name: 'Centúria Especial', pdf: Cee},
        {name: 'Consagração de Falange de Mestrado', pdf: Cfm},
        {name: 'Critérios para Classificações', pdf: Ccl},
        {name: 'Devas: Histórico e Atribuições', pdf: Dha},
        {name: 'Elevação de Espadas', pdf: Ele},
        {name: 'Elevação de Espadas Especial', pdf: Eee},
        {name: 'Enlevo', pdf: Enl},
        {name: 'Entrega de Energias', pdf: EEn},
        {name: 'Imantração Externa', pdf: Ime},
        {name: 'Reclassificação', pdf: Rec},
        {name: 'Reclassificação Especial', pdf: Ree},
        {name: 'Reconsagração de Adjuntos', pdf: Rea},
        {name: '1º de Maio', pdf: Pma},
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
            <MainContainer title="Manual de Orientação para Devas (2006)" >
                <GridButton pdf docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default ManualDevas