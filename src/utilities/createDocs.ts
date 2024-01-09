import pdfMake from 'pdfmake/build/pdfmake'
import pdfTimes from 'pdfmake/build/vfs_fonts'
import { timesRegular, timesBold, timesItalic, timesBI } from 'src/assets/encodedFiles/TimesFont';
import { arialBI, arialBold, arialItalic, arialRegular } from 'src/assets/encodedFiles/ArialFont';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { IAdjunto, ICanto, IConsagracao, IFalange, IMedium, IMentor, ITemplo, IUser } from "src/types/types";
import { assTiaNeiva } from '../assets/encodedFiles/signature';
import { convertDate, getCurrentDate, imageToBase64 } from './functions';
import { jaguarImage } from 'src/assets/encodedFiles/jaguar';
import { aparaImage } from 'src/assets/encodedFiles/apara';
import { doutrinadorImage } from 'src/assets/encodedFiles/doutrinador';

pdfMake.vfs = pdfTimes.pdfMake.vfs;
window.pdfMake.vfs['times.ttf'] = timesRegular;
window.pdfMake.vfs['timesbd.ttf'] = timesBold;
window.pdfMake.vfs['timesi.ttf'] = timesItalic;
window.pdfMake.vfs['timesbi.ttf'] = timesBI;
window.pdfMake.vfs['arial.ttf'] = arialRegular;
window.pdfMake.vfs['arialbd.ttf'] = arialBold;
window.pdfMake.vfs['ariali.ttf'] = arialItalic;
window.pdfMake.vfs['arialbi.ttf'] = arialBI;
pdfMake.fonts = {
    Times: {
        normal: 'times.ttf',
        bold: 'timesbd.ttf',
        italics: 'timesi.ttf',
        bolditalics: 'timesbi.ttf'
    }, 
    Arial: {
        normal: 'arial.ttf',
        bold: 'arialbd.ttf',
        italics: 'ariali.ttf',
        bolditalics: 'arialbi.ttf'
    }, 
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

export const generateAutorizacao = (mediuns: Array<IConsagracao>, templos: Array<ITemplo>, adjuntos: Array<IAdjunto>, ministros: Array<IMentor>, cons: number) => {    
    const consagracaoMeta = [
        {title: 'Iniciação Dharman-Oxinto', meta: 'Iniciacao'},
        {title: 'Elevação de Espadas', meta: 'Elevacao'},
        {title: 'Centúria', meta: 'Centuria'},
        {title: '', meta: 'IniciacaoElevacao'},
    ]
    
    const consagracaoText = (medium: IConsagracao) => {
        return [
            `Concluiu o seu desenvolvimento doutrinário e curso de Iniciação e está apto(a), junto à Coordenação dos Templos, para realizar sua consagração. Data de Nascimento: ${convertDate(medium.dtNasc)}. Colete: ${medium.colete ? medium.colete : ''}.`,
            `Concluiu o curso de Elevação de Espadas e está apto(a), junto à Coordenação dos Templos, para realizar sua consagração. Data de nascimento do Médium: ${convertDate(medium.dtNasc)}.`,
            `Concluiu o curso de Centúria e está apto(a), junto à Coordenação dos Templos, para realizar sua consagração. Data de nascimento do Médium: ${convertDate(medium.dtNasc)}.`
        ]
    };

    const temploMedium = (medium: IConsagracao) => {return templos.filter((item: ITemplo) => item.templo_id === medium.templo)[0]}

    const ministroTemplo = (medium: IConsagracao) => {return ministros.filter((min: IMentor) => min.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === temploMedium(medium).presidente)[0].ministro)[0].nome}
    
    const autorizacaoTitle = (modifier: number) => {
        const consName = modifier ? modifier - 1 : cons - 1;
        
        return {
            columns: [
            {
                image: jaguarImage,
                width: 48,
                margin: [0, 0, 0, 0]
            },
            {
                stack: [
                    { text: 'Doutrina do Amanhecer', margin: [0, 0, 0, 4] },
                    { text: 'Coordenação Parlo', margin: [0, 0, 0, 4] },
                    { text: `Autorização - ${consagracaoMeta[consName].title}`, margin: [0, 0, 0, 4] },
                ],
                alignment: 'left',
                bold: true,
                fontSize: 11,
                width: '*',
            }
            ],
            columnGap: 13
        } as Content
    };  

    const autorizacaoBody = (medium: IConsagracao, modifier: number) => {
        const consText = modifier ? modifier - 1 : cons - 1;
        
        return [
            {
                table: {
                    body: [
                        [
                            {
                                text: 'Templo:',
                                fontSize: 11,
                                bold: true
                            },
                            {
                                text: `${ministroTemplo(medium)} DO AMANHECER DE ${temploMedium(medium).cidade} - ${temploMedium(medium).estado.abrev}`.toUpperCase(),
                                fontSize: 10,
                                margin: [0, 1, 0, 0]
                            }
                        ],
                        [
                            {
                                text: 'Mestre:',
                                fontSize: 11,
                                bold: true
                            },
                            {
                                text: medium.nome.toUpperCase(),
                                fontSize: 10,
                                margin: [0, 1, 0, 0]
                            }
                        ]
                    ]
                },
                layout: 'noBorders',
                margin: [12, 5, 0, 0]
            },
            {
                text: consagracaoText(medium)[consText],
                fontSize: 10,
                alignment: 'left',
                lineHeight: 1.1,
                margin: cons === 1 ? [12, 5, 0, 0] : [12, 5, 40, 0]
            }
        ] as Content
    }

    const autorizacaoInfo = (medium: IConsagracao) => {
        return [
            {
                columns: [
                    {
                        table: {
                            body: [
                                [
                                    {
                                        image: medium.med === 'Doutrinador' ? doutrinadorImage : medium.med === 'Apará' ? aparaImage : '',
                                        width: medium.med === 'Doutrinador' ? 18 : medium.med === 'Apará' ? 25 : '',
                                        margin: medium.med === 'Doutrinador' ? [0, 22, 10, 0] : medium.med === 'Apará' ? [-2, 22, 6, 0] : ''
                                    },
                                    {
                                        text: medium.med.toUpperCase(),
                                        fontSize: 11,
                                        bold: true, 
                                        margin: [0, 28, 0, 0]
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        margin: [12, 5, 0, 0]
                    },
                    [
                        {
                            text: `Olinda do Amanhecer, ${getCurrentDate()}.`,
                            alignment: 'right',
                            fontSize: 10,
                            margin: [0, 12, 65, 24]
                        },
                        {
                            text: '_________________________________',
                            alignment: 'right',
                            fontSize: 10,
                            margin: [0, 0, 67, 2]
                        },
                        {
                            text: 'Assinatura e Carimbo do Presidente',
                            alignment: 'right',
                            fontSize: 10,
                            margin: [0, 0, 78, 10]
                        }
                    ]
                ]
            },
            {
                text: '____________________________________________________________________________________',
                alignment: 'center',
                margin: [-9, 0, -35, 24]
            }
        ] as Content
    };

    const contentArray = () => {
        const array: Array<Content> = [];
        if (cons === 4) {
            mediuns.forEach((item: IConsagracao) => {
                array.push(autorizacaoTitle(1));
                array.push(autorizacaoBody(item, 1));
                array.push(autorizacaoInfo(item));
                array.push(autorizacaoTitle(2));
                array.push(autorizacaoBody(item, 2));
                array.push(autorizacaoInfo(item));
            });
        } else {
            mediuns.forEach((item: IConsagracao) => {
                array.push(autorizacaoTitle(0));
                array.push(autorizacaoBody(item, 0));
                array.push(autorizacaoInfo(item));
            });
        }
        return array
    }
    
    const autorizacaoDefinitions: TDocumentDefinitions = {
        info: {
            title: mediuns.length === 1 ? `Autorizacao_${consagracaoMeta[cons - 1].meta}_${mediuns[0].medium.toString().padStart(5, '0')}_${mediuns[0].nome.replace(/ /g, '_')}` : `Autorizacoes_${consagracaoMeta[cons - 1].meta}`
        },
        pageMargins: [24, 22, 50, 120],
        pageSize: 'A4',
        content: contentArray(),
        defaultStyle: {
            font: 'Arial'
        }
    }

    pdfMake.createPdf(autorizacaoDefinitions).open({}, window.open(mediuns.length === 1 ? `Autorizacao_${consagracaoMeta[cons - 1].meta}_${mediuns[0].medium.toString().padStart(5, '0')}_${mediuns[0].nome.replace(/ /g, '_')}.pdf` : `Autorizacoes_${consagracaoMeta[cons - 1].meta}.pdf`, '_blank'));
}

export const generateTermo = async (mediuns: Array<IConsagracao>) => {    
    const termoHeader = async (medium: IConsagracao) => {
        const base64String = await imageToBase64(medium.foto);

        return {
            columns: [
                {
                    stack: [
                        { text: 'DOUTRINA DO AMANHECER', fontSize: 16, bold: true, margin: [0, 0, 0, 4] },
                        { text: 'CORDENAÇÃO PARLO', fontSize: 14, margin: [0, 0, 0, 4] },
                        { text: 'CASTELO DOS DEVAS', fontSize: 16, bold: true, margin: [0, 0, 0, 20] },
                        { text: 'COMPROMISSO DE MESTRE', fontSize: 14, bold: true, margin: [0, 0, 0, 23] },
                    ],
                    alignment: 'center',
                    margin: [0, 0, -50, 0],
                    width: '*'
                },
                {
                    image: base64String,
                    width: 50,
                    height: 67,
                    margin: [0, 48, 0, 0]
                }
            ],
            columnGap: 0
        } as Content
    };

    const termoInfo = (medium: IConsagracao) => {
        return [
            {
                text: [
                    { text: 'INICIAÇÃO EM: ', fontSize: 8},
                    ' ',
                    { text: convertDate(medium.dtIniciacao), fontSize: 12 },
                ],
                bold: true,
                margin: [0, 0, 0, 19]
            },
            {
                text: [
                    'CLASSIFICAÇÃO: ',
                    ' ',
                    { text: '                                                                                                                            ', decoration: 'underline'},
                ],
                bold: true, 
                fontSize: 8,
                margin: [0, 0, 0, 19]
            },
            {
                text: [
                    'ELEVAÇÃO FEITA EM: ',
                    ' ',
                    { text: '           /             /             ', decoration: 'underline'},
                ],
                bold: true, 
                fontSize: 8,
                margin: [0, 0, 0, 19]
            }
        ] as Content
    };

    const termoText = () => {
        return {
            stack: [
                { text: 'MEU FILHO', margin: [0, 0, 0, 15] },
                { text: 'SALVE DEUS!', margin: [0, 0, 0, 14] },
                { text: 'QUIS A VONTADE DE DEUS ME COLOCAR DIANTE DE VÓS, POR QUEM JUREI', margin: [47, 0, 0, 1] },
                { text: 'OS MEUS OLHOS E ENTREGUEI A BEM DA VERDADE.', margin: [0, 0, 0, 15] },
                { text: 'E, AGORA, ASSUMINDO ESTE IMENSO COMPROMISSO, É PELA VONTADE DE', margin: [47, 0, 0, 1] },
                { text: 'DEUS, TAMBÉM, QUE JURAIS, VOS COMPROMETENDO SERVIR COM TODAS AS HONRAS DESTE MESTRADO E SE VOS CONVIER, PENSAI, ASSINAI E ENTREGAI-ME.', margin: [0, 0, 0, 25] },
            ],
            fontSize: 8,
            bold: true,
            alignment: 'justify',
            lineHeight: 1.5,
        } as Content
    };

    const termoSignature = (medium: IConsagracao) => {
        return [
            {
                text: [
                    { text: 'NOME: ', fontSize: 8},
                    ' ',
                    { text: medium.nome.toUpperCase(), fontSize: 12},
                ],
                bold: true,
                margin: [0, 0, 0, 40]
            },
            {
                text: '                                                                               ',
                bold: true, 
                fontSize: 8,
                decoration: 'underline',
                alignment: 'center',
                margin: [0, 0, 0, 5]
            },
            {
                text: 'ASSINATURA',
                bold: true, 
                fontSize: 8,
                alignment: 'center',
                margin: [0, 0, 0, 29]
            }
        ] as Content
    };

    const termoFooter = () => {
        return {
            stack: [
                { text: 'SE UM DIA, AS VOSSAS FORÇAS VOS FALTAREM, ENTREGAI TAMBÉM', fontSize: 8, margin: [47, 0, 0, 1] },
                { text: 'HONROSAMENTE ESTE COMPROMISSO.', fontSize: 8, margin: [0, 0, 0, 7] },
                { text: 'TIA NEIVA', fontSize: 12, alignment: 'right', margin: [0, 0, -5, 0] },
            ],
            bold: true,
            lineHeight: 1.5
        } as Content
    };

    const contentArray = async () => {
        const arrays: Array<Array<Content>> = await Promise.all(
            mediuns.filter((m: IConsagracao) => Boolean(m.foto) === true).map(async (item: IConsagracao) => {
                const array: Array<Content> = [];
                array.push(await termoHeader(item));
                array.push(termoInfo(item));
                array.push(termoText());
                array.push(termoSignature(item));
                array.push(termoFooter());
                return array;
            })
        );
        const finalContentArray: Array<Content> = [];
        
        for (let i = 0; i < arrays.length; i += 2) {
            const el1 = arrays[i] || [];
            const el2 = arrays[i + 1] || [];
            const columnPair: Content = {
                columns: [Array.from(el1), Array.from(el2)],
                columnGap: 71,
            };
            if (i + 2 < arrays.length) {
                columnPair.pageBreak = 'after'
            }
            finalContentArray.push(columnPair);
        }
        return finalContentArray;
    }
   
    const termoDefinitions: TDocumentDefinitions = {
        info: {
            title: mediuns.length === 1 ? `Termo_${mediuns[0].medium.toString().padStart(5, '0')}_${mediuns[0].nome.replace(/ /g, '_')}` : 'Termos_compromisso'
        },
        pageMargins: [32, 27, 39, 27],
        pageSize: 'A4',
        pageOrientation: 'landscape',
        content: await contentArray(),
        defaultStyle: {
            font: 'Arial'
        }
    }

    pdfMake.createPdf(termoDefinitions).open({}, window.open(mediuns.length === 1 ? `Termo_${mediuns[0].medium.toString().padStart(5, '0')}_${mediuns[0].nome.replace(/ /g, '_')}.pdf` : 'Termos_compromisso.pdf', '_blank'));
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