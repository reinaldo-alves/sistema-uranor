import { useState } from "react";
import Header from "../../components/header/header";
import CavEsp from '../../docs/CavaleiroEspecial.pdf'
import ECavEsp from '../../docs/Escrava.pdf'
import NCavEsp from '../../docs/NinfaSol.pdf'
import Gre from '../../docs/Grega.pdf'
import May from '../../docs/Maya.pdf'
import Pri from '../../docs/PrincipeMaya.pdf'
import Jac from '../../docs/Jacana.pdf'
import Ari from '../../docs/Ariana.pdf'
import Mad from '../../docs/Madalena.pdf'
import Fra from '../../docs/Franciscana.pdf'
import Nar from '../../docs/Narayama.pdf'
import Roc from '../../docs/Rochana.pdf'
import Cay from '../../docs/Caycara.pdf'
import Tup from '../../docs/Tupinamba.pdf'
import CAg from '../../docs/CiganaAganara.pdf'
import CTa from '../../docs/CiganaTagana.pdf'
import Agu from '../../docs/AgulhaIsmenia.pdf'
import Nia from '../../docs/Niatra.pdf'
import Apo from '../../docs/Aponara.pdf'
import Nit from '../../docs/Nityama.pdf'
import NitC from '../../docs/NityamaChama.pdf'
import NitT from '../../docs/NityamaTurigano.pdf'
import Sam from '../../docs/Samaritana.pdf'
import SamT from '../../docs/SamaritanaTurigano.pdf'
import Mag from '../../docs/Mago.pdf'
import MagOn from '../../docs/MagoAcender.pdf'
import MagOff from '../../docs/MagoApagar.pdf'
import YurS from '../../docs/YuricySol.pdf'
import YurL from '../../docs/YuricyLua.pdf'
import Yur1 from '../../docs/YuricySol1Canto.pdf'
import YurT from '../../docs/YuricyTurigano.pdf'
import Dha from '../../docs/DharmoOxinto.pdf'
import DhaL from '../../docs/DharmoOxintoLeito.pdf'
import Mur from '../../docs/Muruaicy.pdf'
import MurP from '../../docs/MuruaicyPortoes.pdf'
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import ButtonDoc from "src/components/ButtonDoc/ButtonDoc";
import { CardsCantoContainer, GlobalContainer, SectionTitle } from "./styles";

