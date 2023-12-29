import pdfMake from 'pdfmake/build/pdfmake'
import pdfTimes from 'pdfmake/build/vfs_fonts'
import { timesRegular, timesBold, timesItalic, timesBI } from 'src/assets/encodedFiles/TimesFont';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { ICanto, IFalange, IMedium, IUser } from "src/types/types";
import { assTiaNeiva } from '../assets/encodedFiles/signature';
import { getCurrentDate } from './functions';

pdfMake.vfs = pdfTimes.pdfMake.vfs;
window.pdfMake.vfs['times.ttf'] = timesRegular;
window.pdfMake.vfs['timesbd.ttf'] = timesBold;
window.pdfMake.vfs['timesi.ttf'] = timesItalic;
window.pdfMake.vfs['timesbi.ttf'] = timesBI;
pdfMake.fonts = {
    Times: {
        normal: 'times.ttf',
        bold: 'timesbd.ttf',
        italics: 'timesi.ttf',
        bolditalics: 'timesbi.ttf'
    }
}

const docHeader: Content = {
    text: ['TEMPLO URANOR DO AMANHECER\n', 'CASTELO DOS DEVAS\n'],
    fontSize: 16,
    alignment: 'center',
    bold: true, 
    margin: [0, -10, 0, 30]
}

const docFooter = (current: number, total: number): Content => {
    return [
        {
            columns: [
                {
                    text: 'Sistema Uranor - Castelo dos Devas',
                    fontSize: 9,
                    alignment: 'left',
                    margin: [20, 20, 20, 20]
                },
                {
                  text: `Página ${current} de ${total}`,
                  fontSize: 9,
                  alignment: 'right',
                  margin: [20, 20, 20, 20]
                }
            ]
          },
    ]
};

export const generateEmissao = (medium: IMedium, user: IUser, text: string) => {    
    const emissaoTitle: Content = {
        text: `EMISSÃO DO MÉDIUM ${medium.nome.toUpperCase()}`,
        fontSize: 14,
        alignment: 'center',
        bold: true, 
        margin: [0, 0, 0, 15]
    }

    const emissaoBody: Content = [
        {
            text: text.toUpperCase(),
            fontSize: 14,
            alignment: 'justify',
            margin: [0, 0, 0, 20]
        },
        {
            text: 'SALVE DEUS!',
            alignment: 'center',
            fontSize: 13,
            margin: [0, 0, 0, 0]
        }
    ]

    const emissaoInfo: Content = [
        {
            text: '_____________________________________________________________________________________',
            alignment: 'center'
        },
        {
            text: 'Observações:',
            alignment: 'left',
            italics: true,
            fontSize: 11,
            margin: [0, 0, 0, 10]
        },
        {
            text: 'Quando em qualquer trabalho o mestre ou ninfa estiverem a serviço de um Adjunto na posição de 1º Presidente ou Reino Central, emitirão "EM MISSÃO ESPECIAL DO ADJUNTO (...) MESTRE (...)" no final das suas emissões.',
            alignment: 'justify',
            fontSize: 11,
            margin: [0, 0, 0, 20]
        },
        {
            text: 'SALVE DEUS!',
            fontSize: 11,
            alignment: 'left',
            margin: [0, 0, 0, 5]
        },
        {
            text: 'MEUS FILHOS JAGUARES, O MESTRE QUE ALTERAR A SUA EMISSÃO, TERÁ SOBRE SI A RESPONSABILIDADE DE NÃO ULTRAPASSAR O NEUTRÔN E CONSEQUENTEMENTE NÃO SERÁ OUVIDO E NEM REGISTRADA PELOS PLANOS ESPIRITUAIS.',
            alignment: 'justify',
            fontSize: 11,
            margin: [10, 0, 0, 5]
        },
        {
            text: 'COM CARINHO A MÃE EM CRISTO JESUS,',
            fontSize: 11,
            alignment: 'right',
        },
        {
            columns: [
                {
                    text: [
                        '_____________________________________\n',
                        {
                            text: `${user.level === 'Devas Aspirante' ? '' : user.name.toUpperCase()}\n`,
                            bold: true
                        },
                        'FILHO DE DEVAS\n',
                        '\n',
                        getCurrentDate()
                    ],
                    alignment: 'center',
                    width: '*',
                    fontSize: 10,
                    margin: [0, 30, 0, 0]
                },
                {
                    image: assTiaNeiva,
                    width: 150,
                    margin: [0, 15, 0, 0]
                },
            ],
            columnGap: 150
        }
    ];

    const emissaoFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount)

    const emissaoDefinitions: TDocumentDefinitions = {
        info: {
            title: `Emissao_${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}`
        },
        pageSize: 'A4',
        content: [docHeader, emissaoTitle, emissaoBody, emissaoInfo],
        footer: emissaoFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(emissaoDefinitions).open({}, window.open(`Emissao_${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}.pdf`, '_blank'));
}

