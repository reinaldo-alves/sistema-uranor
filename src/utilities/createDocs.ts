import pdfMake from 'pdfmake/build/pdfmake'
import pdfTimes from 'pdfmake/build/vfs_fonts'
import { timesRegular, timesBold, timesItalic, timesBI } from 'src/assets/encodedFiles/TimesFont';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { IMedium, IUser } from "src/types/types";
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

export const generateEmissao = (medium: IMedium, user: IUser, text: string) => {    
    const emissaoHeader: Content = {
        text: ['TEMPLO URANOR DO AMANHECER\n', 'CASTELO DOS DEVAS\n'],
        fontSize: 16,
        alignment: 'center',
        bold: true, 
        margin: [0, -10, 0, 30]
    }

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

    const emissaoFooter = (currentPage: number, pageCount: number): Content => {
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
                      text: `Página ${currentPage} de ${pageCount}`,
                      fontSize: 9,
                      alignment: 'right',
                      margin: [20, 20, 20, 20]
                    }
                ]
              },
        ]
    };

    const emissaoDefinitions: TDocumentDefinitions = {
        info: {
            title: `${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}`
        },
        pageSize: 'A4',
        content: [emissaoHeader, emissaoTitle, emissaoBody, emissaoInfo],
        footer: emissaoFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(emissaoDefinitions).open({}, window.open(`Emissao_${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}.pdf`, '_blank'));
}