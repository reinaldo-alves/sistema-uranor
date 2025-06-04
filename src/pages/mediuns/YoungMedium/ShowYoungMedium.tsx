import { useCallback, useContext, useEffect, useState } from "react";
import Header from "src/components/header/header";
import { ButtonContainer, InfoContainer, MainInfoContainer, MediumInfo, MediumMainInfo, MediumText, NameAndId } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useNavigate, useParams } from "react-router-dom";
import { IFalange, IMenor, ITemplo } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { convertDate, handleEnterPress, showTemplo } from "src/utilities/functions";
import { ListContext } from "src/contexts/ListContext";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import Loading from "src/utilities/Loading";
import { Alert, Confirm } from "src/utilities/popups";
import { generateEmissao } from "src/utilities/createDocs";
import { validateEmissaoMenor } from "src/utilities/validations";
import { emissaoMenorText } from "src/reports/emissao";
import api from "src/api";
import MainContainer from "src/components/MainContainer/MainContainer";
import { Modal, ModalButton, ModalContent, ModalInputContainer, ModalSubTitle, ModalTitle } from "src/components/Modal/modal";
import { MediumContext } from "src/contexts/MediumContext";
import { NavigateButton } from "src/components/buttons/buttons";
import { PersonalCard } from "src/components/cardsContainers/cardsContainers";
import { SectionTitle } from "src/components/texts/texts";