export const generateCanto = (canto: ICanto) => {    

    const cantoTitle = () => {
        return {
            text: canto.title,
            fontSize: 16,
            alignment: 'center',
            bold: true, 
            margin: [0, 0, 0, 30]
        } as Content
    } 

    const cantoBody = () => {
        return {
            text: canto.text,
            fontSize: 14,
            alignment: 'justify',
            margin: [0, 0, 0, 20]
        } as Content
    }

    const divider = () => {
        return {
            text: '_____________________________________________________________________________________',
            alignment: 'center',
            margin: [0, 0, 0, 30]
        } as Content
    }

    const cantoDefinitions: TDocumentDefinitions = {
        info: {
            title: canto.title.replace(/ /g, '_')
        },
        pageSize: 'A4',
        content: canto.repeat === 5 ? [cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody(), divider()] : canto.repeat === 4 ? [cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody(), divider()] : canto.repeat === 3 ? [cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody()] : canto.repeat === 2 ? [cantoTitle(), cantoBody(), divider(), cantoTitle(), cantoBody(), divider()] : [cantoTitle(), cantoBody(), divider()],
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(cantoDefinitions).open({}, window.open(`${canto.title.replace(/ /g, '_')}.pdf`, '_blank'));
}

export const generateChamadaOficial = (falanges: Array<IFalange>) => {    
    const chamadaTitle: Content = {
        text: `CHAMADA OFICIAL DAS FALANGES MISSIONÁRIAS`,
        fontSize: 14,
        alignment: 'center',
        bold: true, 
        margin: [0, 0, 0, 15]
    }

    const chamadaBody: Array<any> = [
        [
            {text: 'N°', style: {bold: true}},
            {text: 'FALANGE', style: {bold: true}},
            {text: 'PRIMEIRA (O)', style: {bold: true}},
            {text: 'ADJUNTO DE APOIO', style: {bold: true}},
        ]
    ]

    function fillChamadaTable() {
        falanges.filter((item: IFalange) => item.falange_id !== 2).forEach((item: IFalange, index) => {
            const name = item.nome === 'Nityama' ? 'Nityama e Nityama Madruxa' : item.nome;
            const adj = item.adjMin && item.adjNome ? [`${item.adjMin}\n`, `Mestre ${item.adjNome}`] : '-------';
            const chamadaRow = [index + 1, name, item.primeira, adj];
            chamadaBody.push(chamadaRow)
        })
    }

    fillChamadaTable();

    const chamadaTable: Content = {
        style: {
            alignment: 'center'
        },
        table: {
            headerRows: 1,
            widths: ['auto', '*', '*',  '*'],
            body: chamadaBody
        }
    }

    const chamadaFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount);

    const emissaoDefinitions: TDocumentDefinitions = {
        info: {
            title: chamadaTitle.text.toString().replace(/ /g, '_')
        },
        pageSize: 'A4',
        content: [docHeader, chamadaTitle, chamadaTable],
        footer: chamadaFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(emissaoDefinitions).open({}, window.open(`${chamadaTitle.text.toString().replace(/ /g, '_')}.pdf`, '_blank'));
}

export const generatePrefixos = (falanges: Array<IFalange>) => {    
    const prefixoTitle: Content = {
        text: `PREFIXOS DAS FALANGES MISSIONÁRIAS`,
        fontSize: 16,
        alignment: 'center',
        bold: true, 
        margin: [0, 0, 0, 15]
    }

    const prefixoBody: Array<any> = [
        [
            {text: 'FALANGE', style: {bold: true}},
            {text: 'PREFIXO SOL', style: {bold: true}},
            {text: 'PREFIXO LUA', style: {bold: true}},
        ]
    ]

    function fillPrefixoTable() {
        falanges.filter((item: IFalange) => item.ninfa && item.falange_id !== 2).forEach((item: IFalange) => {
            const name = item.nome === 'Nityama' ? 'Nityama e Nityama Madruxa' : item.nome;
            const prefSol = item.prefSol ? item.prefSol : '-------';
            const prefLua = item.prefLua ? item.prefLua : '-------';
            const prefixoRow = [name, prefSol, prefLua];
            prefixoBody.push(prefixoRow)
        })
    }

    fillPrefixoTable();

    const prefixoTable: Content = {
        style: {
            alignment: 'center',
            fontSize: 14
        },
        table: {
            headerRows: 1,
            widths: ['*', 120,  120],
            heights: 25,
            body: prefixoBody
        }
    }

    const prefixoFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount);

    const emissaoDefinitions: TDocumentDefinitions = {
        info: {
            title: prefixoTitle.text.toString().replace(/ /g, '_')
        },
        pageSize: 'A4',
        content: [docHeader, prefixoTitle, prefixoTable],
        footer: prefixoFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(emissaoDefinitions).open({}, window.open(`${prefixoTitle.text.toString().replace(/ /g, '_')}.pdf`, '_blank'));
}

export const generateTurnos = () => {    
    const turnoTitle: Content = {
        text: `RELAÇÃO DE TURNOS DE TRABALHO`,
        fontSize: 16,
        alignment: 'center',
        bold: true, 
        margin: [0, 0, 0, 15]
    }

    const turnoTable: Content = {
        style: {
            alignment: 'center',
            fontSize: 14
        },
        table: {
            headerRows: 1,
            widths: ['*', '*'],
            heights: 30,
            body: [
                [
                    {text: 'TURNOS', style: {bold: true}},
                    {text: 'SETORES', style: {bold: true}}
                ],
                ['AMOROS / AMORANAS', 'Indução'],
                ['AGANAROS / AGANARAS', 'Prisioneiros'],
                [
                    {text: 'ADONARES / ADANARES', fillColor: '#dddddd'},
                    {text: 'Recursos financeiros', fillColor: '#dddddd'}
                ],
                ['VALÚRIOS / VALÚRIAS', 'Mesa Evangélica'],
                ['ADELANOS / ADELANAS', 'Tronos Vermelhos e Amarelos'],
                ['MATUROS / MATURAMAS', 'Sudálio'],
                ['SAVANOS / SAVANAS', 'Randy'],
                ['MURANOS / MURANAS', 'Desenvolvimento dos Médiuns'],
                ['TAVORES / TAVANAS', 'Estrela, Unificação e Pirâmide'],
                ['GALEROS / GALANAS', 'Cura e Junção'],
                [
                    {text: 'GRAMOUROS / GRAMARAS', fillColor: '#dddddd'},
                    {text: 'Iniciação Dharman-Oxinto', fillColor: '#dddddd'}
                ],
                ['VOUGUES / VOUGANAS', 'Responsáveis pelos pajezinhos e crianças do templo'],
                ['TANAROS / TANARAS', 'Oráculo de Simiromba e Cruz do Caminho'],
            ]
        }
    }

    const turnoFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount);

    const emissaoDefinitions: TDocumentDefinitions = {
        info: {
            title: turnoTitle.text.toString().replace(/ /g, '_')
        },
        pageSize: 'A4',
        content: [docHeader, turnoTitle, turnoTable],
        footer: turnoFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(emissaoDefinitions).open({}, window.open(`${turnoTitle.text.toString().replace(/ /g, '_')}.pdf`, '_blank'));
}