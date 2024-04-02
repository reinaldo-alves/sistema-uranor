import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import { useContext, useEffect, useState } from "react";
import { defaultAdj, defaultCavaleiro, defaultMedium, defaultMentor } from "src/utilities/default";
import { IEstado, IFalange, IMedium, IMentor, ITemplo } from "src/types/types";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import { ListContext } from "src/contexts/ListContext";
import { CheckboxContainer, DatesContainer, Divider, FieldContainer, FieldContainerBox, GridContainer, GridDatesContainer, InputContainer, MainContent, MainInfoContainer, PersonalCard, ReportButton, SectionTitle } from "./styles";
import { alphabeticOrder, oppositeTurno, setSituation } from "src/utilities/functions";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";

function Relatorios() {
    const { templos, estados, adjuntos, coletes, classMest, falMest, povos, falMiss, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao } = useContext(ListContext);
    const { token } = useContext(UserContext);
    const { mediuns } = useContext(MediumContext);

    const [reportFilter, setReportFilter] = useState({...defaultMedium, condicao: ''});
    const [reportTitle, setReportTitle] = useState('');
    const [reportType, setReportType] = useState('');
    const [reportProperty, setReportProperty] = useState('');
    const [showMed, setShowMed] = useState(true);
    const [showTemplo, setShowTemplo] = useState(false);
    const [filterSituation, setFilterSituation] = useState('');
    const [dropPres, setDropPres] = useState(defaultAdj);
    const [dropMin, setDropMin] = useState(defaultMentor);
    const [dropCav, setDropCav] = useState(defaultCavaleiro);
    const [dropGuia, setDropGuia] = useState(defaultMentor);
    const [searchPres, setSearchPres] = useState('');
    const [searchMin, setSearchMin] = useState('');
    const [searchCav, setSearchCav] = useState('');
    const [searchGuia, setSearchGuia] = useState('');

    const now = new Date().toISOString().split('T')[0];

    useEffect (() => {
        console.log(reportFilter.dtNasc);
    }, [reportFilter])

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
        setReportFilter((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };

    const resetReportFilter = () => {
        setReportFilter({...defaultMedium, condicao: ''});
        setReportTitle('');
        setReportType('');
        setReportProperty('');
        setShowMed(true);
        setShowTemplo(false);
        setFilterSituation('');
        setSearchMin('');
        setSearchCav('');
        setSearchGuia('');
        setSearchPres('');
    }

    const handleDateChange = (property: string, index: number, date: string) => {
        setReportFilter((prevData: any) => {
            const oldDates = prevData[property].split('/');
            oldDates[index] = date;
            const newDates = oldDates.join('/');
            return {
                ...prevData,
                [property]: newDates === '/' ? '' : newDates
            }
        })
    };
    

    const generateMediumList = async (mediuns: Array<IMedium>, filters: IMedium, situation: string) => {
        const mediumList = mediuns.filter((item: IMedium) => {
            if (filters.nome && !item.nome.toLowerCase().includes(filters.nome.toLowerCase())) {return false};
            if (situation && situation !== setSituation(item)){return false};
            if (filters.sex && filters.sex !== item.sex){return false};
            if (filters.med && filters.med !== item.med){return false};
            if ((filters.condicao && filters.condicao !== item.condicao) && !(filters.condicao === 'Não Ativo' && item.condicao !== 'Ativo')){return false};
            if (filters.templo && filters.templo !== item.templo){return false};
            if (filters.adjOrigem && filters.adjOrigem !== item.adjOrigem){return false};
            if (filters.temploOrigem && filters.temploOrigem !== item.temploOrigem){return false};
            if (filters.colete && filters.colete !== item.colete){return false};
            if (filters.classMest && filters.classMest !== item.classMest){return false};
            if (filters.falMest && filters.falMest !== item.falMest){return false};
            if (filters.povo && filters.povo !== item.povo){return false};
            if (filters.falMiss && filters.falMiss !== item.falMiss){return false};
            if (filters.adjDevas && filters.adjDevas !== item.adjDevas){return false};
            if (filters.turnoLeg && filters.turnoLeg !== item.turnoLeg){return false};
            if (filters.turnoTrab && (!item.turnoTrab || !filters.turnoTrab.includes(item.turnoTrab))){return false};
            if (filters.estrela && filters.estrela !== item.estrela){return false};
            if (filters.ministro && filters.ministro !== item.ministro){return false};
            if (filters.cavaleiro && filters.cavaleiro !== item.cavaleiro){return false};
            if (filters.guia && filters.guia !== item.guia){return false};
            if (filters.cor && filters.cor !== item.cor){return false};
            if ((filters.trinoSol && filters.trinoSol !== item.trinoSol) && !(filters.trinoSol === 'Todos' && item.trinoSol)){return false};
            if (filters.classif && filters.classif !== item.classif){return false};
            if (filters.princesa && filters.princesa !== item.princesa){return false};
            if (filters.pretovelho && filters.pretovelho !== item.pretovelho){return false};
            if (filters.caboclo && filters.caboclo !== item.caboclo){return false};
            if (filters.medico && filters.medico !== item.medico){return false};
            if (filters.natur && filters.natur !== item.natur){return false};
            if (filters.naturUF && filters.naturUF !== item.naturUF){return false};
            if (filters.estCivil && filters.estCivil !== item.estCivil){return false};
            if (filters.endBairro && filters.endBairro !== item.endBairro){return false};
            if (filters.endCidade && filters.endCidade !== item.endCidade){return false};
            if (filters.endUF && filters.endUF !== item.endUF){return false};
            if ((filters.comando && filters.comando !== item.comando) && !(filters.comando === 'Todos' && item.comando)){return false};
            if (filters.recepcao && !item.recepcao){return false};
            if (filters.devas && !item.devas){return false};
            if (filters.regente && !item.regente){return false};
            if (filters.trinoSar && !item.trinoSar){return false};
            if (filters.janda && !item.janda){return false};
            if (filters.ninfa && (!item.ninfa || item.med !== 'Doutrinador')){return false};
            if (filters.padrinho && (!item.padrinho || item.med !== 'Doutrinador')){return false};
            if (filters.madrinha && (!item.madrinha || item.med !== 'Doutrinador')){return false};
            if (filters.afilhado && (!item.afilhado || item.med !== 'Doutrinador')){return false};
            if (filters.mestre && (!item.mestre || item.sex.concat(item.med) !== 'FemininoApará')){return false};
            if (filters.dtNasc && (item.dtNasc < filters.dtNasc.split('/')[0] || item.dtNasc > filters.dtNasc.split('/')[1])){return false}
            if (filters.dtIngresso && (item.dtIngresso < filters.dtIngresso.split('/')[0] || item.dtIngresso > filters.dtIngresso.split('/')[1])){return false}
            if (filters.dtTest && (item.dtTest < filters.dtTest.split('/')[0] || item.dtTest > filters.dtTest.split('/')[1])){return false}
            if (filters.dtEmplac && (item.dtEmplac < filters.dtEmplac.split('/')[0] || item.dtEmplac > filters.dtEmplac.split('/')[1])){return false}
            if (filters.dtIniciacao && (item.dtIniciacao < filters.dtIniciacao.split('/')[0] || item.dtIngresso > filters.dtIniciacao.split('/')[1])){return false}
            if (filters.dtElevacao && (item.dtElevacao < filters.dtElevacao.split('/')[0] || item.dtElevacao > filters.dtElevacao.split('/')[1])){return false}
            if (filters.dtCenturia && (item.dtCenturia < filters.dtCenturia.split('/')[0] || item.dtCenturia > filters.dtCenturia.split('/')[1])){return false}
            if (filters.dtSetimo && (item.dtSetimo < filters.dtSetimo.split('/')[0] || item.dtSetimo > filters.dtSetimo.split('/')[1])){return false}
            if (filters.dtMentor && (item.dtMentor < filters.dtMentor.split('/')[0] || item.dtMentor > filters.dtMentor.split('/')[1])){return false}
            if (filters.dtClassif && (item.dtClassif < filters.dtClassif.split('/')[0] || item.dtClassif > filters.dtClassif.split('/')[1])){return false}
            return true
        })
        console.log(mediumList.length, mediumList);
    }

    const generateReport = async () => await generateMediumList(mediuns, reportFilter, filterSituation)
    
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
                                <input type="text" value={reportTitle} onChange={(e) => setReportTitle(e.target.value)}/>
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
                    <ReportButton color="red" onClick={() => resetReportFilter()}>Resetar Filtros</ReportButton>
                    <ReportButton color="green" onClick={async () => await generateReport()}>Gerar Relatório</ReportButton>
                </div>
                <PersonalCard>
                    <SectionTitle>Configurar Filtros</SectionTitle>
                    <GridContainer>
                        <label>Nome Médium: </label>
                        <input type="text" value={reportFilter.nome} onChange={(e) => updateProps('nome', e.target.value)}/>
                        <label>Situação: </label>
                        <select value={filterSituation} onChange={(e) => setFilterSituation(e.target.value)}>
                            <option value={''}></option>
                            <option value={'Em desenvolvimento'}>Em desenvolvimento</option>
                            <option value={'Liberado'}>Liberado</option>
                            <option value={'Iniciado'}>Iniciado</option>
                            <option value={'Elevado'}>Elevado</option>
                            <option value={'Centurião'}>Centurião</option>
                            <option value={'Centurião 7° Raio'}>Centurião 7° Raio</option>
                        </select>
                        <label>Sexo: </label>
                        <select value={reportFilter.sex} onChange={(e) => updateProps('sex', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Feminino'}>Feminino</option>
                            <option value={'Masculino'}>Masculino</option>
                        </select>
                        <label>Mediunidade: </label>
                        <select value={reportFilter.med} onChange={(e) => updateProps('med', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Apará'}>Apará</option>
                            <option value={'Doutrinador'}>Doutrinador</option>
                        </select>
                        <label>Condição Atual: </label>
                        <select value={reportFilter.condicao} onChange={(e) => updateProps('condicao', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Ativo'}>Ativo</option>
                            <option value={'Não Ativo'}>Não Ativo</option>
                            <option value={'Afastado'}>Afastado</option>
                            <option value={'Entregou as Armas'}>Entregou as Armas</option>
                            <option value={'Desencarnado'}>Desencarnado</option>
                        </select>
                        <label>Templo: </label>
                        <select value={reportFilter.templo} onChange={(e) => updateProps('templo', e.target.value)}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                    </GridContainer>
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
                        <label>Templo Origem: </label>
                        <select value={reportFilter.temploOrigem} onChange={(e) => updateProps('temploOrigem', e.target.value)}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Colete N°: </label>
                        <select value={reportFilter.colete} onChange={(e) => updateProps('colete', e.target.value)}>
                            <option value={0}></option>
                            {coletes.map((item: number, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Classif. Mestrado: </label>
                        <select value={reportFilter.classMest} onChange={(e) => updateProps('classMest', e.target.value)}>
                            <option value={''}></option>
                            {[...classMest.MS, ...classMest.ML, ...classMest.NS, ...classMest.NL].map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Falange Mestrado: </label>
                        <select value={reportFilter.falMest} onChange={(e) => updateProps('falMest', e.target.value)}>
                            <option value={''}></option>
                            {falMest.completo.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Povo: </label>
                        <select value={reportFilter.povo} onChange={(e) => updateProps('povo', e.target.value)}>
                            <option value={''}></option>
                            {povos.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Falange Missionária: </label>
                        <select
                            value={reportFilter.falMiss}
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
                        <select value={reportFilter.adjDevas} onChange={(e) => updateProps('adjDevas', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Adejã'}>Adejã</option>
                            <option value={'Alufã'}>Alufã</option>
                        </select>
                        <label>Turno: </label>
                        <select value={reportFilter.turnoLeg} onChange={(e) => updateProps('turnoLeg', e.target.value)}>
                            <option value={''}></option>
                            {[...turnoL.jaguar, ...turnoL.ninfa].map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Turno Trabalho: </label>
                        <select value={reportFilter.turnoTrab} onChange={(e) => updateProps('turnoTrab', e.target.value)}>
                            <option value={''}></option>
                            {turnoT.jaguar.map((item: string, index: number) => (
                                <option key={index} value={item + ' / ' + oppositeTurno(turnoT, item)}>{item + ' / ' + oppositeTurno(turnoT, item)}</option>
                            ))}
                        </select>
                        <label>Estrela: </label>
                        <select value={reportFilter.estrela} onChange={(e) => updateProps('estrela', e.target.value)}>
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
                        <select value={reportFilter.cor} onChange={(e) => updateProps('cor', e.target.value)}>
                            <option value={undefined}></option>
                            <option value={'Amarela'}>Amarela</option>
                            <option value={'Azul'}>Azul</option>
                            <option value={'Branca'}>Branca</option>
                            <option value={'Lilás'}>Lilás</option>
                            <option value={'Rósea'}>Rósea</option>
                            <option value={'Verde'}>Verde</option>
                            <option value={'Vermelha'}>Vermelha</option>
                        </select>
                        <label>Trino Solitário</label>
                        <select value={reportFilter.trinoSol} onChange={(e) => updateProps('trinoSol', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Juremá'}>Juremá</option>
                            <option value={'Iramar'}>Iramar</option>
                            <option value={'Todos'}>Todos</option>
                        </select>
                    </GridContainer>
                    <InputContainer>
                        <FieldContainer>
                            <label>Classificação Atual: </label>
                            <select value={reportFilter.classif} onChange={(e) => {
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
                        <select value={reportFilter.princesa} onChange={(e) => updateProps('princesa', e.target.value)}>
                            <option value={''}></option>
                            {princesas.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Preto Velho: </label>
                        <input type="text" value={reportFilter.pretovelho} onChange={(e) => updateProps('pretovelho', e.target.value)}/>
                        <label>Caboclo: </label>
                        <input type="text" value={reportFilter.caboclo} onChange={(e) => updateProps('caboclo', e.target.value)}/>
                        <label>Médico: </label>
                        <input type="text" value={reportFilter.medico} onChange={(e) => updateProps('medico', e.target.value)}/>
                    </GridContainer> 
                    <Divider></Divider>
                    <GridContainer>
                        <label>Natural de: </label>
                        <input type="text" value={reportFilter.natur} onChange={(e) => updateProps('natur', e.target.value)}/>
                        <label>UF: </label>
                        <select value={reportFilter.naturUF} onChange={(e) => updateProps('naturUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Estado Civil: </label>
                        <select value={reportFilter.estCivil} onChange={(e) => updateProps('estCivil', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                        <label>Bairro: </label>
                        <input type="text" value={reportFilter.endBairro} onChange={(e) => updateProps('endBairro', e.target.value)}/>
                        <label>Cidade: </label>
                        <input type="text" value={reportFilter.endCidade} onChange={(e) => updateProps('endCidade', e.target.value)}/>
                        <label>UF endereço: </label>
                        <select value={reportFilter.endUF} onChange={(e) => updateProps('endUF', e.target.value)}>
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
                            <select value={reportFilter.comando} onChange={(e) => updateProps('comando', e.target.value)}>
                                <option value={''}></option>
                                <option value={'Todos'}>Todos os Comandantes</option>
                                <option value={'Comandante'}>Comandante (sem ser Janatã nem Lança)</option>
                                <option value={'Janatã'}>Comandante Janatã</option>
                                <option value={'Lança'}>Lança Vermelha</option>
                                <option value={'JanatãLança'}>Comandante Janatã / Lança Vermelha</option>
                            </select>
                        </FieldContainer>
                        <FieldContainer>        
                            <label>Presidência: </label>
                            <select value={reportFilter.presidente} onChange={(e) => {updateProps('presidente', e.target.value)}}>
                                <option value={''}></option>
                                <option value={'Presidente'}>Presidente</option>
                                <option value={'Vice'}>Vice-presidente</option>
                            </select>
                        </FieldContainer>
                    </InputContainer>
                    <CheckboxContainer>
                        <FieldContainerBox>
                            <input type="checkBox" checked={reportFilter.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                            <label>Recepcionista</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" checked={reportFilter.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                            <label>Filho de Devas</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" checked={reportFilter.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                            <label>Regente</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" checked={reportFilter.trinoSar} onChange={(e) => updateProps('trinoSar', e.target.checked)} />
                            <label>Trino Sardyos</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" checked={reportFilter.janda} onChange={(e) => updateProps('janda', e.target.checked)}/>
                            <label>Janda</label>
                        </FieldContainerBox>
                    </CheckboxContainer>
                    <Divider></Divider>
                    <CheckboxContainer>
                        <FieldContainerBox>
                            <input type="checkBox" onChange={(e) => updateProps('ninfa', e.target.checked ? 1 : 0)}/>
                            <label>Com Escrava</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" onChange={(e) => updateProps('padrinho', e.target.checked ? 1 : 0)}/>
                            <label>Com Padrinho</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" onChange={(e) => updateProps('madrinha', e.target.checked ? 1 : 0)}/>
                            <label>Com Madrinha</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" onChange={(e) => updateProps('afilhado', e.target.checked ? 1 : 0)}/>
                            <label>Com Afilhado</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" onChange={(e) => updateProps('mestre', e.target.checked ? 1 : 0)}/>
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
                            <input type="date" value={reportFilter.dtNasc.split('/')[0] || ''} onChange={(e) => handleDateChange('dtNasc', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtNasc.split('/')[1] || ''} onChange={(e) => handleDateChange('dtNasc', 1, e.target.value)} max={now} />
                        </DatesContainer>
                        <label>Data Ingresso: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtIngresso.split('/')[0] || ''} onChange={(e) => handleDateChange('dtIngresso', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtIngresso.split('/')[1] || ''} onChange={(e) => handleDateChange('dtIngresso', 1, e.target.value)} max={now} />
                        </DatesContainer>
                        <label>Data Teste: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtTest.split('/')[0] || ''} onChange={(e) => handleDateChange('dtTest', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtTest.split('/')[1] || ''} onChange={(e) => handleDateChange('dtTest', 1, e.target.value)} max={now} />
                        </DatesContainer>
                        <label>Data Emplacamento: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtEmplac.split('/')[0] || ''} onChange={(e) => handleDateChange('dtEmplac', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtEmplac.split('/')[1] || ''} onChange={(e) => handleDateChange('dtEmplac', 1, e.target.value)} max={now} />
                        </DatesContainer>
                        <label>Data Iniciação: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtIniciacao.split('/')[0] || ''} onChange={(e) => handleDateChange('dtIniciacao', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtIniciacao.split('/')[1] || ''} onChange={(e) => handleDateChange('dtIniciacao', 1, e.target.value)} max={now} />
                        </DatesContainer>
                        <label>Data Elevação: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtElevacao.split('/')[0] || ''} onChange={(e) => handleDateChange('dtElevacao', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtElevacao.split('/')[1] || ''} onChange={(e) => handleDateChange('dtElevacao', 1, e.target.value)} max={now} />
                        </DatesContainer>
                        <label>Data Centúria: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtCenturia.split('/')[0] || ''} onChange={(e) => handleDateChange('dtCenturia', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtCenturia.split('/')[1] || ''} onChange={(e) => handleDateChange('dtCenturia', 1, e.target.value)} max={now} />
                        </DatesContainer>
                        <label>Data Sétimo: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtSetimo.split('/')[0] || ''} onChange={(e) => handleDateChange('dtSetimo', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtSetimo.split('/')[1] || ''} onChange={(e) => handleDateChange('dtSetimo', 1, e.target.value)} max={now} />
                        </DatesContainer>
                        <label>Data Mentor: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtMentor.split('/')[0] || ''} onChange={(e) => handleDateChange('dtMentor', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtMentor.split('/')[1] || ''} onChange={(e) => handleDateChange('dtMentor', 1, e.target.value)} max={now} />
                        </DatesContainer>
                        <label>Data Classificação: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtClassif.split('/')[0] || ''} onChange={(e) => handleDateChange('dtClassif', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtClassif.split('/')[1] || ''} onChange={(e) => handleDateChange('dtClassif', 1, e.target.value)} max={now} />
                        </DatesContainer>
                    </GridDatesContainer>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around'}}>
                    <ReportButton color="red" onClick={() => resetReportFilter()}>Resetar Filtros</ReportButton>
                    <ReportButton color="green" onClick={async () => await generateReport()}>Gerar Relatório</ReportButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
    )
}

export default Relatorios