function ShowYoungMedium() {
    const [loading, setLoading] = useState(true);
    const [menor, setMenor] = useState({} as IMenor);
    const [showModal, setShowModal] = useState(false);
    const [med, setMed] = useState('');
    const [dtIngresso, setDtIngresso] = useState('');
    
    const { token, user } = useContext(UserContext);
    const { loadMedium } = useContext(MediumContext);
    const { menores, loadMenor, convertMenorToSend, ministros, adjuntos, templos, falMiss } = useContext(ListContext);
    const params = useParams();
    const navigate = useNavigate();

    const now = new Date().toISOString().split('T')[0];
    
    const getInfo = useCallback(async () => {
        await loadMenor(token);
        setLoading(false);
    }, [loadMenor, token]);

    useEffect(() => {
        getInfo();
    }, [getInfo])
     
    useEffect(() => {
        if(menor?.menor_id && ministros.length && adjuntos.length && templos.length && falMiss.length) {
            setLoading(false);
        }
    }, [menor?.menor_id, ministros, adjuntos, templos, falMiss])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    
    useEffect(() => {
        const foundMenor = menores.find((item: IMenor) => item.menor_id === Number(params.id));
        setMenor(foundMenor);
    }, [menores, params.id])
    
    if(loading) {
        return <Loading />
    }

    if(!menor) {
        return <PageNotFound />
    }

    const endNum = menor.endNumero? 'nº ' + menor.endNumero : ''
    const cityUF = [menor.endCidade, menor.endUF].filter(el => el !== '').join(" - ")
    const naturCityUF = [menor.natur, menor.naturUF].filter(el => el !== '').join(" - ")
    const fullAddress = [menor.endereco, endNum, menor.endCompl, menor.endBairro, cityUF].filter(el => el !== '').join(", ")

    const closeModal = () => {
        setShowModal(false);
        setMed('');
        setDtIngresso('');
    }

    const addMedium = async (menor: IMenor, token: string) => {
        const menorObj = convertMenorToSend(menor);
        const mediumObj = {
            ...menorObj,
            med: med,
            foto: null,
            dtIngresso: dtIngresso,
            dtEmplac: null,
            dtIniciacao: null,
            dtElevacao: null,
            dtCenturia: null,
            dtSetimo: null,
            dtTest: null,
            adjOrigem: null,
            colete: null,
            classMest: null,
            falMest: null,
            povo: null,
            turnoLeg: null,
            turnoTrab: null,
            ministro: null,
            cavaleiro: null,
            guia: null,
            dtMentor: null,
            cor: null,
            estrela: null,
            classif: null,
            dtClassif: null,
            princesa: null,
            pretovelho: null,
            caboclo: null,
            medico: null,
            ninfa: null,
            mestre: null,
            padrinho: null,
            madrinha: null,
            afilhado: null,
            comando: null,
            presidente: null,
            recepcao: null,
            devas: null,
            regente: null,
            janda: null,
            trinoSol: null,
            trinoSar: null,
            herdeiro: null,
            filho: null,
            oldFoto: null,
            oldDtTest: null,
            oldDtEmplac: null,
            oldDtIniciacao: null,
            oldDtElevacao: null,
            oldClassMest: null,
            oldCavaleiro: null,
            oldCor: null,
            oldDtMentor: null,
            oldEstrela: null,
            oldClassif: null,
            oldDtClassif: null
        }
        const {menor_id, ...newMediumObj} = mediumObj;
        try {
            const response = await api.post('/medium/create', newMediumObj, {headers:{Authorization: token}})
            const { medium_id } = response.data;
            Alert('Médium menor transferido para o cadastro geral', 'success');
            await loadMedium(token);
            navigate(`/mediuns/consulta/${medium_id}`);
        } catch (error) {
            console.log('Não foi possível transferir o médium menor para o cadastro geral', error);
            Alert('Não foi possível transferir o médium menor para o cadastro geral', 'error');
        }
    }

    const deleteMenor = async () => {
        await Confirm('ATENÇÃO! Todos os dados do médium menor serão perdidos e não poderão ser recuperados. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                await api.delete(`/menor/delete?menor_id=${menor.menor_id}`, {headers:{Authorization: token}})
                navigate('/mediuns/menor');
                Alert('Médium menor excluído com sucesso', 'success');
            } catch (error) {
                console.log('Erro ao excluir médium menor', error);
                Alert('Erro ao excluir médium menor', 'error');
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
                    <h1>Médium Menor</h1>
                    <h2>{menor.nome}</h2>
                </NameAndId>
                <MainInfoContainer>
                    <MediumMainInfo>Sexo: <span>{menor.sex}</span></MediumMainInfo>
                    <MediumMainInfo>Templo: <span>{showTemplo(menor, templos)}</span></MediumMainInfo>
                    <MediumMainInfo>Condição Atual: <span>{menor.condicao}</span></MediumMainInfo>
                </MainInfoContainer>
                <ButtonContainer>
                    <NavigateButton width="150px" height="45px" onClick={() => navigate('/mediuns/menor')} color="green">{'< Voltar'}</NavigateButton>
                    <NavigateButton width="150px" height="45px" disabled={!menor.falMiss} onClick={() => validateEmissaoMenor(menor, () => generateEmissao(menor, user, emissaoMenorText(menor, ministros, adjuntos, templos, falMiss) as string))} color="green">Gerar Emissão</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => navigate(`/mediuns/menor/editar/${menor.menor_id}`)} color="green">Editar</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => setShowModal(true)}>Mover Cad. Geral</NavigateButton>
                    <NavigateButton width="150px" height="45px" style={{display: `${user.level === 'Administrador' ? 'block' : 'none'}`}} onClick={deleteMenor} color="red">Excluir</NavigateButton>
                </ButtonContainer>
                <PersonalCard showMedium>
                    <SectionTitle>Dados Pessoais</SectionTitle>
                    <InfoContainer>
                        <MediumInfo>Data de Nascimento: <span>{convertDate(menor.dtNasc)}</span></MediumInfo>
                        <MediumInfo>Natural de: <span>{naturCityUF}</span></MediumInfo>
                        <MediumInfo>RG: <span>{menor.rg}</span></MediumInfo>
                        <MediumInfo>CPF: <span>{menor.cpf}</span></MediumInfo>
                        <MediumInfo>Nome do Pai: <span>{menor.pai}</span></MediumInfo>
                        <MediumInfo>Nome da Mãe: <span>{menor.mae}</span></MediumInfo>
                        <MediumInfo>Estado Civil: <span>{menor.estCivil}</span></MediumInfo>
                        <MediumInfo>Cônjuge: <span>{menor.conjuge}</span></MediumInfo>
                        <MediumInfo>CEP: <span>{menor.cep}</span></MediumInfo>
                        <MediumInfo>Endereço: <span>{fullAddress}</span></MediumInfo>
                        <MediumInfo>Telefone: <span>{menor.telefone1}</span></MediumInfo>
                        <MediumInfo>Tel. Emergência: <span>{menor.telefone2}</span></MediumInfo>
                        <MediumInfo>E-mail: <span>{menor.email}</span></MediumInfo>
                        <MediumInfo>Profissão: <span>{menor.profissao}</span></MediumInfo>
                    </InfoContainer>
                </PersonalCard>
                <PersonalCard showMedium>
                    <SectionTitle>Dados do Responsável</SectionTitle>
                    <InfoContainer>
                        <MediumInfo>Responsável: <span>{menor.responsavel}</span></MediumInfo>
                        <MediumInfo>Parentesco: <span>{menor.parentesco}</span></MediumInfo>
                        <MediumInfo>Contato Responsável: <span>{menor.contatoResp}</span></MediumInfo>
                    </InfoContainer>
                </PersonalCard>
                <PersonalCard showMedium>
                    <SectionTitle>Dados Mediúnicos</SectionTitle>
                    <InfoContainer>
                        <MediumInfo>Templo de Origem: <span>{menor.temploOrigem ? `${templos.find((item: ITemplo) => item.templo_id === menor.temploOrigem)?.cidade} - ${templos.find((item: ITemplo) => item.templo_id === menor.temploOrigem)?.estado.abrev}` : ''}</span></MediumInfo>
                        <MediumInfo>Nome na Emissão: <span>{menor.nomeEmissao}</span></MediumInfo>
                        <MediumInfo>Falange Missionária: <span>{falMiss.filter((item: IFalange) => item.falange_id === menor.falMiss)[0]? falMiss.filter((item: IFalange) => item.falange_id === menor.falMiss)[0].nome : ''}</span></MediumInfo>
                        <MediumInfo>Adjunto Devas: <span>{menor.adjDevas}</span></MediumInfo>
                    </InfoContainer>
                </PersonalCard>
                <PersonalCard showMedium hide={!menor.observ}>
                    <SectionTitle>Observações</SectionTitle>
                    <MediumText>{menor.observ}</MediumText>
                </PersonalCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Mover para Cadastro Geral</ModalTitle>
                    <ModalSubTitle>{menor.nome}</ModalSubTitle>
                    <ModalInputContainer>
                        <label>Mediunidade:</label>
                        <select value={med} onKeyUp={(e) => handleEnterPress(e, async () => await addMedium(menor, token))} onChange={(e) => setMed(e.target.value)}>
                            <option value={''}></option>
                            <option value={'Apará'}>Apará</option>
                            <option value={'Doutrinador'}>Doutrinador</option>
                        </select>
                    </ModalInputContainer>
                    <ModalInputContainer>
                        <label>Data de ingresso:</label>
                        <input type="date" value={dtIngresso} onKeyUp={(e) => handleEnterPress(e, async () => await addMedium(menor, token))} onChange={(e) => setDtIngresso(e.target.value)} min={menor.dtNasc} max={now} />
                    </ModalInputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={closeModal}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={async () => await addMedium(menor, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default ShowYoungMedium