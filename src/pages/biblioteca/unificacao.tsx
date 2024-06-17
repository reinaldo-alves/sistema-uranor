import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";
import Es1 from "src/assets/pdf/Unificacao-1Estagio.pdf";
import Es2 from "src/assets/pdf/Unificacao-2Estagio.pdf";
import Es3 from "src/assets/pdf/Unificacao-3Estagio.pdf";
import Aba from "src/assets/pdf/Unificacao-Abata.pdf";
import Abf from "src/assets/pdf/Unificacao-AbataFalanges.pdf";
import Abs from "src/assets/pdf/Unificacao-AbataSemCorrente.pdf";
import Ala from "src/assets/pdf/Unificacao-Alaba.pdf";
import Ang from "src/assets/pdf/Unificacao-Angical.pdf";
import Ara from "src/assets/pdf/Unificacao-Arame.pdf";
import Aut from "src/assets/pdf/Unificacao-Autorizacao.pdf";
import Bat from "src/assets/pdf/Unificacao-Batizado.pdf";
import BeM from "src/assets/pdf/Unificacao-BencaoMinistro.pdf";
import Cad from "src/assets/pdf/Unificacao-CriancasAdolescentes.pdf";
import CdC from "src/assets/pdf/Unificacao-CruzCaminho.pdf";
import CrE from "src/assets/pdf/Unificacao-CuraEvangelica.pdf";
import CrI from "src/assets/pdf/Unificacao-CuraIniciatica.pdf";
import Def from "src/assets/pdf/Unificacao-DefumacaoSudalio.pdf";
import DfM from "src/assets/pdf/Unificacao-DefumacaoMesa.pdf";
import Des from "src/assets/pdf/Unificacao-Desenvolvimento.pdf";
import Imu from "src/assets/pdf/Unificacao-Imunizacao.pdf";
import Ind from "src/assets/pdf/Unificacao-Inducao.pdf";
import Jun from "src/assets/pdf/Unificacao-Juncao.pdf";
import Lei from "src/assets/pdf/Unificacao-LeitoMagnetico.pdf";
import LPa from "src/assets/pdf/Unificacao-LinhaPasse.pdf";
import Mes from "src/assets/pdf/Unificacao-MesaEvangelica.pdf";
import Ora from "src/assets/pdf/Unificacao-Oraculo.pdf";
import Ran from "src/assets/pdf/Unificacao-Randy.pdf";
import Ret from "src/assets/pdf/Unificacao-Retiro.pdf";
import Pal from "src/assets/pdf/Unificacao-PalestraDominical.pdf";
import STr from "src/assets/pdf/Unificacao-SandayTronos.pdf";
import Ses from "src/assets/pdf/Unificacao-SessaoBranca.pdf";
import Sud from "src/assets/pdf/Unificacao-Sudalio.pdf";
import Tes from "src/assets/pdf/Unificacao-TesteMediunico.pdf";
import Tri from "src/assets/pdf/Unificacao-Triagem.pdf";
import Tro from "src/assets/pdf/Unificacao-Tronos.pdf";

function Unificacao() {
    
    const docs = [
        {name: '1º Estágio (Templos em Projeção)', pdf: Es1},
        {name: '2º Estágio (Trabalho Especial)', pdf: Es2},
        {name: '3º Estágio (Corrente Mestra)', pdf: Es3},
        {name: 'Abatá', pdf: Aba},
        {name: 'Abatá das Falanges Missionárias', pdf: Abf},
        {name: 'Abatá (Templo Sem Corrente Mestra)', pdf: Abs},
        {name: 'Alabá', pdf: Ala},
        {name: 'Angical', pdf: Ang},
        {name: 'Aramê', pdf: Ara},
        {name: 'Autorização', pdf: Aut},
        {name: 'Batizado', pdf: Bat},
        {name: 'Bênção do Ministro', pdf: BeM},
        {name: 'Crianças e Adolescentes no Desenvolvimento', pdf: Cad},
        {name: 'Cruz do Caminho', pdf: CdC},
        {name: 'Cura Evangélica', pdf: CrE},
        {name: 'Cura Iniciática', pdf: CrI},
        {name: 'Defumação', pdf: Def},
        {name: 'Defumação na Mesa Evangélica', pdf: DfM},
        {name: 'Desenvolvimento', pdf: Des},
        {name: 'Imunização', pdf: Imu},
        {name: 'Indução', pdf: Ind},
        {name: 'Junção', pdf: Jun},
        {name: 'Leito Magnético', pdf: Lei},
        {name: 'Linha de Passe', pdf: LPa},
        {name: 'Mesa Evangélica', pdf: Mes},
        {name: 'Oráculo', pdf: Ora},
        {name: 'Randy', pdf: Ran},
        {name: 'Retiro', pdf: Ret},
        {name: 'Roteiro para Palestra Dominical', pdf: Pal},
        {name: 'Sanday de Tronos', pdf: STr},
        {name: 'Sessão Branca', pdf: Ses},
        {name: 'Sudálio', pdf: Sud},
        {name: 'Teste Mediúnico', pdf: Tes},
        {name: 'Triagem', pdf: Tri},
        {name: 'Tronos Vermelhos e Amarelos', pdf: Tro},
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