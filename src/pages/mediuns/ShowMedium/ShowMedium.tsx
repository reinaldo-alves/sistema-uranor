import { useContext, useEffect, useState } from "react";
import Header from "src/components/header/header";
import { Divider, GridContainer, InfoContainer, InputContainer, MainContainer, MainInfoContainer, MediumButton, MediumInfo, MediumMainInfo, MediumText, NameAndId, PersonalCard, PhotoContainer, SectionTitle } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate, useParams } from "react-router-dom";
import { MediumContext } from "src/contexts/MediumContext";
import { IAdjunto, ICavaleiro, IFalange, IMedium, IMentor, ITemplo } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { convertDate, setSituation } from "src/utilities/functions";
import { ListContext } from "src/contexts/ListContext";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import Loading from "src/utilities/Loading";
import { Alert, Confirm } from "src/utilities/popups";
import { generateAutorizacao, generateEmissao, generateFichaMedium, generateReclass } from "src/utilities/createDocs";
import { validateEmissao } from "src/utilities/validations";
import { emissaoText } from "src/reports/emissao";
import { defaultConsagracao } from "src/utilities/default";
import api from "src/api";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import { IEventoAPI } from "src/types/typesAPI";

function ShowMedium() {
    const [loading, setLoading] = useState(true);
    const [medium, setMedium] = useState({} as IMedium);
    const [showModal, setShowModal] = useState(false);
    const [testDate, setTestDate] = useState('');
    
    const { token, getUser, user } = useContext(UserContext);
    const { mediuns, loadMedium, changeMed, removeComponentes } = useContext(MediumContext);
    const { ministros, cavaleiros, guias, adjuntos, templos, falMiss, getData, turnoL, turnoT, searchMediumInCons } = useContext(ListContext);
    const params = useParams();
    const navigate = useNavigate();
    
    const getInfo = async () => {
        await getUser(token);
        await loadMedium(token);
        await getData(token);
        if(mediuns) {
            setLoading(false);
        }
    }
    
    const navigateToTop = (route: string) => {
        setLoading(true)
        navigate(route);
        getInfo();
        window.scrollTo({top: 0});
    };
    
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

    const endNum = medium.endNumero? 'n° ' + medium.endNumero : ''
    const cityUF = [medium.endCidade, medium.endUF].filter(el => el !== '').join(" - ")
    const naturCityUF = [medium.natur, medium.naturUF].filter(el => el !== '').join(" - ")
    const fullAddress = [medium.endereco, endNum, medium.endCompl, medium.endBairro, cityUF].filter(el => el !== '').join(", ")

    const positionsAndFunctions = (medium: IMedium) => {
        const array = [];
        if (medium.comando === 'Comandante'){array.push('Comandante')}
        else if (medium.comando === 'Janatã'){array.push('Comandante Janatã')}
        else if (medium.comando === 'Lança'){array.push('Comandante, Lança Vermelha')}
        else if (medium.comando === 'JanatãLança'){array.push('Comandante Janatã, Lança Vermelha')};
        if (medium.presidente === 'Presidente'){array.push('Presidente')}
        else if (medium.presidente === 'Vice'){array.push('Vice-presidente')};
        if (medium.recepcao){array.push('Recepcionista')};
        if (medium.devas){array.push(medium.sex === 'Feminino'? 'Filha de Devas' : 'Filho de Devas')};
        if (medium.regente){array.push('Regente')};
        if (medium.trinoSol){array.push(medium.dtTrinoSol ? `Trino Solitário ${medium.trinoSol}  em ${convertDate(medium.dtTrinoSol)}` : `Trino Solitário ${medium.trinoSol}`)};
        if (medium.trinoSar){array.push('Trino Sardyos')};
        return array.join(', ')
    }

    const handleChangeMed = async (dtTest: string) => {
        await changeMed(medium, token, dtTest);
        setTestDate('');
        closeModal();
        setLoading(true);
        await getInfo();
    }
    
    const confirmChangeMed = async () => {
        await Confirm(`O médium será cadastrado como ${medium.med === 'Doutrinador' ? 'Apará' : medium.med === 'Apará' ? 'Doutrinador' : ''}. Continuar?`, 'warning', 'Não', 'Sim', async () => {
            setTestDate(medium.oldDtTest);
            if (medium.oldDtTest) {
                handleChangeMed('');
            } else {
                setShowModal(true)
            }  
        });
    }

    const closeModal = () => {
        setShowModal(false);
        setTestDate('');
    }

    const deleteMediumEvents = async (medium: IMedium, token: string) => {
        try {
            const { data } = await api.get(`/evento/get?medium=${medium?.medium_id}`, {headers:{Authorization: token}})
            data.evento.forEach(async (item: IEventoAPI) => {
                await api.delete(`/evento/delete?evento_id=${item.evento_id}`, {headers:{Authorization: token}})
            })
            console.log('Eventos excluído da linha do tempo com sucesso');
        } catch (error) {
            console.error('Erro ao excluir eventos da linha do tempo do médium', error);
        }
    }

    const deleteMedium = async () => {
        await Confirm('ATENÇÃO! Todos os dados do médium serão perdidos e não poderão ser recuperados. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                await removeComponentes(medium, token);
                await deleteMediumEvents(medium, token);
                await api.delete(`/medium/delete?medium_id=${medium.medium_id}`, {headers:{Authorization: token}})
                navigate('/mediuns/consulta');
                Alert('Médium excluído com sucesso', 'success');
            } catch (error) {
                console.log('Erro ao excluir médium', error);
                Alert('Erro ao excluir médium', 'error');
            }
        });
    }

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <NameAndId>
                    <h1>{medium.nome}</h1>
                    <h3>(ID {medium.medium_id.toString().padStart(5, '0')})</h3>
                </NameAndId>
                <GridContainer>
                    <PersonalCard style={{maxWidth: '252px', justifySelf: 'center'}}>
                        <MainInfoContainer>
                            <PhotoContainer photo={medium.foto}>
                                {medium.foto? '' : 'SEM FOTO'}
                            </PhotoContainer>
                            <MediumMainInfo>Mediunidade: <span>{medium.med}</span></MediumMainInfo>
                            <MediumMainInfo>Sexo: <span>{medium.sex}</span></MediumMainInfo>
                            <MediumMainInfo>Templo: <span>{templos.filter((item: ITemplo) => item.templo_id === medium.templo)[0].cidade} - {templos.filter((item: ITemplo) => item.templo_id === medium.templo)[0].estado.abrev}</span></MediumMainInfo>
                            <MediumMainInfo>Situação: <span>{setSituation(medium)}</span></MediumMainInfo>
                            <MediumMainInfo>Condição Atual: <span>{medium.condicao}</span></MediumMainInfo>
                            <MediumButton disabled={!medium.dtCenturia && !medium.falMiss} onClick={() => validateEmissao(medium, mediuns, adjuntos, turnoL, turnoT, () => generateEmissao(medium, user, emissaoText(medium, mediuns, ministros, cavaleiros, guias, adjuntos, templos, falMiss) as string))} color="green">Gerar Emissão</MediumButton>
                            <MediumButton onClick={() => navigate(`/mediuns/editar/${medium.medium_id}`)} color="green">Editar</MediumButton>
                            <MediumButton color="green" onClick={() => generateFichaMedium(medium)}>Gerar Ficha</MediumButton>
                            <MediumButton color="green" disabled={searchMediumInCons(medium.medium_id) === defaultConsagracao} onClick={() => generateAutorizacao([searchMediumInCons(medium.medium_id)], templos, adjuntos, ministros, searchMediumInCons(medium.medium_id).consagracao)}>Autorização</MediumButton>
                            <MediumButton color="green" disabled={!medium.dtCenturia || medium.sex !== 'Masculino'} onClick={() => generateReclass(medium, adjuntos, ministros, cavaleiros, user)}>Reclassificação</MediumButton>
                            <MediumButton onClick={() => navigate(`/mediuns/historico/${medium.medium_id}`)} color="green">Linha do Tempo</MediumButton>
                            <MediumButton onClick={confirmChangeMed} color="red">Mudar Med.</MediumButton>
                            <MediumButton style={{display: `${user.level === 'Administrador' ? 'block' : 'none'}`}} onClick={deleteMedium} color="red">Excluir</MediumButton>
                        </MainInfoContainer>
                    </PersonalCard>
                    <div>
                        <PersonalCard>
                            <SectionTitle>Dados Pessoais</SectionTitle>
                            <InfoContainer>
                                <MediumInfo>Data de Nascimento: <span>{convertDate(medium.dtNasc)}</span></MediumInfo>
                                <MediumInfo>Natural de: <span>{naturCityUF}</span></MediumInfo>
                                <MediumInfo>RG: <span>{medium.rg}</span></MediumInfo>
                                <MediumInfo>CPF: <span>{medium.cpf}</span></MediumInfo>
                                <MediumInfo>Nome do Pai: <span>{medium.pai}</span></MediumInfo>
                                <MediumInfo>Nome da Mãe: <span>{medium.mae}</span></MediumInfo>
                                <MediumInfo>Estado Civil: <span>{medium.estCivil}</span></MediumInfo>
                                <MediumInfo>Cônjuge: <span>{medium.conjuge}</span></MediumInfo>
                                <MediumInfo>CEP: <span>{medium.cep}</span></MediumInfo>
                                <MediumInfo>Endereço: <span>{fullAddress}</span></MediumInfo>
                                <MediumInfo>Telefone 1: <span>{medium.telefone1}</span></MediumInfo>
                                <MediumInfo>Telefone 2: <span>{medium.telefone2}</span></MediumInfo>
                                <MediumInfo>Email: <span>{medium.email}</span></MediumInfo>
                                <MediumInfo>Profissão: <span>{medium.profissao}</span></MediumInfo>
                            </InfoContainer>
                        </PersonalCard>
                        <PersonalCard>
                            <SectionTitle>Datas Mediúnicas</SectionTitle>
                            <InfoContainer>
                                <MediumInfo>Data Ingresso: <span>{convertDate(medium.dtIngresso)}</span></MediumInfo>
                                <MediumInfo>Data Emplacamento: <span>{convertDate(medium.dtEmplac)}</span></MediumInfo>
                                <MediumInfo>Data Iniciação: <span>{convertDate(medium.dtIniciacao)}</span></MediumInfo>
                                <MediumInfo>Data Elevação: <span>{convertDate(medium.dtElevacao)}</span></MediumInfo>
                                <MediumInfo>Data Centúria: <span>{convertDate(medium.dtCenturia)}</span></MediumInfo>
                                <MediumInfo>Data Sétimo: <span>{convertDate(medium.dtSetimo)}</span></MediumInfo>
                            </InfoContainer>
                        </PersonalCard>
                        <PersonalCard>
                            <SectionTitle>Dados Mediúnicos</SectionTitle>
                            <InfoContainer>
                                <MediumInfo>Adjunto de Origem: <span>{medium.adjOrigem ? ministros.filter((item: IMentor) => item.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === medium.adjOrigem)[0].ministro)[0]? ministros.filter((item: IMentor) => item.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === medium.adjOrigem)[0].ministro)[0].nome : '' : ''} {medium.adjOrigem ? '- Mestre' : ''} {adjuntos.filter((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)[0]? adjuntos.filter((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)[0].nome : ''}</span></MediumInfo>
                                <MediumInfo>Templo de Origem: <span>{medium.temploOrigem ? `${templos.filter((item: ITemplo) => item.templo_id === medium.templo)[0].cidade} - ${templos.filter((item: ITemplo) => item.templo_id === medium.templo)[0].estado.abrev}` : ''}</span></MediumInfo>
                                <MediumInfo>Colete n°: <span>{medium.colete ? medium.colete : ''}</span></MediumInfo>
                                <MediumInfo>Classificação: <span>{medium.classMest}</span></MediumInfo>
                                <MediumInfo>Falange de Mestrado: <span>{medium.falMest}</span></MediumInfo>
                                <MediumInfo>Povo: <span>{medium.povo}</span></MediumInfo>
                                <MediumInfo>Falange Missionária: <span>{falMiss.filter((item: IFalange) => item.falange_id === medium.falMiss)[0]? falMiss.filter((item: IFalange) => item.falange_id === medium.falMiss)[0].nome : ''}</span></MediumInfo>
                                <MediumInfo>Adjunto Devas: <span>{medium.adjDevas}</span></MediumInfo>
                                <MediumInfo>Turno: <span>{medium.turnoLeg}</span></MediumInfo>
                                <MediumInfo>Turno de Trabalho: <span>{medium.turnoTrab}</span></MediumInfo>
                            </InfoContainer>
                            {medium.sex==='Masculino' && medium.dtCenturia?
                                <>
                                    <Divider></Divider>
                                    <InfoContainer>
                                        <MediumInfo>Ministro: <span>{ministros.find((item: IMentor) => item.id === medium.ministro) ? ministros.find((item: IMentor) => item.id === medium.ministro).nome : ''}</span></MediumInfo>
                                        <MediumInfo>Cavaleiro: <span>{cavaleiros.find((item: ICavaleiro) => item.id === medium.cavaleiro) ? cavaleiros.find((item: ICavaleiro) => item.id === medium.cavaleiro).nome : ''} {medium.cavaleiro? medium.cor : ''}</span></MediumInfo>
                                        <MediumInfo>Data Ministro: <span>{convertDate(medium.dtMentor)}</span></MediumInfo>
                                        <MediumInfo>Data Classificação Atual: <span>{convertDate(medium.dtClassif)}</span></MediumInfo>
                                    </InfoContainer>
                                        <MediumInfo out>Classificação Atual: <span>{medium.classif}</span></MediumInfo>
                                </>
                            : medium.sex==='Feminino' && medium.dtCenturia?
                                <>
                                    <Divider></Divider>
                                    <InfoContainer>
                                        <MediumInfo>Estrela: <span>{medium.estrela}</span></MediumInfo>
                                        <MediumInfo>Guia Missionária: <span>{guias.find((item: IMentor) => item.id === medium.guia) ? guias.find((item: IMentor) => item.id === medium.guia).nome : ''} {medium.guia? medium.cor : ''}</span></MediumInfo>
                                        <MediumInfo>Data Guia: <span>{convertDate(medium.dtMentor)}</span></MediumInfo>
                                    </InfoContainer>
                                </>
                            : ''}
                            {medium.med==='Doutrinador'?
                                <>
                                    <Divider></Divider>
                                    <InfoContainer>
                                        <MediumInfo>Data Teste: <span>{convertDate(medium.dtTest)}</span></MediumInfo>
                                        <MediumInfo>Princesa: <span>{medium.princesa}</span></MediumInfo>
                                        <MediumInfo>Nome na Emissão: <span>{medium.nomeEmissao}</span></MediumInfo>
                                    </InfoContainer>
                                </>
                            : medium.med==='Apará'?
                                <>
                                    <Divider></Divider>
                                    <InfoContainer>
                                        <MediumInfo>Data Teste: <span>{convertDate(medium.dtTest)}</span></MediumInfo>
                                        <MediumInfo>Preto Velho: <span>{medium.pretovelho}</span></MediumInfo>
                                        <MediumInfo>Caboclo: <span>{medium.caboclo}</span></MediumInfo>
                                        <MediumInfo>Médico: <span>{medium.medico}</span></MediumInfo>
                                        <MediumInfo>Nome na Emissão: <span>{medium.nomeEmissao}</span></MediumInfo>
                                    </InfoContainer>
                                </>
                            : ''}
                        </PersonalCard>
                        <PersonalCard hide={medium.sex.concat(medium.med).length < 10 || !medium.dtCenturia}>
                            <SectionTitle>Povo</SectionTitle>
                            {medium.sex.concat(medium.med)==='MasculinoDoutrinador'?
                                <InfoContainer>
                                    <MediumInfo>Escrava: <span style={{cursor: 'pointer'}} onClick={() => navigateToTop(`/mediuns/consulta/${mediuns.find((item: IMedium) => item.medium_id === medium.ninfa).medium_id}`)}>{mediuns.find((item: IMedium) => item.medium_id === medium.ninfa) ? mediuns.find((item: IMedium) => item.medium_id === medium.ninfa).nome : ''}</span></MediumInfo>
                                    <MediumInfo>Madrinha: <span style={{cursor: 'pointer'}} onClick={() => navigateToTop(`/mediuns/consulta/${mediuns.find((item: IMedium) => item.medium_id === medium.madrinha).medium_id}`)}>{mediuns.find((item: IMedium) => item.medium_id === medium.madrinha) ? mediuns.find((item: IMedium) => item.medium_id === medium.madrinha).nome : ''}</span></MediumInfo>
                                    <MediumInfo>Padrinho: <span style={{cursor: 'pointer'}} onClick={() => navigateToTop(`/mediuns/consulta/${mediuns.find((item: IMedium) => item.medium_id === medium.padrinho).medium_id}`)}>{mediuns.find((item: IMedium) => item.medium_id === medium.padrinho) ? mediuns.find((item: IMedium) => item.medium_id === medium.padrinho).nome : ''}</span></MediumInfo>
                                </InfoContainer>
                            : medium.sex.concat(medium.med)==='MasculinoApará'? 
                                <InfoContainer>
                                    <MediumInfo>Afilhado: <span style={{cursor: 'pointer'}} onClick={() => navigateToTop(`/mediuns/consulta/${mediuns.find((item: IMedium) => item.medium_id === medium.afilhado).medium_id}`)}>{mediuns.find((item: IMedium) => item.medium_id === medium.afilhado) ? mediuns.find((item: IMedium) => item.medium_id === medium.afilhado).nome : ''}</span></MediumInfo>
                                    <MediumInfo>Ninfa Sol: <span style={{cursor: 'pointer'}} onClick={() => navigateToTop(`/mediuns/consulta/${mediuns.find((item: IMedium) => item.medium_id === medium.ninfa).medium_id}`)}>{mediuns.find((item: IMedium) => item.medium_id === medium.ninfa) ? mediuns.find((item: IMedium) => item.medium_id === medium.ninfa).nome : ''}</span></MediumInfo>
                                </InfoContainer>
                            : medium.sex.concat(medium.med)==='FemininoDoutrinador'?
                                <InfoContainer>
                                    <MediumInfo>Afilhado: <span style={{cursor: 'pointer'}} onClick={() => navigateToTop(`/mediuns/consulta/${mediuns.find((item: IMedium) => item.medium_id === medium.afilhado).medium_id}`)}>{mediuns.find((item: IMedium) => item.medium_id === medium.afilhado) ? mediuns.find((item: IMedium) => item.medium_id === medium.afilhado).nome : ''}</span></MediumInfo>
                                    <MediumInfo>Ajanã: <span style={{cursor: 'pointer'}} onClick={() => navigateToTop(`/mediuns/consulta/${mediuns.find((item: IMedium) => item.medium_id === medium.mestre).medium_id}`)}>{mediuns.find((item: IMedium) => item.medium_id === medium.mestre) ? mediuns.find((item: IMedium) => item.medium_id === medium.mestre).nome : ''}</span></MediumInfo>
                                </InfoContainer>
                            : medium.sex.concat(medium.med)==='FemininoApará'?
                                <InfoContainer>
                                    <MediumInfo>Mestre: <span style={{cursor: 'pointer'}} onClick={() => navigateToTop(`/mediuns/consulta/${mediuns.find((item: IMedium) => item.medium_id === medium.mestre).medium_id}`)}>{mediuns.find((item: IMedium) => item.medium_id === medium.mestre) ? mediuns.find((item: IMedium) => item.medium_id === medium.mestre).nome : ''}</span></MediumInfo>
                                </InfoContainer>
                            : <div></div>}
                        </PersonalCard>
                        <PersonalCard hide={medium.sex.concat(medium.med).length < 10 || !medium.dtCenturia}>
                            <SectionTitle>Cargos e Funções</SectionTitle>
                            <MediumText>
                                {positionsAndFunctions(medium)}
                            </MediumText>
                        </PersonalCard>
                        <PersonalCard hide={!medium.med}>
                            <SectionTitle>Dados como {medium.med === 'Doutrinador' ? 'Apará' : medium.med === 'Apará' ? 'Doutrinador' : ''}</SectionTitle>
                            <InfoContainer>
                                <MediumInfo>Data Teste: <span>{convertDate(medium.oldDtTest)}</span></MediumInfo>
                                <MediumInfo>Data Emplacamento: <span>{convertDate(medium.oldDtEmplac)}</span></MediumInfo>
                                <MediumInfo>Data Iniciação: <span>{convertDate(medium.oldDtIniciacao)}</span></MediumInfo>
                                <MediumInfo>Data Elevação: <span>{convertDate(medium.oldDtElevacao)}</span></MediumInfo>
                                {medium.sex === 'Masculino' ?
                                    <>
                                        <MediumInfo>Classificação: <span>{medium.oldClassMest}</span></MediumInfo>
                                        <MediumInfo>Cavaleiro: <span>{cavaleiros.find((item: ICavaleiro) => item.id === medium.oldCavaleiro) ? cavaleiros.find((item: ICavaleiro) => item.id === medium.oldCavaleiro).nome : ''} {medium.oldCavaleiro? medium.oldCor : ''}</span></MediumInfo>
                                        <MediumInfo>Data Cavaleiro: <span>{convertDate(medium.oldDtMentor)}</span></MediumInfo>
                                        <MediumInfo>Última Classif.: <span>{medium.oldClassif}</span></MediumInfo>
                                        <MediumInfo>Data: <span>{convertDate(medium.oldDtClassif)}</span></MediumInfo>
                                    </>
                                : medium.sex === 'Feminino' ?
                                    <MediumInfo>Estrela: <span>{medium.oldEstrela}</span></MediumInfo>
                                : <div></div>}
                                {medium.med === 'Doutrinador' ?
                                    <>
                                        <MediumInfo>Preto Velho: <span>{medium.pretovelho}</span></MediumInfo>
                                        <MediumInfo>Caboclo: <span>{medium.caboclo}</span></MediumInfo>
                                        <MediumInfo>Médico: <span>{medium.medico}</span></MediumInfo>
                                    </>
                                : medium.med === 'Apará' ?
                                    <MediumInfo>Princesa: <span>{medium.princesa}</span></MediumInfo>
                                : <div></div>}
                            </InfoContainer>
                        </PersonalCard>
                        <PersonalCard>
                            <SectionTitle>Observações</SectionTitle>
                            <MediumText>{medium.observ}</MediumText>
                        </PersonalCard>
                    </div>
                </GridContainer>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Mudança de Mediunidade</ModalTitle>
                    <InputContainer>
                        <label>{`Data do teste como ${medium.med === 'Doutrinador' ? 'Apará' : medium.med === 'Apará' ? 'Doutrinador' : ''}`}</label>
                        <input type="date" value={testDate} onChange={(e) => setTestDate(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={closeModal}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => handleChangeMed(testDate)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default ShowMedium