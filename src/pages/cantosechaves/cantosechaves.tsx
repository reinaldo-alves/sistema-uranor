import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import ButtonMenu from "../../components/ButtonMenu/ButtonMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import ButtonDoc from "src/components/ButtonDoc/ButtonDoc";
import { CardsCantoContainer, GlobalContainer } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { agulhaIsmeniaCanto, aponaraCanto, arianaCanto, caycaraCanto, ciganaAganaraCanto, ciganaTaganaCanto, dharmoOxintoCanto, dharmoOxintoLeito, franciscanaCanto, gregaCanto, jacanaCanto, madalenaCanto, magoAcender, magoApagar, magoCanto, mayaCanto, muruaicyCanto, muruaicyPortões, narayamaCanto, niatraCanto, nityamaCanto, nityamaChama, nityamaTurigano, principeMayaCanto, rochanaCanto, samaritanaCanto, samaritanaTurigano, tupinambaCanto, yuricyLuaCanto, yuricySol1Canto, yuricySolCanto, yuricyTurigano } from "src/reports/cantosFalanges";
import { cavEspecialCanto, ninfaLuaCanto, ninfaSolCanto } from "src/reports/cantosIndividualidade";

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

    const [columnIndiv, setColumnIndiv] = useState("3");
    const [columnChave, setColumnChave] = useState("4");

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 890) {
                setColumnIndiv("3");
                setColumnChave("4")
            } else if (window.innerWidth >= 660) {
                setColumnIndiv("1");
                setColumnChave("3");
            } else if (window.innerWidth >= 440) {
                setColumnIndiv("1");
                setColumnChave("2");
            } else {
                setColumnIndiv("1");
                setColumnChave("1");
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const defaultCanto = {title: '', text: [''], repeat: 1}

    const individualidade = [
        {name: 'Canto do Cavaleiro Especial', link: cavEspecialCanto, subtitle: '(Doutrinador e Ajanã)'},
        {name: 'Canto da Escrava do Cavaleiro Especial', link: ninfaLuaCanto, subtitle: '(Ninfa Lua)'},
        {name: 'Canto da Ninfa do Cavaleiro Especial', link: ninfaSolCanto, subtitle: '(Ninfa Sol)'}
    ]

    const chaves = [
        {name:'Abatá', active: abaActive, click: abaClick, list: [
            {canto: defaultCanto, text: 'Chave da Ninfa Comandante'}
        ]},
        {name:'Abertura e Encerramento', active: abeActive, click: abeClick, list: [
            {canto: defaultCanto, text: 'Chave de Abertura e Encerramento dos Trabalhos'},
            {canto: defaultCanto, text: 'Chave de Abertura e Encerramento do Trabalho Oficial'},
            {canto: defaultCanto, text: 'Chave de Tapir (Abertura da Corrente Mestra'}
        ]},
        {name:'Alabá', active: alaActive, click: alaClick, list: [
            {canto: defaultCanto, text: 'Chave do Comandante (Reino Central)'},
            {canto: defaultCanto, text: 'Chave do Cavaleiro da Lança Vermelha'},
            {canto: defaultCanto, text: 'Chave de Invocação dos Cavaleiros das Lanças'}
        ]},
        {name:'Aramê', active: araActive, click: araClick, list: [
            {canto: defaultCanto, text: 'Canto da Yuricy no Aramê'},
            {canto: defaultCanto, text: 'Chave do Ajanã'},
            {canto: defaultCanto, text: 'Canto da Condessa de Natharry'},
            {canto: defaultCanto, text: 'Canto da Promotoria'},
            {canto: defaultCanto, text: 'Canto da Defensoria'},
            {canto: defaultCanto, text: 'Chave do Cavaleiro da Lança Vermelha'}
        ]},
        {name:'Cura', active: curActive, click: curClick, list: [
            {canto: defaultCanto, text: 'Chave do Comandante'}
        ]},
        {name:'Defumação', active: defActive, click: defClick, list: [
            {canto: defaultCanto, text: 'Chave do Comandante'}
        ]},
        {name:'Indução', active: indActive, click: indClick, list: [
            {canto: defaultCanto, text: 'Chave do Comandante'}
        ]},
        {name:'Junção', active: junActive, click: junClick, list: [
            {canto: defaultCanto, text: 'Chave do Comandante'}
        ]},
        {name:'Leito Magnético', active: leiActive, click: leiClick, list: [
            {canto: defaultCanto, text: 'Chave das Ninfas Representantes das Falanges Missionárias'},
            {canto: defaultCanto, text: 'Chave do Comandante - 1° Cavaleiro da Lança Reino Central'},
            {canto: defaultCanto, text: 'Chave do 1° Cavaleiro da Lança Vermelha'},
            {canto: defaultCanto, text: 'Chave do 1° Cavaleiro da Lança Lilás'},
            {canto: defaultCanto, text: 'Chave do 1° Cavaleiro da Lança Rósea'},
            {canto: defaultCanto, text: 'Chave dos Cavaleiros de Oxosse'},
            {canto: defaultCanto, text: 'Chave das Ninfas dos Cavaleiros de Oxosse'},
            {canto: defaultCanto, text: 'Chave do Ajanã'},
        ]},
        {name:'Oráculo', active: oraActive, click: oraClick, list: [
            {canto: defaultCanto, text: 'Chave do Comandante'},
            {canto: defaultCanto, text: 'Chave do Ajanã'},
            {canto: defaultCanto, text: 'Convite do Pai Seta Branca (Ninfa Sol)'}
        ]},
        {name:'Randy', active: ranActive, click: ranClick, list: [
            {canto: defaultCanto, text: 'Chave do Comandante (Reino Central)'},
            {canto: defaultCanto, text: 'Chave dos Cavaleiros da Lança'},
            {canto: defaultCanto, text: 'Chave dos Sextos'},
            {canto: defaultCanto, text: 'Chave do Ajanã'},
            {canto: defaultCanto, text: 'Chave da Ninfa Sol'},
            {canto: defaultCanto, text: 'Chave da Ninfa Lua'}
        ]},
        {name:'Sudálio', active: sudActive, click: sudClick, list: [
            {canto: defaultCanto, text: 'Chave do Comandante'},
            {canto: defaultCanto, text: 'Chave da Ninfa Lua'}
        ]}
    ]

    const menuList = [{title: 'Página Inicial', click: '/'}]

    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <GlobalContainer>
                <MainTitle content="Cantos da Individualidade" />
                <CardsCantoContainer colums={columnIndiv}>
                    {individualidade.map((item, index) => (
                        <ButtonDoc key={index} name={item.name} link={item.link} subtitle={item.subtitle} height={'4em'} />
                    ))}
                </CardsCantoContainer>
                <MainTitle content="Cantos das Falanges Missionárias" />
                <CardsCantoContainer colums={columnChave}>
                    <ButtonMenu active={nitActive} click={nitClick} name={'Nityama'} list={[
                        {text: 'Canto da Nityama', canto: nityamaCanto},
                        {text: 'Canto para Chama da Vida', canto: nityamaChama},
                        {text: 'Canto do Turigano', canto: nityamaTurigano}
                    ]} />
                    <ButtonMenu active={samActive} click={samClick} name={'Samaritana'} list={[
                        {text: 'Canto da Samaritana', canto: samaritanaCanto},
                        {text: 'Canto do Turigano', canto: samaritanaTurigano}
                    ]} />
                    <ButtonDoc name={'Grega'} link={gregaCanto} height={'2em'} />
                    <ButtonDoc name={'Maya'} link={mayaCanto} height={'2em'} />
                    <ButtonMenu active={magActive} click={magClick} name={'Mago'} list={[
                        {text: 'Canto do Mago', canto: magoCanto},
                        {text: 'Canto para Acender a Chama', canto: magoAcender},
                        {text: 'Canto para Apagar a Chama', canto: magoApagar}
                    ]} />                        
                    <ButtonDoc name={'Príncipe Maya'} link={principeMayaCanto} height={'2em'} />
                    <ButtonMenu active={yurActive} click={yurClick} name={'Yuricy'} list={[
                        {text: 'Canto da Yuricy Sol', canto: yuricySolCanto},
                        {text: 'Canto da Yuricy Lua', canto: yuricyLuaCanto},
                        {text: 'Canto do Aramê', canto: yuricySol1Canto},
                        {text: 'Canto do Turigano', canto: yuricyTurigano}
                    ]} />
                    <ButtonMenu active={dhaActive} click={dhaClick} name={'Dharmo-Oxinto'} list={[
                        {text: 'Canto da Dharmo-Oxinto', canto: dharmoOxintoCanto},
                        {text: 'Canto do Leito/Turigano', canto: dharmoOxintoLeito}
                    ]} />
                    <ButtonMenu active={murActive} click={murClick} name={'Muruaicy'} list={[
                        {text: 'Canto da Muruaicy', canto: muruaicyCanto},
                        {text: 'Chave de Abertura dos Portões', canto: muruaicyPortões}
                    ]} />
                    <ButtonDoc name={'Jaçanã'} link={jacanaCanto} height={'2em'} />
                    <ButtonDoc name={'Ariana'} link={arianaCanto} height={'2em'} />
                    <ButtonDoc name={'Madalena'} link={madalenaCanto} height={'2em'} />
                    <ButtonDoc name={'Franciscana'} link={franciscanaCanto} height={'2em'} />
                    <ButtonDoc name={'Narayama'} link={narayamaCanto} height={'2em'} />
                    <ButtonDoc name={'Rochana'} link={rochanaCanto} height={'2em'} />
                    <ButtonDoc name={'Cayçara'} link={caycaraCanto} height={'2em'} />
                    <ButtonDoc name={'Tupinambá'} link={tupinambaCanto} height={'2em'} />
                    <ButtonDoc name={'Cigana Aganara'} link={ciganaAganaraCanto} height={'2em'} />
                    <ButtonDoc name={'Cigana Tagana'} link={ciganaTaganaCanto} height={'2em'} />
                    <ButtonDoc name={'Agulha Ismênia'} link={agulhaIsmeniaCanto} height={'2em'} />
                    <ButtonDoc name={'Niatra'} link={niatraCanto} height={'2em'} />
                    <ButtonDoc name={'Aponara'} link={aponaraCanto} height={'2em'} />
                </CardsCantoContainer>
                <MainTitle content="Chaves dos Trabalhos" />
                <CardsCantoContainer colums={columnChave}>
                    {chaves.map((item, index) => (
                        <ButtonMenu
                            key={index}
                            active={item.active}
                            click={item.click}
                            name={item.name}
                            list={item.list}
                            height={'3em'}
                        />
                    ))}
                </CardsCantoContainer>
            </GlobalContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default CantosChaves