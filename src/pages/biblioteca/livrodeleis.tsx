import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";

function LivroDeLeis() {
    
    const docs = [
        {name: 'Abatá', link: null},
        {name: 'Abatá das Falanges Missionárias', link: null},
        {name: 'Abatá (Templo Sem Corrente Mestra)', link: null},
        {name: 'Alabá', link: null},
        {name: 'Angical', link: null},
        {name: 'Aramê', link: null},
        {name: 'Aramê (Templo Sem Turigano)', link: null},
        {name: 'Batizado', link: null},
        {name: 'Bênção do Pai Seta Branca', link: null},
        {name: 'Casamento', link: null},
        {name: 'Cassandra', link: null},
        {name: 'Chave de Abertura da Corrente Mestra', link: null},
        {name: 'Chave de Abertura e Encerramento dos Trabalhos', link: null},
        {name: 'Cruz do Caminho', link: null},
        {name: 'Cura Iniciática', link: null},
        {name: 'Defumação', link: null},
        {name: 'Estrela Candente', link: null},
        {name: 'Estrela Sublimação', link: null},
        {name: 'Imunização', link: null},
        {name: 'Indução', link: null},
        {name: 'Julgamento', link: null},
        {name: 'Junção', link: null},
        {name: 'Leito Magnético', link: null},
        {name: 'Libertação Especial', link: null},
        {name: 'Mesa Evangélica', link: null},
        {name: 'Oráculo', link: null},
        {name: 'Quadrantes', link: null},
        {name: 'Randy', link: null},
        {name: 'Retiro', link: null},
        {name: 'Sanday de Tronos', link: null},
        {name: 'Sessão Branca', link: null},
        {name: 'Sudálio', link: null},
        {name: 'Trabalho de Prisioneiros (Templo Mãe)', link: null},
        {name: 'Trabalho de Prisioneiros (Templos do Amanhecer)', link: null},
        {name: 'Trabalho Especial', link: null},
        {name: 'Triada', link: null},
        {name: 'Trono Milenar', link: null},
        {name: 'Tronos Vermelhos e Amarelos', link: null},
        {name: 'Turigano', link: null},
        {name: 'Unificação', link: null},
    ]
    
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Documentos Úteis" >
                <GridButton docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default LivroDeLeis