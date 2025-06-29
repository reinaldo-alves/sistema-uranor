import { useCallback, useContext, useEffect, useState } from "react";
import Header from "src/components/header/header";
import { Divider, FrequenciaData, GridContainer, InfoContainer, MainInfoContainer, MediumInfo, MediumMainInfo, MediumText, ModalMediumContent, NameAndId, PhotoContainer } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate, useParams } from "react-router-dom";
import { MediumContext } from "src/contexts/MediumContext";
import { IAdjunto, ICavaleiro, IDesenvolvimento, IFalange, IFrequencia, IMedium, IMentor, ITemplo } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { convertDate, formatMonthYear, handleEnterPress, positionsAndFunctions, setSituation, showMedDesenv, showTemplo } from "src/utilities/functions";
import { ListContext } from "src/contexts/ListContext";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import Loading from "src/utilities/Loading";
import { Alert, Confirm } from "src/utilities/popups";
import { generateAutorizacao, generateEmissao, generateFichaMedium, generateReclass } from "src/utilities/createDocs";
import { validateEmissao } from "src/utilities/validations";
import { emissaoText } from "src/reports/emissao";
import { defaultConsagracao } from "src/utilities/default";
import api from "src/api";
import { Modal, ModalButton, ModalTitle } from "src/components/Modal/modal";
import { IEventoAPI } from "src/types/typesAPI";
import MainContainer from "src/components/MainContainer/MainContainer";
import { NavigateButton } from "src/components/buttons/buttons";
import { InputContainer, PersonalCard } from "src/components/cardsContainers/cardsContainers";
import { SectionTitle } from "src/components/texts/texts";

