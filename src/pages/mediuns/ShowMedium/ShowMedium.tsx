import { useContext, useEffect, useState } from "react";
import Header from "src/components/header/header";
import { Divider, GridContainer, InfoContainer, MainContainer, MainInfoContainer, MediumButton, MediumInfo, MediumMainInfo, MediumText, NameAndId, PersonalCard, PhotoContainer, SectionTitle } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import { useParams } from "react-router-dom";
import { MediumContext } from "src/contexts/MediumContext";
import { IAdjunto, ICavaleiro, IFalange, IMedium, IMentor, ITemplo } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import { convertDate } from "src/utilities/functions";
import { ListContext } from "src/contexts/ListContext";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import Loading from "src/utilities/Loading";

function ShowMedium() {
    const [loading, setLoading] = useState(true);
    const [medium, setMedium] = useState({} as IMedium);
    
    const { token, getUser } = useContext(UserContext);
    const { mediuns, loadMedium } = useContext(MediumContext);
    const { ministros, cavaleiros, guias, adjuntos, templos, falMiss, getData } = useContext(ListContext);
    const params = useParams();

    //const medium: IMedium = mediuns.filter((item: IMedium) => item.medium_id === Number(params.id))[0]
    
    const getInfo = async () => {
        await loadMedium(token);
        await getData(token);
        await getUser(token);
        setLoading(false);
    }
    
    useEffect(() => {
        getInfo();
        const foundMedium = mediuns.find((item: IMedium) => item.medium_id === Number(params.id));
        setMedium(foundMedium);
    }, [params.id, mediuns])

    
    if(loading) {
        return <Loading />
    }

    if(!medium) {
        return <PageNotFound />
    }

    const endNum = medium.endNumero? 'n° ' + medium.endNumero : ''
    const cityUF = [medium.endCidade, medium.endUF].filter(el => el !== '').join(" - ")
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
                            <MediumMainInfo>Condição Atual: <span>{medium.condicao}</span></MediumMainInfo>
                            <MediumButton color="green">Gerar Emissão</MediumButton>
                            <MediumButton color="green">Editar</MediumButton>
                            <MediumButton color="green">Gerar Ficha</MediumButton>
                            <MediumButton color="green">Autorização</MediumButton>
                            <MediumButton color="green">Linha do Tempo</MediumButton>
                            <MediumButton color="red">Excluir</MediumButton>
                        </MainInfoContainer>
                    </PersonalCard>
                    <div>
                        <PersonalCard>
                            <SectionTitle>Dados Pessoais</SectionTitle>
                            <InfoContainer>
                                <MediumInfo>Data de Nascimento: <span>{convertDate(medium.dtNasc)}</span></MediumInfo>
                                <MediumInfo>Natural de: <span>{medium.natur} - {medium.naturUF}</span></MediumInfo>
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
                                <MediumInfo>Adjunto de Origem: <span>{ministros.filter((item: IMentor) => item.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === medium.adjOrigem)[0].ministro)[0]? ministros.filter((item: IMentor) => item.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === medium.adjOrigem)[0].ministro)[0].nome : ''} - Mestre {adjuntos.filter((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)[0]? adjuntos.filter((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)[0].nome : ''}</span></MediumInfo>
                                <MediumInfo>Templo de Origem: <span>{templos.filter((item: ITemplo) => item.templo_id === medium.templo)[0].cidade} - {templos.filter((item: ITemplo) => item.templo_id === medium.templo)[0].estado.abrev}</span></MediumInfo>
                                <MediumInfo>Colete n°: <span>{medium.colete}</span></MediumInfo>
                                <MediumInfo>Classificação: <span>{medium.classMest}</span></MediumInfo>
                                <MediumInfo>Falange de Mestrado: <span>{medium.falMest}</span></MediumInfo>
                                <MediumInfo>Povo: <span>{medium.povo}</span></MediumInfo>
                                <MediumInfo>Falange Missionária: <span>{falMiss.filter((item: IFalange) => item.falange_id === medium.falMiss)[0]? falMiss.filter((item: IFalange) => item.falange_id === medium.falMiss)[0].nome : ''}</span></MediumInfo>
                                <MediumInfo>Adjunto Devas: <span>{medium.adjDevas}</span></MediumInfo>
                                <MediumInfo>Turno: <span>{medium.turnoLeg}</span></MediumInfo>
                                <MediumInfo>Turno de Trabalho: <span>{medium.turnoTrab}</span></MediumInfo>
                            </InfoContainer>
                            {medium.sex==='Masculino'?
                                <>
                                    <Divider></Divider>
                                    <InfoContainer>
                                        <MediumInfo>Ministro: <span>{ministros.find((item: IMentor) => item.id === medium.ministro) ? ministros.find((item: IMentor) => item.id === medium.ministro).nome : ''}</span></MediumInfo>
                                        <MediumInfo>Cavaleiro: <span>{cavaleiros.find((item: ICavaleiro) => item.id === medium.cavaleiro) ? cavaleiros.find((item: ICavaleiro) => item.id === medium.cavaleiro).nome : ''} {medium.cavaleiro? medium.cor : ''}</span></MediumInfo>
                                        <MediumInfo>Data Ministro: <span>{convertDate(medium.dtMinistro)}</span></MediumInfo>
                                        <MediumInfo>Data Classificação Atual: <span>{convertDate(medium.dtClassif)}</span></MediumInfo>
                                    </InfoContainer>
                                        <MediumInfo out>Classificação Atual: <span>{medium.classif}</span></MediumInfo>
                                </>
                            : medium.sex==='Feminino'?
                                <>
                                    <Divider></Divider>
                                    <InfoContainer>
                                        <MediumInfo>Estrela: <span>{medium.estrela}</span></MediumInfo>
                                        <MediumInfo>Guia Missionária: <span>{guias.find((item: IMentor) => item.id === medium.guia) ? guias.find((item: IMentor) => item.id === medium.guia).nome : ''} {medium.guia? medium.cor : ''}</span></MediumInfo>
                                    </InfoContainer>
                                </>
                            : ''}
                            {medium.med==='Doutrinador'?
                                <>
                                    <Divider></Divider>
                                    <InfoContainer>
                                        <MediumInfo>Princesa: <span>{medium.princesa}</span></MediumInfo>
                                        <MediumInfo>Nome na Emissão: <span>{medium.nomeEmissao}</span></MediumInfo>
                                    </InfoContainer>
                                </>
                            : medium.med==='Apará'?
                                <>
                                    <Divider></Divider>
                                    <InfoContainer>
                                        <MediumInfo>Preto Velho: <span>{medium.pretovelho}</span></MediumInfo>
                                        <MediumInfo>Caboclo: <span>{medium.caboclo}</span></MediumInfo>
                                        <MediumInfo>Médico: <span>{medium.medico}</span></MediumInfo>
                                        <MediumInfo>Nome na Emissão: <span>{medium.nomeEmissao}</span></MediumInfo>
                                    </InfoContainer>
                                </>
                            : ''}
                        </PersonalCard>
                        <PersonalCard>
                            <SectionTitle>Povo</SectionTitle>
                            {medium.sex.concat(medium.med)==='MasculinoDoutrinador'?
                                <InfoContainer>
                                    <MediumInfo>Escrava: <span>{mediuns.find((item: IMedium) => item.medium_id === medium.ninfa) ? mediuns.find((item: IMedium) => item.medium_id === medium.ninfa).nome : ''}</span></MediumInfo>
                                    <MediumInfo>Madrinha: <span>{mediuns.find((item: IMedium) => item.medium_id === medium.madrinha) ? mediuns.find((item: IMedium) => item.medium_id === medium.madrinha).nome : ''}</span></MediumInfo>
                                    <MediumInfo>Padrinho: <span>{mediuns.find((item: IMedium) => item.medium_id === medium.padrinho) ? mediuns.find((item: IMedium) => item.medium_id === medium.padrinho).nome : ''}</span></MediumInfo>
                                </InfoContainer>
                            : medium.sex.concat(medium.med)==='MasculinoApará'? 
                                <InfoContainer>
                                    <MediumInfo>Afilhado: <span>{mediuns.find((item: IMedium) => item.medium_id === medium.afilhado) ? mediuns.find((item: IMedium) => item.medium_id === medium.afilhado).nome : ''}</span></MediumInfo>
                                    <MediumInfo>Ninfa Sol: <span>{mediuns.find((item: IMedium) => item.medium_id === medium.ninfa) ? mediuns.find((item: IMedium) => item.medium_id === medium.ninfa).nome : ''}</span></MediumInfo>
                                </InfoContainer>
                            : medium.sex.concat(medium.med)==='FemininoDoutrinador'?
                                <InfoContainer>
                                    <MediumInfo>Afilhado: <span>{mediuns.find((item: IMedium) => item.medium_id === medium.afilhado) ? mediuns.find((item: IMedium) => item.medium_id === medium.afilhado).nome : ''}</span></MediumInfo>
                                    <MediumInfo>Ajanã: <span>{mediuns.find((item: IMedium) => item.medium_id === medium.mestre) ? mediuns.find((item: IMedium) => item.medium_id === medium.mestre).nome : ''}</span></MediumInfo>
                                </InfoContainer>
                            : medium.sex.concat(medium.med)==='FemininoApará'?
                                <InfoContainer>
                                    <MediumInfo>Mestre: <span>{mediuns.find((item: IMedium) => item.medium_id === medium.mestre) ? mediuns.find((item: IMedium) => item.medium_id === medium.mestre).nome : ''}</span></MediumInfo>
                                </InfoContainer>
                            : <div></div>}
                        </PersonalCard>
                        <PersonalCard>
                            <SectionTitle>Cargos e Funções</SectionTitle>
                            <MediumText>
                                {positionsAndFunctions(medium)}
                            </MediumText>
                        </PersonalCard>
                        <PersonalCard>
                            <SectionTitle>Observações</SectionTitle>
                            <MediumText>{medium.observ}</MediumText>
                        </PersonalCard>
                    </div>
                </GridContainer>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default ShowMedium