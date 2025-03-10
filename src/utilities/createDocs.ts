import pdfMake from 'pdfmake/build/pdfmake'
import pdfTimes from 'pdfmake/build/vfs_fonts'
import { timesRegular, timesBold, timesItalic, timesBI } from 'src/assets/encodedFiles/TimesFont';
import { arialBI, arialBold, arialItalic, arialRegular } from 'src/assets/encodedFiles/ArialFont';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { IAdjunto, ICalendario, ICanto, ICavaleiro, IConsagracao, IEvento, IFalange, IMedium, IMenor, IMentor, ITemplo, IUser } from "src/types/types";
import { assTiaNeiva } from '../assets/encodedFiles/signature';
import { alphabeticOrder, convertDate, generateListEventos, getCurrentDate, imageToBase64, positionsAndFunctions, reduceClassFalMest } from './functions';
import { jaguarImage } from 'src/assets/encodedFiles/jaguar';
import { aparaImage } from 'src/assets/encodedFiles/apara';
import { doutrinadorImage } from 'src/assets/encodedFiles/doutrinador';
import { defaultTemp } from './default';

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
                    text: `Gerado em ${getCurrentDate()}`,
                    fontSize: 9,
                    alignment: 'center',
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

export const generateEmissao = (medium: IMedium | IMenor, user: IUser, text: string) => {    
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

    const emissaoInfo = (medium: IMedium | IMenor) => {
        const emissaoInfoContent: Content = [
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
                text: 'MEUS FILHOS JAGUARES, O MESTRE QUE ALTERAR A SUA EMISSÃO, TERÁ SOBRE SI A RESPONSABILIDADE DE NÃO ULTRAPASSAR O NEUTRÔN E CONSEQUENTEMENTE NÃO SERÁ OUVIDO E NEM REGISTRADO PELOS PLANOS ESPIRITUAIS.',
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
                            `${user.sex === 'Feminino' && user.level !== 'Devas Aspirante' ? 'FILHA' : 'FILHO'} DE DEVAS\n`,
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
        if ('medium_id' in medium) {
            return emissaoInfoContent;
        } else {
            return [emissaoInfoContent[0], emissaoInfoContent[3], emissaoInfoContent[4], emissaoInfoContent[5], emissaoInfoContent[6]];
        }
    }


    const emissaoFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount)

    const emissaoDocTitle = (medium: IMedium | IMenor) => {
        if ('medium_id' in medium) {
            return `Emissao_${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}`;
        } else {
            return `Emissao_${medium.nome.replace(/ /g, '_')}`;
        }
    }

    const emissaoDefinitions: TDocumentDefinitions = {
        info: {
            title: emissaoDocTitle(medium),
        },
        pageSize: 'A4',
        content: [docHeader, emissaoTitle, emissaoBody, emissaoInfo(medium)],
        footer: emissaoFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(emissaoDefinitions).open({}, window.open(`${emissaoDocTitle(medium)}.pdf`, '_blank'));
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
                margin: medium.nome.length > 38 ? [0, 0, 0, 24] : [0, 0, 0, 40]
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

export const generateReclass = (medium: IMedium, adjuntos: Array<IAdjunto>, ministros: Array<IMentor>, cavaleiros: Array<ICavaleiro>, user: IUser) => {    
    const reclassHeader: Content = {
        text: ['DOUTRINA DO AMANHECER\n', 'CASTELO DOS DEVAS\n'],
        fontSize: 14,
        alignment: 'center',
        bold: true, 
        margin: [0, -10, 0, 30]
    }

    const reclassNome: Content = {
        text: [{text: 'NOME: '}, {text: medium.nome.toUpperCase(), bold: true, decoration: 'underline'}],
        fontSize: 14,
        margin: [0, 0, 0, 30]
    }

    const reclassInfo: Content = {
        columns: [
            {
                stack: [
                    {
                        columns: [
                            {text: 'CLASSIFICAÇÃO: ', width: 'auto'},
                            {text: `${medium.classMest} ${medium.falMest}`.toUpperCase(), bold: true, width: 'auto'}
                        ],
                        columnGap: 3,
                        margin: [0, 0, 0, 0]
                    },
                    {
                        columns: [
                            {text: 'ADJUNTO DE ORIGEM: ', width: 'auto'},
                            {text: ministros.filter((min: IMentor) => min.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === medium.adjOrigem)[0]?.ministro)[0]?.nome.toUpperCase(), bold: true, width: 'auto'}
                        ],
                        columnGap: 3,
                        margin: [0, 0, 0, 0]
                    },
                ],
                width: '*'
            },
            {
                stack: [
                    {
                        columns: [
                            {text: 'TURNO: ', width: 'auto'},
                            {text: medium.turnoLeg.toUpperCase(), bold: true, width: 'auto'}
                        ],
                        columnGap: 3,
                        margin: [0, 0, 0, 0]
                    },
                    {
                        columns: [
                            {text: 'POVO: ', width: 'auto'},
                            {text: medium.povo.toUpperCase(), bold: true, width: 'auto'}
                        ],
                        columnGap: 3,
                        margin: [0, 0, 0, 0]
                    },
                ],
                width: 120
            }
        ],
        fontSize: 12,
        margin: [0, 0, 0, 15]
    }

    const reclassMentor: Content = {
        columns: [
            {
                columns: [
                    {text: 'MINISTRO: ', width: 'auto'},
                    {text: ministros.find((min: IMentor) => min.id === medium.ministro)?.nome.toUpperCase() || '', bold: true, width: 'auto'}
                ],
                columnGap: 3,
                margin: [0, 0, 0, 0]
            },
            {
                columns: [
                    {text: 'CAVALEIRO: ', width: 'auto'},
                    {text: cavaleiros.find((cav: ICavaleiro) => cav.id === medium.cavaleiro) ? `${cavaleiros.find((cav: ICavaleiro) => cav.id === medium.cavaleiro)?.nome} ${medium.cor}`.toUpperCase() : '', bold: true, width: 'auto'}
                ],
                columnGap: 3,
                margin: [0, 0, 0, 0]
            },
        ],
        fontSize: 14,
        margin: [0, 0, 0, 30]
    }

    const reclassAtual: Content = {
        text: [{text: 'CLASSIFICAÇÃO ATUAL: \n'}, {text: medium.classif.toUpperCase(), bold: true, decoration: 'underline'}],
        fontSize: 14,
        margin: [0, 0, 0, 15]
    }

    const reclassDate: Content = {
        columns: [
            {
                text: [
                    'ÚLTIMA CLASSIFICAÇÃO EM: ',
                    {text: convertDate(medium.dtClassif), bold: true, fontSize: 14},
                ],
                width: 'auto',
                alignment: 'center',
                fontSize: 12,
                margin: [0, 30, 0, 0]
            },
            {
                text: [
                    '_____________________________________\n',
                    {
                        text: `${user.level === 'Devas Aspirante' ? '' : user.name.toUpperCase()}\n`,
                        bold: true
                    },
                    `${user.sex === 'Feminino' && user.level !== 'Devas Aspirante' ? 'FILHA' : 'FILHO'} DE DEVAS\n`,
                ],
                alignment: 'center',
                width: 'auto',
                fontSize: 10,
                margin: [0, 30, 0, 0]
            }
        ],
        columnGap: 150
    }
    
    const reclassDefinitions: TDocumentDefinitions = {
        info: {
            title: `Reclassificacao_${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}`
        },
        pageSize: 'A4',
        content: [reclassHeader, reclassNome, reclassInfo, reclassMentor, reclassAtual, reclassDate],
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(reclassDefinitions).open({}, window.open(`Reclassificacao_${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}.pdf`, '_blank'));
}

export const generateTrinoDevas = (mediuns: Array<IMedium>, cons: string, adjunto: IMedium, ministros: Array<IMentor>) => {    
    const consMeta = cons === 'Filho de Devas' && !mediuns.some((item: IMedium) => item.sex === 'Masculino') ? 'FILHA DE DEVAS' : cons.toUpperCase();

    const termoSex = () => {
        if (mediuns.length === 1) {
            return mediuns[0].sex === 'Masculino' ? 'o seguinte mestre:' : 'a seguinte ninfa:'
        } else {
            if(mediuns.some((item: IMedium) => item.sex === 'Masculino')) {
                return 'os seguintes mestres:'
            } else {
                return 'as seguintes ninfas:'
            }
        }
    }

    const termoAdjunto = cons !== 'Trino Sardyos' ? ['Adjunto Uranor\n', 'Mestre Vasconcelos\n'] : [`Adjunto ${ministros.filter((min: IMentor) => min.id === adjunto.ministro)[0].nome}\n`, `Mestre ${adjunto.nomeEmissao}\n`]
    
    const consHeader: Content = {
        text: ['DOUTRINA DO AMANHECER\n', 'COORDENAÇÃO PARLO\n', 'TEMPLO URANOR DO AMANHECER\n', 'CASTELO DOS DEVAS\n'],
        fontSize: 14,
        alignment: 'center',
        bold: true, 
        margin: [0, -10, 0, 30]
    }

    const consTitle: Content = {
        text: `AUTORIZAÇÃO - ${consMeta}`,
        fontSize: 14,
        alignment: 'center',
        bold: true, 
        margin: [0, 0, 0, 30]
    }

    const consText: Content = {
        text: `Solicito a consagração de ${consMeta} para ${termoSex()}`,
        fontSize: 12,
        margin: [0, 0, 0, 10]
    }

    const consList: Content = {
        ul: mediuns.map((item: IMedium) => {
            return {
                text: item.nome.toUpperCase(),
                fontSize: 12, 
                margin: [0, 0, 0, 5]
            }
        }),
        margin: [20, 0, 0, 30]
    }

    const consSignature: Content = {
        text: [
            '_____________________________________\n',
            termoAdjunto[0],
            termoAdjunto[1],
            `${cons === 'Trino Sardyos' ? '' : 'Presidente'}`
        ],
        alignment: 'center',
        fontSize: 12,
        margin: [0, 30, 0, 0]
    }

    const consFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount);
    
    const consDefinitions: TDocumentDefinitions = {
        info: {
            title: mediuns.length === 1 ? `${cons.replace(/ /g, '_')}_${mediuns[0].medium_id.toString().padStart(5, '0')}_${mediuns[0].nome.replace(/ /g, '_')}` : `Autorizacao_${cons.replace(/ /g, '_')}`
        },
        pageSize: 'A4',
        content: [consHeader, consTitle, consText, consList, consSignature],
        footer: consFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(consDefinitions).open({}, window.open(mediuns.length === 1 ? `${cons.replace(/ /g, '_')}_${mediuns[0].medium_id.toString().padStart(5, '0')}_${mediuns[0].nome.replace(/ /g, '_')}` : `Autorizacao_${cons.replace(/ /g, '_')}.pdf`, '_blank'));
}

export const generateProtocolo = (mediuns: Array<IConsagracao>, title: string, cons: number) => {    
    const consagracaoMeta = [
        {title: 'INICIAÇÃO', meta: 'Iniciacao'},
        {title: 'ELEVAÇÃO', meta: 'Elevacao'},
        {title: 'CENTÚRIA', meta: 'Centuria'}
    ]
       
    const protocoloTitle = () => {
        return {
            columns: [
            {
                image: jaguarImage,
                width: 48,
                margin: [-1, 10, 0, 0]
            },
            {
                stack: [
                    { text: 'OLINDA DO AMANHECER', margin: [0, 0, 0, 1] },
                    { text: 'CASTELO DOS DEVAS', margin: [0, 0, 0, 13] },
                    { text: title ? title.toUpperCase() : `PROTOCOLO DE ENTREGA DE AUTORIZAÇÕES - ${consagracaoMeta[cons - 1].title}`, margin: [0, 0, 0, 14] },
                ],
                alignment: 'left',
                fontSize: 13.5,
                width: '*',
            }
            ],
            columnGap: 12
        } as Content
    };  

    const protocoloBody = () => {
        return [
            {
                table: {
                    headerRows: 1,
                    widths: [30, '*', 24, 200],
                    heights: [5, ...mediuns.map(() => {return 24})],
                    body: [
                        [
                            {text: 'ID', bold: true, lineHeight: 0.9, margin: [0, -2, 0, 0]},
                            {text: 'NOME', bold: true, lineHeight: 0.9, margin: [0, -2, 0, 0]},
                            {text: 'MED.', bold: true, lineHeight: 0.9, margin: [0, -2, 0, 0]},
                            {text: 'ASSINATURA', bold: true, lineHeight: 0.9, margin: [0, -2, 0, 0]}
                        ],
                        ...mediuns.map((item: IConsagracao) => [
                                {
                                    text: item.medium.toString().padStart(5, '0'),
                                    margin: [0, 7, 0, 0]
                                },
                                {
                                    text: item.nome.toUpperCase(),
                                    alignment: 'left',
                                    margin: item.nome.length > 38 ? [0, 0, 0, 0] : [0, 7, 0, 0]
                                },
                                {
                                    text: item.med.charAt(0),
                                    margin: [0, 7, 0, 0]
                                },
                                ' '
                            ])
                    ],
                },
                fontSize: 9.5,
                alignment: 'center',
                layout: {
                    hLineWidth: function() {return 1.4},
                    vLineWidth: function() {return 1.4}
                }
            }
        ] as Content
    }

    const protocoloInfo = () => {
        return [
            {
                stack: [
                    {
                        columns: [
                            { text: 'TOTAL DE MESTRES: ', bold: true, width: 'auto' },
                            { text: mediuns.length, width: 'auto'}
                        ],
                        columnGap: 3,
                        margin: [0, 13, 0, 0]
                    },
                    {
                        columns: [
                            { text: 'RELATÓRIO EMITIDO EM: ', bold: true, width: 'auto' },
                            { text: getCurrentDate(), width: 'auto'}
                        ],
                        columnGap: 3,
                        margin: [0, 13, 0, 0]
                    }
                ],
                alignment: 'left',
                fontSize: 9.5
            }
        ] as Content
    };
    
    const protocoloDefinitions: TDocumentDefinitions = {
        info: {
            title: `Protocolo_${consagracaoMeta[cons - 1].meta}`
        },
        pageMargins: [34, 33, 34, 34],
        pageSize: 'A4',
        content: [protocoloTitle(), protocoloBody(), protocoloInfo()],
        defaultStyle: {
            font: 'Arial'
        }
    }

    pdfMake.createPdf(protocoloDefinitions).open({}, window.open(`Protocolo_${consagracaoMeta[cons - 1].meta}.pdf`, '_blank'));
}

export const generateConsReport = (mediuns: Array<IConsagracao>, templos: Array<ITemplo>, adjuntos: Array<IAdjunto>, ministros: Array<IMentor>, falMest: {completo: Array<string>, abrev: Array<string>},  title: string, cons: number) => {    
    interface IProps {
        templo?: ITemplo,
        colete?: number,
        apara: number,
        doutrinador: number
    }
    
    const consagracaoMeta = [
        {title: 'INICIAÇÃO', meta: 'Iniciacao'},
        {title: 'ELEVAÇÃO', meta: 'Elevacao'},
        {title: 'CENTÚRIA', meta: 'Centuria'}
    ]

    const temploMedium = (medium: IConsagracao) => {return templos.filter((item: ITemplo) => item.templo_id === medium.templo)[0]}

    const ministroTemplo = (templo: ITemplo) => {return ministros.filter((min: IMentor) => min.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === templo.presidente)[0].ministro)[0].nome};
    
    const generateArrayTemplos = () => {
        const array: Array<IProps> = [];
        templos.forEach((t: ITemplo) => {
            let doutrinador = 0;
            let apara = 0;
            mediuns.forEach((m: IConsagracao) => {
                if (m.templo === t.templo_id) {
                    if (m.med === 'Apará') {
                        apara = apara + 1;
                    }
                    if (m.med === 'Doutrinador') {
                        doutrinador = doutrinador + 1;
                    }
                }
            })
            if (doutrinador || apara) {
                array.push({templo: t, apara: apara, doutrinador: doutrinador})
            }
        })
        return array
    }

    const generateArrayColetes = () => {
        const array: Array<IProps> = [];
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((c: number) => {
            let doutrinador = 0;
            let apara = 0;
            mediuns.forEach((m: IConsagracao) => {
                if (m.colete === c) {
                    if (m.med === 'Apará') {
                        apara = apara + 1;
                    }
                    if (m.med === 'Doutrinador') {
                        doutrinador = doutrinador + 1;
                    }
                }
            })
            if (doutrinador || apara) {
                array.push({colete: c, apara: apara, doutrinador: doutrinador})
            }
        })
        return array
    }
    
    const arrayTemplos = generateArrayTemplos();
    const arrayColetes = generateArrayColetes();
    
    const generateSoma = (array: Array<IProps>) => {
        let somaDoutrinador = 0;
        let somaApara = 0;
        array.forEach((item: IProps) => {
            somaDoutrinador = somaDoutrinador + item.doutrinador;
            somaApara = somaApara + item.apara;
        })
        const somaTotal = somaApara + somaDoutrinador;
        return {apara: somaApara, doutrinador: somaDoutrinador, total: somaTotal}
    }

    const somaMediuns = generateSoma(arrayTemplos);
    const somaColetes = generateSoma(arrayColetes);

    const reportTitle = () => {
        return {
            columns: [
            {
                image: jaguarImage,
                width: 48,
                margin: [-1, 10, 0, 0]
            },
            {
                stack: [
                    { text: 'OLINDA DO AMANHECER', margin: [0, 0, 0, 1] },
                    { text: 'CASTELO DOS DEVAS', margin: [0, 0, 0, 13] },
                    { text: title ? title.toUpperCase() : `RELATÓRIO DE ${consagracaoMeta[cons - 1].title}`, margin: [0, 0, 0, 14] },
                ],
                alignment: 'left',
                fontSize: 13.5,
                width: '*',
            }
            ],
            columnGap: 12
        } as Content
    };  

    const reportBodyIniciacao = () => {
        return [
            {
                table: {
                    headerRows: 1,
                    widths: [30, '*', 22, 88, 22, 22, 22],
                    heights: [5, ...mediuns.map(() => {return 5})],
                    body: [
                        [
                            {text: 'ID', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'NOME', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'MED.', bold: true, lineHeight: 0.9, margin: [-1, -1.5, -1, 0]},
                            {text: 'TEMPLO', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'COL.', lineHeight: 0.9, bold: true, margin: [-1, -1.5, -1, 0]},
                            {text: 'FIC.', lineHeight: 0.9, bold: true, margin: [-1, -1.5, -1, 0]},
                            {text: 'FOTO', lineHeight: 0.9, bold: true, margin: [-3, -1.5, -3, 0]},
                        ],
                        ...mediuns.map((item: IConsagracao) => [
                                {
                                    text: item.medium.toString().padStart(5, '0'),
                                    alignment: 'left',
                                    margin: [-2, -1.5, 0, 0]
                                },
                                {
                                    text: item.nome.toUpperCase(),
                                    alignment: 'left',
                                    margin: item.nome.length > 45 ? [-2, 0, 0, 0] : [-2, -1.5, 0, 0]
                                },
                                {
                                    text: item.med.charAt(0),
                                    margin: [0, -1.5, 0, 0]
                                },
                                {
                                    text: `${temploMedium(item).cidade} - ${temploMedium(item).estado.abrev}`.toUpperCase(),
                                    margin: [0, -1.5, 0, 0]
                                },
                                {
                                    text: item.colete,
                                    margin: [0, -1.5, 0, 0]
                                },
                                ' ',
                                ' '
                            ])
                    ],
                },
                fontSize: 9.5,
                alignment: 'center',
                lineHeight: 0.8,
                layout: {
                    hLineWidth: function() {return 1.4},
                    vLineWidth: function() {return 1.4}
                }
            }
        ] as Content
    }

    const reportBodyElevacao = () => {
        return [
            {
                table: {
                    headerRows: 1,
                    widths: [30, '*', 23, 45, 103],
                    heights: [5, ...mediuns.map(() => {return 5})],
                    body: [
                        [
                            {text: 'ID', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'NOME', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'MED.', bold: true, lineHeight: 0.9, margin: [-1, -1.5, -1, 0]},
                            {text: 'TEMPLO', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'CLASSIFICAÇÃO', lineHeight: 0.9, bold: true, margin: [0, -1.5, 0, 0]},
                        ],
                        ...mediuns.map((item: IConsagracao) => [
                                {
                                    text: item.medium.toString().padStart(5, '0'),
                                    alignment: 'left',
                                    margin: [-2, 8, 0, 0]
                                },
                                {
                                    text: item.nome.toUpperCase(),
                                    alignment: 'left',
                                    margin: item.nome.length > 45 ? [-2, 4, 0, 0] : [-2, 8, 0, 0]
                                },
                                {
                                    text: item.med.charAt(0),
                                    margin: [0, 8, 0, 0]
                                },
                                {
                                    text: `${temploMedium(item).cidade} - ${temploMedium(item).estado.abrev} (${ministroTemplo(temploMedium(item))})`.toUpperCase(),
                                    margin: [-3, 0, -3, 0],
                                    lineHeight: 0.9
                                },
                                {
                                    text: reduceClassFalMest(item, falMest),
                                    alignment: 'left',
                                    margin: [-2, 8, 0, 0]
                                },
                            ])
                    ],
                },
                fontSize: 9.5,
                alignment: 'center',
                lineHeight: 0.8,
                layout: {
                    hLineWidth: function() {return 1.4},
                    vLineWidth: function() {return 1.4}
                }
            }
        ] as Content
    }

    const reportBodyCenturia = () => {
        return [
            {
                table: {
                    headerRows: 1,
                    widths: [30, '*', 24, 100, 70],
                    heights: [5, ...mediuns.map(() => {return 5})],
                    body: [
                        [
                            {text: 'ID', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'NOME', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'MED.', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'CLASSIFICAÇÃO', lineHeight: 0.9, bold: true, margin: [0, -1.5, 0, 0]},
                            {text: 'POVO', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                        ],
                        ...mediuns.map((item: IConsagracao) => [
                                {
                                    text: item.medium.toString().padStart(5, '0'),
                                    alignment: 'left',
                                    margin: [-2, -1.5, 0, 0]
                                },
                                {
                                    text: item.nome.toUpperCase(),
                                    alignment: 'left',
                                    margin: [-2, -1.5, 0, 0]
                                },
                                {
                                    text: item.med.charAt(0),
                                    margin: [0, -1.5, 0, 0]
                                },
                                {
                                    text: reduceClassFalMest(item, falMest),
                                    alignment: 'left',
                                    margin: [-2, -1.5, 0, 0]
                                },
                                {
                                    text: item.povo.toUpperCase(),
                                    margin: [0, -1.5, 0, 0]
                                },
                            ])
                    ],
                },
                fontSize: 9.5,
                alignment: 'center',
                lineHeight: 0.8,
                layout: {
                    hLineWidth: function() {return 1.4},
                    vLineWidth: function() {return 1.4}
                }
            }
        ] as Content
    }

    const reportInfo = () => {
        return [
            {
                stack: [
                    {
                        columns: [
                            { text: 'TOTAL DE MESTRES: ', bold: true, width: 'auto' },
                            { text: mediuns.length, width: 'auto'}
                        ],
                        columnGap: 3,
                        margin: [0, 13, 0, 13]
                    },
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', 43, 43, 43],
                            heights: [5, ...mediuns.map(() => {return 5})],
                            body: [
                                [
                                    {text: 'NOME', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                                    {text: 'A', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                                    {text: 'D', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                                    {text: 'TOTAL', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]}
                                ],
                                ...arrayTemplos.map((item: IProps) => [
                                    {
                                        text: `${item.templo?.cidade} - ${item.templo?.estado.abrev} (${ministroTemplo(item.templo ? item.templo : defaultTemp)})`.toUpperCase(),
                                        alignment: 'left',
                                        margin: [-2, -1.5, 0, 0]
                                    },
                                    {
                                        text: item.apara,
                                        margin: [0, -1.5, 0, 0]
                                    },
                                    {
                                        text: item.doutrinador,
                                        margin: [0, -1.5, 0, 0]
                                    },
                                    {
                                        text: item.apara + item.doutrinador,
                                        margin: [0, -1.5, 0, 0]
                                    },
                                ]),
                                [
                                    {text: 'TOTAL', alignment: 'left', bold: true, lineHeight: 0.9, margin: [-2, -1.5, 0, 0]},
                                    {text: somaMediuns.apara, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                                    {text: somaMediuns.doutrinador, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                                    {text: somaMediuns.total, lineHeight: 0.9, margin: [0, -1.5, 0, 0]}
                                ],
                            ],
                        },
                        fontSize: 9.5,
                        alignment: 'center',
                        lineHeight: 0.8,
                        layout: {
                            hLineWidth: function() {return 1.4},
                            vLineWidth: function() {return 1.4}
                        }
                    }
                ],
                alignment: 'left',
                fontSize: 9.5
            }
        ] as Content
    };

    const reportColete = () => {
        return [
            {
                table: {
                    headerRows: 1,
                    widths: [45, 30, 30, 30],
                    heights: [5, ...mediuns.map(() => {return 5})],
                    body: [
                        [
                            {text: 'COLETE', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'A', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'D', bold: true, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: 'TOTAL', bold: true, lineHeight: 0.9, margin: [-2, -1.5, -2, 0]}
                        ],
                        ...arrayColetes.map((item: IProps) => [
                            {
                                text: item.colete,
                                margin: [0, -1.5, 0, 0]
                            },
                            {
                                text: item.apara,
                                margin: [0, -1.5, 0, 0]
                            },
                            {
                                text: item.doutrinador,
                                margin: [0, -1.5, 0, 0]
                            },
                            {
                                text: item.apara + item.doutrinador,
                                margin: [0, -1.5, 0, 0]
                            },
                        ]),
                        [
                            {text: 'TOTAL', bold: true, lineHeight: 0.9, margin: [-2, -1.5, 0, 0]},
                            {text: somaColetes.apara, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: somaColetes.doutrinador, lineHeight: 0.9, margin: [0, -1.5, 0, 0]},
                            {text: somaColetes.total, lineHeight: 0.9, margin: [0, -1.5, 0, 0]}
                        ],
                    ],
                },
                fontSize: 9.5,
                alignment: 'center',
                lineHeight: 0.8,
                margin: [0, 13, 0, 0],
                layout: {
                    hLineWidth: function() {return 1.4},
                    vLineWidth: function() {return 1.4}
                }
            }
        ] as Content
    };

    const reportDate = () => {
        return [
            {
                columns: [
                    { text: 'RELATÓRIO EMITIDO EM: ', bold: true, width: 'auto' },
                    { text: getCurrentDate(), width: 'auto'}
                ],
                columnGap: 3,
                margin: [0, 13, 0, 0],
                fontSize: 9.5
            }
        ] as Content
    };

    const contentArray = () => {
        const array: Array<Content> = [];
        array.push(reportTitle());
        if (cons === 1) {
            array.push(reportBodyIniciacao());
        }
        if (cons === 2) {
            array.push(reportBodyElevacao());
        }
        if (cons === 3) {
            array.push(reportBodyCenturia());
        }
        array.push(reportInfo());
        if (cons === 1) {
            array.push(reportColete());
        }
        array.push(reportDate());
        return array
    }
    
    const reportDefinitions: TDocumentDefinitions = {
        info: {
            title: `Relatorio_${consagracaoMeta[cons - 1].meta}`
        },
        pageMargins: [34, 33, 34, 34],
        pageSize: 'A4',
        content: contentArray(),
        defaultStyle: {
            font: 'Arial'
        }
    }

    pdfMake.createPdf(reportDefinitions).open({}, window.open(`Relatorio_${consagracaoMeta[cons - 1].meta}.pdf`, '_blank'));
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
        margin: [0, 0, 0, 30]
    }

    const chamadaBody: Array<any> = [
        [
            {text: 'Nº', style: {bold: true}},
            {text: 'FALANGE', style: {bold: true}},
            {text: 'PRIMEIRA (O)', style: {bold: true}},
            {text: 'ADJUNTO DE APOIO', style: {bold: true}},
        ]
    ]

    function fillChamadaTable() {
        falanges.filter((item: IFalange) => item.falange_id !== 2).forEach((item: IFalange, index) => {
            const name = item.nome === 'Nityama' ? 'Nityama e Nityama Madruxa' : item.nome;
            const adj = item.adjMin && item.adjNome ? [`${item.adjMin}\n`, `Mestre ${item.adjNome}`] : '-------';
            const chamadaRow = [
                {text: index + 1, margin: item.adjMin && item.adjNome ? [0, 5, 0, 0] : [0, 0, 0, 0]},
                {text: name, margin: item.adjMin && item.adjNome ? [0, 5, 0, 0] : [0, 0, 0, 0]},
                {text: item.primeira, margin: item.adjMin && item.adjNome ? [0, 5, 0, 0] : [0, 0, 0, 0]},
                adj
            ];
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
        margin: [0, 0, 0, 30]
    }

    const prefixoBody: Array<any> = [
        [
            {text: 'FALANGE', margin: [0, 5, 0, 0], bold: true},
            {text: 'PREFIXO SOL', margin: [0, 5, 0, 0], bold: true},
            {text: 'PREFIXO LUA', margin: [0, 5, 0, 0], bold: true},
        ]
    ]

    function fillPrefixoTable() {
        falanges.filter((item: IFalange) => item.ninfa && item.falange_id !== 2).forEach((item: IFalange) => {
            const name = item.nome === 'Nityama' ? 'Nityama e Nityama Madruxa' : item.nome;
            const prefSol = item.prefSol ? item.prefSol : '-------';
            const prefLua = item.prefLua ? item.prefLua : '-------';
            const prefixoRow = [
                {text: name, margin: [0, 4, 0, 0]},
                {text: prefSol, margin: [0, 4, 0, 0]},
                {text: prefLua, margin: [0, 4, 0, 0]},
            ];
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
        margin: [0, 0, 0, 30]
    }

    const arrayTurnos = [
        {turno: 'AMOROS / AMORANAS', setor: 'Indução', restrito: false},
        {turno: 'AGANAROS / AGANARAS', setor: 'Prisioneiros', restrito: false},
        {turno: 'ADONARES / ADANARES', setor: 'Recursos financeiros', restrito: true},
        {turno: 'VALÚRIOS / VALÚRIAS', setor: 'Mesa Evangélica', restrito: false},
        {turno: 'ADELANOS / ADELANAS', setor: 'Tronos Vermelhos e Amarelos', restrito: false},
        {turno: 'MATUROS / MATURAMAS', setor: 'Sudálio', restrito: false},
        {turno: 'SAVANOS / SAVANAS', setor: 'Randy', restrito: false},
        {turno: 'MURANOS / MURANAS', setor: 'Desenvolvimento dos Médiuns', restrito: false},
        {turno: 'TAVORES / TAVANAS', setor: 'Estrela, Unificação e Pirâmide', restrito: false},
        {turno: 'GALEROS / GALANAS', setor: 'Cura e Junção', restrito: false},
        {turno: 'GRAMOUROS / GRAMARAS', setor: 'Iniciação Dharman-Oxinto', restrito: true},
        {turno: 'VOUGUES / VOUGANAS', setor: 'Responsáveis pelos pajezinhos e crianças do templo', restrito: false},
        {turno: 'TANAROS / TANARAS', setor: 'Oráculo de Simiromba e Cruz do Caminho', restrito: false}
    ]

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
                    {text: 'TURNOS', bold: true, margin: [0, 6, 0, 0]},
                    {text: 'SETORES', bold: true, margin: [0, 6, 0, 0]}
                ],
                ...arrayTurnos.map((item: {turno: string, setor: string, restrito: boolean}) => {
                    return [
                        {text: item.turno, margin: [0, 6, 0, 0], fillColor: item.restrito ? '#dddddd' : null},
                        {text: item.setor, margin: item.setor.length > 40 ? [0, 0, 0, 0] : [0, 6, 0, 0], fillColor: item.restrito ? '#dddddd' : null}
                    ]
                })
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

export const generateCalendario = (calendar: ICalendario) => {    
    const arrayDatas = Array.from({length: 12}, (_, index) => {
        return new Date(calendar.ano, index)
    })

    const formatMonth = new Intl.DateTimeFormat('pt-BR', {month: 'long'});

    const getTrabalho = (trabalho: 'Angical' | 'Sessão Branca', month: Date) => {
        const params = trabalho === 'Angical' ? [13, 14, 21] : trabalho === 'Sessão Branca' ? [21, 22, 29] : [];
        month.setDate(params[0]);
        const dayOfWeek = month.getDay();
        let result;
        if(dayOfWeek <= 4) {
            result = params[1] - dayOfWeek;
        } else {
            result = params[2] - dayOfWeek;
        }
        return result;
    }

    const getPrimeiroDomingo = (month: Date) => {
        month.setDate(1);
        const dayOfWeek = month.getDay();
        let result;
        if(dayOfWeek === 0) {
            result = 1;
        } else {
            result = 8 - dayOfWeek;
        }
        return result;
    }

    const getUltimoDomingo = (month: Date) => {
        const newMonth = month.getMonth() + 1
        const lastDay = new Date(calendar.ano, newMonth, 0);
        return lastDay.getDate() - lastDay.getDay();
    }

    const getSerieAlaba = (day: number, month: number) => {
        const primeiroAlaba = new Date(calendar.ano, month, day - 3);
        const ts = primeiroAlaba.getTime();
        const serie = Array.from({length: 7}, (_, i) => {
            let newTS = ts + (i * 24 * 60 * 60 * 1000);
            return new Date(newTS)
        });
        return serie;
    }

    const arrayAlaba = [getSerieAlaba(calendar.janeiro, 0), getSerieAlaba(calendar.fevereiro, 1), getSerieAlaba(calendar.marco, 2), getSerieAlaba(calendar.abril, 3), getSerieAlaba(calendar.maio, 4), getSerieAlaba(calendar.junho, 5), getSerieAlaba(calendar.julho, 6), getSerieAlaba(calendar.agosto, 7), getSerieAlaba(calendar.setembro, 8), getSerieAlaba(calendar.outubro, 9), getSerieAlaba(calendar.novembro, 10), getSerieAlaba(calendar.dezembro, 11),]

    const alabaGetDay = (index: number, position: number) => arrayAlaba[index][position].getDate().toString().padStart(2, '0');

    const calendarioTitle: Content = {
        text: `ATIVIDADES DOUTRINÁRIAS PARA O ANO DE ${calendar.ano}`,
        fontSize: 16,
        alignment: 'center',
        bold: true, 
        margin: [0, 0, 0, 30]
    }

    const calendarioTable: Content = {
        style: {
            alignment: 'center',
            fontSize: 14
        },
        table: {
            headerRows: 1,
            widths: [120, '*', '*', 200, '*', '*'],
            heights: 20,
            body: [
                [
                    {text: 'MESES', bold: true, margin: [0, 8, 0, 0]},
                    {text: 'ANGICAL', bold: true, margin: [0, 8, 0, 0]},
                    {text: 'SESSÃO BRANCA', bold: true, margin: [0, 0, 0, 0]},
                    {text: 'ALABÁ', bold: true, margin: [0, 8, 0, 0]},
                    {text: 'BÊNÇÃO DO MINISTRO', bold: true, margin: [0, 0, 0, 0]},
                    {text: 'BATIZADO', bold: true, margin: [0, 8, 0, 0]}
                ],
                ...arrayDatas.map((item: Date, index: number) => {
                    return [
                        {text: formatMonth.format(item).toUpperCase(), bold: true},
                        {text: getTrabalho('Angical' ,item)},
                        {text: getTrabalho('Sessão Branca' ,item)},
                        {text: [
                            `${alabaGetDay(index, 0)} - ${alabaGetDay(index, 1)} - ${alabaGetDay(index, 2)} - `,
                            {text: alabaGetDay(index, 3), bold: true},
                            ` - ${alabaGetDay(index, 4)} - ${alabaGetDay(index, 5)} - ${alabaGetDay(index, 6)}`
                        ]},
                        {text: getPrimeiroDomingo(item).toString().padStart(2, '0')},
                        {text: getUltimoDomingo(item)}
                    ]
                })
            ]
        }
    }

    const calendarioSignature: Content = {
        text: [
            '_____________________________________\n',
            'Adjunto Uranor\n',
            'Mestre Vasconcelos\n'
        ],
        alignment: 'center',
        fontSize: 12,
        margin: [0, 30, 0, 0]
    }

    const calendarioFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount);

    const calendarioDefinitions: TDocumentDefinitions = {
        info: {
            title: `ATIVIDADES_DOUTRINARIAS_${calendar.ano}`
        },
        pageSize: 'A4',
        pageOrientation: 'landscape',
        content: [docHeader, calendarioTitle, calendarioTable, calendarioSignature],
        footer: calendarioFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(calendarioDefinitions).open({}, window.open(`ATIVIDADES_DOUTRINARIAS_${calendar.ano}.pdf`, '_blank'));
}

export const generateReportAllCons = (listIniciacao: Array<IConsagracao>, listElevacao: Array<IConsagracao>, listCenturia: Array<IConsagracao>, listMudanca: Array<IConsagracao>,) => {    
    const reportTitle: Content = {
        text: `LISTA DE MÉDIUNS PARA CONSAGRAÇÕES`,
        fontSize: 16,
        alignment: 'center',
        bold: true, 
        margin: [0, 0, 0, 10]
    }

    const reportSubTitle = (text: string) => {
        return {
            text: text,
            fontSize: 15,
            alignment: 'center',
            bold: true, 
            margin: [0, 20, 0, 15]
        } as Content
    }

    const reportTable = (array: Array<IConsagracao>) => {
        return [
            {
                style: {
                    fontSize: 12
                },
                table: {
                    headerRows: 1,
                    widths: ['*', 100],
                    body: [
                        [
                            {text: 'NOME DO MÉDIUM', bold: true, margin: [0, 0, 0, 0]},
                            {text: 'MEDIUNIDADE', alignment: 'center', bold: true, margin: [0, 0, 0, 0]}
                        ],
                        ...alphabeticOrder(array).map((item: IConsagracao) => {
                            return [
                                {text: listMudanca.some((el: IConsagracao) => el.medium === item.medium)? `${item.nome} *`.toUpperCase() : item.nome.toUpperCase(), margin: [0, 0, 0, 0]},
                                {text: item.med.toUpperCase(), alignment: 'center', margin: [0, 0, 0, 0]}
                            ]
                        })
                    ]
                },
            },
            {
                columns: [
                    {text: `Número de médiuns: ${array.length}`, fontSize: 12, bold: true},
                    {
                        text: listMudanca.length && array !== listCenturia ? '* Mudança de mediunidade' : '',
                        fontSize: 10,
                        alignment: 'right'
                    }
                ],
                margin: [0, 5, 0, 0]
            }
        ] as Content
    }

    const noMedium = (margin: number) => {
        return {
            text: '- Nenhum médium -',
            fontSize: 12,
            alignment: 'center',
            margin: [0, -2, 0, margin],
        } as Content
    }

    const arrayContent = () => {
        const array: Content = [docHeader, reportTitle];
        array.push(reportSubTitle('INICIAÇÃO'));
        if ([...listIniciacao, ...listMudanca].length) {
            array.push(reportTable([...listIniciacao, ...listMudanca]))
        } else {
            array.push(noMedium(15))
        }
        array.push(reportSubTitle('ELEVAÇÃO'));
        if ([...listElevacao, ...listMudanca].length) {
            array.push(reportTable([...listElevacao, ...listMudanca]))
        } else {
            array.push(noMedium(15))
        }
        array.push(reportSubTitle('CENTÚRIA'));
        if (listCenturia.length) {
            array.push(reportTable(listCenturia))
        } else {
            array.push(noMedium(0))
        }
        return array
    }

    const turnoFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount);

    const emissaoDefinitions: TDocumentDefinitions = {
        info: {
            title: reportTitle.text.toString().replace(/ /g, '_')
        },
        pageSize: 'A4',
        content: arrayContent(),
        footer: turnoFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(emissaoDefinitions).open({}, window.open(`${reportTitle.text.toString().replace(/ /g, '_')}.pdf`, '_blank'));
}

export const generateReport = (listMediuns: Array<IMedium>, listTemplo: Array<ITemplo>, title: string, showMed: boolean, showTemp: boolean, type: string) => {    
    const reportTitle: Content = {
        text: title ? title.toUpperCase() : `RELATÓRIO DE MÉDIUNS`,
        fontSize: 14,
        alignment: 'center',
        bold: true, 
        margin: [0, 0, 0, 20]
    }

    const reportTable = (array: Array<IMedium>) => {
        const widthArray : Array<string | number> = ['*'];
        const headerArray : Array<Object> = [{text: 'NOME DO MÉDIUM', bold: true, margin: [0, 0, 0, 0]}];

        if (showMed) {
            widthArray.push(type ? 30 : 100);
            headerArray.push({text: type ? 'MED.' : 'MEDIUNIDADE', alignment: 'center', bold: true, margin: [0, 0, 0, 0]})
        }

        if (showTemp) {
            widthArray.push(100);
            headerArray.push({text: 'TEMPLO', alignment: 'center', bold: true, margin: [0, 0, 0, 0]})
        }

        if (type) {
            widthArray.push(type === 'Telefones' ? 80 : type === 'Assinatura' ? '*' : '');
            headerArray.push({text: type.toUpperCase(), alignment: 'center', bold: true, margin: [0, 0, 0, 0]})
        }
        
        return [
            {
                style: {
                    fontSize: 10
                },
                table: {
                    headerRows: 1,
                    widths: widthArray,
                    heights: type === 'Assinatura' ? 25 : 'auto',
                    body: [
                        headerArray,
                        ...alphabeticOrder(array).map((item: IMedium) => {
                            const itemNome = (el: IMedium) => {
                                const numberMap = [
                                    '',
                                    `Teste como ${el.med === 'Doutrinador' ? 'Apará' : el.med === 'Apará' ? 'Doutrinador' : ''}`,
                                    `Emplacamento como ${el.med === 'Doutrinador' ? 'Apará' : el.med === 'Apará' ? 'Doutrinador' : ''}`,
                                    `Iniciação como ${el.med === 'Doutrinador' ? 'Apará' : el.med === 'Apará' ? 'Doutrinador' : ''}`,
                                    `Elevação como ${el.med === 'Doutrinador' ? 'Apará' : el.med === 'Apará' ? 'Doutrinador' : ''}`,
                                    `Mentor como ${el.med === 'Doutrinador' ? 'Apará' : el.med === 'Apará' ? 'Doutrinador' : ''}`
                                ]
                                const match = el.nome.match(/\((\d)\)$/);
                                if(match) {
                                    const number = Number(match[1]);
                                    return [
                                        el.nome.replace(/\((\d)\)$/, '').trim().toUpperCase(),
                                        {text: ` (${numberMap[number]})`, bold: true, fontSize: 8}
                                    ]
                                } else {
                                    return el.nome.toUpperCase();
                                }
                            };
                            const itemArray : Array<Object> = [{
                                text: itemNome(item),
                                margin: [0, 0, 0, 0]
                            }];
                            if (showMed) {
                                itemArray.push({text: type ? item.med.charAt(0).toUpperCase() : item.med.toUpperCase(), alignment: 'center', margin: [0, 0, 0, 0]})
                            }
                            if (showTemp) {
                                const templo = listTemplo.find((el: ITemplo) => el.templo_id === item.templo)
                                itemArray.push({text: `${templo?.cidade} - ${templo?.estado.abrev}`.toUpperCase(), alignment: 'center', margin: [0, 0, 0, 0]})
                            } 
                            if (type) {
                                const telArray = [];
                                if (item.telefone1) {telArray.push(item.telefone1)};
                                if (item.telefone2) {telArray.push(item.telefone2)};
                                const text = type === 'Telefones' ? telArray.join('   ')
                                 : '';
                                itemArray.push({text: text, alignment: 'center', margin: [0, 0, 0, 0]})
                            }
                            return itemArray
                        })
                    ]
                },
            },
            {
                text: `Número de médiuns: ${array.length}`, fontSize: 12, bold: true, margin: [0, 15, 0, 0]
            }
        ] as Content
    }

    const arrayContent = () => {
        const array: Content = [docHeader, reportTitle];
        array.push(reportTable(listMediuns))
        return array
    }

    const reportFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount);

    const reportDefinitions: TDocumentDefinitions = {
        info: {
            title: reportTitle.text.toString().replace(/ /g, '_')
        },
        pageSize: 'A4',
        content: arrayContent(),
        footer: reportFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(reportDefinitions).open({}, window.open(`${reportTitle.text.toString().replace(/ /g, '_')}.pdf`, '_blank'));
}

export const generateFicha = async () => {    
    const fichaFrente = async () => {
        return [
            {                
                columns: [
                    {
                        stack: [
                            { text: 'TEMPLO URANOR DO AMANHECER DE JABOATÃO - PE', alignment: 'center', bold: true, margin: [0, 0, -85, 3] },
                            { text: 'CASTELO DOS DEVAS - FICHA MEDIÚNICA', alignment: 'center', margin: [0, 0, -85, 15] },
                            {
                                text: [
                                    'NOME: ',
                                    '___________________________________________________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'MINISTRO DE ORIGEM: ',
                                    '__________________________',
                                    '  ',
                                    'SEXO: ',
                                    '__________________________'
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'DATA DE NASCIMENTO: ',
                                    '____/____/______',
                                    '  ',
                                    'MEDIUNIDADE: ',
                                    '___________________________'
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'NATURAL DE: ',
                                    '_________________________________________________________',
                                    '  ',
                                    'UF: ',
                                    '_______'
                                ],
                                margin: [0, 0, 0, 6]
                            }
                        ],
                        fontSize: 11,
                        width: '*'
                    },
                    {
                        table: {
                            body: [
                                [{
                                    stack: [
                                        'FOTO',
                                        '3X4'
                                    ],
                                    alignment: 'center',
                                    width: 80,
                                    height: 107,
                                    margin: [24, 40, 25, 40]
                                }]
                            ]
                        },
                        width: 85,
                        margin: [5, -5, 0, 0]
                    }
                ],
                columnGap: 0
            },
            {
                text: [
                    'MÃE: ',
                    '___________________________________________',
                    '  ',
                    'PAI: ',
                    '____________________________________________'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    'RG: ',
                    '____________________',
                    '  ',
                    'CPF: ',
                    '___________________________',
                    '  ',
                    'PROFISSÃO: ',
                    '_____________________________'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    'ESTADO CIVIL: ',
                    '____________________',
                    '  ',
                    'CÔNJUGE: ',
                    '____________________________________________________'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    'ENDEREÇO: ',
                    '____________________________________________________________________________',
                    '  ',
                    'Nº: ',
                    '______'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    'COMPLEMENTO: ',
                    '____________________',
                    '  ',
                    'BAIRRO: ',
                    '____________________________',
                    '  ',
                    'TEL: ',
                    '(___)______________',
                ],
                fontSize: 11,
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    'CIDADE: ',
                    '________________________________________',
                    '  ',
                    'UF: ',
                    '____',
                    '  ',
                    'CEP: ',
                    '___________',
                    '  ',
                    'CEL: ',
                    '(___)______________'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 17]
            },
            {
                columns: [
                    {
                        stack: [
                            {
                                text: [
                                    'DATA DE INGRESSO: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'DATA DE EMPLACAMENTO: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'DATA DE INICIAÇÃO: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'DATA DE ELEVAÇÃO: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'DATA DE CENTÚRIA: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                        ],
                        fontSize: 11
                    },
                    {
                        stack: [
                            {
                                text: [
                                    'PRINCESA: ',
                                    '______________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'PRETO VELHO: ',
                                    '__________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'CABOCLO: ',
                                    '______________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'MÉDICO: ',
                                    '________________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                        ],
                        fontSize: 11
                    }
                ]
            },
            {
                text: '________________________________________________________________',
                fontSize: 9,
                alignment: 'center',
                margin: [0, 20, 0, 3]
            },
            {
                text: 'ASSINATURA',
                fontSize: 9,
                alignment: 'center'
            }
        ] as Content
    };

    const fichaVerso = async () => {
        return [
            {
                text: [
                    'CLASSIFICAÇÃO: ',
                    '_________________________',
                    '  ',
                    'FALANGE DE MESTRADO: ',
                    '_______________________________'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    'POVO: ',
                    '________________________',
                    '  ',
                    'TURNO: ',
                    '________________________',
                    '  ',
                    'ESTRELA: ',
                    '________________________'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    'CAVALEIRO/GUIA: ',
                    '________________________________________',
                    '  ',
                    'MINISTRO: ',
                    '_____________________________'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    'FALANGE MISSIONÁRIA: ',
                    '________________________________________',
                    '  ',
                    'ADJUNTO DEVAS: ',
                    '________________'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 6]
            },
            {
                text: [
                    'TURNO DE TRABALHO: ',
                    '__________________________',
                    '  ',
                    'DATA MINISTRO/CAVALEIRO/GUIA: ',
                    '____/____/______'
                ],
                fontSize: 11,
                margin: [0, 0, 0, 17]
            },
            {
                text: 'CLASSIFICAÇÕES',
                fontSize: 11,
                margin: [0, 0, 0, 8]
            },
            {
                columns: [
                    {
                        stack: [
                            {
                                text: [
                                    'DATA: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'DATA: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'DATA: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'DATA: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'DATA: ',
                                    '____/____/______',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                        ],
                        fontSize: 11,
                        width: 'auto'
                    },
                    {
                        stack: [
                            {
                                text: [
                                    'CLASSIFICAÇÃO: ',
                                    '_______________________________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'CLASSIFICAÇÃO: ',
                                    '_______________________________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'CLASSIFICAÇÃO: ',
                                    '_______________________________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'CLASSIFICAÇÃO: ',
                                    '_______________________________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'CLASSIFICAÇÃO: ',
                                    '_______________________________________________________',
                                ],
                                margin: [0, 0, 0, 6]
                            },
                        ],
                        fontSize: 11,
                        width: '*'
                    }
                ],
                columnGap: 30
            },
            {
                text: 'OBSERVAÇÕES',
                fontSize: 11,
                margin: [0, 17, 0, 8]
            },
            {
                stack: [
                    {
                        text: '___________________________________________________________________________________________________',
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: '___________________________________________________________________________________________________',
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: '___________________________________________________________________________________________________',
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: '___________________________________________________________________________________________________',
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: '___________________________________________________________________________________________________',
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: '___________________________________________________________________________________________________',
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: '___________________________________________________________________________________________________',
                        margin: [0, 0, 0, 5]
                    }
                ],
                fontSize: 11
            }
        ] as Content
    };

    const contentTable = async (f: () => Promise<Content>) => {
        return {
            table: {
                widths: ['*'],
                body: [
                    [{
                        stack: await f()
                    }]
                ]
            },
            layout: {
                paddingLeft: function() { return 15; },
                paddingRight: function() { return 15; },
                paddingTop: function() { return 10; },
                paddingBottom: function() { return 10; }
            },
            margin: [0, 0, 0, 30],
            style: {
                alignment: 'justify'
            }
        } as Content
    }

    const contentArray = async () => {
        const array = [] as Array<Content>;
        array.push(await contentTable(fichaFrente));
        array.push(await contentTable(fichaFrente));
        array.push(await contentTable(fichaVerso));
        array.push(await contentTable(fichaVerso));
        return array
    }
   
    const termoDefinitions: TDocumentDefinitions = {
        info: {
            title: 'Ficha_mediunica'
        },
        pageMargins: [10, 10, 10, 10],
        pageSize: 'A4',
        content: await contentArray(),
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(termoDefinitions).open({}, window.open('Ficha_mediunica.pdf', '_blank'));
}

export const generateFichaMedium = async (medium: IMedium, adjuntos: Array<IAdjunto>, ministros: Array<IMentor>, cavaleiros: Array<ICavaleiro>, guias: Array<IMentor>, falanges: Array<IFalange>, mediuns: Array<IMedium>, token: string) => {    
    const adjOrigem = ministros.find((item: IMentor) => item.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.ministro)?.nome
    const ministro = ministros.find((item: IMentor) => item.id === medium.ministro)?.nome
    const cavGuia = medium.sex === 'Masculino' ? cavaleiros.find((item: ICavaleiro) => item.id === medium.cavaleiro)?.nome : medium.sex === 'Feminino' ? guias.find((item: IMentor) => item.id === medium.guia)?.nome : ''
    const falMiss = falanges.find((item: IFalange) => item.falange_id === medium.falMiss)?.nome
    const base64String = await imageToBase64(medium.foto);
    const events = await generateListEventos(medium, token, ministros, cavaleiros, guias)
    
    const personalData = async () => {
        return [
            {                
                columns: [
                    {
                        stack: [
                            { text: `TEMPLO URANOR DO AMANHECER DE ${medium.templo === 5 ? 'PRAZERES' : 'JABOATÃO'} - PE`, alignment: 'center', bold: true, margin: [0, 0, -85, 3] },
                            { text: 'CASTELO DOS DEVAS - FICHA MEDIÚNICA', alignment: 'center', margin: [0, 0, -85, 30] },
                            {
                                text: [
                                    'NOME: ',
                                    {text: medium.nome.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6],
                                fontSize: 14
                            },
                            {
                                columns: [
                                    {
                                        stack: [
                                            {
                                                text: [
                                                    'DATA DE NASCIMENTO: ',
                                                    {text: convertDate(medium.dtNasc), bold: true},
                                                ],
                                                margin: [0, 0, 0, 6]
                                            },
                                            {
                                                text: [
                                                    'RG: ',
                                                    {text: medium.rg.toUpperCase(), bold: true},
                                                ],
                                                margin: [0, 0, 0, 6]
                                            }
                                        ]
                                    },
                                    {
                                        stack: [
                                            {
                                                text: [
                                                    'SEXO: ',
                                                    {text: medium.sex.toUpperCase(), bold: true}
                                                ],
                                                margin: [0, 0, 0, 6]
                                            },
                                            {
                                                text: [
                                                    'CPF: ',
                                                    {text: medium.cpf.toUpperCase(), bold: true},
                                                ],
                                                margin: [0, 0, 0, 6]
                                            }
                                        ]
                                    }
                                ],
                                columnGap: 10,
                                fontSize: 11
                            },
                        ],
                        fontSize: 11,
                        width: '*'
                    },
                    {
                        table: {
                            body: [
                                [medium.foto ? {
                                    image: base64String,
                                    width: 80,
                                    height: 107
                                } : {
                                    stack: [
                                        'FOTO',
                                        '3X4'
                                    ],
                                    alignment: 'center',
                                    width: 80,
                                    height: 107,
                                    margin: [24, 40, 25, 40]
                                }]  
                            ]
                        },
                        width: 85,
                        margin: [5, -5, 0, 0]
                    },
                ],
                columnGap: 0,
                margin: [-15, -20, -15, 0]
            },
            {
                columns: [
                    {
                        stack: [
                            {
                                text: [
                                    'NATURAL DE: ',
                                    {text: `${medium.natur} - ${medium.naturUF}`.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'MÃE: ',
                                    {text: medium.mae.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'ESTADO CIVIL: ',
                                    {text: medium.estCivil.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            }
                        ]
                    },
                    {
                        stack: [
                            {
                                text: [
                                    'PROFISSÃO: ',
                                    {text: medium.profissao.toUpperCase(), bold: true}
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'PAI: ',
                                    {text: medium.pai.toUpperCase(), bold: true}
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'CÔNJUGE: ',
                                    {text: medium.conjuge.toUpperCase(), bold: true}
                                ],
                                margin: [0, 0, 0, 6]
                            }
                        ]
                    }
                ],
                margin: [-15, 0, -15, 0],
                columnGap: 10,
                fontSize: 11
            },
            {
                columns: [
                    {
                        stack: [
                            {
                                text: [
                                    'TELEFONE 1: ',
                                    {text: medium.telefone1.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            }
                        ]
                    },
                    {
                        stack: [
                            {
                                text: [
                                    'TELEFONE 2: ',
                                    {text: medium.telefone2.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            }
                        ]
                    },
                    {
                        stack: [
                            {
                                text: [
                                    'CEP: ',
                                    {text: medium.cep.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            }
                        ]
                    }
                ],
                margin: [-15, 0, -15, 0],
                columnGap: 10,
                fontSize: 11
            },
            {
                text: [
                    'ENDEREÇO: ',
                    {text: [medium.endereco, medium.endNumero? 'nº ' + medium.endNumero : '', medium.endCompl, medium.endBairro, [medium.endCidade, medium.endUF].filter(el => el !== '').join(" - ")].filter(el => el !== '').join(", ").toUpperCase(), bold: true},
                ],
                fontSize: 11,
                margin: [-15, 0, -15, 17]
            }
        ] as Content
    };

    const mediumData = async () => {
        return [
            { text: 'DADOS MEDIÚNICOS', alignment: 'center', bold: true, margin: [0, 0, 0, 15] },
            {
                columns: [                        
                    {
                        stack: [
                            {
                                text: [
                                    'MINISTRO DE ORIGEM: ',
                                    {text: adjOrigem? adjOrigem.toUpperCase() : '', bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'CLASSIFICAÇÃO: ',
                                    {text: medium.classMest.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'POVO: ',
                                    {text: medium.povo.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            medium.med === 'Apará' ? {
                                text: [
                                    'CABOCLO: ',
                                    {text: medium.caboclo.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            } : '',
                            {
                                text: [
                                    'FALANGE MISSIONÁRIA: ',
                                    {text: falMiss? falMiss.toUpperCase() : '', bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'TURNO: ',
                                    {text: medium.turnoLeg.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    medium.sex === 'Masculino' ? 'MINISTRO: ' : medium.sex === 'Feminino' ? 'ESTRELA: ' : '',
                                    {text: medium.sex === 'Masculino' ? ministro? ministro.toUpperCase() : '' : medium.sex === 'Feminino' ? medium.estrela.toUpperCase() : '' , bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                        ]
                    },
                    {
                        stack: [
                            {
                                text: [
                                    'MEDIUNIDADE: ',
                                    {text: medium.med.toUpperCase(), bold: true}
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'FALANGE DE MESTRADO: ',
                                    {text: medium.falMest.toUpperCase(), bold: true}
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    medium.med === 'Doutrinador' ? 'PRINCESA: ' : medium.med === 'Apará' ? 'PRETO VELHO: ' : '',
                                    {text: medium.med === 'Doutrinador' ? medium.princesa.toUpperCase() : medium.med === 'Apará' ? medium.pretovelho.toUpperCase() : '' , bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            medium.med === 'Apará' ? {
                                text: [
                                    'MÉDICO: ',
                                    {text: medium.medico.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            } : '',
                            {
                                text: [
                                    'ADJUNTO DEVAS: ',
                                    {text: medium.adjDevas.toUpperCase(), bold: true}
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'TURNO DE TRABALHO: ',
                                    {text: medium.turnoTrab.toUpperCase(), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    medium.sex === 'Masculino' ? 'CAVALEIRO: ' : medium.sex === 'Feminino' ? 'GUIA MISSIONÁRIA: ' : '',
                                    {text: cavGuia? `${cavGuia} ${medium.cor}`.toUpperCase() : '', bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            }
                        ]
                    }
                ],
                columnGap: 10,
                fontSize: 11
            },
            medium.sex === 'Masculino' ?
            {
                text: [
                    'CLASSIFICAÇÃO ATUAL: ',
                    {text: medium.classif.toUpperCase(), bold: true}
                ],
                fontSize: 11,
            } : ''
        ] as Content
    };

    const datesData = async () => {
        return [
            { text: 'DATAS MEDIÚNICAS', alignment: 'center', bold: true, margin: [0, 0, 0, 15] },
            {
                columns: [
                    {
                        stack: [
                            {
                                text: [
                                    'INGRESSO: ',
                                    {text: convertDate(medium.dtIngresso), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'ELEVAÇÃO: ',
                                    {text: convertDate(medium.dtElevacao), bold: true},
                                ]
                            }
                        ]
                    },
                    {
                        stack: [
                            {
                                text: [
                                    'EMPLACAMENTO: ',
                                    {text: convertDate(medium.dtEmplac), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'CENTÚRIA: ',
                                    {text: convertDate(medium.dtCenturia), bold: true},
                                ]
                            },
                        ]
                    },
                    {
                        stack: [
                            {
                                text: [
                                    'INICIAÇÃO: ',
                                    {text: convertDate(medium.dtIniciacao), bold: true},
                                ],
                                margin: [0, 0, 0, 6]
                            },
                            {
                                text: [
                                    'SÉTIMO: ',
                                    {text: convertDate(medium.dtSetimo), bold: true},
                                ]
                            }
                        ]
                    }
                ],
                columnGap: 10,
                fontSize: 11
            }
        ] as Content
    };

    const observData = async () => {
        return [
            positionsAndFunctions(medium) ? {
                text: 'CARGOS E FUNÇÕES',
                bold: true,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 17, 0, 6]
            } : '',
            positionsAndFunctions(medium) ? {
                text: positionsAndFunctions(medium).toUpperCase(),
                alignment: 'center',
                margin: [-15, 0, -15, 0]
            } : '',
            medium.observ ? {
                text: 'OBSERVAÇÕES',
                bold: true,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 17, 0, 6]
            } : '',
            medium.observ ? {
                text: medium.observ.toUpperCase(),
                alignment: 'center',
                margin: [-15, 0, -15, 0]
            } : ''
        ] as Content
    };

    const fichaSignature = async () => {
        return [
            {
                columns: [
                    {
                        stack: [
                            {
                                text: '______________________________________________________',
                                margin: [0, 50, 0, 3]
                            },
                            'ASSINATURA DO MÉDIUM'
                        ]
                    },
                    {
                        stack: [
                            {
                                text: '______________________________________________________',
                                margin: [0, 50, 0, 3]
                            },
                            'FILHO DE DEVAS'
                        ]
                    }
                ],
                fontSize: 9,
                alignment: 'center',
                columnGap: 10,
                pageBreak: 'after'
            }
        ] as Content
    };

    const timelineData = async () => {
        return [
            { text: `LINHA DO TEMPO - ${medium.nome.toUpperCase()}`, alignment: 'center', bold: true, margin: [0, 0, 0, 20] },
            {
                table: {
                    widths: [60, '*'],
                    body: events.reverse().map((item: IEvento) => (
                        [
                            {text: convertDate(item.data), bold: true},
                            {
                                stack: [
                                    {text: item.mensagem.toUpperCase(), fontSize: 11, bold: true},
                                    {text: item.observ.toUpperCase(), fontSize: 9, margin: [8, 0, 0, 0]}
                                ],
                                margin: [0, 0, 0, 8]
                            }
                        ]
                    ))
                },
                layout: 'noBorders',
                margin: [-15, 0, -15, 0]
            }
        ] as Content
    };

    const contentTable = async (f: () => Promise<Content>) => {
        return {
            table: {
                widths: ['*'],
                body: [
                    [{
                        stack: await f()
                    }]
                ]
            },
            layout: {
                paddingLeft: function() { return 15; },
                paddingRight: function() { return 15; },
                paddingTop: function() { return 10; },
                paddingBottom: function() { return 10; }
            },
            margin: [-30, 10, -30, 10],
            style: {
                alignment: 'justify'
            }
        } as Content
    }

    const fichaFooter = (currentPage: number, pageCount: number): Content => docFooter(currentPage, pageCount);

    const contentArray = async () => {
        const array = [] as Array<Content>;
        array.push(await personalData());
        array.push(await contentTable(mediumData));
        array.push(await contentTable(datesData));
        array.push(await observData());
        array.push(await fichaSignature());
        array.push(await timelineData());
        return array
    }
   
    const termoDefinitions: TDocumentDefinitions = {
        info: {
            title: `Ficha_${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}`
        },
        pageSize: 'A4',
        content: await contentArray(),
        footer: fichaFooter,
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(termoDefinitions).open({}, window.open(`Ficha_${medium.medium_id.toString().padStart(5, '0')}_${medium.nome.replace(/ /g, '_')}.pdf`, '_blank'));
}

export const generateEscalaDevas = async () => {    
    const escalaTitle = () => {
        return {
            stack: [
                { text: ['TEMPLO URANOR DO AMANHECER\n', 'CASTELO DOS DEVAS\n'], bold: true, margin: [0, 0, 0, 15] },
                { text: 'ESCALA DOS DEVAS', bold: true, margin: [0, 0, 0, 10] },
                { text: 'MÊS: _____________________     ANO: _______', margin: [0, 0, 0, 20] },
            ],
            alignment: 'center',
            fontSize: 16
        } as Content
    };

    const escalaTable = (title: string, rows: number) => {
        const arrayBody = [
            [{text: title, bold: true, colSpan: 2, fillColor: '#dddddd'}, {}],
            [
                {text: 'DATA', bold: true},
                {text: 'DEVAS', bold: true}
            ],
        ]

        for(let i = 0; i < rows; i++) {
            arrayBody.push([
                {text: 'DIA _____', bold: false},
                {text: '', bold: false}
            ])
        }
        
        return {
            table: {
                headerRows: 2,
                widths: [120, '*'],
                heights: 12,
                body: arrayBody
            },
            margin: [0, 0, 0, 15],
            fontSize: 12,
            alignment: 'center'
        } as Content
    };

    const contentArray = async () => {
        const array = () => {
            const arr: Array<Content> = [];
            arr.push(escalaTitle());
            arr.push(escalaTable('CASTELO DOS DEVAS - SÁBADO', 5));
            arr.push(escalaTable('CASTELO DOS DEVAS - 1º DOMINGO', 1));
            arr.push(escalaTable('IMANTRAÇÃO INTERNA - SÁBADO', 5));
            arr.push(escalaTable('IMANTRAÇÃO EXTERNA - DOMINGO', 1));
            return arr;
        };

        const columnPair: Content = [{
            columns: [array(), array()],
            columnGap: 50,
        }];
        return columnPair;
    }
   
    const escalaDefinitions: TDocumentDefinitions = {
        info: {
            title: 'Escala_Devas'
        },
        pageMargins: [25, 25, 25, 10],
        pageSize: 'A4',
        pageOrientation: 'landscape',
        content: await contentArray(),
        defaultStyle: {
            font: 'Times'
        }
    }

    pdfMake.createPdf(escalaDefinitions).open({}, window.open('Escala_Devas.pdf', '_blank'));
}