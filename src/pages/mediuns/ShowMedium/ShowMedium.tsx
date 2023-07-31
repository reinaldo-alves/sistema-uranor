import { Divider, GridContainer, InfoContainer, MainContainer, MainInfoContainer, MediumButton, MediumInfo, MediumMainInfo, MediumText, NameAndId, PersonalCard, PhotoContainer, SectionTitle } from "./styles";

function ShowMedium() {

    const medium = {
        id: '00065',
        nome: 'Marcos Ambrósio da Silva Gomes Ferreira',
        foto: 'https://guiaavare.com/public/Noticias/3778/20121217024459bc2f826fefe2cf2620c4b4d83681059d.jpg',
        sexo: 'Masculino',
        med: 'Doutrinador',
        situacao: 'Centurião 7° Raio',
        templo: 'Jaboatão - PE',
        condicao: 'Ativo',
        dtNasc: '14/04/1965',
        rg: '3.789.554 SSP/PE',
        cpf: '081.214.397-58',
        mae: 'Maria Edileuza Ambrósio da Silva',
        pai: 'Pablo Gomes Ferreira',
        natural: 'Paudalho',
        naturalUF: 'PE',
        profissao: 'Motorista',
        estCivil: 'Casado',
        conjuge: 'Anita Barbosa do Monte Ferreira',
        cep: '51041-351',
        endereco: 'Rua Alecrim',
        endNumero: '84',
        endCompl: 'Apto 101',
        endBairro: 'Ipsep',
        endCidade: 'Recife',
        endUF: 'PE',
        telefone1: '(81) 99464-1231',
        telefone2: '(81) 3034-6890',
        email: 'masgf@web.com',
        dtIngresso: '14/07/2005',
        dtEmplac: '28/11/2005',
        dtIniciacao: '24/03/2006',
        dtElevacao: '31/08/2006',
        dtCenturia: '28/03/2007',
        dtSetimo: '28/08/2010',
        adjOrigem: 'Parlo',
        temploOrigem: 'Jaboatão - PE',
        colete: '6',
        classMest: 'Mestre Sol',
        falMest: 'Consagração',
        povo: 'Camuxy',
        falMiss: 'Mago',
        adjDevas: 'Alufã',
        turnoLeg: 'Dubali',
        turnoTrab: 'Adelanos',
        ministro: 'Azelano',
        cavaleiro: 'Fejuro',
        corCav: 'Verde',
        classif: 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000',
        dataClassif: '26/08/2012',
        princesa: 'Jurema',
        pretovelho: null,
        caboclo: null,
        medico: null,
        nomeEmissao: 'Marcos Ambrósio',
        ninfa: 'Anita Barbosa do Monte Ferreira',
        mestre: null,
        madrinha: 'Maria Roberta dos Santos Silva',
        padrinho: 'Breno Cardoso Cavalcanti',
        afilhado: null,
        comando: true,
        janata: true,
        lVermelha: true,
        presidente: false,
        vicePres: false,
        recepcao: true,
        devas: false,
        regente: false,
        trinoSol: 'Juremá',
        dtTrinoSol: '27/08/2016',
        trinoSar: false,
        observ: 'Médium muito eficiente e trabalhador'
    }

    const endNum = medium.endNumero? 'n° ' + medium.endNumero : ''
    const cityUF = [medium.endCidade, medium.endUF].filter(el => el !== '').join(" - ")
    const fullAddress = [medium.endereco, endNum, medium.endCompl, medium.endBairro, cityUF].filter(el => el !== '').join(", ")

    return (
        <MainContainer>
            <NameAndId>
                <h1>{medium.nome}</h1>
                <h3>(ID {medium.id})</h3>
            </NameAndId>
            <GridContainer>
                <PersonalCard style={{maxWidth: '252px', justifySelf: 'center'}}>
                    <MainInfoContainer>
                        <PhotoContainer photo={medium.foto}>
                            {medium.foto? '' : 'SEM FOTO'}
                        </PhotoContainer>
                        <MediumMainInfo>Mediunidade: <span>{medium.med}</span></MediumMainInfo>
                        <MediumMainInfo>Sexo: <span>{medium.sexo}</span></MediumMainInfo>
                        <MediumMainInfo>Templo: <span>{medium.templo}</span></MediumMainInfo>
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
                            <MediumInfo>Data de Nascimento: <span>{medium.dtNasc}</span></MediumInfo>
                            <MediumInfo>Natural de: <span>{medium.natural} - {medium.naturalUF}</span></MediumInfo>
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
                            <MediumInfo>Data Ingresso: <span>{medium.dtIngresso}</span></MediumInfo>
                            <MediumInfo>Data Emplacamento: <span>{medium.dtEmplac}</span></MediumInfo>
                            <MediumInfo>Data Iniciação: <span>{medium.dtIniciacao}</span></MediumInfo>
                            <MediumInfo>Data Elevação: <span>{medium.dtElevacao}</span></MediumInfo>
                            <MediumInfo>Data Centúria: <span>{medium.dtCenturia}</span></MediumInfo>
                            <MediumInfo>Data Sétimo: <span>{medium.dtSetimo}</span></MediumInfo>
                        </InfoContainer>
                    </PersonalCard>
                    <PersonalCard>
                        <SectionTitle>Dados Mediúnicos</SectionTitle>
                        <InfoContainer>
                            <MediumInfo>Adjunto de Origem: <span>{medium.adjOrigem}</span></MediumInfo>
                            <MediumInfo>Templo de Origem: <span>{medium.temploOrigem}</span></MediumInfo>
                            <MediumInfo>Colete n°: <span>{medium.colete}</span></MediumInfo>
                            <MediumInfo>Classificação: <span>{medium.classMest}</span></MediumInfo>
                            <MediumInfo>Falange de Mestrado: <span>{medium.falMest}</span></MediumInfo>
                            <MediumInfo>Povo: <span>{medium.povo}</span></MediumInfo>
                            <MediumInfo>Falange Missionária: <span>{medium.falMiss}</span></MediumInfo>
                            <MediumInfo>Adjunto Devas: <span>{medium.adjDevas}</span></MediumInfo>
                            <MediumInfo>Turno: <span>{medium.turnoLeg}</span></MediumInfo>
                            <MediumInfo>Turno de Trabalho: <span>{medium.turnoTrab}</span></MediumInfo>
                        </InfoContainer>
                        {medium.sexo==='Masculino'?
                            <>
                                <Divider></Divider>
                                <InfoContainer>
                                    <MediumInfo>Ministro: <span>{medium.ministro}</span></MediumInfo>
                                    <MediumInfo>Cavaleiro: <span>{medium.cavaleiro} {medium.corCav}</span></MediumInfo>
                                    <MediumInfo>Classificação Atual: <span>{medium.classif}</span></MediumInfo>
                                    <MediumInfo>Data: <span>{medium.dataClassif}</span></MediumInfo>
                                </InfoContainer>
                            </>
                        : medium.sexo==='Feminino'?
                            <>
                                <Divider></Divider>
                                <InfoContainer>
                                    <MediumInfo>Estrela: <span>{medium.ministro}</span></MediumInfo>
                                    <MediumInfo>Guia Missionária: <span>{medium.cavaleiro} {medium.corCav}</span></MediumInfo>
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
                        {medium.sexo.concat(medium.med)==='MasculinoDoutrinador'?
                            <InfoContainer>
                                <MediumInfo>Escrava: <span>{medium.ninfa}</span></MediumInfo>
                                <MediumInfo>Madrinha: <span>{medium.madrinha}</span></MediumInfo>
                                <MediumInfo>Padrinho: <span>{medium.padrinho}</span></MediumInfo>
                            </InfoContainer>
                        : medium.sexo.concat(medium.med)==='MasculinoApará'? 
                            <InfoContainer>
                                <MediumInfo>Afilhado: <span>{medium.afilhado}</span></MediumInfo>
                                <MediumInfo>Ninfa Sol: <span>{medium.ninfa}</span></MediumInfo>
                            </InfoContainer>
                        : medium.sexo.concat(medium.med)==='FemininoDoutrinador'?
                            <InfoContainer>
                                <MediumInfo>Afilhado: <span>{medium.afilhado}</span></MediumInfo>
                                <MediumInfo>Ajanã: <span>{medium.mestre}</span></MediumInfo>
                            </InfoContainer>
                        : medium.sexo.concat(medium.med)==='FemininoApará'?
                            <InfoContainer>
                                <MediumInfo>Mestre: <span>{medium.mestre}</span></MediumInfo>
                            </InfoContainer>
                        : <div></div>}
                    </PersonalCard>
                    <PersonalCard>
                        <SectionTitle>Cargos e Funções</SectionTitle>
                        <MediumText>
                            {medium.comando ? 'Comandante' : ''}
                            {medium.janata ? ' Janatã' : ''}
                            {medium.lVermelha ? ', Lança Vermelha' : ''}
                            {medium.presidente ? ', Presidente' : ''}
                            {medium.vicePres ? ', Vice-presidente' : ''}
                            {medium.recepcao ? ', Recepcionista' : ''}
                            {medium.devas ? ', Devas' : ''}
                            {medium.regente ? ', Regente' : ''}
                            {medium.trinoSol ? ', Trino Solitário ' + medium.trinoSol + ' em ' + medium.dtTrinoSol: ''}
                            {medium.trinoSar ? ', Trino Sardyos' : ''}
                            .
                        </MediumText>
                    </PersonalCard>
                    <PersonalCard>
                        <SectionTitle>Observações</SectionTitle>
                        <MediumText>{medium.observ}</MediumText>
                    </PersonalCard>
                </div>
            </GridContainer>
        </MainContainer>
    )
}

export default ShowMedium