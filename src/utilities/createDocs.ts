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
            // text: 'eu, jaguar mestre luz filho de devas, da falange de sublimação povo de peguys, comandante do adjunto janatã mestre josé luiz principe maya deste amanhecer, do adjunto adejã, koatay 108 mestre fróes, na regência do ministro yuricy. vindo do 7° raio, na ordem do ministro parlo, na linha do mestre zilcio, 7° raio adjuração arcanos rama 2000, afilhado de koatay 108 minha mae clarividente em cristo jesus. em missão do adjunto uranor, koatay 108 mestre vasconcelos. eu trino sardyos solitário juremá, adjunto areio koatay 108 herdeiro triada harpásios raio adjuração rama 2000 mestre reinaldo junior. herdeiro do adjunto marlano koatay 108 mestre sebastião araujo, meu pai. vice-presidente do amanhecer de são josé do vale do rio preto, rio de janeiro. com os poderes de olorum, na linha deste amanhecer. tenho o meu deus e ministro obatalá, que me rege e me guarda no caminho desta jornada. acabo de receber de deus pai todo poderoso na minha legião, o título de mestre instrutor universal, das três forças ligadas aos poderes deste amanhecer. Subi ao reino de jurema e estou na continuação desta jornada para o terceiro milênio. emite jesus, deixe que as forças se desloquem até o meu plexo. sou um cavaleiro verde, cavaleiro especial, venho na força decrescente do primeiro cavaleiro da lança felunã verde randay // reino central turno dubali. na esperança de alimentar o meu sol interior, na grandeza que me fez cavaleiro do turno ajouros. partirei nos três reinos de minha natureza com - 0 -, do meu terceiro sétimo, no 5° ciclo iniciático seguirei sempre com - 0 - 0 - // em cristo jesus'.toUpperCase(),
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

    pdfMake.createPdf(emissaoDefinitions).open({}, window.open(`${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}.pdf`, '_blank'));
}