function CantosChaves() {
    
    const [nitActive, setNitActive] = useState(false)
    const nitClick = () => setNitActive(!nitActive)
    const [samActive, setSamActive] = useState(false)
    const samClick = () => setSamActive(!samActive)
    const [magActive, setMagActive] = useState(false)
    const magClick = () => setMagActive(!magActive)
    const [yurActive, setYurActive] = useState(false)
    const yurClick = () => setYurActive(!yurActive)
    const [dhaActive, setDhaActive] = useState(false)
    const dhaClick = () => setDhaActive(!dhaActive)
    const [murActive, setMurActive] = useState(false)
    const murClick = () => setMurActive(!murActive)

    const [abaActive, setAbaActive] = useState(false)
    const abaClick = () => setAbaActive(!abaActive)
    const [abeActive, setAbeActive] = useState(false)
    const abeClick = () => setAbeActive(!abeActive)
    const [alaActive, setAlaActive] = useState(false)
    const alaClick = () => setAlaActive(!alaActive)
    const [araActive, setAraActive] = useState(false)
    const araClick = () => setAraActive(!araActive)
    const [curActive, setCurActive] = useState(false)
    const curClick = () => setCurActive(!curActive)
    const [defActive, setDefActive] = useState(false)
    const defClick = () => setDefActive(!defActive)
    const [indActive, setIndActive] = useState(false)
    const indClick = () => setIndActive(!indActive)
    const [junActive, setJunActive] = useState(false)
    const junClick = () => setJunActive(!junActive)
    const [leiActive, setLeiActive] = useState(false)
    const leiClick = () => setLeiActive(!leiActive)
    const [oraActive, setOraActive] = useState(false)
    const oraClick = () => setOraActive(!oraActive)
    const [ranActive, setRanActive] = useState(false)
    const ranClick = () => setRanActive(!ranActive)
    const [sudActive, setSudActive] = useState(false)
    const sudClick = () => setSudActive(!sudActive)

    const individualidade = [
        {name: 'Canto do Cavaleiro Especial', link: CavEsp, subtitle: '(Doutrinador e Ajanã)'},
        {name: 'Canto da Escrava do Cavaleiro Especial', link: ECavEsp, subtitle: '(Ninfa Lua)'},
        {name: 'Canto da Ninfa do Cavaleiro Especial', link: NCavEsp, subtitle: '(Ninfa Sol)'}
    ]

    const chaves = [
        {name:'Abatá', active: abaActive, click: abaClick, list: [
            {link: '', canto: 'Chave da Ninfa Comandante'}
        ]},
        {name:'Abertura e Encerramento', active: abeActive, click: abeClick, list: [
            {link: '', canto: 'Chave de Abertura e Encerramento dos Trabalhos'},
            {link: '', canto: 'Chave de Abertura e Encerramento do Trabalho Oficial'},
            {link: '', canto: 'Chave de Tapir (Abertura da Corrente Mestra'}
        ]},
        {name:'Alabá', active: alaActive, click: alaClick, list: [
            {link: '', canto: 'Chave do Comandante (Reino Central)'},
            {link: '', canto: 'Chave do Cavaleiro da Lança Vermelha'},
            {link: '', canto: 'Chave de Invocação dos Cavaleiros das Lanças'}
        ]},
        {name:'Aramê', active: araActive, click: araClick, list: [
            {link: '', canto: 'Canto da Yuricy no Aramê'},
            {link: '', canto: 'Chave do Ajanã'},
            {link: '', canto: 'Canto da Condessa de Natharry'},
            {link: '', canto: 'Canto da Promotoria'},
            {link: '', canto: 'Canto da Defensoria'},
            {link: '', canto: 'Chave do Cavaleiro da Lança Vermelha'}
        ]},
        {name:'Cura', active: curActive, click: curClick, list: [
            {link: '', canto: 'Chave do Comandante'}
        ]},
        {name:'Defumação', active: defActive, click: defClick, list: [
            {link: '', canto: 'Chave do Comandante'}
        ]},
        {name:'Indução', active: indActive, click: indClick, list: [
            {link: '', canto: 'Chave do Comandante'}
        ]},
        {name:'Junção', active: junActive, click: junClick, list: [
            {link: '', canto: 'Chave do Comandante'}
        ]},
        {name:'Leito Magnético', active: leiActive, click: leiClick, list: [
            {link: '', canto: 'Chave das Ninfas Representantes das Falanges Missionárias'},
            {link: '', canto: 'Chave do Comandante - 1° Cavaleiro da Lança Reino Central'},
            {link: '', canto: 'Chave do 1° Cavaleiro da Lança Vermelha'},
            {link: '', canto: 'Chave do 1° Cavaleiro da Lança Lilás'},
            {link: '', canto: 'Chave do 1° Cavaleiro da Lança Rósea'},
            {link: '', canto: 'Chave dos Cavaleiros de Oxosse'},
            {link: '', canto: 'Chave das Ninfas dos Cavaleiros de Oxosse'},
            {link: '', canto: 'Chave do Ajanã'},
        ]},
        {name:'Oráculo', active: oraActive, click: oraClick, list: [
            {link: '', canto: 'Chave do Comandante'},
            {link: '', canto: 'Chave do Ajanã'},
            {link: '', canto: 'Convite do Pai Seta Branca (Ninfa Sol)'}
        ]},
        {name:'Randy', active: ranActive, click: ranClick, list: [
            {link: '', canto: 'Chave do Comandante (Reino Central)'},
            {link: '', canto: 'Chave dos Cavaleiros da Lança'},
            {link: '', canto: 'Chave dos Sextos'},
            {link: '', canto: 'Chave do Ajanã'},
            {link: '', canto: 'Chave da Ninfa Sol'},
            {link: '', canto: 'Chave da Ninfa Lua'}
        ]},
        {name:'Sudálio', active: sudActive, click: sudClick, list: [
            {link: '', canto: 'Chave do Comandante'},
            {link: '', canto: 'Chave da Ninfa Lua'}
        ]}
    ]

    return (
        <>
            <Header />
            <SubMenu list={[{title: 'Página Inicial', click: '/'}]}/>
            <GlobalContainer>
                <SectionTitle>Cantos da Individualidade</SectionTitle>
                <CardsCantoContainer colums="3">
                    {individualidade.map((item) => (
                        <ButtonDoc name={item.name} link={item.link} subtitle={item.subtitle} height={'4em'} />
                    ))}
                </CardsCantoContainer>
                <SectionTitle>Cantos das Falanges Missionárias</SectionTitle>
                <CardsCantoContainer colums="4">
                    <ButtonMenu active={nitActive} click={nitClick} name={'Nityama'} list={[
                        {link: Nit, canto: 'Canto da Nityama'},
                        {link: NitC, canto: 'Canto para Chama da Vida'},
                        {link: NitT, canto: 'Canto do Turigano'}
                    ]} />
                    <ButtonMenu active={samActive} click={samClick} name={'Samaritana'} list={[
                        {link: Sam, canto: 'Canto da Samaritana'},
                        {link: SamT, canto: 'Canto do Turigano'}
                    ]} />
                    <ButtonDoc name={'Grega'} link={Gre} height={'2em'} />
                    <ButtonDoc name={'Maya'} link={May} height={'2em'} />
                    <ButtonMenu active={magActive} click={magClick} name={'Mago'} list={[
                        {link: Mag, canto: 'Canto do Mago'},
                        {link: MagOn, canto: 'Canto para Acender a Chama'},
                        {link: MagOff, canto: 'Canto para Apagar a Chama'}
                    ]} />                        
                    <ButtonDoc name={'Príncipe Maya'} link={Pri} height={'2em'} />
                    <ButtonMenu active={yurActive} click={yurClick} name={'Yuricy'} list={[
                        {link: YurS, canto: 'Canto da Yuricy Sol'},
                        {link: YurL, canto: 'Canto da Yuricy Lua'},
                        {link: Yur1, canto: 'Canto do Aramê'},
                        {link: YurT, canto: 'Canto do Turigano'}
                    ]} />
                    <ButtonMenu active={dhaActive} click={dhaClick} name={'Dharmo-Oxinto'} list={[
                        {link: Dha, canto: 'Canto da Dharmo-Oxinto'},
                        {link: DhaL, canto: 'Canto do Leito/Turigano'}
                    ]} />
                    <ButtonMenu active={murActive} click={murClick} name={'Muruaicy'} list={[
                        {link: Mur, canto: 'Canto da Muruaicy'},
                        {link: MurP, canto: 'Chave de Abertura dos Portões'}
                    ]} />
                    <ButtonDoc name={'Jaçanã'} link={Jac} height={'2em'} />
                    <ButtonDoc name={'Ariana'} link={Ari} height={'2em'} />
                    <ButtonDoc name={'Madalena'} link={Mad} height={'2em'} />
                    <ButtonDoc name={'Franciscana'} link={Fra} height={'2em'} />
                    <ButtonDoc name={'Narayama'} link={Nar} height={'2em'} />
                    <ButtonDoc name={'Rochana'} link={Roc} height={'2em'} />
                    <ButtonDoc name={'Cayçara'} link={Cay} height={'2em'} />
                    <ButtonDoc name={'Tupinambá'} link={Tup} height={'2em'} />
                    <ButtonDoc name={'Cigana Aganara'} link={CAg} height={'2em'} />
                    <ButtonDoc name={'Cigana Tagana'} link={CTa} height={'2em'} />
                    <ButtonDoc name={'Agulha Ismênia'} link={Agu} height={'2em'} />
                    <ButtonDoc name={'Niatra'} link={Nia} height={'2em'} />
                    <ButtonDoc name={'Aponara'} link={Apo} height={'2em'} />
                </CardsCantoContainer>
                <SectionTitle>Chaves dos Trabalhos</SectionTitle>
                <CardsCantoContainer colums="4">
                    {chaves.map((item) => (
                        <ButtonMenu
                            active={item.active}
                            click={item.click}
                            name={item.name}
                            list={item.list}
                            height={'3em'}
                        />
                    ))}
                </CardsCantoContainer>
            </GlobalContainer>
        </>
    )
}

export default CantosChaves