function ShowMedium() {
    const [loading, setLoading] = useState(true);
    const [medium, setMedium] = useState({} as IMedium);
    const [showModal, setShowModal] = useState(false);
    const [selectModal, setSelectModal] = useState('');
    const [testDate, setTestDate] = useState('');
    
    const { token, getUser, user } = useContext(UserContext);
    const { mediuns, loadMedium, changeMed, removeComponentes } = useContext(MediumContext);
    const { ministros, cavaleiros, guias, adjuntos, templos, falMiss, getData, turnoL, turnoT, searchMediumInCons, allFrequencia, loadDesenvolvimento } = useContext(ListContext);
    const params = useParams();
    const navigate = useNavigate();

    const now = new Date();
    const nowString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const getInfo = useCallback(async () => {
        await getUser(token);
        await loadMedium(token);
        await getData(token);
    }, [getUser, loadMedium, getData, token]);
    
    const navigateToTop = (route: string) => {
        setLoading(true)
        navigate(route);
        getInfo();
        window.scrollTo({top: 0});
    };
     
    useEffect(() => {
        getInfo();
    }, [getInfo])

    useEffect(() => {
        if(medium?.medium_id && ministros.length && cavaleiros.length && guias.length && adjuntos.length && templos.length && falMiss.length) {
            setLoading(false);
        }
    }, [medium?.medium_id, ministros, cavaleiros, guias, adjuntos, templos, falMiss])

    useEffect(() => {
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

    const endNum = medium.endNumero? 'nº ' + medium.endNumero : ''
    const cityUF = [medium.endCidade, medium.endUF].filter(el => el !== '').join(" - ")
    const naturCityUF = [medium.natur, medium.naturUF].filter(el => el !== '').join(" - ")
    const fullAddress = [medium.endereco, endNum, medium.endCompl, medium.endBairro, cityUF].filter(el => el !== '').join(", ")

    const handleChangeMed = async (dtTest: string) => {
        await changeMed(medium, token, dtTest);
        setTestDate('');
        closeModal();
        setLoading(true);
        await getInfo();
    }
    
    const confirmChangeMed = async () => {
        await Confirm(`O médium será cadastrado como ${medium.med === 'Doutrinador' ? 'Apará' : medium.med === 'Apará' ? 'Doutrinador' : ''}. Continuar?`, 'warning', 'Não', 'Sim', () => {
            setShowModal(true);
            setSelectModal('mudanca');
        });
    }

    const closeModal = () => {
        setShowModal(false);
        setSelectModal('');
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

    const removeMediumInDesenv = async (medium: IMedium, token: string) => {
        const newAllFrequencia = allFrequencia.map((item: IDesenvolvimento) => ({
            mes: item.mes,
            frequencia: item.frequencia.filter((f: IFrequencia) => f.medium !== medium.medium_id)
        }))
        try {
            await newAllFrequencia.forEach(async (item: IDesenvolvimento) => {
                const month = item.mes;
                const text = JSON.stringify({frequencia: item.frequencia})
                await api.post('/desenvolvimento/update', {mes: month, freq: text}, {headers:{Authorization: token}});
                console.log(`Frequencia ${month} atualizada`);
                await loadDesenvolvimento(token);
            })
        } catch (error) {
            console.log('Não foi possível excluir médium da frequência do desenvolvimento', error);
        }
    }

    const deleteMedium = async () => {
        await Confirm('ATENÇÃO! Todos os dados do médium serão perdidos e não poderão ser recuperados. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                await removeComponentes(medium, token);
                await deleteMediumEvents(medium, token);
                await removeMediumInDesenv(medium, token);
                await api.delete(`/medium/delete?medium_id=${medium.medium_id}`, {headers:{Authorization: token}})
                navigate('/mediuns/consulta');
                Alert('Médium excluído com sucesso', 'success');
            } catch (error) {
                console.log('Erro ao excluir médium', error);
                Alert('Erro ao excluir médium', 'error');
            }
        });
    }

    const convertStringToLongDate = (date: string) => {
        const [year, month] = date.split('-');
        const dateObj = new Date(Number(year), Number(month) - 1);
        const result = formatMonthYear.format(dateObj);
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    const getSundays = (date: string) => {
        const [year, month] = date.split('-');
        const sundays = [];
        const newDate = new Date(Number(year), Number(month) - 1, 1);
        while(newDate.getMonth() === Number(month) - 1) {
            if (newDate.getDay() === 0) {
                sundays.push(newDate.getDate());
            }
            newDate.setDate(newDate.getDate() + 1);
        }
        return sundays;
    }

    const convertFreqToText = (freq: string) => {
        if (freq === 'P') {return 'Presente'}
        else if (freq === 'F') {return 'Faltou'}
        else if (freq === 'N') {return 'Não teve aula'}
        else {return freq}
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
                    <PersonalCard showMedium style={{maxWidth: '252px', justifySelf: 'center'}}>
                        <MainInfoContainer>
                            <PhotoContainer photo={medium.foto}>
                                {medium.foto? '' : 'SEM FOTO'}
                            </PhotoContainer>
                            <MediumMainInfo>Mediunidade: <span>{medium.med}</span></MediumMainInfo>
                            <MediumMainInfo>Sexo: <span>{medium.sex}</span></MediumMainInfo>
                            <MediumMainInfo>Templo: <span>{showTemplo(medium, templos)}</span></MediumMainInfo>
                            <MediumMainInfo>Situação: <span>{setSituation(medium)}</span></MediumMainInfo>
                            <MediumMainInfo>Condição Atual: <span>{medium.condicao}</span></MediumMainInfo>
                            <NavigateButton width="150px" disabled={!medium.dtCenturia && !medium.falMiss} onClick={() => validateEmissao(medium, mediuns, turnoL, turnoT, () => generateEmissao(medium, user, emissaoText(medium, mediuns, ministros, cavaleiros, guias, adjuntos, templos, falMiss) as string))} color="green">Gerar Emissão</NavigateButton>
                            <NavigateButton width="150px" onClick={() => navigate(`/mediuns/editar/${medium.medium_id}`)} color="green">Editar</NavigateButton>
                            <NavigateButton width="150px" color="green" onClick={() => generateFichaMedium(medium, adjuntos, ministros, cavaleiros, guias, falMiss, mediuns, token)}>Gerar Ficha</NavigateButton>
                            <NavigateButton width="150px" color="green" disabled={!allFrequencia.some((item: IDesenvolvimento) => item.frequencia.some((el: IFrequencia) => el.medium === medium.medium_id && !(el.dia1 === '-' && el.dia2 === '-' && el.dia3 === '-' && el.dia4 === '-' && el.dia5 === '-')))} onClick={() => {
                                setShowModal(true);
                                setSelectModal('frequencia');
                            }}>Frequência</NavigateButton>
                            <NavigateButton width="150px" color="green" disabled={searchMediumInCons(medium.medium_id) === defaultConsagracao} onClick={() => generateAutorizacao([searchMediumInCons(medium.medium_id)], templos, adjuntos, ministros, searchMediumInCons(medium.medium_id).consagracao)}>Autorização</NavigateButton>
                            <NavigateButton width="150px" color="green" disabled={!medium.dtCenturia || medium.sex !== 'Masculino'} onClick={() => generateReclass(medium, adjuntos, ministros, cavaleiros, user)}>Reclassificação</NavigateButton>
                            <NavigateButton width="150px" onClick={() => navigate(`/mediuns/historico/${medium.medium_id}`)} color="green">Linha do Tempo</NavigateButton>
                            <NavigateButton width="150px" onClick={confirmChangeMed} color="red">Mudar Med.</NavigateButton>
                            <NavigateButton width="150px" style={{display: `${user.level === 'Administrador' ? 'block' : 'none'}`}} onClick={deleteMedium} color="red">Excluir</NavigateButton>
                        </MainInfoContainer>
                    </PersonalCard>
                    <div>
                        <PersonalCard showMedium style={{alignItems: 'center'}}>
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
                                <MediumInfo>Telefone: <span>{medium.telefone1}</span></MediumInfo>
                                <MediumInfo>Tel. Emergência: <span>{medium.telefone2}</span></MediumInfo>
                                <MediumInfo>E-mail: <span>{medium.email}</span></MediumInfo>
                                <MediumInfo>Profissão: <span>{medium.profissao}</span></MediumInfo>
                            </InfoContainer>
                        </PersonalCard>
                        <PersonalCard showMedium>
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
                        <PersonalCard showMedium>
                            <SectionTitle>Dados Mediúnicos</SectionTitle>
                            <InfoContainer>
                                <MediumInfo>Adjunto de Origem: <span>{medium.adjOrigem ? ministros.filter((item: IMentor) => item.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === medium.adjOrigem)[0]?.ministro)[0]? ministros.filter((item: IMentor) => item.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === medium.adjOrigem)[0]?.ministro)[0].nome : '' : ''} {medium.adjOrigem ? '- Mestre' : ''} {adjuntos.filter((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)[0]? adjuntos.filter((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)[0].nome : ''}</span></MediumInfo>
                                <MediumInfo>Templo de Origem: <span>{medium.temploOrigem ? `${templos.find((item: ITemplo) => item.templo_id === medium.temploOrigem)?.cidade} - ${templos.find((item: ITemplo) => item.templo_id === medium.temploOrigem)?.estado.abrev}` : ''}</span></MediumInfo>
                                <MediumInfo>Colete nº: <span>{medium.colete ? medium.colete : ''}</span></MediumInfo>
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
                        <PersonalCard showMedium hide={medium.sex.concat(medium.med).length < 10 || !medium.dtCenturia}>
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
                        <PersonalCard showMedium hide={medium.sex.concat(medium.med).length < 10 || !medium.dtCenturia || !positionsAndFunctions(medium)}>
                            <SectionTitle>Cargos e Funções</SectionTitle>
                            <MediumText>
                                {positionsAndFunctions(medium)}
                            </MediumText>
                        </PersonalCard>
                        <PersonalCard showMedium hide={!medium.med}>
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
                        <PersonalCard showMedium hide={!medium.observ}>
                            <SectionTitle>Observações</SectionTitle>
                            <MediumText>{medium.observ}</MediumText>
                        </PersonalCard>
                    </div>
                </GridContainer>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalMediumContent vis={selectModal === 'mudanca'}>
                    <ModalTitle>Mudança de Mediunidade</ModalTitle>
                    <InputContainer labelWidth="auto" inputWidth="180px">
                        <label>{medium.oldDtTest ? 'Data da mudança de mediunidade' : `Data do teste como ${medium.med === 'Doutrinador' ? 'Apará' : medium.med === 'Apará' ? 'Doutrinador' : ''}`}</label>
                        <input type="date" value={testDate} max={nowString} onKeyUp={(e) => handleEnterPress(e, async () => await handleChangeMed(testDate))} onChange={(e) => setTestDate(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={closeModal}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={async () => await handleChangeMed(testDate)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'frequencia'}>
                    <ModalTitle>Frequência - Desenvolvimento</ModalTitle>
                    {allFrequencia
                        .sort((a: IDesenvolvimento, b: IDesenvolvimento) => {
                            const mesA = a.mes || '';
                            const mesB = b.mes || '';
                            if (mesA < mesB) return -1;
                            if (mesA > mesB) return 1;
                            return 0
                        })
                        .filter((item: IDesenvolvimento) => item.frequencia.some((el: IFrequencia) => el.medium === medium.medium_id && !(el.dia1 === '-' && el.dia2 === '-' && el.dia3 === '-' && el.dia4 === '-' && el.dia5 === '-')))
                        .map((item: IDesenvolvimento) => (
                            <InputContainer labelWidth="auto" inputWidth="180px" key={item.mes}>
                                <label>{convertStringToLongDate(item.mes)} <span style={{fontSize: '12px'}}>({showMedDesenv(item.frequencia.filter((el: IFrequencia) => el.medium === medium.medium_id)[0], mediuns)})</span></label>
                                {getSundays(item.mes).map((dia: number, index: number) => {
                                    if (item.frequencia.filter((el: IFrequencia) => el.medium === medium.medium_id)[0]?.[`dia${index + 1 as 1 | 2 | 3 | 4 | 5}`] !== '-') {
                                        return (
                                            <FrequenciaData key={index}>
                                                <p>Dia {String(dia).padStart(2, '0')}</p>
                                                <p>{convertFreqToText(item.frequencia
                                                .filter((el: IFrequencia) => el.medium === medium.medium_id)[0]?.[`dia${index + 1 as 1 | 2 | 3 | 4 | 5}`])}</p>
                                            </FrequenciaData>
                                        )
                                    }
                                    return null
                                })}
                            </InputContainer>
                        ))
                    }
                    <div style={{display: 'flex', gap: '20px', marginTop: '10px'}}>
                        <ModalButton color="red" onClick={closeModal}>Fechar</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
        
    )
}

export default ShowMedium