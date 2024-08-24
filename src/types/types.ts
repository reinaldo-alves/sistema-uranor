export interface ITurno {
    ninfa: Array<string>,
    jaguar: Array<string>
}

export interface ICanto {
    title: string,
    text: Array<string>,
    repeat: number
}

export interface IAdjunto {
    adjunto_id: number,
    nome: string,
    ministro: number,
    classif: string,
    esperanca: boolean
}

export interface IMentor {
    id: number,
    nome: string,
}

export interface ICavaleiro extends IMentor {
    med: string
}

export interface IFalange {
    falange_id: number,
    nome: string,
    primeira: string,
    adjMin: string,
    adjNome: string,
    prefSol: string,
    prefLua: string,
    ninfa: boolean
}

export interface ITemplo {
    templo_id: number, 
    cidade: string,
    estado: IEstado,
    presidente: number
}

export interface IEstado {
    abrev: string,
    state: string
}

export interface IUser {
    user_id: number,
    name: string,
    password: string,
    level: string,
    medium_id: number,
    sex: string
}

export interface IConsagracao {
    consagracao_id: number,
    medium: number,
    consagracao: number,
    termo: boolean,
    nome: string,
    med: string,
    sex: string,
    foto: string,
    templo: number,
    colete: number,
    dtNasc: string,
    dtIniciacao: string,
    classMest: string,
    falMest: string,
    povo: string
}

export interface IEvento {
    evento_id: number,
    medium: number,
    data: string,
    mensagem: string, 
    tipo: string,
    observ: string,
}

export interface ICalendario {
    ano: number,
    janeiro: number,
    fevereiro: number,
    marco: number,
    abril: number,
    maio: number,
    junho: number,
    julho: number,
    agosto: number,
    setembro: number,
    outubro: number,
    novembro: number,
    dezembro: number,
}

export interface IFrequencia {
    medium: number,
    dia1: 'P' | 'F' | 'N' | '-',
    dia2: 'P' | 'F' | 'N' | '-',
    dia3: 'P' | 'F' | 'N' | '-', 
    dia4: 'P' | 'F' | 'N' | '-',
    dia5: 'P' | 'F' | 'N' | '-'
}

export interface IDesenvolvimento {
    mes: string,
    frequencia: Array<IFrequencia>
}

export interface IMedium {
    medium_id: number,
    nome: string,
    med: string,
    sex: string,
    foto: string,
    condicao: string,
    templo: number,
    dtNasc: string,
    rg: string,
    cpf: string,
    mae: string,
    pai: string,
    natur: string,
    naturUF: string,
    profissao: string,
    estCivil: string,
    conjuge: string,
    cep: string,
    endereco: string,
    endNumero: string,
    endCompl: string,
    endBairro: string,
    endCidade: string,
    endUF: string,
    telefone1: string,
    telefone2: string,
    email: string,
    dtIngresso: string,
    dtEmplac: string,
    dtIniciacao: string,
    dtElevacao: string,
    dtCenturia: string,
    dtSetimo: string,
    dtTest: string,
    adjOrigem: number,
    temploOrigem: number,
    colete: number,
    classMest: string,
    falMest: string,
    povo: string,
    falMiss: number,
    adjDevas: string,
    turnoLeg: string,
    turnoTrab: string,
    ministro: number,
    cavaleiro: number,
    guia: number,
    dtMentor: string,
    cor: string,
    estrela: string,
    classif: string,
    dtClassif: string,
    princesa: string,
    pretovelho: string,
    caboclo: string,
    medico: string,
    nomeEmissao: string,
    ninfa: number,
    mestre: number,
    padrinho: number,
    madrinha: number,
    afilhado: number,
    comando: string,
    presidente: string,
    recepcao: boolean,
    devas: boolean,
    regente: boolean,
    janda: boolean,
    trinoSol: string,
    trinoSar: boolean,
    herdeiro: number,
    filho: boolean,
    observ: string,
    oldFoto: string,
    oldDtTest: string,
    oldDtEmplac: string,
    oldDtIniciacao: string,
    oldDtElevacao: string,
    oldClassMest: string,
    oldCavaleiro: number,
    oldCor: string,
    oldDtMentor: string,
    oldEstrela: string,
    oldClassif: string,
    oldDtClassif: string
}