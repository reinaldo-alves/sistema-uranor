import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import { ButtonContainer, ConsagracaoCard, DesenvLegend, InputContainer, ModalMediumContent, MonthArrow, MonthNameContainer, NavigateButton, Results, ResultsData, ResultsDetails, ResultsName, ResultsTable, ResultsTitle } from "./styles";
import { formatInputText, handleEnterPress } from "src/utilities/functions";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IDesenvolvimento, IFrequencia, IMedium } from "src/types/types";
import { Alert, Confirm } from "src/utilities/popups";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultFrequencia, defaultMedium } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import { Modal, ModalButton, ModalSubTitle, ModalTitle } from "src/components/Modal/modal";

function Desenvolvimento() {
    const { loadDesenvolvimento, allFrequencia, princesas } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);
    const { token } = useContext(UserContext);

    const [showModalMedium, setShowModalMedium] = useState(false);
    const [selectModal, setSelectModal] = useState('')
    const [selectedMedium, setSelectedMedium] = useState(defaultMedium);
    const [dropMedium, setDropMedium] = useState(defaultMedium);
    const [searchMedium, setSearchMedium] = useState('');
    const [frequencia, setFrequencia] = useState({mes: '1', frequencia: defaultFrequencia} as IDesenvolvimento);
    const [inputMonth, setInputMonth] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [sundays, setSundays] = useState([] as Array<number>);
    const [princesa, setPrincesa] = useState('');
    const [pretoVelho, setPretoVelho] = useState('');
    const [caboclo, setCaboclo] = useState('');
    const [medico, setMedico] = useState('');
    const [dtEmplac, setDtEmplac] = useState('');
  
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
        const medium = mediuns.find((item: IMedium) => item.medium_id === medium_id)
        setShowModalMedium(true);
        setSelectModal('medium');
        setSelectedMedium(medium);
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

    const removeElevacao = async (token: string) => {
        const confirmText = 'Tem certeza que quer remover este médium da lista de elevação?' 
        
        try {
            await Confirm(confirmText, 'question', 'Cancelar', 'Confirmar', async () => {
                await api.delete(`/consagracao/delete?consagracao_id=${selectedMedium.medium_id}`, {headers:{Authorization: token}})
                Alert('Médium removido com sucesso', 'success');
                await loadDesenvolvimento(token);
                closeModal();
            })
        } catch (error) {
            console.log('Não foi possível excluir médium da lista de elevação', error);
            Alert('Não foi possível excluir médium da lista de elevação', 'error');
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
        setFrequencia(newFrequencia ? newFrequencia : {mes: stringMonth, frequencia: defaultFrequencia});
    }, [selectedMonth]);
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Frequência', click: '/desenvolvimento'},
        {title: 'Cadastrar Aspirante', click: '/desenvolvimento'},
        {title: 'Documentos', click: '/desenvolvimento'}
    ]
    
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
            <ConsagracaoCard hide={frequencia.frequencia.length <= 1}>
                    <ResultsTable show={frequencia.frequencia.length - 1}>
                        <Results columns={sundays.length}>
                            <ResultsTitle align="left">Médium</ResultsTitle>
                            {sundays.map(dia => (
                                <ResultsTitle key={dia}>Dia {String(dia).padStart(2, '0')}</ResultsTitle>
                            ))}
                        </Results>
                        {frequencia && frequencia.frequencia.length > 1 ? 
                            frequencia.frequencia
                                .filter((item: IFrequencia) => item.medium !== 0)
                                .map((item: IFrequencia, index: number) => (
                                    <Results columns={sundays.length} key={index}>
                                        <ResultsName onClick={() => handleClickMedium(item.medium)}>
                                            {mediuns.find((m: IMedium) => m.medium_id === item.medium)?.nome}
                                            <ResultsDetails>{mediuns.find((m: IMedium) => m.medium_id === item.medium)?.med} - Jaboatão - PE</ResultsDetails>
                                        </ResultsName>
                                        {sundays.map(dia => (
                                            <ResultsData key={dia}>
                                                <select>
                                                    <option>-</option>
                                                    <option>P</option>
                                                    <option>F</option>
                                                    <option>N</option>
                                                </select>
                                            </ResultsData>
                                        ))}
                                    </Results>
                                ))
                        : ''}
                    </ResultsTable>
                    <DesenvLegend>Legenda: P = Presente, F = Falta, N = Não teve aula</DesenvLegend>
                </ConsagracaoCard>
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
                    <NavigateButton width="230px" onClick={() => {
                        closeModal();
                    }}>Marcar como Desistente</NavigateButton>
                    <NavigateButton width="230px" disabled={false} onClick={() => setSelectModal('emplacamento')}>Emplacar</NavigateButton>
                    <NavigateButton width="230px" color="red" onClick={() => removeElevacao(token)}>Remover</NavigateButton>
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
                            options={mediuns}
                            disabledOptions={(option) => option.condicao !== 'Ativo'}
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
                            <select value={princesa} onChange={(e) => setPrincesa(e.target.value)}>
                                <option value={''}></option>
                                {princesas.map((item: string, index: number) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </InputContainer>
                    : selectedMedium.med === 'Apará' ?
                        <InputContainer>
                            <label>Preto Velho</label>
                            <input type="text" value={pretoVelho} onChange={(e) => setPretoVelho(formatInputText(e.target.value))}/>
                            <label>Caboclo</label>
                            <input type="text" value={caboclo} onChange={(e) => setCaboclo(formatInputText(e.target.value))}/>
                            <label>Médico</label>
                            <input type="text" value={medico} onChange={(e) => setMedico(formatInputText(e.target.value))}/>
                        </InputContainer>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={!princesa && !pretoVelho && !caboclo && !medico} onClick={() => {}}>Salvar</ModalButton>
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
                        <input type="date" max={`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`} value={dtEmplac} onKeyUp={(e) => handleEnterPress(e, () => {})} onChange={(e) => setDtEmplac(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={!dtEmplac} onClick={() => {}}>Emplacar</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
    )
}

export default Desenvolvimento