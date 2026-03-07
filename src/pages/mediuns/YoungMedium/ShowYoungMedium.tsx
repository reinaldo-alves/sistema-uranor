import { useCallback, useContext, useEffect, useState } from "react";
import Header from "src/components/header/header";
import { GridShowContainer, InfoContainer, MainInfoContainer, MediumInfo, MediumMainInfo, MediumText, NameAndId, PhotoContainer } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate, useParams } from "react-router-dom";
import { IFalange, IMedium, IPaje, ITemplo } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { convertDate, handleEnterPress, showTemplo } from "src/utilities/functions";
import { ListContext } from "src/contexts/ListContext";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import Loading from "src/utilities/Loading";
import { Alert, Confirm } from "src/utilities/popups";
import { generateEmissao } from "src/utilities/createDocs";
import { validateEmissaoPaje } from "src/utilities/validations";
import { emissaoPajeText } from "src/reports/emissao";
import api from "src/api";
import MainContainer from "src/components/MainContainer/MainContainer";
import { Modal, ModalButton, ModalContent, ModalInputContainer, ModalSubTitle, ModalTitle } from "src/components/Modal/modal";
import { MediumContext } from "src/contexts/MediumContext";
import { NavigateButton } from "src/components/buttons/buttons";
import { PersonalCard } from "src/components/cardsContainers/cardsContainers";
import { SectionTitle } from "src/components/texts/texts";

