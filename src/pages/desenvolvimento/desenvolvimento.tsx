import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import { ButtonContainer, ConsagracaoCard, DesenvLegend, InputContainer, ModalMediumContent, MonthArrow, MonthNameContainer, NavigateButton, Results, ResultsData, ResultsDetails, ResultsName, ResultsTable, ResultsTitle } from "./styles";
import { alphabeticOrder, handleEnterPress } from "src/utilities/functions";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao } from "src/types/types";
import { Alert, Confirm } from "src/utilities/popups";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultMedium } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import { Modal, ModalButton, ModalSubTitle, ModalTitle } from "src/components/Modal/modal";

function Desenvolvimento() {
    const { listElevacao, loadConsagracao } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);
    const { token } = useContext(UserContext);

    const [showModalMedium, setShowModalMedium] = useState(false);
    const [selectModal, setSelectModal] = useState('')
    const [selected, setSelected] = useState({} as IConsagracao);
    const [dropMedium, setDropMedium] = useState(defaultMedium);
    const [searchMedium, setSearchMedium] = useState('');
    const [checkMudanca, setCheckMudanca] = useState(false);
    const [inputMonth, setInputMonth] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [sundays, setSundays] = useState([] as Array<number>);
  
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

    const handleClickMedium = (medium: IConsagracao) => {
        setShowModalMedium(true);
        setSelectModal('medium');
        setSelected(medium);
    }

    const closeModal = () => {
        setShowModalMedium(false);
        setSelectModal('');
        setSelected({} as IConsagracao);
        setDropMedium(defaultMedium);
        setSearchMedium('');
        setCheckMudanca(false);
        setInputMonth('');
    }

    const addElevacao = async (token: string) => {
        const confirmText = `Adicionar ${dropMedium.nome} ${checkMudanca ? 'nas listas de iniciação e elevação?' : 'na lista de elevação?'}` 
        const consNumber = checkMudanca ? 4 : 2;
        
        try {
            await Confirm(confirmText, 'question', 'Cancelar', 'Confirmar', async () => {
                await api.post('/consagracao/add', {medium: dropMedium.medium_id, consagracao: consNumber, termo: 0}, {headers:{Authorization: token}})
                Alert('Médium adicionado com sucesso', 'success');
                await loadConsagracao(token);
                closeModal();
            })
        } catch (error) {
            console.log('Não foi possível adicionar o médium da lista de elevação', error);
            Alert('Não foi possível adicionar o médium da lista de elevação', 'error');
        }
    }

    const removeElevacao = async (token: string) => {
        const confirmText = `Tem certeza que quer remover este médium ${selected.consagracao === 4 ? 'das listas de iniciação e elevação?' : 'da lista de elevação?'}` 
        
        try {
            await Confirm(confirmText, 'question', 'Cancelar', 'Confirmar', async () => {
                await api.delete(`/consagracao/delete?consagracao_id=${selected.consagracao_id}`, {headers:{Authorization: token}})
                Alert('Médium removido com sucesso', 'success');
                await loadConsagracao(token);
                closeModal();
            })
        } catch (error) {
            console.log('Não foi possível excluir médium da lista de elevação', error);
            Alert('Não foi possível excluir médium da lista de elevação', 'error');
        }
    }

    useEffect(() => {
        loadConsagracao(token);
    }, []);

    useEffect(() => {
        getSundays(selectedMonth);
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
            <ConsagracaoCard hide={![...listElevacao].length}>
                    <ResultsTable show={[...listElevacao].length}>
                        <Results columns={sundays.length}>
                            <ResultsTitle align="left">Médium</ResultsTitle>
                            {sundays.map(dia => (
                                <ResultsTitle key={dia}>Dia {String(dia).padStart(2, '0')}</ResultsTitle>
                            ))}
                        </Results>
                        {alphabeticOrder([...listElevacao])
                            .map((item: IConsagracao, index: number) => (
                                <Results columns={sundays.length} key={index}>
                                    <ResultsName onClick={() => handleClickMedium(item)}>
                                        {item.nome}
                                        <ResultsDetails>Doutrinador - Jaboatão - PE</ResultsDetails>
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
                        }
                    </ResultsTable>
                    <DesenvLegend>Legenda: P = Presente, F = Falta, N = Não teve aula</DesenvLegend>
                </ConsagracaoCard>
                <ButtonContainer>
                    <NavigateButton width="250px" onClick={() => {
                        setSelectModal('adicionar');
                        setShowModalMedium(true);
                    }}>Adicionar Médium</NavigateButton>
                    <NavigateButton disabled={![...listElevacao].length} width="250px" color="red" onClick={() => navigate('/consagracoes/elevacao/atualizar')}>Atualizar Emplacamento</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={showModalMedium}>
                <ModalMediumContent vis={selectModal === 'medium'}>
                    <ModalTitle>{selected.nome}</ModalTitle>
                    <NavigateButton style={{marginBottom: '20px'}} width="230px" onClick={() => navigate(`/mediuns/consulta/${selected.medium}`)}>Ver ficha</NavigateButton>
                    <NavigateButton width="230px" onClick={() => setSelectModal('mentor')}>Atualizar Mentor</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {
                        closeModal();
                    }}>Marcar como Desistente</NavigateButton>
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
                            onKeyUp={() => addElevacao(token)}
                        />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium === defaultMedium} onClick={() => addElevacao(token)}>Salvar</ModalButton>
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
            </Modal>
        </>
    )
}

export default Desenvolvimento