import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import { useContext, useEffect, useState } from "react";
import { defaultAdj, defaultCavaleiro, defaultMedium, defaultMentor, eventTypes } from "src/utilities/default";
import { IEstado, IEvento, IFalange, IMedium, IMentor, ITemplo } from "src/types/types";
import { MediumContext } from "src/contexts/MediumContext";
import { ListContext } from "src/contexts/ListContext";
import { CheckboxContainer, DatesContainer, Divider, EventContainer, FieldContainer, FieldContainerBox, GridContainer, GridDatesContainer, GridEventContainer, MainContent, MainInfoContainer, MixedContainer } from "./styles";
import { oppositeTurno, removeDiacritics, setSituation } from "src/utilities/functions";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { generateReport } from "src/utilities/createDocs";
import { Alert } from "src/utilities/popups";
import { NavigateButton } from "src/components/buttons/buttons";
import { PersonalCard } from "src/components/cardsContainers/cardsContainers";
import { SectionTitle } from "src/components/texts/texts";

function Relatorios() {
    const { templos, estados, adjuntos, coletes, classMest, falMest, povos, falMiss, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao, eventos } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);

    const [reportFilter, setReportFilter] = useState(defaultMedium);
    const [reportTitle, setReportTitle] = useState('');
    const [reportType, setReportType] = useState('');
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
    const [event, setEvent] = useState('');
    const [eventDate, setEventDate] = useState('');

    const now = new Date().toISOString().split('T')[0];

    useEffect (() => {
        console.log(reportFilter);
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
        setReportFilter(defaultMedium);
        setReportTitle('');
        setReportType('');
        setShowMed(true);
        setShowTemplo(false);
        setFilterSituation('');
        setDropPres(defaultAdj);
        setDropMin(defaultMentor);
        setDropCav(defaultCavaleiro);
        setDropGuia(defaultMentor);
        setSearchMin('');
        setSearchCav('');
        setSearchGuia('');
        setSearchPres('');
        setEvent('');
        setEventDate('');
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

    const handleEventDateChange = (index: number, date: string) => {
        setEventDate((prevData: any) => {
            const oldDates = prevData.split('/');
            oldDates[index] = date;
            const newDates = oldDates.join('/');
            return newDates === '/' ? '' : newDates
        })
    };

    const generateMediumList = async (mediuns: Array<IMedium>, filters: IMedium, situation: string) => {
        const mediumList = mediuns.filter((item: IMedium) => {
            if (filters.nome && !removeDiacritics(item.nome).includes(removeDiacritics(filters.nome))) {return false};
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
            if (filters.pretovelho && !removeDiacritics(item.pretovelho).includes(removeDiacritics(filters.pretovelho))) {return false};
            if (filters.caboclo && !removeDiacritics(item.caboclo).includes(removeDiacritics(filters.caboclo))) {return false};
            if (filters.medico && !removeDiacritics(item.medico).includes(removeDiacritics(filters.medico))) {return false};
            if (filters.natur && removeDiacritics(filters.natur) !== removeDiacritics(item.natur)){return false};
            if (filters.naturUF && filters.naturUF !== item.naturUF){return false};
            if (filters.estCivil && filters.estCivil !== item.estCivil){return false};
            if (filters.endBairro && removeDiacritics(filters.endBairro) !== removeDiacritics(item.endBairro)){return false};
            if (filters.endCidade && removeDiacritics(filters.endCidade) !== removeDiacritics(item.endCidade)){return false};
            if (filters.endUF && filters.endUF !== item.endUF){return false};
            if ((filters.comando && filters.comando !== item.comando) && !(filters.comando === 'Todos' && item.comando)){return false};
            if (filters.presidente && filters.presidente !== item.presidente){return false};
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
            if (filters.dtTest && (item.dtTest < filters.dtTest.split('/')[0] || item.dtTest > filters.dtTest.split('/')[1]) && (item.oldDtTest < filters.dtTest.split('/')[0] || item.oldDtTest > filters.dtTest.split('/')[1])){return false}
            if (filters.dtEmplac && (item.dtEmplac < filters.dtEmplac.split('/')[0] || item.dtEmplac > filters.dtEmplac.split('/')[1]) && (item.oldDtEmplac < filters.dtEmplac.split('/')[0] || item.oldDtEmplac > filters.dtEmplac.split('/')[1])){return false}
            if (filters.dtIniciacao && (item.dtIniciacao < filters.dtIniciacao.split('/')[0] || item.dtIniciacao > filters.dtIniciacao.split('/')[1]) && (item.oldDtIniciacao < filters.dtIniciacao.split('/')[0] || item.oldDtIniciacao > filters.dtIniciacao.split('/')[1])){return false}
            if (filters.dtElevacao && (item.dtElevacao < filters.dtElevacao.split('/')[0] || item.dtElevacao > filters.dtElevacao.split('/')[1]) && (item.oldDtElevacao < filters.dtElevacao.split('/')[0] || item.oldDtElevacao > filters.dtElevacao.split('/')[1])){return false}
            if (filters.dtCenturia && (item.dtCenturia < filters.dtCenturia.split('/')[0] || item.dtCenturia > filters.dtCenturia.split('/')[1])){return false}
            if (filters.dtSetimo && (item.dtSetimo < filters.dtSetimo.split('/')[0] || item.dtSetimo > filters.dtSetimo.split('/')[1])){return false}
            if (filters.dtMentor && (item.dtMentor < filters.dtMentor.split('/')[0] || item.dtMentor > filters.dtMentor.split('/')[1]) && (item.oldDtMentor < filters.dtMentor.split('/')[0] || item.oldDtMentor > filters.dtMentor.split('/')[1])){return false}
            if (filters.dtClassif && (item.dtClassif < filters.dtClassif.split('/')[0] || item.dtClassif > filters.dtClassif.split('/')[1])){return false}
            if (event && !eventos.some((el: IEvento) => el.medium === item.medium_id && el.tipo === event)) {return false};
            if (eventDate && !eventos.some((el: IEvento) => el.medium === item.medium_id && el.tipo === event && el.data >= eventDate.split('/')[0] && el.data <= eventDate.split('/')[1])) {return false};
            return true
        })
        console.log(mediumList.length, mediumList);
        return mediumList;
    }

    const handleGenerateReport = async () => {
        if ((reportFilter.dtNasc.length && reportFilter.dtNasc.length < 21) || (reportFilter.dtNasc.split('/')[1] < reportFilter.dtNasc.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data de nascimento', 'warning')
            return
        }
        if ((reportFilter.dtIngresso.length && reportFilter.dtIngresso.length < 21) || (reportFilter.dtIngresso.split('/')[1] < reportFilter.dtIngresso.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data de ingresso', 'warning')
            return
        }
        if ((reportFilter.dtTest.length && reportFilter.dtTest.length < 21) || (reportFilter.dtTest.split('/')[1] < reportFilter.dtTest.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data de teste', 'warning')
            return
        }
        if ((reportFilter.dtEmplac.length && reportFilter.dtEmplac.length < 21) || (reportFilter.dtEmplac.split('/')[1] < reportFilter.dtEmplac.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data de emplacamento', 'warning')
            return
        }
        if ((reportFilter.dtIniciacao.length && reportFilter.dtIniciacao.length < 21) || (reportFilter.dtIniciacao.split('/')[1] < reportFilter.dtIniciacao.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data de iniciação', 'warning')
            return
        }
        if ((reportFilter.dtElevacao.length && reportFilter.dtElevacao.length < 21) || (reportFilter.dtElevacao.split('/')[1] < reportFilter.dtElevacao.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data de elevação', 'warning')
            return
        }
        if ((reportFilter.dtCenturia.length && reportFilter.dtCenturia.length < 21) || (reportFilter.dtCenturia.split('/')[1] < reportFilter.dtCenturia.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data de centúria', 'warning')
            return
        }
        if ((reportFilter.dtSetimo.length && reportFilter.dtSetimo.length < 21) || (reportFilter.dtSetimo.split('/')[1] < reportFilter.dtSetimo.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data de sétimo', 'warning')
            return
        }
        if ((reportFilter.dtMentor.length && reportFilter.dtMentor.length < 21) || (reportFilter.dtMentor.split('/')[1] < reportFilter.dtMentor.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data de mentor', 'warning')
            return
        }
        if ((reportFilter.dtClassif.length && reportFilter.dtClassif.length < 21) || (reportFilter.dtClassif.split('/')[1] < reportFilter.dtClassif.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data da última classificação', 'warning')
            return
        }
        if (!event && eventDate.length) {
            Alert('Selecione um tipo de evento', 'warning')
            return
        }
        if ((eventDate.length && eventDate.length < 21) || (eventDate.split('/')[1] < eventDate.split('/')[0])) {
            Alert('Preencha corretamente o intervalo de data do evento', 'warning')
            return
        }
        const mediumList = await generateMediumList(mediuns, reportFilter, filterSituation);
        const finalMediumList = mediumList.map((item: IMedium) => {
            if (reportFilter.dtTest && (item.dtTest < reportFilter.dtTest.split('/')[0] || item.dtTest > reportFilter.dtTest.split('/')[1])){return {...item, nome: `${item.nome} (1)`}}
            else if (reportFilter.dtEmplac && (item.dtEmplac < reportFilter.dtEmplac.split('/')[0] || item.dtEmplac > reportFilter.dtEmplac.split('/')[1])){return {...item, nome: `${item.nome} (2)`}}
            else if (reportFilter.dtIniciacao && (item.dtIniciacao < reportFilter.dtIniciacao.split('/')[0] || item.dtIniciacao > reportFilter.dtIniciacao.split('/')[1])){return {...item, nome: `${item.nome} (3)`}}
            else if (reportFilter.dtElevacao && (item.dtElevacao < reportFilter.dtElevacao.split('/')[0] || item.dtElevacao > reportFilter.dtElevacao.split('/')[1])){return {...item, nome: `${item.nome} (4)`}}
            else if (reportFilter.dtMentor && (item.dtMentor < reportFilter.dtMentor.split('/')[0] || item.dtMentor > reportFilter.dtMentor.split('/')[1])){return {...item, nome: `${item.nome} (5)`}}
            else {return item}
        })
        if (finalMediumList.length) {
            generateReport(finalMediumList, templos, reportTitle, showMed, showTemplo, reportType);
        } else {
            Alert('Não há dados para exibir neste relatório', 'error');
        }
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
                                <input type="text" value={reportTitle} onChange={(e) => setReportTitle(e.target.value)}/>
                            </FieldContainer>
                            <MixedContainer>
                                <FieldContainer>
                                    <label>Tipo do Relatório: </label>
                                    <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                        <option value={''}>Padrão</option>
                                        <option value={'Telefones'}>Contato: mostra telefones</option>
                                        <option value={'Assinatura'}>Protocolo: mostra assinatura</option>
                                    </select>
                                </FieldContainer>
                                <CheckboxContainer style={{flexWrap: 'nowrap'}}>
                                    <FieldContainerBox>
                                        <input type="checkBox" checked={showMed} onChange={(e) => setShowMed(e.target.checked)}/>
                                        <label>Mostrar Mediunidade</label>
                                    </FieldContainerBox>
                                    <FieldContainerBox>
                                        <input type="checkBox" checked={showTemplo} onChange={(e) => setShowTemplo(e.target.checked)}/>
                                        <label>Mostrar Templo</label>
                                    </FieldContainerBox>
                                </CheckboxContainer>
                            </MixedContainer>
                        </MainInfoContainer>
                    </MainContent>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton height="45px" width="165px" color="red" onClick={() => resetReportFilter()}>Resetar Filtros</NavigateButton>
                    <NavigateButton height="45px" width="165px" onClick={async () => await handleGenerateReport()}>Gerar Relatório</NavigateButton>
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
                            <option value={'Centurião 7º Raio'}>Centurião 7º Raio</option>
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
                            <option value={'Ativo'}>Ativo</option>
                            <option value={'Não Ativo'}>Não Ativo</option>
                            <option value={'Afastado'}>Afastado</option>
                            <option value={'Entregou as Armas'}>Entregou as Armas</option>
                            <option value={'Desencarnado'}>Desencarnado</option>
                            <option value={''}>Todas</option>
                        </select>
                        <label>Templo: </label>
                        <select value={reportFilter.templo} onChange={(e) => updateProps('templo', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                    </GridContainer>
                    <Divider></Divider>
                    <GridContainer>
                        <label>Adjunto Origem: </label>
                        <AutocompleteInput 
                            label={(option) => option === defaultAdj ? '' : `Adj. ${ministros.filter((min: IMentor) => min.id === option.ministro)[0].nome} - Mestre ${option.nome}` }
                            default={defaultAdj}
                            options={adjuntos}
                            equality={(option, value) => option?.adjunto_id === value?.adjunto_id}
                            value={dropPres}
                            setValue={setDropPres}
                            inputValue={searchPres}
                            setInputValue={setSearchPres}
                        />
                        <label>Templo Origem: </label>
                        <select value={reportFilter.temploOrigem} onChange={(e) => updateProps('temploOrigem', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Colete Nº: </label>
                        <select value={reportFilter.colete} onChange={(e) => updateProps('colete', Number(e.target.value))}>
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
                    <FieldContainer>
                        <label>Classificação Atual: </label>
                        <select value={reportFilter.classif} onChange={(e) => {
                            updateProps('classif', e.target.value)
                            if(e.target.value === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000') {
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
                    <GridContainer>
                        <label>Comando: </label>
                        <select value={reportFilter.comando} onChange={(e) => updateProps('comando', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Todos'}>Todos os Comandantes</option>
                            <option value={'Comandante'}>Comandante (sem ser Janatã nem Lança)</option>
                            <option value={'Janatã'}>Comandante Janatã</option>
                            <option value={'Lança'}>Lança Vermelha</option>
                            <option value={'JanatãLança'}>Comandante Janatã / Lança Vermelha</option>
                        </select>      
                        <label>Presidência: </label>
                        <select value={reportFilter.presidente} onChange={(e) => {updateProps('presidente', e.target.value)}}>
                            <option value={''}></option>
                            <option value={'Presidente'}>Presidente</option>
                            <option value={'Vice'}>Vice-presidente</option>
                        </select>
                    </GridContainer>
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
                            <input type="date" value={reportFilter.dtNasc.split('/')[1] || ''} onChange={(e) => handleDateChange('dtNasc', 1, e.target.value)} min={reportFilter.dtNasc.split('/')[0]} max={now} />
                        </DatesContainer>
                        <label>Data Ingresso: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtIngresso.split('/')[0] || ''} onChange={(e) => handleDateChange('dtIngresso', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtIngresso.split('/')[1] || ''} onChange={(e) => handleDateChange('dtIngresso', 1, e.target.value)} min={reportFilter.dtIngresso.split('/')[0]} max={now} />
                        </DatesContainer>
                        <label>Data Teste: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtTest.split('/')[0] || ''} onChange={(e) => handleDateChange('dtTest', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtTest.split('/')[1] || ''} onChange={(e) => handleDateChange('dtTest', 1, e.target.value)} min={reportFilter.dtTest.split('/')[0]} max={now} />
                        </DatesContainer>
                        <label>Data Emplacamento: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtEmplac.split('/')[0] || ''} onChange={(e) => handleDateChange('dtEmplac', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtEmplac.split('/')[1] || ''} onChange={(e) => handleDateChange('dtEmplac', 1, e.target.value)} min={reportFilter.dtEmplac.split('/')[0]} max={now} />
                        </DatesContainer>
                        <label>Data Iniciação: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtIniciacao.split('/')[0] || ''} onChange={(e) => handleDateChange('dtIniciacao', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtIniciacao.split('/')[1] || ''} onChange={(e) => handleDateChange('dtIniciacao', 1, e.target.value)} min={reportFilter.dtIniciacao.split('/')[0]} max={now} />
                        </DatesContainer>
                        <label>Data Elevação: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtElevacao.split('/')[0] || ''} onChange={(e) => handleDateChange('dtElevacao', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtElevacao.split('/')[1] || ''} onChange={(e) => handleDateChange('dtElevacao', 1, e.target.value)} min={reportFilter.dtElevacao.split('/')[0]} max={now} />
                        </DatesContainer>
                        <label>Data Centúria: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtCenturia.split('/')[0] || ''} onChange={(e) => handleDateChange('dtCenturia', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtCenturia.split('/')[1] || ''} onChange={(e) => handleDateChange('dtCenturia', 1, e.target.value)} min={reportFilter.dtCenturia.split('/')[0]} max={now} />
                        </DatesContainer>
                        <label>Data Sétimo: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtSetimo.split('/')[0] || ''} onChange={(e) => handleDateChange('dtSetimo', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtSetimo.split('/')[1] || ''} onChange={(e) => handleDateChange('dtSetimo', 1, e.target.value)} min={reportFilter.dtSetimo.split('/')[0]} max={now} />
                        </DatesContainer>
                        <label>Data Mentor: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtMentor.split('/')[0] || ''} onChange={(e) => handleDateChange('dtMentor', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtMentor.split('/')[1] || ''} onChange={(e) => handleDateChange('dtMentor', 1, e.target.value)} min={reportFilter.dtMentor.split('/')[0]} max={now} />
                        </DatesContainer>
                        <label>Data Classificação: </label>
                        <DatesContainer>
                            <span>De</span>
                            <input type="date" value={reportFilter.dtClassif.split('/')[0] || ''} onChange={(e) => handleDateChange('dtClassif', 0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={reportFilter.dtClassif.split('/')[1] || ''} onChange={(e) => handleDateChange('dtClassif', 1, e.target.value)} min={reportFilter.dtClassif.split('/')[0]} max={now} />
                        </DatesContainer>
                    </GridDatesContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Filtros por Eventos</SectionTitle>
                    <GridEventContainer>
                        <EventContainer>
                            <label>Evento: </label>
                            <select value={event} onChange={(e) => setEvent(e.target.value)}>
                                <option></option>
                                {eventTypes.map((item, index) => (
                                    item.auto ? '' : <option key={index} value={item.event}>{item.event}</option>       
                                ))}
                            </select>
                        </EventContainer>
                        <DatesContainer>
                            <span>de</span>
                            <input type="date" value={eventDate.split('/')[0] || ''} onChange={(e) => handleEventDateChange(0, e.target.value)} max={now} />
                            <span>até</span>
                            <input type="date" value={eventDate.split('/')[1] || ''} onChange={(e) => handleEventDateChange(1, e.target.value)} min={eventDate.split('/')[0]} max={now} />
                        </DatesContainer>
                    </GridEventContainer>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton height="45px" width="165px" color="red" onClick={() => resetReportFilter()}>Resetar Filtros</NavigateButton>
                    <NavigateButton height="45px" width="165px" onClick={async () => await handleGenerateReport()}>Gerar Relatório</NavigateButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
    )
}

export default Relatorios