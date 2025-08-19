import { ButtonContainer, EditObs, EventDetails, EventTable, EventTitle, TimelineContainer, YearCard, YearTitle } from "./styles";
import { useCallback, useContext, useEffect, useState } from "react";
import { defaultEvento, eventTypes } from "src/utilities/default";
import { IEvento, IMedium } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { ListContext } from "src/contexts/ListContext";
import { convertDate, generateListEventos, handleEnterPress } from "src/utilities/functions";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import api from "src/api";
import { Alert, Confirm } from "src/utilities/popups";
import { NavigateButton } from "src/components/buttons/buttons";
import { InputContainer } from "src/components/cardsContainers/cardsContainers";

function TimeLine(props: {medium: IMedium}) {
    const [eventos, setEventos] = useState([] as Array<IEvento>);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultEvento);
    const [edited, setEdited] = useState(defaultEvento);
    const [dropClassif, setDropClassif] = useState('');

    const { user, token } = useContext(UserContext);
    const { ministros, cavaleiros, guias, classificacao } = useContext(ListContext);

    interface ITipo {
        event: string,
        prior: number,
        auto: boolean
    }

    const loadEventosMedium = useCallback(async (medium: IMedium, token: string) => {
        try {
            const evento = await generateListEventos(medium, token, ministros, cavaleiros, guias);
            setEventos(evento);
        } catch (error) {
            console.error('Erro ao carregar a lista de eventos da linha do tempo do médium', error);
        }
    }, [cavaleiros, guias, ministros])

    const addEvento = async (evento: IEvento, token: string) => {
        if(!evento.data) {
            Alert('Informe uma data válida', 'warning');
        } else if (!evento.tipo) {
            Alert('Informe um tipo para o evento', 'warning');
        } else if (evento.tipo === 'Classificações' && !evento.mensagem.includes('Classificação de')) {
            Alert('Informe a classificação', 'warning');
        } else if (!evento.mensagem) {
            Alert('Insira uma descrição para o evento', 'warning');
        } else {
            try {
                const newEvento = {
                    medium: props.medium.medium_id,
                    data: evento.data,
                    mensagem: evento.mensagem,
                    tipo: evento.tipo,
                    observ: evento.observ
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
                Alert(edit? 'Evento editado com sucesso' : 'Evento adicionado com sucesso à linha do tempo', 'success');
                await loadEventosMedium(props.medium, token);
                closeModal();
            } catch (error) {
                console.error(edit? 'Não foi possível editar o evento' : 'Não foi possível adicionar o evento à linha do tempo', error);
                Alert(edit? 'Não foi possível editar o evento' : 'Não foi possível adicionar o evento à linha do tempo', 'error');
            }
        }
    }

    const editEvento = async (newEvent: IEvento, oldEvent: IEvento, token: string) => {
        const changedFields = {} as any
        for (const key in newEvent){
            if (newEvent[key as keyof IEvento] !== oldEvent[key as keyof IEvento]){
                changedFields[key as keyof IEvento] = newEvent[key as keyof IEvento]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await api.put('/evento/update', {evento_id: oldEvent.evento_id, ...changedFields}, {headers:{Authorization: token}})
                Alert('Evento editado com sucesso', 'success');
                await loadEventosMedium(props.medium, token);
                closeModal();
            } catch (error) {
                console.error('Não foi possível editar o evento', error);
                Alert('Não foi possível editar o evento', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no evento', 'info')
        }
    }

    const deleteEvento = async () => {
        await Confirm(`Tem certeza que quer excluir ${!eventTypes.find((item: ITipo) => item.event === selected.tipo)?.auto ? '' : 'as observações d'}este evento?`, 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                await api.delete(`/evento/delete?evento_id=${selected.evento_id}`, {headers:{Authorization: token}})
                Alert(`${!eventTypes.find((item: ITipo) => item.event === selected.tipo)?.auto ? 'Evento excluído' : 'Observações excluídas'} com sucesso`, 'success');
                await loadEventosMedium(props.medium, token);
                closeModal();
            } catch (error) {
                console.error('Erro ao excluir evento da linha do tempo', error);
                Alert('Erro ao excluir evento da linha do tempo', 'error');
            }
        });
    }
    
    useEffect(() => {
        loadEventosMedium(props.medium, token) 
    }, [props.medium, loadEventosMedium, token])
    
    const updateProps = (property: string, newValue: any) => {
        setEdited((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };

    const modalAddEvento = () => {
        setEdit(false);
        setEdited(defaultEvento);
        setSelected(defaultEvento);
        setDropClassif('');
        setShowModal(true);
    }

    const modalEditEvento = (evento: IEvento) => {
        setEdit(true);
        setEdited(evento);
        setSelected(evento);
        setDropClassif(evento.mensagem.split('de ')[1]);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultEvento);
        setSelected(defaultEvento);
        setDropClassif('');
    }

    const arrayCards = [];

    for(let i = new Date().getFullYear(); i >= new Date(props.medium.dtIngresso).getFullYear(); i--) {
        arrayCards.push(
            <YearCard key={i} show={eventos.filter((item: IEvento) => new Date(item.data).getFullYear() === i).length > 0}>
                <YearTitle>{i}</YearTitle>
                <EventTable>
                    {eventos
                        .filter((item: IEvento) => new Date(item.data).getFullYear() === i)
                        .map((item: IEvento, index: number) => (
                            <div style={{display: 'flex', flexDirection: 'column'}} key={index}>
                                <EventTitle onClick={() => modalEditEvento(item)}>{convertDate(item.data)} - {item.mensagem}</EventTitle>
                                <EventDetails>{item.observ}</EventDetails>
                            </div>
                        ))
                    }
                </EventTable>
            </YearCard>
        )
    }

    return (
        <>
            <TimelineContainer>
                <h2>Linha do Tempo</h2>
                <EditObs>Clique sobre um evento para editar ou adicionar observações</EditObs>
                <ButtonContainer>
                    <NavigateButton width="200px" height="45px" onClick={() => modalAddEvento()}>Adicionar Evento</NavigateButton>
                </ButtonContainer>
                {arrayCards}
            </TimelineContainer>
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>{edit? 'Editar Evento' : 'Adicionar Evento'}</ModalTitle>
                    <InputContainer>
                        <label>Data</label>
                        <input type="date" value={edited.data} disabled={edit && !selected.evento_id} onKeyUp={edit && selected.evento_id? (e) => handleEnterPress(e, async () => async () => await editEvento(edited, selected, token)) : (e) => handleEnterPress(e, async () => await addEvento(edited, token))} onChange={(e) => updateProps('data', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Tipo</label>
                        <select value={edited.tipo} disabled={edit && !selected.evento_id} onChange={(e) => updateProps('tipo', e.target.value)}>
                            <option value=''></option>
                            {eventTypes.map((item: ITipo, index: number) => (
                                <option key={index} value={item.event} style={{ display: item.auto? 'none' : 'block' }}>{item.event}</option>
                            ))}
                        </select>
                    </InputContainer>
                    {edited.tipo === 'Classificações' ? 
                        <InputContainer>
                            <label>Classificação</label>
                            <select value={dropClassif} disabled={edit && !selected.evento_id} onChange={(e) => {
                                setDropClassif(e.target.value);
                                updateProps('mensagem', `Classificação de ${e.target.value}`);
                            }}>
                                <option value=''></option>
                                {[...classificacao.sol, ...classificacao.lua].map((item: string, index: number) => (
                                    <option key={index} value={item} disabled={eventos.some((e: IEvento) => e.tipo === 'Classificações' && e.mensagem.includes(item))}>{item}</option>
                                ))}
                            </select>
                        </InputContainer>
                    :
                        <InputContainer>
                            <label>Descrição</label>
                            <textarea value={edited.mensagem} disabled={edit && !selected.evento_id} onKeyUp={edit && selected.evento_id? (e) => handleEnterPress(e, async () => async () => await editEvento(edited, selected, token)) : (e) => handleEnterPress(e, async () => await addEvento(edited, token))} onChange={(e) => updateProps('mensagem', e.target.value)} />
                        </InputContainer>
                    }
                    <InputContainer>
                        <label>Observações</label>
                        <textarea value={edited.observ} onKeyUp={edit && selected.evento_id? (e) => handleEnterPress(e, async () => async () => await editEvento(edited, selected, token)) : (e) => handleEnterPress(e, async () => await addEvento(edited, token))} onChange={(e) => updateProps('observ', e.target.value)} />
                    </InputContainer>
                    {edit && user.level === 'Administrador' && selected.evento_id ?
                        <ModalButton color="red" style={{alignSelf: 'center', width: '220px', minHeight: '35px'}} onClick={() => deleteEvento()}>{!eventTypes.find((item: ITipo) => item.event === selected.tipo)?.auto ? 'Excluir Evento' : 'Excluir Observações'}</ModalButton>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit && selected.evento_id? async () => await editEvento(edited, selected, token) : async () => await addEvento(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TimeLine