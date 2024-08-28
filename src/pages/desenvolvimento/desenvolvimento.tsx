import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import { ButtonContainer, DesenvCard, DesenvLegend, InputContainer, ModalMediumContent, MonthArrow, MonthNameContainer, NavigateButton, Results, ResultsData, ResultsDetails, ResultsName, ResultsTable, ResultsTitle } from "./styles";
import { formatInputText, handleEnterPress, showTemplo } from "src/utilities/functions";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IDesenvolvimento, IFrequencia, IMedium } from "src/types/types";
import { Alert, Confirm } from "src/utilities/popups";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultMedium } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import { Modal, ModalButton, ModalSubTitle, ModalTitle } from "src/components/Modal/modal";
import Loading from "src/utilities/Loading";

function Desenvolvimento() {
    const { loadDesenvolvimento, allFrequencia, princesas, templos } = useContext(ListContext);
    const { mediuns, loadMedium } = useContext(MediumContext);
    const { token } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [showModalMedium, setShowModalMedium] = useState(false);
    const [selectModal, setSelectModal] = useState('')
    const [selectedMedium, setSelectedMedium] = useState(defaultMedium);
    const [dropMedium, setDropMedium] = useState(defaultMedium);
    const [searchMedium, setSearchMedium] = useState('');
    const [frequencia, setFrequencia] = useState({mes: '1', frequencia: []} as IDesenvolvimento);
    const [inputMonth, setInputMonth] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [sundays, setSundays] = useState([] as Array<number>);
    const [princesa, setPrincesa] = useState('');
    const [pretoVelho, setPretoVelho] = useState('');
    const [caboclo, setCaboclo] = useState('');
    const [medico, setMedico] = useState('');
    const [dtEmplac, setDtEmplac] = useState('');
    const [desistencia, setDesistencia] = useState('');
  
    const navigate = useNavigate();

    const now = new Date();

    const formatMonthYear = new Intl.DateTimeFormat('pt-BR', {month: 'long', year: 'numeric'});

    const getSundays = (selectedDate: Date) => {
        const month = selectedDate.getMonth();
        const year = selectedDate.getFullYear();
        const sundays = [];
        const date = new Date(year, month, 1);
        while(date.getMonth() === month) {
            if (date.getDay() === 0) {
                sundays.push(date.getDate());
            }
            date.setDate(date.getDate() + 1);
        }
        setSundays(sundays);
    }

    const toPreviousMonth = () => {
        const previousMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1);
        setSelectedMonth(previousMonth);
    } 

    const toNextMonth = () => {
        const nextMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1);
        setSelectedMonth(nextMonth);
    } 

    const handleClickMedium = (medium_id: number) => {
        const medium : IMedium = mediuns.find((item: IMedium) => item.medium_id === medium_id)
        setShowModalMedium(true);
        setSelectModal('medium');
        setSelectedMedium(medium);
        setPrincesa(medium.princesa);
        setPretoVelho(medium.pretovelho);
        setCaboclo(medium.caboclo);
        setMedico(medium.medico);
    }

    const closeModal = () => {
        setShowModalMedium(false);
        setSelectModal('');
        setSelectedMedium(defaultMedium);
        setDropMedium(defaultMedium);
        setSearchMedium('');
        setInputMonth('');
        setPrincesa('');
        setPretoVelho('');
        setCaboclo('');
        setMedico('');
        setDtEmplac('');
    }

    const updateDesenvolvimento = async (token: string, frequencia: IDesenvolvimento) => {
        const month = frequencia.mes;
        const text = JSON.stringify({frequencia: frequencia.frequencia})
        try {
            await api.post('/desenvolvimento/update', {mes: month, freq: text}, {headers:{Authorization: token}})
            console.log(`Frequencia ${month} atualizada`);
            await loadDesenvolvimento(token);
        } catch (error) {
            console.log('Não foi possível atualizar a frequência do desenvolvimento', error);
        }
    }

    const addMediumInDesenv = async (medium: IMedium) => {
        try {
            const newFrequencia : IDesenvolvimento = {
                ...frequencia,
                frequencia: [
                    ...frequencia.frequencia,
                    {medium: medium.medium_id, dia1: '-', dia2: '-', dia3: '-', dia4: '-', dia5: '-'}
                ]
            }
            setFrequencia(newFrequencia);
            await updateDesenvolvimento(token, newFrequencia);
            Alert('Médium adicionado com sucesso', 'success');
            closeModal();
        } catch (error) {
            console.log('Não foi possível adicionar o médium ao desenvolvimento', error);
            Alert('Não foi possível adicionar o médium ao desenvolvimento', 'error');
        }
    };

    const updateFrequencia = async (medium: number, dia: 1 | 2 | 3 | 4 | 5, valor: '-' | 'N' | 'P' | 'F') => {
        const selectedData = frequencia.frequencia.find((item: IFrequencia) => item.medium === medium);
        if (selectedData) {
            selectedData[`dia${dia}`] = valor;
            const removeOldData : IDesenvolvimento = {
                ...frequencia,
                frequencia: frequencia.frequencia.filter((item: IFrequencia) => item.medium !== medium)
            };
            const newFrequencia : IDesenvolvimento = {
                ...removeOldData,
                frequencia: [
                    ...removeOldData.frequencia,
                    selectedData
                ]
            } 
            try {
                setFrequencia(newFrequencia);
                await updateDesenvolvimento(token, newFrequencia);
            } catch (error) {
                console.log('Não foi possível atualizar a frequencia do dia', error);
            }
        }
    };

    const removeMediumInDesenv = async (medium: IMedium) => {
        const confirmText = `Tem certeza que quer remover este médium da frequência de ${formatMonthYear.format(selectedMonth)}?`
        const newFrequencia : IDesenvolvimento = {
            ...frequencia,
            frequencia: frequencia.frequencia.filter((item: IFrequencia) => item.medium !== medium.medium_id)
        }
        try {
            await Confirm(confirmText, 'question', 'Cancelar', 'Confirmar', async () => {
                await api.delete(`/consagracao/delete?consagracao_id=${selectedMedium.medium_id}`, {headers:{Authorization: token}})
                setFrequencia(newFrequencia);
                await updateDesenvolvimento(token, newFrequencia);
                Alert('Médium removido com sucesso', 'success');
                closeModal();
            })
        } catch (error) {
            console.log('Não foi possível excluir médium da frequência do desenvolvimento', error);
            Alert('Não foi possível excluir médium da frequência do desenvolvimento', 'error');
        }
    }

    const updateMentor = async (token: string) => {
        const updateObject = {};
        if (princesa) {
            Object.assign(updateObject, {princesa: princesa});
        }
        if (pretoVelho) {
            Object.assign(updateObject, {pretovelho: pretoVelho});
        }
        if (caboclo) {
            Object.assign(updateObject, {caboclo: caboclo});
        }
        if (medico) {
            Object.assign(updateObject, {medico: medico});
        }
        try {
            await api.put('/medium/update', {...updateObject, medium_id: selectedMedium.medium_id}, {headers:{Authorization: token}});
            Alert(`${selectedMedium.med === 'Apará' ? 'Mentores atualizados' : 'Mentor atualizado'} com sucesso`, 'success');
            await loadMedium(token);
            await loadDesenvolvimento(token);
            closeModal();
        } catch (error) {
            console.log('Não foi possível atualizar os mentores do médium', error);
            Alert('Não foi possível atualizar os mentores do médium', 'error');
        }                
    }

    const updateEmplac = async (token: string) => {
        try {
            await api.put('/medium/update', {medium_id: selectedMedium.medium_id, dtEmplac: dtEmplac}, {headers:{Authorization: token}});
            Alert('Médium emplacado com sucesso', 'success');
            await loadMedium(token);
            await loadDesenvolvimento(token);
            closeModal();
        } catch (error) {
            console.log('Não foi possível emplacar o médium', error);
            Alert('Não foi possível emplacar o médium', 'error');
        }                
    }

    const handleDesistente = async (token: string) => {
        try {
            const newEvento = {
                medium: selectedMedium.medium_id,
                data: desistencia,
                mensagem: 'Desistiu do Desenvolvimento',
                tipo: 'Desistente do Desenvolvimento',
                observ: ''
            };
            await api.put('/medium/update', {medium_id: selectedMedium.medium_id, condicao: 'Afastado'}, {headers:{Authorization: token}});
            await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            Alert('Médium marcado como desistente', 'success');
            await loadMedium(token);
            await loadDesenvolvimento(token);
            closeModal();
        } catch (error) {
            console.log('Não foi possível marcar o médium como desistente', error);
            Alert('Não foi possível marcar o médium como desistente', 'error');
        }                
    }

    const importPreviousMonth = async (month: Date, token: string) => {
        const previousMonth = new Date(month.getFullYear(), month.getMonth() - 1);
        const stringPreviousMonth = `${previousMonth.getFullYear()}-${String(previousMonth.getMonth() + 1).padStart(2, '0')}`;
        const previousFrequencia = allFrequencia.find((item: IDesenvolvimento) => item.mes === stringPreviousMonth);
        const newFrequencia : Array<IFrequencia> = [];
        if (previousFrequencia) {
            previousFrequencia.frequencia.forEach((item: IFrequencia) => {
                const medium = mediuns.find((m: IMedium) => m.medium_id === item.medium);
                if (!medium.dtEmplac && medium.condicao === 'Ativo') {
                    newFrequencia.push({medium: medium.medium_id, dia1: '-', dia2: '-', dia3: '-', dia4: '-', dia5: '-'});
                }
            })
            if (newFrequencia.length > 0) {
                const stringMonth = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
                updateDesenvolvimento(token, {mes: stringMonth, frequencia: newFrequencia});
                Alert('Dados importados com sucesso', 'success');
            } else {
                Alert('Não há dados para importar', 'info');
            }
        } else {
            Alert('Não há dados para importar', 'info');
        }
    }

    useEffect(() => {
        loadDesenvolvimento(token);
    }, []);

    useEffect(() => {
        console.log(frequencia);
    }, [frequencia]);

    useEffect(() => {
        getSundays(selectedMonth);
        const stringMonth = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`;
        const newFrequencia = allFrequencia.find((item: IDesenvolvimento) => item.mes === stringMonth);
        setFrequencia(newFrequencia ? newFrequencia : {mes: stringMonth, frequencia: []});
    }, [selectedMonth, allFrequencia]);

    useEffect(() => {
        if(mediuns.length && allFrequencia) {
            setLoading(false);
        }
    }, [mediuns, allFrequencia])
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Frequência', click: '/desenvolvimento'},
        {title: 'Cadastrar Aspirante', click: '/desenvolvimento'},
        {title: 'Documentos', click: '/desenvolvimento'}
    ]

    if(loading) {
        return <Loading />
    }
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Desenvolvimento - Frequência" >
            <MonthNameContainer>
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <MonthArrow points="30,0 5,15 30,30" onClick={() => toPreviousMonth()}/>
                </svg>
                <h2 onClick={() => {
                    setSelectModal('data');
                    setShowModalMedium(true);
                }}>
                    {formatMonthYear.format(selectedMonth).charAt(0).toUpperCase() + formatMonthYear.format(selectedMonth).slice(1)}
                </h2>
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <MonthArrow disabled={selectedMonth.getMonth() === now.getMonth()} points="0,0 25,15 0,30" onClick={() => toNextMonth()}/>
                </svg>
            </MonthNameContainer>                
                <DesenvCard>
                    {frequencia && frequencia.frequencia.length > 0 ?
                        <>
                            <ResultsTable>
                                <Results columns={sundays.length}>
                                    <ResultsTitle align="left">Médium</ResultsTitle>
                                    {sundays.map(dia => (
                                        <ResultsTitle key={dia}>Dia {String(dia).padStart(2, '0')}</ResultsTitle>
                                    ))}
                                </Results>
                                {frequencia.frequencia
                                    .sort((a: IFrequencia, b: IFrequencia) => {
                                        const nomeA = mediuns.find((m: IMedium) => m.medium_id === a.medium)?.nome?.toLowerCase() || '';
                                        const nomeB = mediuns.find((m: IMedium) => m.medium_id === b.medium)?.nome?.toLowerCase() || '';
                                        if (nomeA < nomeB) return -1;
                                        if (nomeA > nomeB) return 1;
                                        return 0
                                    })
                                    .map((item: IFrequencia, index: number) => (
                                        <Results columns={sundays.length} key={index}>
                                            <ResultsName onClick={() => handleClickMedium(item.medium)}>
                                                {mediuns.find((m: IMedium) => m.medium_id === item.medium)?.nome}
                                                <ResultsDetails>{mediuns.find((m: IMedium) => m.medium_id === item.medium)?.med} - {showTemplo(mediuns.find((m: IMedium) => m.medium_id === item.medium), templos)}</ResultsDetails>
                                            </ResultsName>
                                            {sundays.map((dia: number, index: number) => {
                                                const diaNumber = (index + 1) as 1 | 2 | 3 | 4 | 5
                                                return (
                                                    <ResultsData key={dia}>
                                                        <select value={item[`dia${index + 1}` as keyof IFrequencia]} onChange={(e) => updateFrequencia(item.medium, diaNumber, e.target.value as '-' | 'P' | 'F' | 'N')}>
                                                            <option value={'-'}>-</option>
                                                            <option value={'P'}>P</option>
                                                            <option value={'F'}>F</option>
                                                            <option value={'N'}>N</option>
                                                        </select>
                                                    </ResultsData>
                                                )
                                            })}
                                        </Results>
                                    ))
                                }
                            </ResultsTable>
                            <DesenvLegend>Legenda: P = Presente, F = Falta, N = Não teve aula</DesenvLegend>
                        </>
                    : 
                        <>
                            <ResultsTitle>Nenhum Médium</ResultsTitle>
                            <NavigateButton width="250px" onClick={() => importPreviousMonth(selectedMonth, token)}>Importar do mês anterior</NavigateButton>
                        </>
                    }
                </DesenvCard>
                <ButtonContainer>
                    <NavigateButton width="250px" onClick={() => {
                        setSelectModal('adicionar');
                        setShowModalMedium(true);
                    }}>Adicionar Médium</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={showModalMedium}>
                <ModalMediumContent vis={selectModal === 'medium'}>
                    <ModalTitle>{selectedMedium.nome}</ModalTitle>
                    <NavigateButton style={{marginBottom: '20px'}} width="230px" onClick={() => navigate(`/mediuns/consulta/${selectedMedium.medium_id}`)}>Ver ficha</NavigateButton>
                    <NavigateButton width="230px" onClick={() => setSelectModal('mentor')}>Atualizar {selectedMedium.med === 'Apará' ? 'Mentores' : 'Mentor'}</NavigateButton>
                    <NavigateButton width="230px" onClick={() => setSelectModal('Desistência')}>Marcar como Desistente</NavigateButton>
                    <NavigateButton width="230px" disabled={Boolean(selectedMedium.dtEmplac)} onClick={() => setSelectModal('emplacamento')}>Emplacar</NavigateButton>
                    <NavigateButton width="230px" color="red" onClick={() => removeMediumInDesenv(selectedMedium)}>Remover</NavigateButton>
                    <NavigateButton style={{marginTop: '20px'}} width="230px" color="red" onClick={() => closeModal()}>Fechar</NavigateButton>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'adicionar'}>
                    <ModalTitle>Adicionar Médium no Desenvolvimento</ModalTitle>
                    <ModalSubTitle>Mês: {formatMonthYear.format(selectedMonth)}</ModalSubTitle>
                    <InputContainer>
                        <label>Nome do Médium</label>
                        <AutocompleteInput 
                            label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                            default={defaultMedium}
                            options={mediuns.filter((item: IMedium) => item.condicao !== 'Desencarnado')}
                            equality={(option, value) => option.medium_id === value.medium_id}
                            value={dropMedium}
                            setValue={setDropMedium}
                            inputValue={searchMedium}
                            setInputValue={setSearchMedium}
                            onKeyUp={async () => await addMediumInDesenv(dropMedium)}
                        />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium === defaultMedium} onClick={async () => await addMediumInDesenv(dropMedium)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'mentor'}>
                    <ModalTitle>Atualizar {selectedMedium.med === 'Apará' ? 'Mentores' : 'Mentor'}</ModalTitle>
                    <ModalSubTitle>Médium: {selectedMedium.nome}</ModalSubTitle>
                    {selectedMedium.med === 'Doutrinador' ? 
                        <InputContainer>
                            <label>Princesa</label>
                            <select value={princesa} onKeyUp={(e) => handleEnterPress(e, () => updateMentor(token))} onChange={(e) => setPrincesa(e.target.value)}>
                                <option value={''}></option>
                                {princesas.map((item: string, index: number) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </InputContainer>
                    : selectedMedium.med === 'Apará' ?
                        <InputContainer>
                            <label>Preto Velho</label>
                            <input type="text" value={pretoVelho} onKeyUp={(e) => handleEnterPress(e, () => updateMentor(token))} onChange={(e) => setPretoVelho(formatInputText(e.target.value))}/>
                            <label>Caboclo</label>
                            <input type="text" value={caboclo} onKeyUp={(e) => handleEnterPress(e, () => updateMentor(token))} onChange={(e) => setCaboclo(formatInputText(e.target.value))}/>
                            <label>Médico</label>
                            <input type="text" value={medico} onKeyUp={(e) => handleEnterPress(e, () => updateMentor(token))} onChange={(e) => setMedico(formatInputText(e.target.value))}/>
                        </InputContainer>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={!princesa && !pretoVelho && !caboclo && !medico} onClick={() => updateMentor(token)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'data'}>
                    <ModalTitle>Consultar Frequência</ModalTitle>
                    <InputContainer>
                        <label>Selecione um mês</label>
                        <input type="month" max={`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`} value={inputMonth} onKeyUp={(e) => handleEnterPress(e, () => {
                            const [year, month] = inputMonth.split('-');
                            const newDate = new Date(Number(year), Number(month) - 1, 1);
                            setSelectedMonth(newDate);
                            closeModal();
                        })} onChange={(e) => setInputMonth(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => {
                            const [year, month] = inputMonth.split('-');
                            const newDate = new Date(Number(year), Number(month) - 1, 1);
                            setSelectedMonth(newDate);
                            closeModal();
                        }}>OK</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'emplacamento'}>
                    <ModalTitle>Emplacar Médium</ModalTitle>
                    <ModalSubTitle>{selectedMedium.nome}</ModalSubTitle>
                    <InputContainer>
                        <label>Data de Emplacamento</label>
                        <input type="date" max={`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`} value={dtEmplac} onKeyUp={(e) => handleEnterPress(e, () => updateEmplac(token))} onChange={(e) => setDtEmplac(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={!dtEmplac} onClick={() => updateEmplac(token)}>Emplacar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'Desistência' || selectModal === 'Retorno'}>
                    <ModalTitle>{`${selectModal} do Médium`}</ModalTitle>
                    <ModalSubTitle>{selectedMedium.nome}</ModalSubTitle>
                    <InputContainer>
                        <label>{`Data de ${selectModal}`}</label>
                        <input type="date" max={`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`} value={desistencia} onKeyUp={(e) => handleEnterPress(e, () => {
                            if (selectModal === 'Desistência') {
                                handleDesistente(token)
                            } else {
                                console.log('continua')
                            }
                        })} onChange={(e) => setDesistencia(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={!desistencia} onClick={() => {
                            if (selectModal === 'Desistência') {
                                handleDesistente(token)
                            } else {
                                console.log('continua')
                            }
                        }}>OK</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
    )
}

export default Desenvolvimento