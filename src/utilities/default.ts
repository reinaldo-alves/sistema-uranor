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
    dtTrinoSol: '',
    trinoSar: false,
    dtTrinoSar: '',
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