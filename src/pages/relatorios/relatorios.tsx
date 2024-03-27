import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultAdj, defaultCavaleiro, defaultMedium, defaultMentor } from "src/utilities/default";
import { IEstado, IFalange, IMedium, IMentor, ITemplo } from "src/types/types";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import { ListContext } from "src/contexts/ListContext";
import { Alert } from "src/utilities/popups";
import api from "src/api";
import { CheckboxContainer, DatesContainer, Divider, FieldContainer, FieldContainerBox, GridContainer, GridDatesContainer, InputContainer, MainContent, MainInfoContainer, PersonalCard, ReportButton, SectionTitle } from "./styles";
import { alphabeticOrder, oppositeTurno } from "src/utilities/functions";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { validateMedium } from "src/utilities/validations";

function Relatorios() {
    const { templos, estados, adjuntos, coletes, classMest, falMest, povos, falMiss, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao } = useContext(ListContext);
    const { token } = useContext(UserContext);
    const { mediuns, loadMedium, convertMediumToSend, setComponentes } = useContext(MediumContext);

    const [newMedium, setNewMedium] = useState(defaultMedium);
    const [reportType, setReportType] = useState('');
    const [reportProperty, setReportProperty] = useState('');
    const [showMed, setShowMed] = useState(true);
    const [showTemplo, setShowTemplo] = useState(false);
    const [dropPres, setDropPres] = useState(defaultAdj);
    const [dropMin, setDropMin] = useState(defaultMentor);
    const [dropCav, setDropCav] = useState(defaultCavaleiro);
    const [dropGuia, setDropGuia] = useState(defaultMentor);
    const [searchPres, setSearchPres] = useState('');
    const [searchMin, setSearchMin] = useState('');
    const [searchCav, setSearchCav] = useState('');
    const [searchGuia, setSearchGuia] = useState('');
    const [dataDevas, setDataDevas] = useState('');
    const [dataJanda, setDataJanda] = useState('');

    const now = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();

    useEffect(() => {
        if(dropPres) {
            updateProps('adjOrigem', dropPres.adjunto_id)
        } else {
            updateProps('adjOrigem', 0)
        }
    }, [dropPres])
    
    useEffect(() => {
        if(dropMin) {
            updateProps('ministro', dropMin.id)
        } else {
            updateProps('ministro', 0)
        }
    }, [dropMin])

    useEffect(() => {
        if(dropCav) {
            updateProps('cavaleiro', dropCav.id)
        } else {
            updateProps('cavaleiro', 0)
        }
    }, [dropCav])

    useEffect(() => {
        if(dropGuia) {
            updateProps('guia', dropGuia.id)
        } else {
            updateProps('guia', 0)
        }
    }, [dropGuia])

    const listSubMenu = [{title: 'Página Inicial', click: '/'}]

    const updateProps = (property: string, newValue: any) => {
        setNewMedium((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };

    const resetNewMedium = () => {
        setNewMedium(defaultMedium);
        setSearchMin('');
        setSearchCav('');
        setSearchGuia('');
        navigate('/mediuns/consulta');
    }

    const generateEvents = async (newMedium: IMedium, id: number, token: string) => {
        try {
            if (dataDevas) {
                const newEvento = {
                    medium: id,
                    data: dataDevas,
                    mensagem: `Consagração de ${newMedium.sex === 'Masculino' ? 'Filho' : newMedium.sex === 'Feminino' ? 'Filha' : ''} de Devas`,
                    tipo: 'Outras Consagrações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (dataJanda) {
                const newEvento = {
                    medium: id,
                    data: dataJanda,
                    mensagem: 'Consagração de Janda',
                    tipo: 'Outras Consagrações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.classif && newMedium.dtClassif) {
                const newEvento = {
                    medium: id,
                    data: newMedium.dtClassif,
                    mensagem: `Classificação de ${newMedium.classif}`,
                    tipo: 'Classificações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.oldClassif && newMedium.oldDtClassif) {
                const newEvento = {
                    medium: id,
                    data: newMedium.oldDtClassif,
                    mensagem: `Classificação de ${newMedium.oldClassif}`,
                    tipo: 'Classificações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
        } catch (error) {
            console.error('Erro ao adicionar eventos na linha do tempo', error);
        }
        closeModal();
    }

    const addMedium = async (medium: IMedium, token: string) => {
        const mediumObj = convertMediumToSend(medium)
        const {medium_id, ...newMediumObj} = mediumObj;
        try {
            const response = await api.post('/medium/create', newMediumObj, {headers:{Authorization: token}})
            const { medium_id } = response.data;
            await setComponentes({...medium, medium_id}, token);
            await generateEvents(medium, medium_id, token);
            Alert('Médium adicionado com sucesso', 'success');
            resetNewMedium();
            await loadMedium(token);
            navigate('/mediuns/consulta');
        } catch (error) {
            console.log('Não foi possível adicionar o médium', error);
            Alert('Não foi possível adicionar o médium', 'error');
        }
    }

    const closeModal = () => {
        setDataDevas('');
        setDataJanda('');
    }
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <PersonalCard>
                    <MainContent>
                        <MainInfoContainer>
                            <SectionTitle>Configurar Relatório</SectionTitle>
                            <FieldContainer>
                                <label>Título do Relatório: </label>
                                <input type="text" value={newMedium.nome} onChange={(e) => updateProps('nome', e.target.value)}/>
                            </FieldContainer>
                            <GridContainer>
                                <label>Tipo: </label>
                                <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                    <option value={'Padrão'}>Padrão</option>
                                    <option value={'Contato'}>Contato: mostra telefones</option>
                                    <option value={'Protocolo'}>Protocolo: mostra assinatura</option>
                                    <option value={'Propriedade'}>Propriedade: mostra outra informação</option>
                                </select>
                                <label>Propriedade: </label>
                                <select value={reportProperty} disabled={reportType !== 'Propriedade'} onChange={(e) => setReportProperty(e.target.value)}>
                                    <option value={''}></option>
                                    <option value={'Propriedade'}>Propriedade</option>
                                </select>
                            </GridContainer>
                            <CheckboxContainer>
                                <FieldContainerBox>
                                    <input type="checkBox" checked={showMed} onChange={(e) => setShowMed(e.target.checked)}/>
                                    <label>Mostrar Mediunidade</label>
                                </FieldContainerBox>
                                <FieldContainerBox>
                                    <input type="checkBox" checked={showTemplo} onChange={(e) => setShowTemplo(e.target.checked)}/>
                                    <label>Mostrar Templo</label>
                                </FieldContainerBox>
                            </CheckboxContainer>
                        </MainInfoContainer>
                    </MainContent>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around'}}>
                    <ReportButton color="red" onClick={() => resetNewMedium()}>Resetar Filtros</ReportButton>
                    <ReportButton color="green" onClick={() => validateMedium(newMedium, async () => await addMedium(newMedium, token))}>Gerar Relatório</ReportButton>
                </div>
                <PersonalCard>
                    <SectionTitle>Configurar Filtros</SectionTitle>
                    <GridContainer>
                        <label>Nome Médium: </label>
                        <input type="text" value={newMedium.nome} onChange={(e) => updateProps('nome', e.target.value)}/>
                        <label>Situação: </label>
                        <select value={newMedium.condicao} onChange={(e) => updateProps('condicao', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Em desenvolvimento'}>Em desenvolvimento</option>
                            <option value={'Liberado'}>Liberado</option>
                            <option value={'Iniciado'}>Iniciado</option>
                            <option value={'Elevado'}>Elevado</option>
                            <option value={'Centurião'}>Centurião</option>
                            <option value={'Centurião 7° Raio'}>Centurião 7° Raio</option>
                        </select>
                        <label>Sexo: </label>
                        <select value={newMedium.sex} onChange={(e) => updateProps('sex', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Feminino'}>Feminino</option>
                            <option value={'Masculino'}>Masculino</option>
                        </select>
                        <label>Mediunidade: </label>
                        <select value={newMedium.med} onChange={(e) => updateProps('med', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Apará'}>Apará</option>
                            <option value={'Doutrinador'}>Doutrinador</option>
                        </select>
                        <label>Condição Atual: </label>
                        <select value={newMedium.condicao} onChange={(e) => updateProps('condicao', e.target.value)}>
                            <option value={'Ativo'}>Ativo</option>
                            <option value={'Não Ativo'}>Não Ativo</option>
                            <option value={'Afastado'}>Afastado</option>
                            <option value={'Entregou as Armas'}>Entregou as Armas</option>
                            <option value={'Desencarnado'}>Desencarnado</option>
                            <option value={'Todas'}>Todas</option>
                        </select>
                        <label>Templo: </label>
                        <select value={newMedium.templo} onChange={(e) => updateProps('templo', e.target.value)}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                    </GridContainer>
                    <CheckboxContainer>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Templo Atual</label>
                        </FieldContainerBox> 
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Templo de Origem</label>
                        </FieldContainerBox> 
                    </CheckboxContainer>
                    <Divider></Divider>
                    <GridContainer>
                        <label>Adjunto Origem.: </label>
                        <AutocompleteInput 
                            label={(option) => option === defaultAdj ? '' : `Adj. ${ministros.filter((min: IMentor) => min.id === option.ministro)[0].nome} - Mestre ${option.nome}` }
                            default={defaultAdj}
                            options={alphabeticOrder(adjuntos)}
                            equality={(option, value) => option?.adjunto_id === value?.adjunto_id}
                            value={dropPres}
                            setValue={setDropPres}
                            inputValue={searchPres}
                            setInputValue={setSearchPres}
                        />
                        <label>Colete N°: </label>
                        <select value={newMedium.colete} onChange={(e) => updateProps('colete', e.target.value)}>
                            <option value={0}></option>
                            {coletes.map((item: number, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Classif. Mestrado: </label>
                        <select value={newMedium.classMest} onChange={(e) => updateProps('classMest', e.target.value)}>
                            <option value={''}></option>
                            {[...classMest.MS, ...classMest.ML, classMest.NS, classMest.NL].map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Falange Mestrado: </label>
                        <select value={newMedium.falMest} onChange={(e) => updateProps('falMest', e.target.value)}>
                            <option value={''}></option>
                            {falMest.completo.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Povo: </label>
                        <select value={newMedium.povo} onChange={(e) => updateProps('povo', e.target.value)}>
                            <option value={''}></option>
                            {povos.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Falange Missionária: </label>
                        <select
                            value={newMedium.falMiss}
                            onChange={(e) => {
                                updateProps('falMiss', parseInt(e.target.value))
                                if(parseInt(e.target.value) === 0){
                                    updateProps('regente', false);
                                }
                            }}
                        >
                            <option value={0}></option>
                            {falMiss.map((item: IFalange, index: number) => (
                                <option key={index} value={item.falange_id}>{item.nome}</option>
                            ))}
                        </select>
                        <label>Adjunto Devas: </label>
                        <select value={newMedium.adjDevas} onChange={(e) => updateProps('adjDevas', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Adejã'}>Adejã</option>
                            <option value={'Alufã'}>Alufã</option>
                        </select>
                        <label>Turno: </label>
                        <select value={newMedium.turnoLeg} onChange={(e) => updateProps('turnoLeg', e.target.value)}>
                            <option value={''}></option>
                            {[...turnoL.jaguar, ...turnoL.ninfa].map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Turno Trabalho: </label>
                        <select value={newMedium.turnoTrab} onChange={(e) => updateProps('turnoTrab', e.target.value)}>
                            <option value={''}></option>
                            {turnoT.jaguar.map((item: string, index: number) => (
                                <option key={index} value={item}>{item + ' / ' + oppositeTurno(turnoT, item)}</option>
                            ))}
                        </select>
                        <label>Estrela: </label>
                        <select value={newMedium.estrela} onChange={(e) => updateProps('estrela', e.target.value)}>
                            <option value={''}></option>
                            {[...estrelas.lua, ...estrelas.sol].map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Ministro: </label>
                        <AutocompleteInput 
                            label={(option) => option.nome}
                            default={defaultMentor}
                            options={ministros}
                            equality={(option, value) => option.id === value.id}
                            value={dropMin}
                            setValue={setDropMin}
                            inputValue={searchMin}
                            setInputValue={setSearchMin}
                        />
                        <label>Cavaleiro: </label>
                        <AutocompleteInput 
                            label={(option) => option.nome}
                            default={defaultCavaleiro}
                            options={cavaleiros}
                            equality={(option, value) => option.id === value.id}
                            value={dropCav}
                            setValue={setDropCav}
                            inputValue={searchCav}
                            setInputValue={setSearchCav}
                        />
                        <label>Guia Missionária: </label>
                        <AutocompleteInput 
                            label={(option) => option.nome}
                            default={defaultMentor}
                            options={guias}
                            equality={(option, value) => option.id === value.id}
                            value={dropGuia}
                            setValue={setDropGuia}
                            inputValue={searchGuia}
                            setInputValue={setSearchGuia}
                        />
                        <label>Cor: </label>
                        <select value={newMedium.cor} onChange={(e) => updateProps('cor', e.target.value)}>
                            <option value={undefined}></option>
                            <option value={'Amarela'}>Amarela</option>
                            <option value={'Azul'}>Azul</option>
                            <option value={'Branca'}>Branca</option>
                            <option value={'Lilás'}>Lilás</option>
                            <option value={'Rósea'}>Rósea</option>
                            <option value={'Verde'}>Verde</option>
                            <option value={'Vermelha'}>Vermelha</option>
                        </select>
                    </GridContainer>
                    <InputContainer>
                        <FieldContainer>
                            <label>Classificação Atual: </label>
                            <select value={newMedium.classif} onChange={(e) => {
                                updateProps('classif', e.target.value)
                                if(e.target.value === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000') {
                                    updateProps('trinoSol', '');
                                    updateProps('trinoSar', false);
                                    updateProps('filho', false);
                                    updateProps('herdeiro', 0);
                                    updateProps('turnoTrab', 'Ajouros');
                                }
                            }}>
                                <option value={''}></option>
                                {[...classificacao.sol, ...classificacao.lua].map((item: string, index: number) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </FieldContainer>
                    </InputContainer>
                    <Divider></Divider>
                    <GridContainer>
                        <label>Princesa: </label>
                        <select value={newMedium.princesa} onChange={(e) => updateProps('princesa', e.target.value)}>
                            <option value={''}></option>
                            {princesas.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Preto Velho: </label>
                        <input type="text" value={newMedium.pretovelho} onChange={(e) => updateProps('pretovelho', e.target.value)}/>
                        <label>Caboclo: </label>
                        <input type="text" value={newMedium.caboclo} onChange={(e) => updateProps('caboclo', e.target.value)}/>
                        <label>Médico: </label>
                        <input type="text" value={newMedium.medico} onChange={(e) => updateProps('medico', e.target.value)}/>
                    </GridContainer> 
                    <Divider></Divider>
                    <GridContainer>
                        <label>Natural de: </label>
                        <input type="text" value={newMedium.natur} onChange={(e) => updateProps('natur', e.target.value)}/>
                        <label>UF: </label>
                        <select value={newMedium.naturUF} onChange={(e) => updateProps('naturUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Estado Civil: </label>
                        <select value={newMedium.estCivil} onChange={(e) => updateProps('estCivil', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                        <label>Bairro: </label>
                        <input type="text" value={newMedium.endBairro} onChange={(e) => updateProps('endBairro', e.target.value)}/>
                        <label>Cidade: </label>
                        <input type="text" value={newMedium.endCidade} onChange={(e) => updateProps('endCidade', e.target.value)}/>
                        <label>UF endereço: </label>
                        <select value={newMedium.endUF} onChange={(e) => updateProps('endUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                    </GridContainer>
                    <Divider></Divider>
                    <InputContainer>
                        <FieldContainer>
                            <label>Comando: </label>
                            <select value={newMedium.comando} onChange={(e) => updateProps('comando', e.target.value)}>
                                <option value={''}></option>
                                <option value={'Comandante'}>Comandante</option>
                                <option value={'Janatã'}>Comandante Janatã</option>
                                <option value={'Lança'}>Lança Vermelha</option>
                                <option value={'JanatãLança'}>Comandante Janatã / Lança Vermelha</option>
                            </select>
                        </FieldContainer>
                        <FieldContainer>        
                            <label>Presidência: </label>
                            <select value={newMedium.presidente} onChange={(e) => {
                                updateProps('presidente', e.target.value);
                                if(e.target.value === 'Presidente') {
                                    updateProps('recepcao', false);
                                    updateProps('devas', false);
                                    updateProps('trinoSol', '');
                                    updateProps('trinoSar', false);
                                    updateProps('filho', false);
                                    updateProps('herdeiro', 0);
                                    updateProps('turnoTrab', 'Ajouros');
                                    updateProps('falMiss', 0);
                                }
                            }}>
                                <option value={''}></option>
                                <option value={'Presidente'}>Presidente</option>
                                <option value={'Vice'}>Vice-presidente</option>
                            </select>
                        </FieldContainer>
                        <FieldContainer>
                            <label>Trino Solitário</label>
                            <select value={newMedium.trinoSol} onChange={(e) => updateProps('trinoSol', e.target.value)}>
                                <option value={''}></option>
                                <option value={'Juremá'}>Juremá</option>
                                <option value={'Iramar'}>Iramar</option>
                            </select>
                        </FieldContainer>
                    </InputContainer>
                    <CheckboxContainer>
                        <FieldContainerBox>
                            <input type="checkBox" checked={newMedium.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                            <label>Recepcionista</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" checked={newMedium.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                            <label>Filho de Devas</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" checked={newMedium.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                            <label>Regente</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" checked={newMedium.trinoSar} onChange={(e) => updateProps('trinoSar', e.target.checked)} />
                            <label>Trino Sardyos</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" checked={newMedium.janda} onChange={(e) => updateProps('janda', e.target.checked)}/>
                            <label>Janda</label>
                        </FieldContainerBox>
                    </CheckboxContainer>
                    <Divider></Divider>
                    <CheckboxContainer>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Com Escrava</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Com Padrinho</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Com Madrinha</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Com Afilhado</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Com Mestre</label>
                        </FieldContainerBox>
                    </CheckboxContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Filtros por Datas</SectionTitle>
                    <GridDatesContainer>
                        <label>Data Nascimento: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtNasc} onChange={(e) => updateProps('dtNasc', e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Ingresso: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtIngresso} onChange={(e) => updateProps('dtIngresso', e.target.value)} min={newMedium.dtNasc}  max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Emplacamento: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtEmplac} onChange={(e) => updateProps('dtEmplac', e.target.value)} min={newMedium.dtIngresso} max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Iniciação: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtIniciacao} onChange={(e) => updateProps('dtIniciacao', e.target.value)} min={newMedium.dtEmplac} max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Elevação: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtElevacao} onChange={(e) => updateProps('dtElevacao', e.target.value)} min={newMedium.dtIniciacao} max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Centúria: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtCenturia} onChange={(e) => updateProps('dtCenturia', e.target.value)} min={newMedium.dtElevacao} max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Sétimo: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtSetimo} onChange={(e) => updateProps('dtSetimo', e.target.value)} min={newMedium.dtCenturia} max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Mentor: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtMentor} onChange={(e) => updateProps('dtMentor', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Classificação: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtClassif} onChange={(e) => updateProps('dtClassif', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Trino: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtTrinoSol} onChange={(e) => updateProps('dtTrinoSol', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>
                        <label>Data Sardyos: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={newMedium.dtTrinoSar} onChange={(e) => updateProps('dtTrinoSar', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                            <span>até</span>
                            <input type="date" />
                        </DatesContainer>    
                    </GridDatesContainer>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around'}}>
                    <ReportButton color="red" onClick={() => resetNewMedium()}>Resetar Filtros</ReportButton>
                    <ReportButton color="green" onClick={() => validateMedium(newMedium, async () => await addMedium(newMedium, token))}>Gerar Relatório</ReportButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
    )
}

export default Relatorios