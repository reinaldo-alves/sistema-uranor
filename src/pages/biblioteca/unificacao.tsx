import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButtonPDF from "src/components/GridButtonPDF/GridButtonPDF";

function Unificacao() {
    
    const docs = [
        {name: '1° Estágio (Templos em Projeção)', link: null},
        {name: '2° Estágio (Trabalho Especial)', link: null},
        {name: '3° Estágio (Corrente Mestra)', link: null},
        {name: 'Abatá', link: null},
        {name: 'Abatá das Falanges Missionárias', link: null},
        {name: 'Abatá (Templo Sem Corrente Mestra)', link: null},
        {name: 'Alabá', link: null},
        {name: 'Angical', link: null},
        {name: 'Aramê', link: null},
        {name: 'Autorização', link: null},
        {name: 'Batizado', link: null},
        {name: 'Bênção do Ministro', link: null},
        {name: 'Crianças e Adolescentes no Desenvolvimento', link: null},
        {name: 'Cruz do Caminho', link: null},
        {name: 'Cura Evangélica', link: null},
        {name: 'Cura Iniciática', link: null},
        {name: 'Defumação', link: null},
        {name: 'Defumação na Mesa Evangélica', link: null},
        {name: 'Desenvolvimento', link: null},
        {name: 'Imunização', link: null},
        {name: 'Indução', link: null},
        {name: 'Junção', link: null},
        {name: 'Leito Magnético', link: null},
        {name: 'Linha de Passe', link: null},
        {name: 'Mesa Evangélica', link: null},
        {name: 'Oráculo', link: null},
        {name: 'Randy', link: null},
        {name: 'Retiro', link: null},
        {name: 'Roteiro para Palestra Dominical', link: null},
        {name: 'Sanday de Tronos', link: null},
        {name: 'Sessão Branca', link: null},
        {name: 'Sudálio', link: null},
        {name: 'Teste Mediúnico', link: null},
        {name: 'Triagem', link: null},
        {name: 'Tronos Vermelhos e Amarelos', link: null},
    ]
    
    const menuList = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Biblioteca', click: '/biblioteca'},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Unificação dos Trabalhos nos Templos do Amanhecer" >
                <GridButtonPDF docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Unificacao