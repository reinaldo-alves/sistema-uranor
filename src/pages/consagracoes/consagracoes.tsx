import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { ButtonContainer, ConsagracaoCard, ConsagracaoHeader, ConsagracaoTitle, MainContainer, MudancaObs, NavigateButton, Results, ResultsData, ResultsTable, ResultsTitle } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { alphabeticOrder, countMedium } from "src/utilities/functions";

function Consagracoes() {
    
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

    const navigate = useNavigate()

    const listIniciacao = [
        {nome: 'Eu vou iniciar', med: 'Apará', colete: 4, foto: 'sdgrkngkrndf'},
        {nome: 'Eu vou iniciar também', med: 'Doutrinador', colete: 5, foto: ''},
        {nome: 'Marcos Ambrósio da Silva Gomes Ferreira', med: 'Doutrinador', colete: 0, foto: 'sdgrkngkrndf'},
        {nome: 'Eu vou fazer iniciação', med: 'Apará', colete: 6, foto: 'sdgrkngkrndf'},
    ]

    const listElevacao = [
        {nome: 'Eu vou elevar', med: 'Apará', termo: true, foto: 'sdgrkngkrndf'},
        {nome: 'Eu vou elevar também', med: 'Apará', termo: true, foto: ''},
        {nome: 'Eu vou fazer elevação', med: 'Doutrinador', termo: false, foto: ''},
    ]

    const listCenturia = [
        {nome: 'Eu vou centuriar', med: 'Doutrinador'},
        {nome: 'Eu vou centuriar também', med: 'Apará'},
        {nome: 'Eu vou centuriar no próximo mês', med: 'Doutrinador'},
        {nome: 'Eu vou fazer centúria', med: 'Apará'},
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
                <MainTitle content="Painel - Consagrações" />
                <ConsagracaoCard>
                    <ConsagracaoHeader>
                        <ConsagracaoTitle>Iniciação - {countMedium([...listIniciacao, ...listMudanca])}</ConsagracaoTitle>
                        <NavigateButton onClick={() => navigate('/consagracoes/iniciacao')}>Detalhes</NavigateButton>
                    </ConsagracaoHeader>
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
                <ConsagracaoCard>
                    <ConsagracaoHeader>
                        <ConsagracaoTitle>Elevação - {countMedium([...listElevacao, ...listMudanca])}</ConsagracaoTitle>
                        <NavigateButton onClick={() => navigate('/consagracoes/elevacao')}>Detalhes</NavigateButton>
                    </ConsagracaoHeader>
                    <ResultsTable show={[...listElevacao, ...listMudanca].length}>
                        <Results columns={columnData[0] as string}>
                            <ResultsTitle scope="col" align="left">Nome do Médium</ResultsTitle>
                            <ResultsTitle scope="col">{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                            <ResultsTitle scope="col">Termo</ResultsTitle>
                            <ResultsTitle scope="col">Foto</ResultsTitle>
                        </Results>
                        {alphabeticOrder([...listElevacao, ...listMudanca])
                            .map((item: any, index: number) => (
                                <Results columns={columnData[0] as string} key={index} onClick={() => {}}>
                                    <ResultsData align="left">{listMudanca.some((el) => el.nome === item.nome)? `${item.nome} *` : item.nome}</ResultsData>
                                    <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                    <ResultsData isNegative={!item.termo}>{item.termo ? 'Sim' : 'Não'}</ResultsData>
                                    <ResultsData isNegative={!item.foto}>{item.foto ? 'Sim' : 'Não'}</ResultsData>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                    <MudancaObs show={listMudanca.length}>* Mudança de mediunidade</MudancaObs>
                </ConsagracaoCard>
                <ConsagracaoCard>
                    <ConsagracaoHeader>
                        <ConsagracaoTitle>Centúria - {countMedium(listCenturia)}</ConsagracaoTitle>
                        <NavigateButton onClick={() => navigate('/consagracoes/centuria')}>Detalhes</NavigateButton>
                    </ConsagracaoHeader>
                    <ResultsTable show={listCenturia.length}>
                        <Results columns={columnData[1] as string}>
                            <ResultsTitle scope="col" align="left">Nome do Médium</ResultsTitle>
                            <ResultsTitle scope="col">{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                        </Results>
                        {alphabeticOrder(listCenturia)
                            .map((item: any, index: number) => (
                                <Results columns={columnData[1] as string} key={index}>
                                    <ResultsData align="left">{listMudanca.some((el) => el.nome === item.nome)? `${item.nome} *` : item.nome}</ResultsData>
                                    <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                </ConsagracaoCard>
                <ButtonContainer>
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Relatório</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default Consagracoes