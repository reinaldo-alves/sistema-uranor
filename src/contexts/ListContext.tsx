import { createContext } from "react";

export const ListContext = createContext({} as any);

export const ListStore = ({ children }: any) => {
    const estados = [
        {abrev: 'PE', state: 'Pernambuco'}, {abrev: 'AC', state: 'Acre'},
        {abrev: 'AL', state: 'Alagoas'}, {abrev: 'AM', state: 'Amazonas'},
        {abrev: 'AP', state: 'Amapá'}, {abrev: 'BA', state: 'Bahia'}, 
        {abrev: 'CE', state: 'Ceará'}, {abrev: 'DF', state: 'Distrito Federal'},
        {abrev: 'ES', state: 'Espírito Santo'}, {abrev: 'GO', state: 'Goiás'},
        {abrev: 'MA', state: 'Maranhão'}, {abrev: 'MT', state: 'Mato Grosso'},
        {abrev: 'MS', state: 'Mato Grosso do Sul'}, {abrev: 'MG', state: 'Minas Gerais'},
        {abrev: 'PA', state: 'Pará'}, {abrev: 'PB', state: 'Paraíba'},
        {abrev: 'PR', state: 'Paraná'}, {abrev: 'PI', state: 'Piauí'},
        {abrev: 'RJ', state: 'Rio de Janeiro'}, {abrev: 'RN', state: 'Rio Grande do Norte'}, 
        {abrev: 'RS', state: 'Rio Grande do Sul'}, {abrev: 'RO', state: 'Rondônia'}, 
        {abrev: 'RR', state: 'Roraima'}, {abrev: 'SC', state: 'Santa Catarina'}, 
        {abrev: 'SP', state: 'São Paulo'}, {abrev: 'SE', state: 'Sergipe'}, 
        {abrev: 'TO', state: 'Tocantins'}
    ]

    const templos = ['Jaboatão - PE', 'Prazeres - PE', 'São José do Vale do Rio Preto - RJ']
    
    const adjuntos = [
        {id: '1', min: 'Uranor', adj: 'Vasconcelos', classif: 'Arcanos', esperanca: false},
        {id: '2', min: 'Umaryã', adj: 'Ignácio Sales', classif: 'Arcanos', esperanca: true},
        {id: '3', min: 'Adones', adj: 'Severino Ramos', classif: 'Arcanos', esperanca: true},
        {id: '4', min: 'Afário', adj: 'Cezar', classif: 'Arcanos', esperanca: false},
        {id: '5', min: 'Parlo', adj: 'Zilcio', classif: 'Arcanos', esperanca: false},
        {id: '6', min: 'Nerano', adj: 'Carlos Magno', classif: 'Arcanos', esperanca: false},
        {id: '7', min: 'Oratruz', adj: 'Krauzio', classif: 'Arcanos', esperanca: false},
    ]

    const coletes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const classMest = {
        MS: ['Mestre Sol', 'Mestre Luz', 'Mestre Sol Mago', 'Mestre Luz Mago', 'Mestre Sol Príncipe Maya', 'Mestre Luz Príncipe Maya'],
        ML: ['Mestre Lua', 'Mestre Lua Mago', 'Mestre Lua Príncipe'],
        NS: ['Ninfa Sol', 'Ninfa Sol Nityama', 'Ninfa Sol Grega', 'Ninfa Sol Maya'],
        NL: ['Ninfa Lua', 'Ninfa Lua Nityama', 'Ninfa Lua Grega', 'Ninfa Lua Maya']
    }
    
    const falMest = ['Anunciação', 'Ascenção', 'Consagração', 'Cruzada', 'Estrela Candente', 'Redenção', 'Ressurreição', 'Sacramento', 'Solar', 'Sublimação', 'Unificação']

    const falMiss = [
        {id: 1, falange: 'Nityama', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 2, falange: 'Nityama Madruxa', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 3, falange: 'Samaritana', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 4, falange: 'Grega', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 5, falange: 'Maya', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 6, falange: 'Mago', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: false},
        {id: 7, falange: 'Príncipe Maya', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: false},
        {id: 8, falange: 'Yuricy', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 9, falange: 'Dharmo-Oxinto', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 10, falange: 'Muruaicy', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 11, falange: 'Jaçana', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 12, falange: 'Ariana da Estrela Testemunha', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 13, falange: 'Madalena', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 14, falange: 'Narayama', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 15, falange: 'Franciscana', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 16, falange: 'Rochana', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 17, falange: 'Cayçara', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 18, falange: 'Tupinambá', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 19, falange: 'Cigana Aganara', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 20, falange: 'Cigana Tagana', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 21, falange: 'Agulha Ismênia', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 22, falange: 'Niatra', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true},
        {id: 23, falange: 'Aponara', primeira: 'Ana Maria', adjMin: 'Trino Regente Alácio', adjNome: 'Moraes', prefSol: 'ISIS RA', prefLua: 'ISIS', ninfa: true}
    ]

    const povos = ['Abatã', 'Açanã', 'Açay', 'Amaray', 'Amarê', 'Anaçã', 'Anaçuê', 'Anay', 'Araçê', 'Aramê', 'Aramês', 'Aramôs', 'Arianos', 'Aruã', 'Aruaçã', 'Aruçay', 'Aryatã', 'Camuxy', 'Caporã', 'Carapuana', 'Carybãs', 'Cayrã', 'Cayrus', 'Garacy', 'Guacy', 'Ibaporã', 'Ipuã', 'Ipurã', 'Jaçã', 'Jaçay', 'Jaçuy', 'Jacy', 'Jaguary', 'Janatã', 'Japatã', 'Jaranã', 'Jaruã', 'Joacy', 'Jurupy', 'Juruy', 'Jussay', 'Koaçã', 'Muaçuy', 'Muray', 'Murugy', 'Omayã', 'Peguys', 'Pegy', 'Pery', 'Suadã', 'Tapiris', 'Taporã', 'Tapuã', 'Tapurã', 'Tarymã', 'Tumarê', 'Tupagy', 'Tupinambás', 'Tupuy', 'Uray', 'Uruanã', 'Yaçã', 'Yacy', 'Ymucy', 'Yorimã', 'Ytuporã', 'Yubatã', 'Yucarã', 'Yumary', 'Zanays']

    const turnoL = {ninfa: ['Doragana', 'Sabarana'], jaguar: ['Dubali', 'Reili']}

    const turnoT = {
        ninfa: ['Adelanas', 'Adanares', 'Aganaras', 'Ajouramas', 'Amoranas', 'Galanas', 'Gramaras', 'Maturamas', 'Muranas', 'Savanas', 'Tanaras', 'Tavanas', 'Valúrias', 'Vouganas'],
        jaguar: ['Adelanos', 'Adonares', 'Aganaros', 'Ajouros', 'Amoros', 'Galeros', 'Gramouros', 'Maturos', 'Muranos', 'Savanos', 'Tanaros', 'Tavores', 'Valúrios', 'Vougues']
    }

    const ministros = [
        {id: 1, nome: 'Omaros'},
        {id: 2, nome: 'Adalano'},
        {id: 3, nome: 'Polano'},
        {id: 4, nome: 'Manair'},
        {id: 5, nome: 'Afaros'},
    ]

    const cavaleiros = [
        {id: 1, nome: 'Fenaro', med: 'Doutrinador'},
        {id: 2, nome: 'Fejuro', med: 'Doutrinador'},
        {id: 3, nome: 'Faran', med: 'Doutrinador'},
        {id: 4, nome: 'Falano', med: 'Doutrinador'},
        {id: 5, nome: 'Fucio', med: 'Doutrinador'},
        {id: 6, nome: 'Egato', med: 'Apará'},
        {id: 7, nome: 'Enuro', med: 'Apará'},
        {id: 8, nome: 'Etario', med: 'Apará'},
        {id: 9, nome: 'Ekiato', med: 'Apará'},
        {id: 10, nome: 'Eluz', med: 'Apará'},
    ]

    const guias = [
        {id: 1, nome: 'Anarã'},
        {id: 2, nome: 'Arabela'},
        {id: 3, nome: 'Aracila'},
        {id: 4, nome: 'Atalva'},
        {id: 5, nome: 'Alana'},
    ]

    const estrelas = {
        sol: ['Geiras', 'Gestas', 'Teizes', 'Vanulos'],
        lua: ['Acelos', 'Ceanes', 'Gertaes', 'Mântios', 'Xênios']
    }

    const princesas = ['Jurema', 'Janaína', 'Iracema', 'Jandaia', 'Janara', 'Juremá', 'Iramar']

    const classificacao = {
        sol: ['7° Raio Autorizado Taumantes Raio Rama Adjuração', 'Adjunto Regente Koatay 108 Taumantes Raio Rama Adjuração', 'Adjunto Koatay 108 Triada Harpásios Raio Rama Adjuração', 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000', 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000'],
        lua: ['5° Yurê Raio Autorizado Cautanenses Raio Rama Ajanã', '5° Yurê Adjunto Regente Cautanenses Raio Rama Ajanã', '5° Yurê Adjunto Koatay 108 Cautanenses Raio Rama Ajanã', '5° Yurê Adjunto Koatay 108 Cautanenses Raio Ajanã Rama 2000', '5° Yurê Adjunto Koatay 108 Vancares Raio Ajanã Rama 2000']
    }

    return (
        <ListContext.Provider value={{templos, estados, adjuntos, coletes, classMest, falMest, falMiss, povos, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao}} >
            { children }
        </ListContext.Provider>
    )
}