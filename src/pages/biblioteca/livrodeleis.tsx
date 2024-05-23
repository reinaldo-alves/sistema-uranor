import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";
import L01 from "../../assets/pdf/LivroLeis-Abata.pdf"
import L02 from "../../assets/pdf/LivroLeis-AbataFalanges.pdf"
import L03 from "../../assets/pdf/LivroLeis-AbataSemCorrente.pdf"
import L04 from "../../assets/pdf/LivroLeis-ChaveAberturaCorrenteMestra.pdf"
import L05 from "../../assets/pdf/LivroLeis-ChaveAberturaEncerramento.pdf"
import L06 from "../../assets/pdf/LivroLeis-Alaba.pdf"
import L07 from "../../assets/pdf/LivroLeis-Angical.pdf"
import L08 from "../../assets/pdf/LivroLeis-Arame.pdf"
import L09 from "../../assets/pdf/LivroLeis-ArameTemplosSemTurigano.pdf"
import L10 from "../../assets/pdf/LivroLeis-Sacramento.pdf"
import L11 from "../../assets/pdf/LivroLeis-BencaoPaiSetaBranca.pdf"
import L12 from "../../assets/pdf/LivroLeis-Casamento.pdf"
import L13 from "../../assets/pdf/LivroLeis-Cassandra.pdf"
import L14 from "../../assets/pdf/LivroLeis-CruzCaminho.pdf"
import L15 from "../../assets/pdf/LivroLeis-Cura.pdf"
import L16 from "../../assets/pdf/LivroLeis-Defumacao.pdf"
import L17 from "../../assets/pdf/LivroLeis-EstrelaCandente.pdf"
import L18 from "../../assets/pdf/LivroLeis-EstrelaSublimacao.pdf"
import L19 from "../../assets/pdf/LivroLeis-Imunizacao.pdf"
import L20 from "../../assets/pdf/LivroLeis-Inducao.pdf"
import L21 from "../../assets/pdf/LivroLeis-Julgamento.pdf"
import L22 from "../../assets/pdf/LivroLeis-Juncao.pdf"
import L23 from "../../assets/pdf/LivroLeis-LeitoMagnetico.pdf"
import L24 from "../../assets/pdf/LivroLeis-LibertacaoEspecial.pdf"
import L25 from "../../assets/pdf/LivroLeis-MesaEvangelica.pdf"
import L26 from "../../assets/pdf/LivroLeis-Oraculo.pdf"
import L27 from "../../assets/pdf/LivroLeis-Quadrantes.pdf"
import L28 from "../../assets/pdf/LivroLeis-Randy.pdf"
import L29 from "../../assets/pdf/LivroLeis-Retiro.pdf"
import L30 from "../../assets/pdf/LivroLeis-SandayTronos.pdf"
import L31 from "../../assets/pdf/LivroLeis-SessaoBranca.pdf"
import L32 from "../../assets/pdf/LivroLeis-Sudalio.pdf"
import L33 from "../../assets/pdf/LivroLeis-TrabalhoPrisioneirosTemploMae.pdf"
import L34 from "../../assets/pdf/LivroLeis-TrabalhoPrisioneirosTemplosAmanhecer.pdf"
import L35 from "../../assets/pdf/LivroLeis-TrabalhoEspecial.pdf"
import L36 from "../../assets/pdf/LivroLeis-Triada.pdf"
import L37 from "../../assets/pdf/LivroLeis-TronoMilenar.pdf"
import L38 from "../../assets/pdf/LivroLeis-Tronos.pdf"
import L39 from "../../assets/pdf/LivroLeis-Turigano.pdf"
import L40 from "../../assets/pdf/LivroLeis-Unificacao.pdf"

function LivroDeLeis() {
    
    const docs = [
        {name: 'Abatá', pdf: L01},
        {name: 'Abatá das Falanges Missionárias', pdf: L02},
        {name: 'Abatá (Templo Sem Corrente Mestra)', pdf: L03},
        {name: 'Abertura da Corrente Mestra', pdf: L04},
        {name: 'Abertura e Encerramento dos Trabalhos', pdf: L05},
        {name: 'Alabá', pdf: L06},
        {name: 'Angical', pdf: L07},
        {name: 'Aramê', pdf: L08},
        {name: 'Aramê (Templo Sem Turigano)', pdf: L09},
        {name: 'Batizado', pdf: L10},
        {name: 'Bênção do Pai Seta Branca', pdf: L11},
        {name: 'Casamento', pdf: L12},
        {name: 'Cassandra', pdf: L13},
        {name: 'Cruz do Caminho', pdf: L14},
        {name: 'Cura Iniciática', pdf: L15},
        {name: 'Defumação', pdf: L16},
        {name: 'Estrela Candente', pdf: L17},
        {name: 'Estrela Sublimação', pdf: L18},
        {name: 'Imunização', pdf: L19},
        {name: 'Indução', pdf: L20},
        {name: 'Julgamento', pdf: L21},
        {name: 'Junção', pdf: L22},
        {name: 'Leito Magnético', pdf: L23},
        {name: 'Libertação Especial', pdf: L24},
        {name: 'Mesa Evangélica', pdf: L25},
        {name: 'Oráculo', pdf: L26},
        {name: 'Quadrantes', pdf: L27},
        {name: 'Randy', pdf: L28},
        {name: 'Retiro', pdf: L29},
        {name: 'Sanday de Tronos', pdf: L30},
        {name: 'Sessão Branca', pdf: L31},
        {name: 'Sudálio', pdf: L32},
        {name: 'Trabalho de Prisioneiros (Templo Mãe)', pdf: L33},
        {name: 'Trabalho de Prisioneiros (Templos do Amanhecer)', pdf: L34},
        {name: 'Trabalho Especial', pdf: L35},
        {name: 'Triada', pdf: L36},
        {name: 'Trono Milenar', pdf: L37},
        {name: 'Tronos Vermelhos e Amarelos', pdf: L38},
        {name: 'Turigano', pdf: L39},
        {name: 'Unificação', pdf: L40},
    ]
    
    const menuList = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Biblioteca', click: '/biblioteca'},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <MainContainer title="Leis e Chaves Ritualísticas" >
                <GridButton pdf docs={docs}/>
            </MainContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default LivroDeLeis