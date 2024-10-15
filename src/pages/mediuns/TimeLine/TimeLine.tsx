import Header from "src/components/header/header";
import { ButtonContainer, EditObs, InputContainer, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, YearTitle } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { defaultEvento, defaultMedium, eventTypes } from "src/utilities/default";
import { MediumContext } from "src/contexts/MediumContext";
import { IEvento, IMedium } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { ListContext } from "src/contexts/ListContext";
import Loading from "src/utilities/Loading";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import { convertDate, generateListEventos, handleEnterPress } from "src/utilities/functions";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import api from "src/api";
import { Alert, Confirm } from "src/utilities/popups";
import MainContainer from "src/components/MainContainer/MainContainer";
import { NavigateButton } from "src/components/buttons/buttons";

function TimeLine() {
    const [medium, setMedium] = useState(defaultMedium);
    const [eventos, setEventos] = useState([] as Array<IEvento>);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultEvento);
    const [edited, setEdited] = useState(defaultEvento);
    const [dropClassif, setDropClassif] = useState('');

    const { user, token, getUser } = useContext(UserContext);
    const { mediuns, loadMedium } = useContext(MediumContext);
    const { ministros, cavaleiros, guias, classificacao, getData } = useContext(ListContext);
    const navigate = useNavigate();
    const params = useParams();

    interface ITipo {
        event: string,
        prior: number,
        auto: boolean
    }

    useEffect(() => {
        console.log(edited);
    }, [edited])

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
                    medium: medium.medium_id,
                    data: evento.data,
                    mensagem: evento.mensagem,
                    tipo: evento.tipo,
                    observ: evento.observ
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
                Alert(edit? 'Evento editado com sucesso' : 'Evento adicionado com sucesso à linha do tempo', 'success');
                await loadEventosMedium(medium, token);
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
                await loadEventosMedium(medium, token);
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
                await loadEventosMedium(medium, token);
                closeModal();
            } catch (error) {
                console.error('Erro ao excluir evento da linha do tempo', error);
                Alert('Erro ao excluir evento da linha do tempo', 'error');
            }
        });
    }

    const getInfo = useCallback(async () => {
        await getUser(token);
        await loadMedium(token);
        await getData(token);
    }, [getUser, loadMedium, getData, token]);

    useEffect(() => {
        getInfo();
    }, [getInfo])
    
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    
    useEffect(() => {
        if (mediuns.length > 0 && params.id) {
            const foundMedium = mediuns.find((item: IMedium) => item.medium_id === Number(params.id));
            setMedium(foundMedium);
            if (foundMedium) {
                loadEventosMedium(foundMedium, token).then(() => {
                    setLoading(false);
                })
            }
        }
    }, [mediuns, params.id, loadEventosMedium, token])
    
    if(loading) {
        return <Loading />
    }
    
    if(!medium) {
        return <PageNotFound />
    }

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
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]

    const arrayCards = [];

    for(let i = new Date().getFullYear(); i >= new Date(medium.dtIngresso).getFullYear(); i--) {
        arrayCards.push(
            <ResultsCard key={i} show={eventos.filter((item: IEvento) => new Date(item.data).getFullYear() === i).length > 0}>
                <YearTitle>{i}</YearTitle>
                <ResultsTable>
                    {eventos
                        .filter((item: IEvento) => new Date(item.data).getFullYear() === i)
                        .map((item: IEvento, index: number) => (
                            <Results key={index}>
                                <ResultsTitle onClick={() => modalEditEvento(item)}>{convertDate(item.data)} - {item.mensagem}</ResultsTitle>
                                <ResultsDetails>{item.observ}</ResultsDetails>
                            </Results>
                        ))
                    }
                </ResultsTable>
            </ResultsCard>
        )
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title='Linha do Tempo' subtitle={`${medium.nome} - ID ${medium.medium_id.toString().padStart(5, '0')}`}>
                <ButtonContainer>
                    <NavigateButton width="200px" height="45px" onClick={() => navigate(`/mediuns/consulta/${params.id}`)}>{'< Voltar'}</NavigateButton>
                    <NavigateButton width="200px" height="45px" onClick={() => modalAddEvento()}>Adicionar Evento</NavigateButton>
                </ButtonContainer>
                <EditObs>Clique sobre um evento para editar ou adicionar observações</EditObs>
                {arrayCards}
            </MainContainer>
            <SideMenu list={listSubMenu} />
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