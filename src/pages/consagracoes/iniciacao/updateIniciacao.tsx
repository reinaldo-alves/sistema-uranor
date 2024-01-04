import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { ButtonContainer, CheckboxContainer, ConsagracaoCard, MainContainer, NavigateButton, PageSubTitle, ResultsData, ResultsTable, ResultsUpdate, UpdateInputContainer } from "../styles";
import { alphabeticOrder } from "src/utilities/functions";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Alert, Confirm } from "src/utilities/popups";
import api from "src/api";

interface IIniciacao {
    medium: IConsagracao,
    naoIniciou: boolean,
    moverElevacao: boolean
}

interface IMudanca {
    medium: IConsagracao,
    naoIniciou: boolean,
    naoElevou: boolean
}

function UpdateIniciacao() {
    const { listIniciacao, listMudanca, loadConsagracao } = useContext(ListContext);
    const { token } = useContext(UserContext);

    const [listUpdateIniciacao, setListUpdateIniciacao] = useState([] as Array<IIniciacao>);
    const [listUpdateMudanca, setListUpdateMudanca] = useState([] as Array<IMudanca>);
    const [dateIniciacao, setDateIniciacao] = useState('');
    const [dateElevacao, setDateElevacao] = useState('');

    const navigate = useNavigate();

    const generateIniciacaoList = () => {
        const array = [] as Array<IIniciacao>;
        listIniciacao.forEach((item: IConsagracao) => {
            array.push({medium: item, naoIniciou: false, moverElevacao: true})
        })
        setListUpdateIniciacao(array);
    }

    const generateMudancaList = () => {
        const array = [] as Array<IMudanca>;
        listMudanca.forEach((item: IConsagracao) => {
            array.push({medium: item, naoIniciou: false, naoElevou: false})
        })
        setListUpdateMudanca(array);
    }

    const changeNaoIniciou = (id: number, array: Array<IIniciacao>, status: boolean) => {
        const newArray = array.map((item: IIniciacao) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    naoIniciou: status
                };
            }
            return item;
        });
        setListUpdateIniciacao(newArray);
    }

    const changeNaoIniciouMud = (id: number, array: Array<IMudanca>, status: boolean) => {
        const newArray = array.map((item: IMudanca) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    naoIniciou: status,
                    naoElevou: status ? true : item.naoElevou,
                };
            }
            return item;
        });
        setListUpdateMudanca(newArray);
    }

    const changeNaoElevou = (id: number, array: Array<IMudanca>, status: boolean) => {
        const newArray = array.map((item: IMudanca) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    naoElevou: status
                };
            }
            return item;
        });
        setListUpdateMudanca(newArray);
    }

    const changeMoveElevacao = (id: number, array: Array<IIniciacao>, status: boolean) => {
        const newArray = array.map((item: IIniciacao) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    moverElevacao: status
                };
            }
            return item;
        });
        setListUpdateIniciacao(newArray);
    }

    const updateIniciacaoData = () => {
        const addIniciacaoDate = async (token: string) => {
            try {
                await Promise.all(listUpdateIniciacao.map(async (item: IIniciacao) => {
                    if (!item.naoIniciou) {
                        await api.put('/medium/update', {medium_id: item.medium.medium, dtIniciacao: dateIniciacao}, {headers:{Authorization: token}});
                    }
                    if (item.moverElevacao) {
                        await api.put('/consagracao/next-cons', {consagracao_id: item.medium.consagracao_id, consagracao: 2}, {headers:{Authorization: token}})
                    } else {
                        await api.delete(`/consagracao/delete?consagracao_id=${item.medium.consagracao_id}`, {headers:{Authorization: token}})
                    }
                }));
            } catch (error) {
                console.log('Não foi possível atualizar os dados dos médiuns', error);
            }                
        }

        const addMudancaDate = async (token: string) => {
            try {
                await Promise.all(listUpdateMudanca.map(async (item: IMudanca) => {
                    if (!item.naoIniciou) {
                        await api.put('/medium/update', {medium_id: item.medium.medium, dtIniciacao: dateIniciacao}, {headers:{Authorization: token}});
                    }
                    if (!item.naoElevou) {
                        await api.put('/medium/update', {medium_id: item.medium.medium, dtElevacao: dateElevacao}, {headers:{Authorization: token}});
                    }
                    if (!item.naoIniciou && item.naoElevou) {
                        await api.put('/consagracao/next-cons', {consagracao_id: item.medium.consagracao_id, consagracao: 2}, {headers:{Authorization: token}})
                    }
                    if (!item.naoIniciou && !item.naoElevou) {
                        await api.delete(`/consagracao/delete?consagracao_id=${item.medium.consagracao_id}`, {headers:{Authorization: token}})
                    }
                }));
            } catch (error) {
                console.log('Não foi possível atualizar os dados dos médiuns de mudança de mediunidade', error);
            }                
        }

        if (listMudanca.length && listIniciacao.length && !dateElevacao && !dateIniciacao) {
            Alert('Insira as datas de iniciação e elevação', 'warning');
        } else if (listIniciacao.length && !dateIniciacao) {
            Alert('Insira a data de iniciação', 'warning');
        } else if (listMudanca.length && !dateElevacao) {
            Alert('Insira a data de elevação', 'warning');
        } else if (!listUpdateIniciacao.some((item: IIniciacao) => item.naoIniciou === false) && !listUpdateMudanca.some((item: IMudanca) => item.naoIniciou === false)) {
            Alert('Nenhum médium iniciou', 'error');
        } else {
           Confirm('Esta ação pode sobrescrever dados dos médiuns. Continuar?', 'question', 'Cancelar', 'Confirmar', async () => {
                try {
                    await Promise.all([addIniciacaoDate(token), addMudancaDate(token)])
                    Alert('Dados atualizados com sucesso', 'success');
                    navigate('/consagracoes');
                } catch (error) {
                    console.log('Não foi possível atualizar as informações dos médium', error);
                    Alert('Não foi possível atualizar as informações dos médium', 'error');
                }
           })
        }
    }

    const loadConsData = async () => {
        await loadConsagracao(token);
        generateIniciacaoList();
        generateMudancaList();
    }

    useEffect(() => {
        loadConsData();
    }, [listIniciacao, listMudanca]);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/consagracoes'},
        {title: 'Iniciação', click: '/consagracoes/iniciacao'},
        {title: 'Elevação', click: '/consagracoes/elevacao'},
        {title: 'Centúria', click: '/consagracoes/centuria'},
        {title: 'Reclassificação', click: '/consagracoes/reclassificacao'},
    ]
   
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content={'Atualizar médiuns iniciados'} />
                <UpdateInputContainer>
                    <label>Data da Iniciação:</label>
                    <input type="date" value={dateIniciacao} onChange={(e) => setDateIniciacao(e.target.value)} />
                </UpdateInputContainer>
                <ConsagracaoCard style={{maxWidth: '800px'}} hide={!listUpdateIniciacao.length}>
                    <ResultsTable show={listUpdateIniciacao.length}>
                        <tbody>
                            {alphabeticOrder(listUpdateIniciacao)
                                .map((item: IIniciacao, index: number) => (
                                    <ResultsUpdate key={index}>
                                        <ResultsData>{`${item.medium.nome} - ${item.medium.med}`}</ResultsData>
                                        <CheckboxContainer>
                                            <UpdateInputContainer box>
                                                <label>Não iniciou</label>
                                                <input type="checkbox" checked={item.naoIniciou} onChange={(e) => changeNaoIniciou(item.medium.medium, listUpdateIniciacao, e.target.checked)} />
                                            </UpdateInputContainer>
                                            <UpdateInputContainer box>
                                                <label>Mover para Elevação?</label>
                                                <input type="checkbox" checked={item.moverElevacao} onChange={(e) => changeMoveElevacao(item.medium.medium, listUpdateIniciacao, e.target.checked)} />
                                            </UpdateInputContainer>
                                        </CheckboxContainer>
                                    </ResultsUpdate>
                                ))
                            }
                        </tbody>
                    </ResultsTable>
                </ConsagracaoCard>
                <PageSubTitle hide={!listUpdateMudanca.length}>Mudança de Mediunidade</PageSubTitle>
                <UpdateInputContainer hide={!listUpdateMudanca.length}>
                    <label>Data da Elevação:</label>
                    <input type="date" value={dateElevacao} onChange={(e) => setDateElevacao(e.target.value)} />
                </UpdateInputContainer>
                <ConsagracaoCard style={{maxWidth: '800px'}} hide={!listUpdateMudanca.length}>
                    <ResultsTable show={listUpdateMudanca.length}>
                        <tbody>
                            {alphabeticOrder(listUpdateMudanca)
                                .map((item: IMudanca, index: number) => (
                                    <ResultsUpdate key={index}>
                                        <ResultsData>{`${item.medium.nome} - ${item.medium.med}`}</ResultsData>
                                        <CheckboxContainer>
                                            <UpdateInputContainer box>
                                                <label>Não iniciou</label>
                                                <input type="checkbox" checked={item.naoIniciou} onChange={(e) => changeNaoIniciouMud(item.medium.medium, listUpdateMudanca, e.target.checked)} />
                                            </UpdateInputContainer>
                                            <UpdateInputContainer box>
                                                <label>Não elevou</label>
                                                <input type="checkbox" disabled={item.naoIniciou} checked={item.naoElevou} onChange={(e) => changeNaoElevou(item.medium.medium, listUpdateMudanca, e.target.checked)} />
                                            </UpdateInputContainer>
                                        </CheckboxContainer>
                                    </ResultsUpdate>
                                ))
                            }
                        </tbody>
                    </ResultsTable>
                </ConsagracaoCard>
                <ButtonContainer>
                    <NavigateButton width="230px" color="red" onClick={() => navigate('/consagracoes/iniciacao')}>Cancelar</NavigateButton>
                    <NavigateButton disabled={![...listUpdateIniciacao, ...listUpdateMudanca].length} width="230px" onClick={updateIniciacaoData}>Atualizar</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default UpdateIniciacao