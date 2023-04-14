import { InfoContainer, MainContainer, MainInfoContainer, MediumButton, MediumInfo, NameAndId, PersonalCard, PhotoContainer, SectionTitle } from "./styles";
import { MediumContext } from "src/contexts/MediumContext";

function ShowMedium() {
    // const { medium } = useContext(MediumContext);

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

    return (
        <MainContainer>
            <PersonalCard>
                <div style={{display:'flex', gap:'30px', width:'100%'}}>
                    <PhotoContainer photo={medium.foto}>
                        {medium.foto? '' : 'SEM FOTO'}
                    </PhotoContainer>
                    <MainInfoContainer>
                        <NameAndId>
                            <span>{medium.nome}</span>
                            <span>ID: {medium.id}</span>
                        </NameAndId>
                        <InfoContainer>
                            <MediumInfo>Mediunidade: <span>{medium.med}</span></MediumInfo>
                            <MediumInfo>Sexo: <span>{medium.sexo}</span></MediumInfo>
                            <MediumInfo>Templo: <span>{medium.templo}</span></MediumInfo>
                            <MediumInfo>Condição Atual: <span>{medium.condicao}</span></MediumInfo>
                        </InfoContainer>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                            <MediumButton color="green">Gerar Emissão</MediumButton>
                            <MediumButton color="green">Editar</MediumButton>
                            <MediumButton color="green">Gerar Ficha</MediumButton>
                            <MediumButton color="green">Autorização</MediumButton>
                            <MediumButton color="green">Linha do Tempo</MediumButton>
                        </div>
                    </MainInfoContainer>
                </div>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Dados Pessoais</SectionTitle>
                <InfoContainer>
                    <MediumInfo>Data de Nascimento: <span>{medium.dtNasc}</span></MediumInfo>
                    <MediumInfo>Natural de: <span>{medium.natural} - {medium.naturalUF}</span></MediumInfo>
                    <MediumInfo>RG: <span>{medium.rg}</span></MediumInfo>
                    <MediumInfo>CPF: <span>{medium.cpf}</span></MediumInfo>
                </InfoContainer>
                <InfoContainer>
                    <MediumInfo>Nome do Pai: <span>{medium.pai}</span></MediumInfo>
                    <MediumInfo>Nome da Mãe: <span>{medium.mae}</span></MediumInfo>
                    <MediumInfo>Profissão: <span>{medium.profissao}</span></MediumInfo>
                    <MediumInfo>Estado Civil: <span>{medium.estCivil}</span></MediumInfo>
                    <MediumInfo>Cônjuge: <span>{medium.conjuge}</span></MediumInfo>
                </InfoContainer>
                <InfoContainer>
                    <MediumInfo>CEP: <span>{medium.cep}</span></MediumInfo>
                    <MediumInfo>Endereço: <span>{medium.endereco}</span></MediumInfo>
                    <MediumInfo>Número: <span>{medium.endNumero}</span></MediumInfo>
                    <MediumInfo>Complemento: <span>{medium.endCompl}</span></MediumInfo>
                    <MediumInfo>Bairro: <span>{medium.endBairro}</span></MediumInfo>
                    <MediumInfo>Cidade: <span>{medium.endCidade}</span></MediumInfo>
                    <MediumInfo>UF: <span>{medium.endUF}</span></MediumInfo>
                </InfoContainer>
                <InfoContainer>
                    <MediumInfo>Telefone 1: <span>{medium.telefone1}</span></MediumInfo>
                    <MediumInfo>Telefone 2: <span>{medium.telefone2}</span></MediumInfo>
                    <MediumInfo>Email: <span>{medium.email}</span></MediumInfo>
                </InfoContainer>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Datas Mediúnicas</SectionTitle>
                <InfoContainer>
                    <MediumInfo>Ingresso: <span>{medium.dtIngresso}</span></MediumInfo>
                    <MediumInfo>Emplacamento: <span>{medium.dtEmplac}</span></MediumInfo>
                    <MediumInfo>Iniciação: <span>{medium.dtIniciacao}</span></MediumInfo>
                    <MediumInfo>Elevação: <span>{medium.dtElevacao}</span></MediumInfo>
                    <MediumInfo>Centúria: <span>{medium.dtCenturia}</span></MediumInfo>
                    <MediumInfo>Sétimo: <span>{medium.dtSetimo}</span></MediumInfo>
                </InfoContainer>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Dados Mediúnicos</SectionTitle>
                <InfoContainer>
                    <MediumInfo>Adjunto de Origem: <span>{medium.adjOrigem}</span></MediumInfo>
                    <MediumInfo>Templo de Origem: <span>{medium.temploOrigem}</span></MediumInfo>
                    <MediumInfo>Colete n°: <span>{medium.colete}</span></MediumInfo>
                </InfoContainer>
                <InfoContainer>
                    <MediumInfo>Classificação: <span>{medium.classMest}</span></MediumInfo>
                    <MediumInfo>Falange de Mestrado: <span>{medium.falMest}</span></MediumInfo>
                    <MediumInfo>Povo: <span>{medium.povo}</span></MediumInfo>
                    <MediumInfo>Falange Missionária: <span>{medium.falMiss}</span></MediumInfo>
                    <MediumInfo>Adjunto Devas: <span>{medium.adjDevas}</span></MediumInfo>
                    <MediumInfo>Turno: <span>{medium.turnoLeg}</span></MediumInfo>
                    <MediumInfo>Turno de Trabalho: <span>{medium.turnoTrab}</span></MediumInfo>
                </InfoContainer>
                {medium.sexo==='Masculino'?
                    <InfoContainer>
                        <MediumInfo>Ministro: <span>{medium.ministro}</span></MediumInfo>
                        <MediumInfo>Cavaleiro: <span>{medium.cavaleiro}</span></MediumInfo>
                        <MediumInfo>Cor do Cavaleiro: <span>{medium.corCav}</span></MediumInfo>
                        <MediumInfo>Classificação Atual: <span>{medium.classif}</span></MediumInfo>
                        <MediumInfo>Data: <span>{medium.dataClassif}</span></MediumInfo>
                    </InfoContainer>
                : medium.sexo==='Feminino'?
                    <InfoContainer>
                        <MediumInfo>Estrela: <span>{medium.ministro}</span></MediumInfo>
                        <MediumInfo>Guia Missionária: <span>{medium.cavaleiro}</span></MediumInfo>
                        <MediumInfo>Cor da Guia: <span>{medium.corCav}</span></MediumInfo>
                    </InfoContainer>
                : ''}
                {medium.med==='Doutrinador'?
                    <InfoContainer>
                        <MediumInfo>Princesa: <span>{medium.princesa}</span></MediumInfo>
                        <MediumInfo>Nome na Emissão: <span>{medium.nomeEmissao}</span></MediumInfo>
                    </InfoContainer>
                : medium.med==='Apará'?
                    <InfoContainer>
                        <MediumInfo>Preto Velho: <span>{medium.pretovelho}</span></MediumInfo>
                        <MediumInfo>Caboclo: <span>{medium.caboclo}</span></MediumInfo>
                        <MediumInfo>Médico: <span>{medium.medico}</span></MediumInfo>
                        <MediumInfo>Nome na Emissão: <span>{medium.nomeEmissao}</span></MediumInfo>
                    </InfoContainer>
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
                <InfoContainer>
                    <MediumInfo align="center">
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
                    </MediumInfo>
                </InfoContainer>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Observações</SectionTitle>
                <MediumInfo align="center">{medium.observ}</MediumInfo>
            </PersonalCard>
        </MainContainer>
    )
}

export default ShowMedium