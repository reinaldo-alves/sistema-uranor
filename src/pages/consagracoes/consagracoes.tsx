import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { ButtonContainer, ConsagracaoCard, ConsagracaoHeader, ConsagracaoTitle, MainContainer, MudancaObs, NavigateButton, ResultsPanel, ResultsData, ResultsTable, ResultsTitle } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { alphabeticOrder, countMedium } from "src/utilities/functions";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";

function Consagracoes() {
    const { listIniciacao, listElevacao, listCenturia, listMudanca, loadConsagracao } = useContext(ListContext);
    const { token } = useContext(UserContext);

    const [columnData, setColumnData] = useState(['auto 25% 15% 15%', 'auto 25%', true])
  
    const handleResize = () => {
        if (window.innerWidth > 638) {
            setColumnData(['auto 25% 15% 15%', 'auto 25%', true]);
        } else {
            setColumnData(['auto 50px 60px 50px', 'auto 25%', false]);
        }
    };

    useEffect(() => {
        loadConsagracao(token);
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
                        <thead>  
                            <ResultsPanel columns={columnData[0] as string}>
                                <ResultsTitle scope="col" align="left">Nome do Médium</ResultsTitle>
                                <ResultsTitle scope="col">{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                                <ResultsTitle scope="col">{columnData[2]? 'Colete n°' : 'Col.'}</ResultsTitle>
                                <ResultsTitle scope="col">Foto</ResultsTitle>
                            </ResultsPanel>
                        </thead>
                        <tbody>
                            {alphabeticOrder([...listIniciacao, ...listMudanca])
                                .map((item: any, index: number) => (
                                    <ResultsPanel columns={columnData[0] as string} key={index} onClick={() => {}}>
                                        <ResultsData align="left">{listMudanca.some((el: IConsagracao) => el.nome === item.nome)? `${item.nome} *` : item.nome}</ResultsData>
                                        <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                        <ResultsData isNegative={!item.colete}>{item.colete ? item.colete : 'Não'}</ResultsData>
                                        <ResultsData isNegative={!item.foto}>{item.foto ? 'Sim' : 'Não'}</ResultsData>
                                    </ResultsPanel>
                                ))
                            }
                        </tbody>
                    </ResultsTable>
                    <MudancaObs show={listMudanca.length}>* Mudança de mediunidade</MudancaObs>
                </ConsagracaoCard>
                <ConsagracaoCard>
                    <ConsagracaoHeader>
                        <ConsagracaoTitle>Elevação - {countMedium([...listElevacao, ...listMudanca])}</ConsagracaoTitle>
                        <NavigateButton onClick={() => navigate('/consagracoes/elevacao')}>Detalhes</NavigateButton>
                    </ConsagracaoHeader>
                    <ResultsTable show={[...listElevacao, ...listMudanca].length}>
                        <thead>
                            <ResultsPanel columns={columnData[0] as string}>
                                <ResultsTitle scope="col" align="left">Nome do Médium</ResultsTitle>
                                <ResultsTitle scope="col">{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                                <ResultsTitle scope="col">Termo</ResultsTitle>
                                <ResultsTitle scope="col">Foto</ResultsTitle>
                            </ResultsPanel>
                        </thead>
                        <tbody>
                            {alphabeticOrder([...listElevacao, ...listMudanca])
                                .map((item: any, index: number) => (
                                    <ResultsPanel columns={columnData[0] as string} key={index} onClick={() => {}}>
                                        <ResultsData align="left">{listMudanca.some((el: IConsagracao) => el.nome === item.nome)? `${item.nome} *` : item.nome}</ResultsData>
                                        <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                        <ResultsData isNegative={!item.termo}>{item.termo ? 'Sim' : 'Não'}</ResultsData>
                                        <ResultsData isNegative={!item.foto}>{item.foto ? 'Sim' : 'Não'}</ResultsData>
                                    </ResultsPanel>
                                ))
                            }
                        </tbody>
                    </ResultsTable>
                    <MudancaObs show={listMudanca.length}>* Mudança de mediunidade</MudancaObs>
                </ConsagracaoCard>
                <ConsagracaoCard>
                    <ConsagracaoHeader>
                        <ConsagracaoTitle>Centúria - {countMedium(listCenturia)}</ConsagracaoTitle>
                        <NavigateButton onClick={() => navigate('/consagracoes/centuria')}>Detalhes</NavigateButton>
                    </ConsagracaoHeader>
                    <ResultsTable show={listCenturia.length}>
                        <thead>
                            <ResultsPanel columns={columnData[1] as string}>
                                <ResultsTitle scope="col" align="left">Nome do Médium</ResultsTitle>
                                <ResultsTitle scope="col">{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                            </ResultsPanel>
                        </thead>
                        <tbody>
                            {alphabeticOrder(listCenturia)
                                .map((item: any, index: number) => (
                                    <ResultsPanel columns={columnData[1] as string} key={index}>
                                        <ResultsData align="left">{listMudanca.some((el: IConsagracao) => el.nome === item.nome)? `${item.nome} *` : item.nome}</ResultsData>
                                        <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                    </ResultsPanel>
                                ))
                            }
                        </tbody>
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