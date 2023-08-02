export type IMedium = any;

export interface IAdjunto {
    id: number,
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
    id: number,
    falange: string,
    primeira: string,
    adjMin: string | null,
    adjNome: string | null,
    prefSol: string | null,
    prfLua: string | null,
    ninfa: boolean
}