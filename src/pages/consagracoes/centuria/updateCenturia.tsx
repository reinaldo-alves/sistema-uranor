import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { ButtonContainer, CheckboxContainer, ConsagracaoCard, MainContainer, NavigateButton, ResultsData, ResultsTable, ResultsUpdate, SelectContainer, UpdateInputContainer } from "../styles";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Alert, Confirm } from "src/utilities/popups";
import api from "src/api";
import Loading from "src/utilities/Loading";

interface ICenturia {
    medium: IConsagracao,
    naoCenturiou: boolean,
    povo: string, 
    turnoLeg: string,
    classifEstrela: string
}

function UpdateCenturia() {
    const { listCenturia, povos, turnoL, estrelas, classificacao, loadConsagracao } = useContext(ListContext);
    const { token } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [listUpdateCenturia, setListUpdateCenturia] = useState([] as Array<ICenturia>);
    const [dateCenturia, setDateCenturia] = useState('');

    const navigate = useNavigate();

    function alphabeticOrder(array: Array<any>) {
        array.sort((minA: any, minB: any) => {
            if (minA.medium.nome < minB.medium.nome) {
              return -1;
            }
            if (minA.medium.nome > minB.medium.nome) {
              return 1;
            }
            return 0;
        }); 
        return array
    }

    const generateCenturiaList = () => {
        const array = listCenturia.map((item: IConsagracao) => ({
            medium: item,
            naoCenturiou: false,
            povo: '',
            turnoLeg: '',
            classifEstrela: ''
        }));
        setListUpdateCenturia(array);
    }

    const updatePropsCenturia = (id: number, property: string, newValue: any) => {
        const newArray = listUpdateCenturia.map((item: ICenturia) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    [property]: newValue
                };
            }
            return item;
        });
        setListUpdateCenturia(newArray);
    }

    const changeNaoCenturiou = (id: number, status: boolean) => {
        const newArray = listUpdateCenturia.map((item: ICenturia) => {
            if (item.medium.medium === id) {
                return {
                    ...item,
                    naoCenturiou: status,
                    povo: '',
                    turnoLeg: '',
                    classifEstrela: ''
                };
            }
            return item;
        });
        setListUpdateCenturia(newArray);
    }

    const listTurnoLeg = (medium: IConsagracao) => {
        switch (medium.sex) {
            case 'Masculino':
                return turnoL.jaguar;
            case 'Feminino':
                return turnoL.ninfa;
            default:
                return [];
        }
    };

    const listClassifEstrela = (medium: IConsagracao) => {
        switch (medium.sex?.concat(medium.med)) {
            case 'MasculinoDoutrinador':
                return classificacao.sol;
            case 'MasculinoApará':
                return classificacao.lua;
            case 'FemininoDoutrinador':
                return estrelas.sol;
            case 'FemininoApará':
                return estrelas.lua;
            default:
                return [];
        }
    };

    const updateCenturiaData = () => {
        const addCenturiaDate = async (token: string) => {
            try {
                await Promise.all(listUpdateCenturia.map(async (item: ICenturia) => {
                    if (!item.naoCenturiou) {
                        if (item.medium.sex === 'Masculino') {
                            await api.put('/medium/update', {medium_id: item.medium.medium, dtCenturia: dateCenturia, povo: item.povo, turnoLeg: item.turnoLeg, classif: item.classifEstrela, dtClassif: dateCenturia}, {headers:{Authorization: token}});
                        }
                        if (item.medium.sex === 'Feminino'){
                            await api.put('/medium/update', {medium_id: item.medium.medium, dtCenturia: dateCenturia, povo: item.povo, turnoLeg: item.turnoLeg, estrela: item.classifEstrela}, {headers:{Authorization: token}});
                        }
                        await api.delete(`/consagracao/delete?consagracao_id=${item.medium.consagracao_id}`, {headers:{Authorization: token}})
                    }
                }));
            } catch (error) {
                console.log('Não foi possível atualizar os dados dos médiuns', error);
            }                
        }

        if (!dateCenturia) {
            Alert('Insira a data de centuria', 'warning');
        } else if (!listUpdateCenturia.some((item: ICenturia) => item.naoCenturiou === false)) {
            Alert('Nenhum médium fez centúria', 'error');
        } else {
           Confirm('Esta ação pode sobrescrever dados dos médiuns. Continuar?', 'question', 'Cancelar', 'Confirmar', async () => {
                try {
                    await Promise.all([addCenturiaDate(token)])
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
        generateCenturiaList();
        setLoading(false);
    }

    useEffect(() => {
        loadConsData();
    }, [loading]);

    if(loading) {
        return <Loading />
    }

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
                <MainTitle content={'Atualizar médiuns centuriões'} />
                <UpdateInputContainer>
                    <label>Data da Centúria:</label>
                    <input type="date" value={dateCenturia} onChange={(e) => setDateCenturia(e.target.value)} />
                </UpdateInputContainer>
                <ConsagracaoCard style={{maxWidth: '800px'}} hide={!listUpdateCenturia.length}>
                    <ResultsTable show={listUpdateCenturia.length}>
                        <tbody>
                            {alphabeticOrder(listUpdateCenturia)
                                .map((item: ICenturia, index: number) => (
                                    <ResultsUpdate key={index}>
                                        <ResultsData>{`${item.medium.nome} - ${item.medium.med}`}</ResultsData>
                                        <CheckboxContainer>
                                            <UpdateInputContainer box>
                                                <label>Não fez centúria</label>
                                                <input type="checkbox" checked={item.naoCenturiou} onChange={(e) => changeNaoCenturiou(item.medium.medium, e.target.checked)} />
                                            </UpdateInputContainer>
                                        </CheckboxContainer>
                                        <SelectContainer>
                                            <UpdateInputContainer box>
                                                <label>Povo</label>
                                                <select value={item.povo} disabled={item.naoCenturiou} onChange={(e) => updatePropsCenturia(item.medium.medium, 'povo', e.target.value)}>
                                                    <option value={''}></option>
                                                    {povos.map((item: string, index: number) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </UpdateInputContainer>
                                            <UpdateInputContainer box>
                                                <label>Turno de Legião</label>
                                                <select value={item.turnoLeg} disabled={item.naoCenturiou} onChange={(e) => updatePropsCenturia(item.medium.medium, 'turnoLeg', e.target.value)}>
                                                    <option value={''}></option>
                                                    {listTurnoLeg(item.medium).map((item: string, index: number) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </UpdateInputContainer>
                                        </SelectContainer>
                                        <SelectContainer>
                                            <UpdateInputContainer box extend={item.medium.sex === 'Masculino'}>
                                                <label>{item.medium.sex === 'Masculino' ? 'Classificação' : item.medium.sex === 'Feminino' ? 'Estrela' : ''}</label>
                                                <select value={item.classifEstrela} disabled={item.naoCenturiou} onChange={(e) => updatePropsCenturia(item.medium.medium, 'classifEstrela', e.target.value)}>
                                                    <option value={''}></option>
                                                    {listClassifEstrela(item.medium).map((item: string, index: number) => (
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
                    <NavigateButton width="230px" color="red" onClick={() => navigate('/consagracoes/centuria')}>Cancelar</NavigateButton>
                    <NavigateButton disabled={!listUpdateCenturia.length} width="230px" onClick={updateCenturiaData}>Atualizar</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
        </>
    )
}

export default UpdateCenturia