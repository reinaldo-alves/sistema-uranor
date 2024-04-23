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

function Biblioteca() {
    
    const docs = [
        {name: 'Livro de Leis', image: Lei, link: null},
        {name: 'Unificação dos Trabalhos nos Templos do Amanhecer', image: Uni, link: null},
        {name: 'Manual do Devas', image: Dev, link: null},
        {name: 'Cartas', image: Car, link: null},
        {name: 'Pequenas Histórias', image: Peq, link: null},
        {name: 'Instruções Práticas', image: Ins, link: null},
        {name: 'Terceiro Sétimo dos Cavaleiros da Luz', image: Ter, link: null},
        {name: 'Contagem Trino Arakém', image: Tri, link: null}
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