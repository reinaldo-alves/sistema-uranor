import { IAdjunto, ICavaleiro, IConsagracao, IEvento, IMedium, IMentor, ITemplo, IUser } from "src/types/types"

export const defaultAdj: IAdjunto = {
    adjunto_id: 0,
    nome: '',
    ministro: 0,
    classif: '',
    esperanca: false
}

export const defaultTemp: ITemplo = {
    templo_id: 0,
    cidade: '',
    estado: {
        abrev: '',
        state: ''
    },
    presidente: 0
}

export const defaultUser: IUser = {
    user_id: 0,
    name: '',
    password: '',
    level: '',
    medium_id: 0,
    sex: ''
}

export const defaultMentor: IMentor = {
    id: 0,
    nome: '',
}

export const defaultCavaleiro: ICavaleiro = {
    id: 0,
    nome: '',
    med: ''
}

export const defaultConsagracao: IConsagracao = {
    consagracao_id: 0,
    medium: 0,
    consagracao: 0,
    termo: false,
    nome: '',
    med: '',
    sex: '',
    foto: '',
    templo: 0,
    colete: 0,
    dtNasc: '',
    dtIniciacao: '',
    classMest: '',
    falMest: '',
    povo: ''
}

export const defaultEvento: IEvento = {
    evento_id: 0,
    medium: 0,
    data: '',
    mensagem: '', 
    tipo: '',
    observ: '',
}

export const defaultCalendario = {
    ano: 2024,
    janeiro: 1,
    fevereiro: 1,
    marco: 1,
    abril: 1,
    maio: 1,
    junho: 1,
    julho: 1,
    agosto: 1,
    setembro: 1,
    outubro: 1,
    novembro: 1,
    dezembro: 1,
}

export const defaultMedium: IMedium = {
    medium_id: 0,
    nome: '',
    med: '',
    sex: '',
    foto: '',
    condicao: 'Ativo',
    templo: 0,
    dtNasc: '',
    rg: '',
    cpf: '',
    mae: '',
    pai: '',
    natur: '',
    naturUF: '',
    profissao: '',
    estCivil: '',
    conjuge: '',
    cep: '',
    endereco: '',
    endNumero: '',
    endCompl: '',
    endBairro: '',
    endCidade: '',
    endUF: '',
    telefone1: '',
    telefone2: '',
    email: '',
    dtIngresso: '',
    dtEmplac: '',
    dtIniciacao: '',
    dtElevacao: '',
    dtCenturia: '',
    dtSetimo: '',
    dtTest: '',
    adjOrigem: 0,
    temploOrigem: 0,
    colete: 0,
    classMest: '',
    falMest: '',
    povo: '',
    falMiss: 0,
    adjDevas: '',
    turnoLeg: '',
    turnoTrab: '',
    ministro: 0,
    cavaleiro: 0,
    guia: 0,
    dtMentor: '',
    cor: '',
    estrela: '',
    classif: '',
    dtClassif: '',
    princesa: '',
    pretovelho: '',
    caboclo: '',
    medico: '',
    nomeEmissao: '',
    ninfa: 0,
    mestre: 0,
    padrinho: 0,
    madrinha: 0,
    afilhado: 0,
    comando: '',
    presidente: '',
    recepcao: false,
    devas: false,
    regente: false,
    janda: false,
    trinoSol: '',
    trinoSar: false,
    herdeiro: 0,
    filho: false,
    observ: '',
    oldFoto: '',
    oldDtTest: '',
    oldDtEmplac: '',
    oldDtIniciacao: '',
    oldDtElevacao: '',
    oldClassMest: '',
    oldCavaleiro: 0,
    oldCor: '',
    oldDtMentor: '',
    oldEstrela: '',
    oldClassif: '',
    oldDtClassif: ''
}

export const eventTypes = [
    {event: 'Classificações', prior: 3, auto: false},
    {event: 'Mudança de Mediunidade', prior: 1, auto: false},
    {event: 'Mudança de Templo', prior: 1, auto: false},
    {event: 'Mudança de Adjunto de Origem', prior: 6, auto: false},
    {event: 'Mudança de Turno', prior: 6, auto: false},
    {event: 'Outras Consagrações', prior: 5, auto: false},
    {event: 'Desistente do Desenvolvimento', prior: 5, auto: false},
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