function ShowYoungMedium() {
    const [loading, setLoading] = useState(true);
    const [paje, setPaje] = useState({} as IPaje);
    const [showModal, setShowModal] = useState(false);
    const [med, setMed] = useState('');
    const [dtIngresso, setDtIngresso] = useState('');
    
    const { token, user } = useContext(UserContext);
    const { mediuns, loadMedium } = useContext(MediumContext);
    const { pajes, loadPaje, ministros, adjuntos, templos, falMiss } = useContext(ListContext);
    const params = useParams();
    const navigate = useNavigate();

    const now = new Date().toISOString().split('T')[0];
    
    const getInfo = useCallback(async () => {
        await loadPaje(token);
        await loadMedium(token);
        setLoading(false);
    }, [loadPaje, loadMedium, token]);

    useEffect(() => {
        getInfo();
    }, [getInfo])
     
    useEffect(() => {
        if(paje?.medium_id && ministros.length && adjuntos.length && templos.length && falMiss.length) {
            setLoading(false);
        }
    }, [paje?.medium_id, ministros, adjuntos, templos, falMiss])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    
    useEffect(() => {
        const foundPaje = pajes.find((item: IPaje) => item.medium_id === Number(params.id));
        setPaje(foundPaje);
    }, [pajes, params.id])

    useEffect(() => {
        console.log(paje);
    }, [paje]);
    
    if(loading) {
        return <Loading />
    }

    if(!paje) {
        return <PageNotFound />
    }

    const endNum = paje.endNumero? 'nº ' + paje.endNumero : ''
    const cityUF = [paje.endCidade, paje.endUF].filter(el => el !== '').join(" - ")
    const naturCityUF = [paje.natur, paje.naturUF].filter(el => el !== '').join(" - ")
    const fullAddress = [paje.endereco, endNum, paje.endCompl, paje.endBairro, cityUF].filter(el => el !== '').join(", ")

    const closeModal = () => {
        setShowModal(false);
        setMed('');
        setDtIngresso('');
    }

    const createMediumObj = (paje: IPaje) => {
        const medium = mediuns.find((item: IMedium) => item.medium_id === paje.medium_id);
        return medium;
    }

    const addMedium = async (paje: IPaje, token: string) => {
        const templo = templos.find((item: ITemplo) => item.templo_id === paje.templo);
        const falange = falMiss.find((item: IFalange) => item.falange_id === paje.falMiss)?.nome;
        const mediumObj = {
            med: med,
            telefone2: `${paje.contatoResp} ${paje.responsavel}`,
            dtIngresso: dtIngresso,
            dtTest: dtIngresso,
            adjOrigem: templo.presidente
        };
        const eventObj = {
            medium: paje.medium_id,
            data: paje.dtFalange,
            mensagem: `Ingressou na falange missionária ${falange}`,
            tipo: 'Mudança de Falange',
            observ: ''
        }
        console.log({medium_id: paje.medium_id, ...mediumObj});
        try {
            await api.put('/medium/update', {medium_id: paje.medium_id, ...mediumObj}, {headers:{Authorization: token}});
            await api.post('/evento/create', eventObj, {headers:{Authorization: token}});
            await api.delete(`/paje/delete-comp?medium=${paje.medium_id}`, {headers:{Authorization: token}});
            Alert('Pajé transferido para o cadastro geral', 'success');
            await loadMedium(token);
            navigate(`/mediuns/consulta/${paje.medium_id}`);
        } catch (error) {
            console.log('Não foi possível transferir o pajé para o cadastro geral', error);
            Alert('Não foi possível transferir o pajé para o cadastro geral', 'error');
        }
    }

    const deletePaje = async () => {
        await Confirm('ATENÇÃO! Todos os dados do pajé serão perdidos e não poderão ser recuperados. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                await api.delete(`/paje/delete?medium=${paje.medium_id}`, {headers:{Authorization: token}});
                navigate('/mediuns/paje');
                Alert('Pajé excluído com sucesso', 'success');
            } catch (error) {
                console.log('Erro ao excluir pajé', error);
                Alert('Erro ao excluir pajé', 'error');
            }
        });
    }

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Pajé', click: '/mediuns/paje'}
    ]

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <NameAndId>
                    <h1>{paje.nome}</h1>
                    <h2>Pajé - ID: {paje.medium_id.toString().padStart(5, '0')}</h2>
                </NameAndId>
                <GridShowContainer>
                    <PersonalCard showMedium style={{maxWidth: '252px', justifySelf: 'center'}}>
                        <MainInfoContainer>
                            <PhotoContainer style={{height: '192px'}} photo={paje.foto}>
                                {paje.foto? '' : 'SEM FOTO'}
                            </PhotoContainer>
                            <MediumMainInfo>Sexo: <span>{paje.sex}</span></MediumMainInfo>
                            <MediumMainInfo>Templo: <span>{showTemplo(paje, templos)}</span></MediumMainInfo>
                            <MediumMainInfo>Condição Atual: <span>{paje.condicao}</span></MediumMainInfo>
                            <NavigateButton width="150px" height="45px" onClick={() => navigate('/mediuns/paje')} color="green">{'< Voltar'}</NavigateButton>
                            <NavigateButton width="150px" height="45px" disabled={!paje.falMiss} onClick={() => validateEmissaoPaje(paje, () => generateEmissao(createMediumObj(paje), user, emissaoPajeText(paje, ministros, adjuntos, templos, falMiss) as string))} color="green">Gerar Emissão</NavigateButton>
                            <NavigateButton width="150px" height="45px" onClick={() => navigate(`/mediuns/paje/editar/${paje.medium_id}`)} color="green">Editar</NavigateButton>
                            <NavigateButton width="150px" height="45px" onClick={() => setShowModal(true)}>Mover Cad. Geral</NavigateButton>
                            <NavigateButton width="150px" height="45px" style={{display: `${user.level === 'Administrador' ? 'block' : 'none'}`}} onClick={deletePaje} color="red">Excluir</NavigateButton>
                        </MainInfoContainer>
                    </PersonalCard>
                    <div>
                        <PersonalCard showMedium>
                            <SectionTitle>Dados Pessoais</SectionTitle>
                            <InfoContainer>
                                <MediumInfo>Data de Nascimento: <span>{convertDate(paje.dtNasc)}</span></MediumInfo>
                                <MediumInfo>Natural de: <span>{naturCityUF}</span></MediumInfo>
                                <MediumInfo>RG: <span>{paje.rg}</span></MediumInfo>
                                <MediumInfo>CPF: <span>{paje.cpf}</span></MediumInfo>
                                <MediumInfo>Nome do Pai: <span>{paje.pai}</span></MediumInfo>
                                <MediumInfo>Nome da Mãe: <span>{paje.mae}</span></MediumInfo>
                                <MediumInfo>Estado Civil: <span>{paje.estCivil}</span></MediumInfo>
                                <MediumInfo>Cônjuge: <span>{paje.conjuge}</span></MediumInfo>
                                <MediumInfo>CEP: <span>{paje.cep}</span></MediumInfo>
                                <MediumInfo>Endereço: <span>{fullAddress}</span></MediumInfo>
                                <MediumInfo>Telefone: <span>{paje.telefone1}</span></MediumInfo>
                                <MediumInfo>E-mail: <span>{paje.email}</span></MediumInfo>
                                <MediumInfo>Profissão: <span>{paje.profissao}</span></MediumInfo>
                            </InfoContainer>
                        </PersonalCard>
                        <PersonalCard showMedium>
                            <SectionTitle>Dados do Responsável</SectionTitle>
                            <InfoContainer>
                                <MediumInfo>Responsável: <span>{paje.responsavel}</span></MediumInfo>
                                <MediumInfo>Parentesco: <span>{paje.parentesco}</span></MediumInfo>
                                <MediumInfo>Contato Responsável: <span>{paje.contatoResp}</span></MediumInfo>
                            </InfoContainer>
                        </PersonalCard>
                        <PersonalCard showMedium>
                            <SectionTitle>Dados Mediúnicos</SectionTitle>
                            <InfoContainer>
                                <MediumInfo>Ingresso Falange: <span>{convertDate(paje.dtFalange)}</span></MediumInfo>
                                <MediumInfo>Templo de Origem: <span>{paje.temploOrigem ? `${templos.find((item: ITemplo) => item.templo_id === paje.temploOrigem)?.cidade} - ${templos.find((item: ITemplo) => item.templo_id === paje.temploOrigem)?.estado.abrev}` : ''}</span></MediumInfo>
                                <MediumInfo>Falange Missionária: <span>{falMiss.filter((item: IFalange) => item.falange_id === paje.falMiss)[0]? falMiss.filter((item: IFalange) => item.falange_id === paje.falMiss)[0].nome : ''}</span></MediumInfo>
                                <MediumInfo>Adjunto Devas: <span>{paje.adjDevas}</span></MediumInfo>
                                <MediumInfo>Nome na Emissão: <span>{paje.nomeEmissao}</span></MediumInfo>
                            </InfoContainer>
                        </PersonalCard>
                        <PersonalCard showMedium hide={!paje.observ}>
                            <SectionTitle>Observações</SectionTitle>
                            <MediumText>{paje.observ}</MediumText>
                        </PersonalCard>
                    </div>
                </GridShowContainer>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Mover para Cadastro Geral</ModalTitle>
                    <ModalSubTitle>{paje.nome}</ModalSubTitle>
                    <ModalInputContainer>
                        <label>Mediunidade:</label>
                        <select value={med} onKeyUp={(e) => handleEnterPress(e, async () => await addMedium(paje, token))} onChange={(e) => setMed(e.target.value)}>
                            <option value={''}></option>
                            <option value={'Apará'}>Apará</option>
                            <option value={'Doutrinador'}>Doutrinador</option>
                        </select>
                    </ModalInputContainer>
                    <ModalInputContainer>
                        <label>Data de ingresso:</label>
                        <input type="date" value={dtIngresso} onKeyUp={(e) => handleEnterPress(e, async () => await addMedium(paje, token))} onChange={(e) => setDtIngresso(e.target.value)} min={paje.dtNasc} max={now} />
                    </ModalInputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={closeModal}>Cancelar</ModalButton>
                        <ModalButton disabled={!med || !dtIngresso} color='green' onClick={async () => await addMedium(paje, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default ShowYoungMedium