import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";
import Cha from "src/assets/pdf/chaves_desenvolvimento_apara.pdf";
import Chd from "src/assets/pdf/chaves_desenvolvimento_doutrinador.pdf";
import Cda from "src/assets/pdf/cartao_desenvolvimento_apara.pdf";
import Cdd from "src/assets/pdf/cartao_desenvolvimento_doutrinador.pdf";

function DesenvDocs() {
    
    const docs = [
        {name: 'Chaves - Apará ', pdf: Cha},
        {name: 'Chaves - Doutrinador', pdf: Chd},
        {name: 'Cartão do Desenvolvimento - Apará', pdf: Cda},
        {name: 'Cartão do Desenvolvimento - Doutrinador', pdf: Cdd}
    ]
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Frequência', click: '/desenvolvimento/frequencia'},
        {title: 'Cadastrar Aspirante', click: '/desenvolvimento/cadastro'},
        {title: 'Documentos', click: '/desenvolvimento/documentos'}
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Documentos - Desenvolvimento">
                <GridButton pdf docs={docs} />
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default DesenvDocs