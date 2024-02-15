import Header from "src/components/header/header";
import { ButtonContainer, EditObs, InputContainer, MainContainer, MediumButton, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, TitleContainer, YearTitle } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { defaultEvento, defaultMedium } from "src/utilities/default";
import { MediumContext } from "src/contexts/MediumContext";
import { IEvento, IMedium } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { ListContext } from "src/contexts/ListContext";
import Loading from "src/utilities/Loading";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import { convertDate } from "src/utilities/functions";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";

function TimeLine() {
    const [medium, setMedium] = useState(defaultMedium);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultEvento);
    const [edited, setEdited] = useState(defaultEvento);

    const { token, getUser } = useContext(UserContext);
    const { mediuns, loadMedium } = useContext(MediumContext);
    const { getData } = useContext(ListContext);
    const navigate = useNavigate();
    const params = useParams();

    interface ITipo {
        event: string,
        prior: number,
        unique: boolean
    }

    const getInfo = async () => {
        await getUser(token);
        await loadMedium(token);
        await getData(token);
        if(mediuns) {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        getInfo();
        window.scrollTo({top: 0});
    }, [])
    
    useEffect(() => {
        const foundMedium = mediuns.find((item: IMedium) => item.medium_id === Number(params.id));
        setMedium(foundMedium);
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
        setShowModal(true);
    }

    const modalEditEvento = (evento: IEvento) => {
        setEdit(true);
        setEdited(evento);
        setSelected(evento);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultEvento);
        setSelected(defaultEvento);
    }

    const eventTypes = [
        {event: 'Ingresso', prior: 1, unique: true},
        {event: 'Teste Apará', prior: 2, unique: true},
        {event: 'Teste Doutrinador', prior: 2, unique: true},
        {event: 'Emplacamento Apará', prior: 2, unique: true},
        {event: 'Emplacamento Doutrinador', prior: 2, unique: true},
        {event: 'Iniciação Apará', prior: 2, unique: true},
        {event: 'Iniciação Doutrinador', prior: 2, unique: true},
        {event: 'Elevação Apará', prior: 2, unique: true},
        {event: 'Elevação Doutrinador', prior: 2, unique: true},
        {event: 'Centúria', prior: 2, unique: true},
        {event: 'Curso de Sétimo', prior: 2, unique: true},
        {event: 'Mentores Apará', prior: 4, unique: true},
        {event: 'Mentores Doutrinador', prior: 4, unique: true},
        {event: 'Trino Solitário', prior: 5, unique: true},
        {event: 'Trino Sardyos', prior: 5, unique: true},
        {event: 'Classificações', prior: 3, unique: false},
        {event: 'Filho de Devas', prior: 5, unique: false},
        {event: 'Janda', prior: 5, unique: false},
        {event: 'Mudança de Mediunidade', prior: 1, unique: false},
        {event: 'Mudança de Templo', prior: 1, unique: false},
        {event: 'Mudança de Adjunto de Origem', prior: 7, unique: false},
        {event: 'Mudança de Turno', prior: 7, unique: false},
        {event: 'Novo Componente', prior: 6, unique: false},
        {event: 'Deixou Componente', prior: 6, unique: false},
        {event: 'Entregou Armas', prior: 8, unique: false},
        {event: 'Retornou à Doutrina', prior: 1, unique: false},
        {event: 'Desencarnou', prior: 9, unique: true},
        {event: 'Outros Eventos', prior: 8, unique: false},
    ] 
    
    const initialData = [] as Array<IEvento>;

    if(medium.dtIngresso) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtIngresso, mensagem: 'Ingresso na doutrina', observ: 'erewre', tipo: 'Ingresso'})}
    if(medium.dtTest) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtTest, mensagem: `Teste mediúnico - ${medium.med}`, observ: 'edfedxer', tipo: `Teste ${medium.med}`})}
    if(medium.dtEmplac) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtEmplac, mensagem: `Emplacamento como ${medium.med}`, observ: 'ercxrecxre', tipo: `Emplacamento ${medium.med}`})}
    if(medium.dtIniciacao) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtIniciacao, mensagem: `Iniciação como ${medium.med}`, observ: 'xwrerexcrex', tipo: `Iniciação ${medium.med}`})}
    if(medium.dtElevacao) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtElevacao, mensagem: `Elevação como ${medium.med}`, observ: 'xqerrexfre', tipo: `Elevação ${medium.med}`})}
    if(medium.dtCenturia) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtCenturia, mensagem: 'Centúria', observ: 'xerxcrexcre', tipo: 'Centúria'})}
    if(medium.dtSetimo) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtSetimo, mensagem: 'Curso de 7° Raio concluído', observ: '', tipo: 'Curso de Sétimo'})}
    if(medium.oldDtTest) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.oldDtTest, mensagem: `Teste mediúnico - ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Teste ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`})}
    if(medium.oldDtEmplac) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.oldDtEmplac, mensagem: `Emplacamento como ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Emplacamento ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`})}
    if(medium.oldDtIniciacao) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.oldDtIniciacao, mensagem: `Iniciação como ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Iniciação ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`})}
    if(medium.oldDtElevacao) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.oldDtElevacao, mensagem: `Elevação como ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Elevação ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`})}
    if(medium.dtMentor) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtMentor, mensagem: `Recebeu mentores como ${medium.med}`, observ: '', tipo: `Mentores ${medium.med}`})}
    if(medium.dtClassif) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtClassif, mensagem: `Recebeu classificação de ${medium.classif}`, observ: '', tipo: 'Classificações'})}
    if(medium.oldDtMentor) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.oldDtMentor, mensagem: `Recebeu mentores como ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Mentores ${medium.med === 'Apará' ? 'Doutrinador' : medium.med === 'Doutrinador' ? 'Apará' : ''}`})}
    if(medium.oldDtClassif) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.oldDtClassif, mensagem: `Recebeu classificação de ${medium.oldClassif}`, observ: '', tipo: 'Classificações'})}
    if(medium.dtTrinoSol) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtTrinoSol, mensagem: `Consagração de Trino Solitário ${medium.trinoSol}`, observ: '', tipo: 'Trino Solitário'})}
    if(medium.dtTrinoSar) {initialData.push({evento_id: 0, medium: medium.medium_id, data: medium.dtTrinoSar, mensagem: 'Consagração de Trino Sardyos', observ: '', tipo: 'Trino Sardyos'})}
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]

    initialData.sort((a: IEvento, b: IEvento) => {
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
            <ResultsCard key={i} show={initialData.filter((item: IEvento) => new Date(item.data).getFullYear() === i).length > 0}>
                <YearTitle>{i}</YearTitle>
                <ResultsTable>
                    {initialData
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
            <MainContainer>
                <TitleContainer>
                    <h1>Linha do Tempo</h1>
                    <h2>{medium.nome} - ID {medium.medium_id.toString().padStart(5, '0')}</h2> 
                </TitleContainer>
                <ButtonContainer>
                    <MediumButton onClick={() => navigate(`/mediuns/consulta/${params.id}`)}>{'< Voltar'}</MediumButton>
                    <MediumButton onClick={() => modalAddEvento()}>Adicionar Registro</MediumButton>
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
                        <input type="date" value={edited.data} onChange={(e) => updateProps('data', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Tipo</label>
                        <select value={edited.tipo} onChange={(e) => updateProps('tipo', e.target.value)}>
                            <option value=''></option>
                            {eventTypes.map((item: ITipo, index: number) => (
                                <option key={index} value={item.event}>{item.event}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label>Descrição</label>
                        <textarea value={edited.mensagem} onChange={(e) => updateProps('mensagem', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Observações</label>
                        <textarea value={edited.observ} onChange={(e) => updateProps('observ', e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? () => {} : () => {}}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TimeLine