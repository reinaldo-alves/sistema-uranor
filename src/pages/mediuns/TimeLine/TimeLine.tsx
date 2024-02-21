import Header from "src/components/header/header";
import { ButtonContainer, EditObs, InputContainer, MediumButton, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, YearTitle } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { defaultEvento, defaultMedium } from "src/utilities/default";
import { MediumContext } from "src/contexts/MediumContext";
import { ICavaleiro, IEvento, IMedium, IMentor } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { ListContext } from "src/contexts/ListContext";
import Loading from "src/utilities/Loading";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import { convertDate, handleEnterPress } from "src/utilities/functions";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import api from "src/api";
import { IEventoAPI } from "src/types/typesAPI";
import { Alert, Confirm } from "src/utilities/popups";
import MainTitle from "src/components/MainContainer/MainContainer";
import MainContainer from "src/components/MainContainer/MainContainer";

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

    const loadEventosMedium = async (medium: IMedium, token: string) => {
        try {
            const { data } = await api.get(`/evento/get?medium=${medium?.medium_id}`, {headers:{Authorization: token}})
            const evento = data.evento.map((item: IEventoAPI) => ({
                ...item,
                data: item.data === null ? '' : item.data.toString().split('T')[0],
            }));
            if(medium?.dtIngresso && !evento.some((item: IEvento) => item.tipo === 'Ingresso')) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtIngresso, mensagem: 'Ingresso na doutrina', observ: '', tipo: 'Ingresso'})
            }
            if(medium?.dtTest && !evento.some((item: IEvento) => item.tipo === `Teste ${medium?.med}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtTest, mensagem: `Teste mediúnico - ${medium?.med}`, observ: '', tipo: `Teste ${medium?.med}`})
            }
            if(medium?.dtEmplac && !evento.some((item: IEvento) => item.tipo === `Emplacamento ${medium?.med}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtEmplac, mensagem: `Emplacamento como ${medium?.med}`, observ: '', tipo: `Emplacamento ${medium?.med}`})
            }
            if(medium?.dtIniciacao  && !evento.some((item: IEvento) => item.tipo === `Iniciação ${medium?.med}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtIniciacao, mensagem: `Iniciação como ${medium?.med}`, observ: '', tipo: `Iniciação ${medium?.med}`})
            }
            if(medium?.dtElevacao && !evento.some((item: IEvento) => item.tipo === `Elevação ${medium?.med}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtElevacao, mensagem: `Elevação como ${medium?.med}`, observ: '', tipo: `Elevação ${medium?.med}`})
            }
            if(medium?.dtCenturia && !evento.some((item: IEvento) => item.tipo === 'Centúria')) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtCenturia, mensagem: 'Centúria', observ: '', tipo: 'Centúria'})
            }
            if(medium?.dtSetimo && !evento.some((item: IEvento) => item.tipo === 'Curso de Sétimo')) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtSetimo, mensagem: 'Curso de 7° Raio concluído', observ: '', tipo: 'Curso de Sétimo'})
            }
            if(medium?.oldDtTest && !evento.some((item: IEvento) => item.tipo === `Teste ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtTest, mensagem: `Teste mediúnico - ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Teste ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
            }
            if(medium?.oldDtEmplac && !evento.some((item: IEvento) => item.tipo === `Emplacamento ${medium.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtEmplac, mensagem: `Emplacamento como ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Emplacamento ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
            }
            if(medium?.oldDtIniciacao && !evento.some((item: IEvento) => item.tipo === `Iniciação ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtIniciacao, mensagem: `Iniciação como ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Iniciação ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
            }
            if(medium?.oldDtElevacao && !evento.some((item: IEvento) => item.tipo === `Elevação ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtElevacao, mensagem: `Elevação como ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Elevação ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
            }
            if(medium?.dtMentor && !evento.some((item: IEvento) => item.tipo === `Mentores ${medium?.med}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtMentor, mensagem: medium?.sex === 'Masculino' ? `Recebeu ministro ${ministros.find((m: IMentor) => m.id === medium?.ministro)?.nome} e cavaleiro ${cavaleiros.find((c: ICavaleiro) => c.id === medium?.cavaleiro)?.nome} ${medium?.cor}` : medium?.sex === 'Feminino' ? `Recebeu guia missionária ${guias.find((g: IMentor) => g.id === medium?.guia)?.nome} ${medium?.cor}` : '', observ: '', tipo: `Mentores ${medium?.med}`})
            }
            if(medium?.dtClassif && !evento.some((item: IEvento) => item.tipo === 'Classificações' && item.mensagem.split('de ')[1] === medium?.classif)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtClassif, mensagem: `Classificação de ${medium?.classif}`, observ: '', tipo: 'Classificações'})
            }
            if(medium?.oldDtMentor && !evento.some((item: IEvento) => item.tipo === `Mentores ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtMentor, mensagem: medium?.sex === 'Masculino' ? `Recebeu ministro ${ministros.find((m: IMentor) => m.id === medium?.ministro)?.nome} e cavaleiro ${cavaleiros.find((c: ICavaleiro) => c.id === medium?.oldCavaleiro)?.nome} ${medium?.oldCor}` : '', observ: '', tipo: `Mentores ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
            }
            if(medium?.oldDtClassif && !evento.some((item: IEvento) => item.tipo === 'Classificações' && item.mensagem.split('de ')[1] === medium?.oldClassif)) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtClassif, mensagem: `Classificação de ${medium?.oldClassif}`, observ: '', tipo: 'Classificações'})
            }
            if(medium?.dtTrinoSol && !evento.some((item: IEvento) => item.tipo === 'Trino Solitário')) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtTrinoSol, mensagem: `Consagração de Trino Solitário ${medium?.trinoSol}`, observ: '', tipo: 'Trino Solitário'})
            }
            if(medium?.dtTrinoSar && !evento.some((item: IEvento) => item.tipo === 'Trino Sardyos')) {
                evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtTrinoSar, mensagem: `Consagração de Trino Sardyos - Herdeiro do Adj. ${ministros.find((m: IMentor) => m.id === mediuns.find((item: IMedium) => item.medium_id === medium.herdeiro)?.ministro)?.nome} Mestre ${mediuns.find((item: IMedium) => item.medium_id === medium.herdeiro)?.nomeEmissao}`, observ: '', tipo: 'Trino Sardyos'})
            }
            setEventos(evento);
        } catch (error) {
            console.error('Erro ao carregar a lista de eventos da linha do tempo do médium', error);
        }
    }

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

    const getInfo = async () => {
        await getUser(token);
        await loadMedium(token);
        await getData(token);
    }
    
    useEffect(() => {
        getInfo();
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
    }, [mediuns, params.id])
    
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

    const eventTypes = [
        {event: 'Classificações', prior: 3, auto: false},
        {event: 'Mudança de Mediunidade', prior: 1, auto: false},
        {event: 'Mudança de Templo', prior: 1, auto: false},
        {event: 'Mudança de Adjunto de Origem', prior: 6, auto: false},
        {event: 'Mudança de Turno', prior: 6, auto: false},
        {event: 'Outras Consagrações', prior: 5, auto: false},
        {event: 'Entregou as Armas', prior: 7, auto: false},
        {event: 'Retornou à Doutrina', prior: 1, auto: false},
        {event: 'Desencarnou', prior: 8, auto: false},
        {event: 'Outros Eventos', prior: 7, auto: false},
        {event: 'Ingresso', prior: 1, auto: true},
        {event: 'Teste Apará', prior: 2, auto: true},
        {event: 'Teste Doutrinador', prior: 2, auto: true},
        {event: 'Emplacamento Apará', prior: 2, auto: true},
        {event: 'Emplacamento Doutrinador', prior: 2, auto: true},
        {event: 'Iniciação Apará', prior: 2, auto: true},
        {event: 'Iniciação Doutrinador', prior: 2, auto: true},
        {event: 'Elevação Apará', prior: 2, auto: true},
        {event: 'Elevação Doutrinador', prior: 2, auto: true},
        {event: 'Centúria', prior: 2, auto: true},
        {event: 'Curso de Sétimo', prior: 2, auto: true},
        {event: 'Mentores Apará', prior: 4, auto: true},
        {event: 'Mentores Doutrinador', prior: 4, auto: true},
        {event: 'Trino Solitário', prior: 5, auto: true},
        {event: 'Trino Sardyos', prior: 5, auto: true},
    ] 
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]

    eventos.sort((a: IEvento, b: IEvento) => {
        const dateA = new Date(a.data).getTime();
        const dateB = new Date(b.data).getTime();
        const priorA = eventTypes.find(item => item.event === a.tipo)?.prior || 6
        const priorB = eventTypes.find(item => item.event === b.tipo)?.prior || 6
        if (dateA !== dateB) {
            return dateB - dateA;
        } else {
            return priorB - priorA;
        }
    })

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
                    <MediumButton onClick={() => navigate(`/mediuns/consulta/${params.id}`)}>{'< Voltar'}</MediumButton>
                    <MediumButton onClick={() => modalAddEvento()}>Adicionar Evento</MediumButton>
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