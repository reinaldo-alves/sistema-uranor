import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";

function Unificacao() {
    
    const docs = [
        {name: '1º Estágio (Templos em Projeção)', pdf: null},
        {name: '2º Estágio (Trabalho Especial)', pdf: null},
        {name: '3º Estágio (Corrente Mestra)', pdf: null},
        {name: 'Abatá', pdf: null},
        {name: 'Abatá das Falanges Missionárias', pdf: null},
        {name: 'Abatá (Templo Sem Corrente Mestra)', pdf: null},
        {name: 'Alabá', pdf: null},
        {name: 'Angical', pdf: null},
        {name: 'Aramê', pdf: null},
        {name: 'Autorização', pdf: null},
        {name: 'Batizado', pdf: null},
        {name: 'Bênção do Ministro', pdf: null},
        {name: 'Crianças e Adolescentes no Desenvolvimento', pdf: null},
        {name: 'Cruz do Caminho', pdf: null},
        {name: 'Cura Evangélica', pdf: null},
        {name: 'Cura Iniciática', pdf: null},
        {name: 'Defumação', pdf: null},
        {name: 'Defumação na Mesa Evangélica', pdf: null},
        {name: 'Desenvolvimento', pdf: null},
        {name: 'Imunização', pdf: null},
        {name: 'Indução', pdf: null},
        {name: 'Junção', pdf: null},
        {name: 'Leito Magnético', pdf: null},
        {name: 'Linha de Passe', pdf: null},
        {name: 'Mesa Evangélica', pdf: null},
        {name: 'Oráculo', pdf: null},
        {name: 'Randy', pdf: null},
        {name: 'Retiro', pdf: null},
        {name: 'Roteiro para Palestra Dominical', pdf: null},
        {name: 'Sanday de Tronos', pdf: null},
        {name: 'Sessão Branca', pdf: null},
        {name: 'Sudálio', pdf: null},
        {name: 'Teste Mediúnico', pdf: null},
        {name: 'Triagem', pdf: null},
        {name: 'Tronos Vermelhos e Amarelos', pdf: null},
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
                <GridButton pdf docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default Unificacao