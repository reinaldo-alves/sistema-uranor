import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { ButtonContainer, ConsagracaoCard, MainContainer, MudancaObs, NavigateButton, Results, ResultsData, ResultsTable, ResultsTitle } from "./styles";
import { alphabeticOrder, countMedium } from "src/utilities/functions";
import { useEffect, useState } from "react";

function Iniciacao() {
    const [columnData, setColumnData] = useState(['auto 25% 15% 15%', 'auto 25%', true])
  
    const handleResize = () => {
        if (window.innerWidth > 638) {
            setColumnData(['auto 25% 15% 15%', 'auto 25%', true]);
        } else {
            setColumnData(['auto 50px 60px 50px', 'auto 25%', false]);
        }
    };

    useEffect(() => {
        handleResize();
        const handleResizeEvent = () => {
            handleResize();
        }
        window.addEventListener('resize', handleResizeEvent);
        return () => {
            window.removeEventListener('resize', handleResizeEvent);
        };
    }, []);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/consagracoes'},
        {title: 'Iniciação', click: '/consagracoes/iniciacao'},
        {title: 'Elevação', click: '/consagracoes/elevacao'},
        {title: 'Centúria', click: '/consagracoes/centuria'},
        {title: 'Reclassificação', click: '/consagracoes/reclassificacao'},
    ]

    const listIniciacao = [
        {nome: 'Eu vou iniciar', med: 'Apará', colete: 4, foto: 'sdgrkngkrndf'},
        {nome: 'Eu vou iniciar também', med: 'Doutrinador', colete: 5, foto: ''},
        {nome: 'Marcos Ambrósio da Silva Gomes Ferreira', med: 'Doutrinador', colete: 0, foto: 'sdgrkngkrndf'},
        {nome: 'Eu vou fazer iniciação', med: 'Apará', colete: 6, foto: 'sdgrkngkrndf'},
    ]

    const listMudanca = [
        {nome: 'Eu virei doutrinador', med: 'Doutrinador', colete: 1, termo: true, foto: 'sdgrkngkrndf'},
        {nome: 'Eu virei apará', med: 'Apará', colete: 2, termo: false, foto: ''},
    ]
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content={`Lista de médiuns para iniciação - ${countMedium([...listIniciacao, ...listMudanca])}`} />
                <ConsagracaoCard>
                    <ResultsTable show={[...listIniciacao, ...listMudanca].length}>
                        <Results columns={columnData[0] as string}>
                            <ResultsTitle scope="col" align="left">Nome do Médium</ResultsTitle>
                            <ResultsTitle scope="col">{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                            <ResultsTitle scope="col">{columnData[2]? 'Colete n°' : 'Col.'}</ResultsTitle>
                            <ResultsTitle scope="col">Foto</ResultsTitle>
                        </Results>
                        {alphabeticOrder([...listIniciacao, ...listMudanca])
                            .map((item: any, index: number) => (
                                <Results columns={columnData[0] as string} key={index} onClick={() => {}}>
                                    <ResultsData align="left">{listMudanca.some((el) => el.nome === item.nome)? `${item.nome} *` : item.nome}</ResultsData>
                                    <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                    <ResultsData isNegative={!item.colete}>{item.colete ? item.colete : 'Não'}</ResultsData>
                                    <ResultsData isNegative={!item.foto}>{item.foto ? 'Sim' : 'Não'}</ResultsData>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                    <MudancaObs show={listMudanca.length}>* Mudança de mediunidade</MudancaObs>
                </ConsagracaoCard>
                <ButtonContainer>
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Autorizações</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Relatório</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Protocolo</NavigateButton>
                    <NavigateButton width="230px" color="red" onClick={() => {}}>Atualizar Iniciação</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default Iniciacao