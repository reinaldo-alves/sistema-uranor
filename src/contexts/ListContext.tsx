import { createContext, useState } from "react";
import api from "src/api";
import { IAdjunto, ICavaleiro, IEstado, IFalange, IMentor, ITemplo, ITurno } from "src/types/types";
import { IAdjuntoAPI, ICavaleiroAPI, IFalangeAPI, IGuiaAPI, IMinistroAPI, ITemploAPI } from "src/types/typesAPI";

export const ListContext = createContext({} as any);

export const ListStore = ({ children }: any) => {
    const [ministros, setMinistros] = useState([] as Array<IMentor>);
    const [cavaleiros, setCavaleiros] = useState([] as Array<ICavaleiro>);
    const [guias, setGuias] = useState([] as Array<IMentor>);
    const [falMiss, setFalMiss] = useState([] as Array<IFalange>);
    const [adjuntos, setAdjuntos] = useState([] as Array<IAdjunto>);
    const [templos, setTemplos] = useState([] as Array<ITemplo>);

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

    const users = [
        {id: 1, name: 'Reinaldo Alves', level: 'Administrador', medium_id: 10},
        {id: 2, name: 'Lúcio Costa', level: 'Administrador', medium_id: 11},
        {id: 3, name: 'Marina Sousa', level: 'Devas', medium_id: 12},
        {id: 4, name: 'Juliana Rios', level: 'Devas', medium_id: 13},
        {id: 5, name: 'Rômulo Andrade', level: 'Devas Aspirante', medium_id: 14},
        {id: 6, name: 'Alexandre Albuquerque', level: 'Devas Aspirante', medium_id: 15},
    ]

    const coletes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const classMest = {
        MS: ['Mestre Sol', 'Mestre Luz', 'Mestre Sol Mago', 'Mestre Luz Mago', 'Mestre Sol Príncipe Maya', 'Mestre Luz Príncipe Maya'],
        ML: ['Mestre Lua', 'Mestre Lua Mago', 'Mestre Lua Príncipe Maya'],
        NS: ['Ninfa Sol', 'Ninfa Sol Nityama', 'Ninfa Sol Grega', 'Ninfa Sol Maya'],
        NL: ['Ninfa Lua', 'Ninfa Lua Nityama', 'Ninfa Lua Grega', 'Ninfa Lua Maya']
    }
    
    const falMest = ['Anunciação', 'Ascenção', 'Consagração', 'Cruzada', 'Estrela Candente', 'Redenção', 'Ressurreição', 'Sacramento', 'Solar', 'Sublimação', 'Unificação']

    const povos = ['Abatã', 'Açanã', 'Açay', 'Amaray', 'Amarê', 'Anaçã', 'Anaçuê', 'Anay', 'Araçê', 'Aramê', 'Aramês', 'Aramôs', 'Arianos', 'Aruã', 'Aruaçã', 'Aruçay', 'Aryatã', 'Camuxy', 'Caporã', 'Carapuana', 'Carybãs', 'Cayrã', 'Cayrus', 'Garacy', 'Guacy', 'Ibaporã', 'Ipuã', 'Ipurã', 'Jaçã', 'Jaçay', 'Jaçuy', 'Jacy', 'Jaguary', 'Janatã', 'Japatã', 'Jaranã', 'Jaruã', 'Joacy', 'Jurupy', 'Juruy', 'Jussay', 'Koaçã', 'Muaçuy', 'Muray', 'Murugy', 'Omayã', 'Peguys', 'Pegy', 'Pery', 'Suadã', 'Tapiris', 'Taporã', 'Tapuã', 'Tapurã', 'Tarymã', 'Tumarê', 'Tupagy', 'Tupinambás', 'Tupuy', 'Uray', 'Uruanã', 'Yaçã', 'Yacy', 'Ymucy', 'Yorimã', 'Ytuporã', 'Yubatã', 'Yucarã', 'Yumary', 'Zanays']

    const turnoL: ITurno = {ninfa: ['Doragana', 'Sabarana'], jaguar: ['Dubali', 'Reili']}

    const turnoT: ITurno = {
        ninfa: ['Adelanas', 'Adanares', 'Aganaras', 'Ajouramas', 'Amoranas', 'Galanas', 'Gramaras', 'Maturamas', 'Muranas', 'Savanas', 'Tanaras', 'Tavanas', 'Valúrias', 'Vouganas'],
        jaguar: ['Adelanos', 'Adonares', 'Aganaros', 'Ajouros', 'Amoros', 'Galeros', 'Gramouros', 'Maturos', 'Muranos', 'Savanos', 'Tanaros', 'Tavores', 'Valúrios', 'Vougues']
    }

    const estrelas = {
        sol: ['Geiras', 'Gestas', 'Teizes', 'Vanulos'],
        lua: ['Acelos', 'Ceanes', 'Gertaes', 'Mântios', 'Xênios']
    }

    const princesas = ['Jurema', 'Janaína', 'Iracema', 'Jandaia', 'Janara', 'Juremá', 'Iramar']

    const classificacao = {
        sol: ['7° Raio Autorizado Taumantes Raio Rama Adjuração', 'Adjunto Regente Koatay 108 Taumantes Raio Rama Adjuração', 'Adjunto Koatay 108 Triada Harpásios Raio Rama Adjuração', 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000', 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000'],
        lua: ['5° Yurê Raio Autorizado Cautanenses Raio Rama Ajanã', '5° Yurê Adjunto Regente Cautanenses Raio Rama Ajanã', '5° Yurê Adjunto Koatay 108 Cautanenses Raio Rama Ajanã', '5° Yurê Adjunto Koatay 108 Cautanenses Raio Ajanã Rama 2000', '5° Yurê Adjunto Koatay 108 Vancares Raio Ajanã Rama 2000']
    }

    const loadMinistro = async (token: string) => {
        try {
            const { data } = await api.get('/ministro/get-ministros', {headers:{Authorization: token}})
            const ministro = data.ministro.map((item: IMinistroAPI) => ({
                id: item.ministro_id,
                nome: item.nome
            }))
            setMinistros(ministro)
        } catch (error) {
            console.log('Erro ao carregar a lista de ministros', error);
        }
    }

    const loadCavaleiro = async (token: string) => {
        try {
            const { data } = await api.get('/cavaleiro/get-cavaleiros', {headers:{Authorization: token}})
            const cavaleiro = data.cavaleiro.map((item: ICavaleiroAPI) => ({
                id: item.cavaleiro_id,
                nome: item.nome,
                med: item.med
            }))
            setCavaleiros(cavaleiro)
        } catch (error) {
            console.log('Erro ao carregar a lista de cavaleiros', error);
        }
    }

    const loadGuia = async (token: string) => {
        try {
            const { data } = await api.get('/guia/get-guias', {headers:{Authorization: token}})
            const guia = data.guia.map((item: IGuiaAPI) => ({
                id: item.guia_id,
                nome: item.nome
            }))
            setGuias(guia)
        } catch (error) {
            console.log('Erro ao carregar a lista de guias missionárias', error)
        }
    }

    const loadFalMiss = async (token: string) => {
        try {
            const { data } = await api.get('/falange/get-falanges', {headers:{Authorization: token}})
            const falange = data.falange.map((item: IFalangeAPI) => ({
                ...item,
                adjMin: item.adjMin === null ? '' : item.adjMin,
                adjNome: item.adjNome === null ? '' : item.adjNome,
                prefSol: item.prefSol === null ? '' : item.prefSol,
                prefLua: item.prefLua === null ? '' : item.prefLua,
                ninfa: item.ninfa === 1 ? true : false
            }))
            setFalMiss(falange)
        } catch (error) {
            console.log('Erro ao carregar a lista de falanges missionárias', error);
        }
    }

    const loadAdjunto = async (token: string) => {
        try {
            const { data } = await api.get('/adjunto/get-adjuntos', {headers:{Authorization: token}})
            const adjunto = data.adjunto.map((item: IAdjuntoAPI) => ({
                ...item,
                esperanca: item.esperanca === 1 ? true : false
            }))
            setAdjuntos(adjunto)
        } catch (error) {
            console.log('Erro ao carregar a lista de adjuntos', error);
        }
    }

    const loadTemplo = async (token: string) => {
        try {
            const { data } = await api.get('/templo/get-templos', {headers:{Authorization: token}})
            const templo = data.templo.map((item: ITemploAPI) => ({
                ...item,
                estado: estados.filter((est: IEstado) => est.abrev === item.estado)[0]
            }))
            setTemplos(templo)
        } catch (error) {
            console.log('Erro ao carregar a lista de templos', error);
        }
    }

    const getData = async (token: string) => {
        await loadMinistro(token);
        await loadGuia(token);
        await loadCavaleiro(token);
        await loadFalMiss(token);
        await loadAdjunto(token);
        await loadTemplo(token);
    };

    return (
        <ListContext.Provider value={{templos, estados, users, adjuntos, coletes, classMest, falMest, falMiss, povos, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao, getData, loadMinistro, loadCavaleiro, loadGuia, loadFalMiss, loadAdjunto, loadTemplo}} >
            { children }
        </ListContext.Provider>
    )
}