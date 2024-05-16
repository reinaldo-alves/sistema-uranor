import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import ButtonImage from "src/components/ButtonImage/ButtonImage";
import Car from "../../assets/bib-cartas.jpg";
import Ins from "../../assets/bib-instrucoespraticas.jpg";
import Lei from "../../assets/bib-livrodeleis.jpg";
import Dev from "../../assets/bib-manualdevas.jpg";
import Peq from "../../assets/bib-pequenashistorias.jpg";
import Ter from "../../assets/bib-terceirosetimo.jpg";
import Tri from "../../assets/bib-trinoarakem.jpg";
import Uni from "../../assets/bib-unificacao.jpg";
import Tcl from "src/assets/pdf/TerceiroSetimoCavaleirosLuz.pdf"
import Cta from "src/assets/pdf/ContagemTrinoArakem.pdf"
import { useNavigate } from "react-router-dom";

function Biblioteca() {
    const navigate = useNavigate();

    const docs = [
        {name: 'Livro de Leis', image: Lei, pdf: false, link: () => navigate('/biblioteca/livrodeleis')},
        {name: 'Unificação dos Trabalhos nos Templos do Amanhecer', image: Uni, pdf: false, link: () => navigate('/biblioteca/unificacao')},
        {name: 'Manual dos Devas', image: Dev, pdf: false, link: () => navigate('/biblioteca/manualdevas')},
        {name: 'Cartas', image: Car, pdf: false, link: () => navigate('/biblioteca/cartas')},
        {name: 'Pequenas Histórias', image: Peq, pdf: false, link: () => navigate('/biblioteca/pequenashistorias')},
        {name: 'Instruções Práticas', image: Ins, pdf: false, link: () => navigate('/biblioteca/instrucoespraticas')},
        {name: 'Terceiro Sétimo dos Três Cavaleiros da Luz', image: Ter, pdf: true, link: Tcl},
        {name: 'Contagem Trino Arakém', image: Tri, pdf: true, link: Cta}
    ]

    const menuList = [{title: 'Página Inicial', click: '/'}];
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Biblioteca" >
                <ButtonImage docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Biblioteca