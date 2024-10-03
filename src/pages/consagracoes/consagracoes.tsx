import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { ButtonContainer, ConsagracaoCard, ConsagracaoHeader, ConsagracaoTitle, MudancaObs, NavigateButton, ResultsPanel, ResultsData, ResultsTable, ResultsTitle } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { countMedium } from "src/utilities/functions";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { generateReportAllCons } from "src/utilities/createDocs";
import MainContainer from "src/components/MainContainer/MainContainer";
import Loading from "src/utilities/Loading";

function Consagracoes() {
    const { listIniciacao, listElevacao, listCenturia, listMudanca, loadConsagracao } = useContext(ListContext);
    const { token } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [columnData, setColumnData] = useState(['auto 25% 15% 15%', 'auto 25%', true])

    function alphabeticOrder(array: Array<any>) {
        array.sort((minA: any, minB: any) => {
            const nomeA = minA.nome.toLowerCase();
            const nomeB = minB.nome.toLowerCase();
            return nomeA.localeCompare(nomeB, 'pt-BR');
        }); 
        return array
    }
  
    const handleResize = () => {
        if (window.innerWidth > 638) {
            setColumnData(['auto 25% 15% 15%', 'auto 25%', true]);
        } else {
            setColumnData(['auto 50px 60px 50px', 'auto 25%', false]);
        }
    };

    const loadConsData = useCallback(async () => {
        await loadConsagracao(token);
        setLoading(false);
    }, [loadConsagracao, token]);

    useEffect(() => {
        loadConsData();
    }, [loadConsData])

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

    if(loading) {
        return <Loading />
    }
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Painel - Consagrações">
                <ConsagracaoCard>
                    <ConsagracaoHeader>
                        <ConsagracaoTitle>Iniciação - {countMedium([...listIniciacao, ...listMudanca])}</ConsagracaoTitle>
                        <NavigateButton onClick={() => navigate('/consagracoes/iniciacao')}>Detalhes</NavigateButton>
                    </ConsagracaoHeader>
                    <ResultsTable show={[...listIniciacao, ...listMudanca].length}>
                        <ResultsPanel columns={columnData[0] as string}>
                            <ResultsTitle align="left">Nome do Médium</ResultsTitle>
                            <ResultsTitle>{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                            <ResultsTitle>{columnData[2]? 'Colete nº' : 'Col.'}</ResultsTitle>
                            <ResultsTitle>Foto</ResultsTitle>
                        </ResultsPanel>
                        {alphabeticOrder([...listIniciacao, ...listMudanca])
                            .map((item: IConsagracao, index: number) => (
                                <ResultsPanel columns={columnData[0] as string} key={index} onClick={() => {}}>
                                    <ResultsData align="left">{listMudanca.some((el: IConsagracao) => el.medium === item.medium)? `${item.nome} *` : item.nome}</ResultsData>
                                    <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                    <ResultsData isNegative={!item.colete}>{item.colete ? item.colete : 'Não'}</ResultsData>
                                    <ResultsData isNegative={!item.foto}>{item.foto ? 'Sim' : 'Não'}</ResultsData>
                                </ResultsPanel>
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
                        <ResultsPanel columns={columnData[0] as string}>
                            <ResultsTitle align="left">Nome do Médium</ResultsTitle>
                            <ResultsTitle>{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                            <ResultsTitle>Termo</ResultsTitle>
                            <ResultsTitle>Foto</ResultsTitle>
                        </ResultsPanel>
                        {alphabeticOrder([...listElevacao, ...listMudanca])
                            .map((item: IConsagracao, index: number) => (
                                <ResultsPanel columns={columnData[0] as string} key={index} onClick={() => {}}>
                                    <ResultsData align="left">{listMudanca.some((el: IConsagracao) => el.medium === item.medium)? `${item.nome} *` : item.nome}</ResultsData>
                                    <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                    <ResultsData isNegative={!item.termo}>{item.termo ? 'Sim' : 'Não'}</ResultsData>
                                    <ResultsData isNegative={!item.foto}>{item.foto ? 'Sim' : 'Não'}</ResultsData>
                                </ResultsPanel>
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
                        <ResultsPanel columns={columnData[1] as string}>
                            <ResultsTitle align="left">Nome do Médium</ResultsTitle>
                            <ResultsTitle>{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                        </ResultsPanel>
                        {alphabeticOrder(listCenturia)
                            .map((item: IConsagracao, index: number) => (
                                <ResultsPanel columns={columnData[1] as string} key={index}>
                                    <ResultsData align="left">{item.nome}</ResultsData>
                                    <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                </ResultsPanel>
                            ))
                        }
                    </ResultsTable>
                </ConsagracaoCard>
                <ButtonContainer>
                    <NavigateButton width="230px" onClick={() => generateReportAllCons(listIniciacao, listElevacao, listCenturia, listMudanca)}>Gerar Relatório</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default Consagracoes