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
        {id: '1', min: 'Uranor', adj: 'Vasconcelos'},
        {id: '2', min: 'Umaryã', adj: 'Ignácio Sales'},
        {id: '3', min: 'Adones', adj: 'Severino Ramos'},
        {id: '4', min: 'Afário', adj: 'Cezar'},
        {id: '5', min: 'Parlo', adj: 'Zilcio'},
        {id: '6', min: 'Nerano', adj: 'Carlos Magno'},
        {id: '7', min: 'Oratruz', adj: 'Krauzio'},
    ]

    const coletes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const classMest = {
        MS: ['Mestre Sol', 'Mestre Luz', 'Mestre Sol Mago', 'Mestre Luz Mago', 'Mestre Sol Príncipe Maya', 'Mestre Luz Príncipe Maya'],
        ML: ['Mestre Lua', 'Mestre Lua Mago', 'Mestre Lua Príncipe'],
        NS: ['Ninfa Sol', 'Ninfa Sol Nityama', 'Ninfa Sol Grega', 'Ninfa Sol Maya'],
        NL: ['Ninfa Lua', 'Ninfa Lua Nityama', 'Ninfa Lua Grega', 'Ninfa Lua Maya']
    }
    
    const falMest = ['Anunciação', 'Ascenção', 'Consagração', 'Cruzada', 'Estrela Candente', 'Redenção', 'Ressurreição', 'Sacramento', 'Solar', 'Sublimação', 'Unificação']

    const falMiss = {
        ninfa: ['Samaritana', 'Nityama', 'Nityama Madruxa', 'Grega', 'Maya', 'Yuricy', 'Dharmo-Oxinto', 'Muruaicy', 'Jaçanã', 'Ariana da Estrela Testemunha', 'Madalena', 'Franciscana', 'Narayama', 'Rochana', 'Cayçara', 'Tupinambá', 'Cigana Aganara', 'Cigana Tagana', 'Agulha Ismênia', 'Niatra', 'Aponara'],
        jaguar: ['Mago', 'Príncipe Maya'] 
    }

    const povos = ['Abatã', 'Açanã', 'Açay', 'Amaray', 'Amarê', 'Anaçã', 'Anaçuê', 'Anay', 'Araçê', 'Aramê', 'Aramês', 'Aramôs', 'Arianos', 'Aruã', 'Aruaçã', 'Aruçay', 'Aryatã', 'Camuxy', 'Caporã', 'Carapuana', 'Carybãs', 'Cayrã', 'Cayrus', 'Garacy', 'Guacy', 'Ibaporã', 'Ipuã', 'Ipurã', 'Jaçã', 'Jaçay', 'Jaçuy', 'Jacy', 'Jaguary', 'Janatã', 'Japatã', 'Jaranã', 'Jaruã', 'Joacy', 'Jurupy', 'Juruy', 'Jussay', 'Koaçã', 'Muaçuy', 'Muray', 'Murugy', 'Omayã', 'Peguys', 'Pegy', 'Pery', 'Suadã', 'Tapiris', 'Taporã', 'Tapuã', 'Tapurã', 'Tarymã', 'Tumarê', 'Tupagy', 'Tupinambás', 'Tupuy', 'Uray', 'Uruanã', 'Yaçã', 'Yacy', 'Ymucy', 'Yorimã', 'Ytuporã', 'Yubatã', 'Yucarã', 'Yumary', 'Zanays']

    const turnoL = {ninfa: ['Doragana', 'Sabarana'], jaguar: ['Dubali', 'Reili']}

    const turnoT = {
        ninfa: ['Adelanas', 'Adanares', 'Aganaras', 'Ajouramas', 'Amoranas', 'Galanas', 'Gramaras', 'Maturamas', 'Muranas', 'Savanas', 'Tanaras', 'Tavanas', 'Valúrias', 'Vouganas'],
        jaguar: ['Adelanos', 'Adonares', 'Aganaros', 'Ajouros', 'Amoros', 'Galeros', 'Gramouros', 'Maturos', 'Muranos', 'Savanos', 'Tanaros', 'Tavores', 'Valúrios', 'Vougues']
    }

    const ministros = ['Omaros', 'Adalano', 'Polano', 'Manair', 'Afaros']

    const cavaleiros = {
        sol: ['Fenaro', 'Fejuro', 'Faran', 'Falano', 'Fucio'],
        lua: ['Egato', 'Enuro', 'Etario', 'Ekiato', 'Eluz']
    }

    const guias = ['Anarã', 'Arabela', 'Aracila', 'Atalva', 'Alana']

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