export interface IAdjunto {
    adjunto_id: number,
    min: string,
    adj: string,
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
    adjMin: string | null,
    adjNome: string | null,
    prefSol: string | null,
    prefLua: string | null,
    ninfa: boolean
}

export interface ITemplo {
    id: number, 
    cidade: string,
    estado: string,
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
    id: number,
    nome: string,
    med: string,
    sex: string,
    foto: string | null,
    condicao: string | null,
    templo: number,
    dtNasc: Date | null,
    rg: string | null,
    cpf: number | null,
    mae: string,
    pai: string | null,
    natur: string | null,
    naturUF: string | null,
    profissao: string | null,
    estCivil: string | null,
    conjuge: string | null,
    cep: number | null,
    endereco: string | null,
    endNumero: string | null,
    endCompl: string | null,
    endBairro: string | null,
    endCidade: string | null,
    endUF: string | null,
    telefone1: number | null,
    telefone2: number | null,
    email: string | null,
    dtIngresso: Date | null,
    dtEmplac: Date | null,
    dtIniciacao: Date | null,
    dtElevacao: Date | null,
    dtCenturia: Date | null,
    dtSetimo: Date | null,
    adjOrigem: number | null,
    temploOrigem: number | null,
    colete: number | null,
    classMest: string | null,
    falMest: string | null,
    povo: string | null,
    falMiss: number | null,
    adjDevas: string | null,
    turnoLeg: string | null,
    turnoTrab: string | null,
    ministro: number | null,
    cavaleiro: number | null,
    dtMinistro: Date | null,
    guia: number | null,
    dtGuia: Date | null,
    cor: string | null,
    estrela: string | null,
    classif: string | null,
    dtClassif: Date | null,
    princesa: string | null,
    pretovelho: string | null,
    caboclo: string | null,
    médico: string | null,
    nomeEmissao: string | null,
    ninfa: number | null,
    mestre: number | null,
    padrinho: number | null,
    madrinha: number | null,
    afilhado: number | null,
    comando: boolean | null,
    janata: boolean | null,
    lVermelha: boolean | null,
    presidente: boolean | null,
    vicePres: boolean | null,
    recepcao: boolean | null,
    devas: boolean | null,
    regente: boolean | null,
    janda: boolean | null,
    trinoSol: string | null,
    dtTrinoSol: Date | null,
    trinoSar: string | null,
    dtTrinoSar: Date | null,
    herdeiro: number | null,
    filho: boolean | null,
    observ: string | null,
}