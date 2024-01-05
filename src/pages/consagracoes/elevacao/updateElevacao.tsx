import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { ButtonContainer, CheckboxContainer, ConsagracaoCard, MainContainer, NavigateButton, PageSubTitle, ResultsData, ResultsTable, ResultsUpdate, SelectContainer, UpdateInputContainer } from "../styles";
import { alphabeticOrder } from "src/utilities/functions";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Alert, Confirm } from "src/utilities/popups";
import api from "src/api";

interface IElevacao {
    medium: IConsagracao,
    naoElevou: boolean,
    moverCenturia: boolean,
    classMest: string,
    falMest: string
}

interface IMudanca {
    medium: IConsagracao,
    naoIniciou: boolean,
    naoElevou: boolean,
    classMest: string,
    falMest: string
}

function UpdateElevacao() {
    const { listElevacao, listMudanca, classMest, falMest, loadConsagracao } = useContext(ListContext);
    const { token } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [listUpdateElevacao, setListUpdateElevacao] = useState([] as Array<IElevacao>);
    const [listUpdateMudanca, setListUpdateMudanca] = useState([] as Array<IMudanca>);
    const [dateIniciacao, setDateIniciacao] = useState('');
    const [dateElevacao, setDateElevacao] = useState('');

    const navigate = useNavigate();

    const generateElevacaoList = () => {
        const array = listElevacao.map((item: IConsagracao) => ({
            medium: item,
            naoElevou: false,
            moverCenturia: true,
            classMest: '',
            falMest: ''
        }));
        setListUpdateElevacao(array);
    }

    const generateMudancaList = () => {
        const array = listMudanca.map((item: IConsagracao) => ({
            medium: item,
            naoIniciou: false,
            naoElevou: false,
            classMest: '',
            falMest: ''
        }));
        setListUpdateMudanca(array);
    }

    const updatePropsElevacao = (id: number, property: string, newValue: any) => {
        const newArray = listUpdateElevacao.map((item: IElevacao) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    [property]: newValue
                };
            }
            return item;
        });
        setListUpdateElevacao(newArray);
    }

    const updatePropsMudanca = (id: number, property: string, newValue: any) => {
        const newArray = listUpdateMudanca.map((item: IMudanca) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    [property]: newValue
                };
            }
            return item;
        });
        setListUpdateMudanca(newArray);
    }

    const changeNaoIniciou = (id: number, status: boolean) => {
        const newArray = listUpdateMudanca.map((item: IMudanca) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    naoIniciou: status,
                    naoElevou: status,
                    classMest: '',
                    falMest: ''
                };
            }
            return item;
        });
        setListUpdateMudanca(newArray);
    }

    const changeNaoElevou = (id: number, status: boolean) => {
        const newArray = listUpdateElevacao.map((item: IElevacao) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    naoElevou: status,
                    classMest: '',
                    falMest: ''
                };
            }
            return item;
        });
        setListUpdateElevacao(newArray);
    }

    const changeNaoElevouMud = (id: number, status: boolean) => {
        const newArray = listUpdateMudanca.map((item: IMudanca) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    naoElevou: status,
                    classMest: '',
                    falMest: ''
                };
            }
            return item;
        });
        setListUpdateMudanca(newArray);
    }

    const listClassMest = (medium: IConsagracao) => {
        switch (medium.sex?.concat(medium.med)) {
            case 'MasculinoDoutrinador':
                return classMest.MS;
            case 'MasculinoApará':
                return classMest.ML;
            case 'FemininoDoutrinador':
                return classMest.NS;
            case 'FemininoApará':
                return classMest.NL;
            default:
                return [];
        }
    };

    const updateElevacaoData = () => {
        const addElevacaoDate = async (token: string) => {
            try {
                await Promise.all(listUpdateElevacao.map(async (item: IElevacao) => {
                    if (!item.naoElevou) {
                        await api.put('/medium/update', {medium_id: item.medium.medium, dtElevacao: dateElevacao, classMest: item.classMest, falMest: item.falMest}, {headers:{Authorization: token}});
                        if (item.moverCenturia) {
                            await api.put('/consagracao/next-cons', {consagracao_id: item.medium.consagracao_id, consagracao: 3}, {headers:{Authorization: token}})
                        } else {
                            await api.delete(`/consagracao/delete?consagracao_id=${item.medium.consagracao_id}`, {headers:{Authorization: token}})
                        }
                    }
                }));
            } catch (error) {
                console.log('Não foi possível atualizar os dados dos médiuns', error);
            }                
        }

        const addMudancaDate = async (token: string) => {
            try {
                await Promise.all(listUpdateMudanca.map(async (item: IMudanca) => {
                    if (!item.naoIniciou || !item.naoElevou) {
                        if (!item.naoIniciou) {
                            await api.put('/medium/update', {medium_id: item.medium.medium, dtIniciacao: dateIniciacao}, {headers:{Authorization: token}});
                        }
                        if (!item.naoElevou) {
                            await api.put('/medium/update', {medium_id: item.medium.medium, dtElevacao: dateElevacao, classMest: item.classMest, falMest: item.falMest}, {headers:{Authorization: token}});
                        }
                        if (!item.naoIniciou && item.naoElevou) {
                            await api.put('/consagracao/next-cons', {consagracao_id: item.medium.consagracao_id, consagracao: 2}, {headers:{Authorization: token}})
                        }
                        if (!item.naoIniciou && !item.naoElevou) {
                            await api.delete(`/consagracao/delete?consagracao_id=${item.medium.consagracao_id}`, {headers:{Authorization: token}})
                        }
                    }
                }));
            } catch (error) {
                console.log('Não foi possível atualizar os dados dos médiuns de mudança de mediunidade', error);
            }                
        }

        if (listMudanca.length && listElevacao.length && !dateElevacao && !dateIniciacao) {
            Alert('Insira as datas de iniciação e elevação', 'warning');
        } else if (listElevacao.length && !dateElevacao) {
            Alert('Insira a data de elevação', 'warning');
        } else if (listMudanca.length && !dateIniciacao) {
            Alert('Insira a data de iniciação', 'warning');
        } else if (dateElevacao <= dateIniciacao) {
            Alert('A data da elevação deve ser após a data de iniciação', 'warning')
        } else if (!listUpdateElevacao.some((item: IElevacao) => item.naoElevou === false) && !listUpdateMudanca.some((item: IMudanca) => item.naoElevou === false)) {
            Alert('Nenhum médium elevou', 'error');
        } else {
           Confirm('Esta ação pode sobrescrever dados dos médiuns. Continuar?', 'question', 'Cancelar', 'Confirmar', async () => {
                try {
                    await Promise.all([addElevacaoDate(token), addMudancaDate(token)])
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
        generateElevacaoList();
        generateMudancaList();
        setLoading(false);
    }

    useEffect(() => {
        loadConsData();
    }, [loading]);

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
                <MainTitle content={'Atualizar médiuns elevados'} />
                <UpdateInputContainer>
                    <label>Data da Elevação:</label>
                    <input type="date" value={dateElevacao} onChange={(e) => setDateElevacao(e.target.value)} />
                </UpdateInputContainer>
                <ConsagracaoCard style={{maxWidth: '800px'}} hide={!listUpdateElevacao.length}>
                    <ResultsTable show={listUpdateElevacao.length}>
                        <tbody>
                            {alphabeticOrder(listUpdateElevacao)
                                .map((item: IElevacao, index: number) => (
                                    <ResultsUpdate key={index}>
                                        <ResultsData>{`${item.medium.nome} - ${item.medium.med}`}</ResultsData>
                                        <CheckboxContainer>
                                            <UpdateInputContainer box>
                                                <label>Não elevou</label>
                                                <input type="checkbox" checked={item.naoElevou} onChange={(e) => changeNaoElevou(item.medium.medium, e.target.checked)} />
                                            </UpdateInputContainer>
                                            <UpdateInputContainer box>
                                                <label>Mover para Centúria?</label>
                                                <input type="checkbox" checked={item.moverCenturia} onChange={(e) => updatePropsElevacao(item.medium.medium, 'moverCenturia', e.target.checked)} />
                                            </UpdateInputContainer>
                                        </CheckboxContainer>
                                        <SelectContainer>
                                            <UpdateInputContainer box>
                                                <label>Classificação</label>
                                                <select value={item.classMest} disabled={item.naoElevou} onChange={(e) => updatePropsElevacao(item.medium.medium, 'classMest', e.target.value)}>
                                                    <option value={''}></option>
                                                    {listClassMest(item.medium).map((item: string, index: number) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </UpdateInputContainer>
                                            <UpdateInputContainer box>
                                                <label>Falange de Mestrado</label>
                                                <select value={item.falMest} disabled={item.naoElevou} onChange={(e) => updatePropsElevacao(item.medium.medium, 'falMest', e.target.value)}>
                                                    <option value={''}></option>
                                                    {falMest.map((item: string, index: number) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </UpdateInputContainer>
                                        </SelectContainer>
                                    </ResultsUpdate>
                                ))
                            }
                        </tbody>
                    </ResultsTable>
                </ConsagracaoCard>
                <PageSubTitle hide={!listUpdateMudanca.length}>Mudança de Mediunidade</PageSubTitle>
                <UpdateInputContainer hide={!listUpdateMudanca.length}>
                    <label>Data da Iniciação:</label>
                    <input type="date" value={dateIniciacao} onChange={(e) => setDateIniciacao(e.target.value)} />
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
                                                <input type="checkbox" checked={item.naoIniciou} onChange={(e) => changeNaoIniciou(item.medium.medium, e.target.checked)} />
                                            </UpdateInputContainer>
                                            <UpdateInputContainer box>
                                                <label>Não elevou</label>
                                                <input type="checkbox" disabled={item.naoIniciou} checked={item.naoElevou} onChange={(e) => changeNaoElevouMud(item.medium.medium, e.target.checked)} />
                                            </UpdateInputContainer>
                                        </CheckboxContainer>
                                        <SelectContainer>
                                            <UpdateInputContainer box>
                                                <label>Classificação</label>
                                                <select value={item.classMest} disabled={item.naoElevou} onChange={(e) => updatePropsMudanca(item.medium.medium, 'classMest', e.target.value)}>
                                                    <option value={''}></option>
                                                    {listClassMest(item.medium).map((item: string, index: number) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </UpdateInputContainer>
                                            <UpdateInputContainer box>
                                                <label>Falange de Mestrado</label>
                                                <select value={item.falMest} disabled={item.naoElevou} onChange={(e) => updatePropsMudanca(item.medium.medium, 'falMest', e.target.value)}>
                                                    <option value={''}></option>
                                                    {falMest.map((item: string, index: number) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </UpdateInputContainer>
                                        </SelectContainer>
                                    </ResultsUpdate>
                                ))
                            }
                        </tbody>
                    </ResultsTable>
                </ConsagracaoCard>
                <ButtonContainer>
                    <NavigateButton width="230px" color="red" onClick={() => navigate('/consagracoes/elevacao')}>Cancelar</NavigateButton>
                    <NavigateButton disabled={![...listUpdateElevacao, ...listUpdateMudanca].length} width="230px" onClick={updateElevacaoData}>Atualizar</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default UpdateElevacao