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
    id: number,
    name: string,
    level: string,
    medium_id: number
}

export interface IMedium {
    medium_id: number,
    nome: string,
    med: string,
    sex: string,
    foto: string,
    condicao: string,
    templo: number,
    dtNasc: Date,
    rg: string,
    cpf: number,
    mae: string,
    pai: string,
    natur: string,
    naturUF: string,
    profissao: string,
    estCivil: string,
    conjuge: string,
    cep: number,
    endereco: string,
    endNumero: string,
    endCompl: string,
    endBairro: string,
    endCidade: string,
    endUF: string,
    telefone1: number,
    telefone2: number,
    email: string,
    dtIngresso: Date,
    dtEmplac: Date,
    dtIniciacao: Date,
    dtElevacao: Date,
    dtCenturia: Date,
    dtSetimo: Date,
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
    dtMinistro: Date,
    guia: number,
    dtGuia: Date,
    cor: string,
    estrela: string,
    classif: string,
    dtClassif: Date,
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
    comando: boolean,
    janata: boolean,
    lVermelha: boolean,
    presidente: boolean,
    vicePres: boolean,
    recepcao: boolean,
    devas: boolean,
    regente: boolean,
    janda: boolean,
    trinoSol: string,
    dtTrinoSol: Date,
    trinoSar: boolean,
    dtTrinoSar: Date,
    herdeiro: number,
    filho: boolean,
    observ: string
}