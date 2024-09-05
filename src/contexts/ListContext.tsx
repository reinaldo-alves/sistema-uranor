import { createContext, useState } from "react";
import api from "src/api";
import { IAdjunto, ICalendario, ICavaleiro, IConsagracao, IDesenvolvimento, IEstado, IEvento, IFalange, IMentor, ITemplo, ITurno } from "src/types/types";
import { IAdjuntoAPI, ICavaleiroAPI, IConsagracaoAPI, IEventoAPI, IFalangeAPI, IGuiaAPI, IMediumAPI, IMinistroAPI, ITemploAPI } from "src/types/typesAPI";
import { defaultConsagracao } from "src/utilities/default";

export const ListContext = createContext({} as any);

export const ListStore = ({ children }: any) => {
    const [ministros, setMinistros] = useState([] as Array<IMentor>);
    const [cavaleiros, setCavaleiros] = useState([] as Array<ICavaleiro>);
    const [guias, setGuias] = useState([] as Array<IMentor>);
    const [falMiss, setFalMiss] = useState([] as Array<IFalange>);
    const [adjuntos, setAdjuntos] = useState([] as Array<IAdjunto>);
    const [templos, setTemplos] = useState([] as Array<ITemplo>);
    const [eventos, setEventos] = useState([] as Array<IEvento>);
    const [listIniciacao, setListIniciacao] = useState([] as Array<IConsagracao>);
    const [listElevacao, setListElevacao] = useState([] as Array<IConsagracao>);
    const [listCenturia, setListCenturia] = useState([] as Array<IConsagracao>);
    const [listMudanca, setListMudanca] = useState([] as Array<IConsagracao>);
    const [calendario, setCalendario] = useState({} as ICalendario);
    const [allFrequencia, setAllFrequencia] = useState([] as Array<IDesenvolvimento>)

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

    const coletes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const classMest = {
        MS: ['Mestre Sol', 'Mestre Luz', 'Mestre Sol Mago', 'Mestre Luz Mago', 'Mestre Sol Príncipe Maya', 'Mestre Luz Príncipe Maya'],
        ML: ['Mestre Lua', 'Mestre Lua Mago', 'Mestre Lua Príncipe Maya'],
        NS: ['Ninfa Sol', 'Ninfa Sol Nityama', 'Ninfa Sol Grega', 'Ninfa Sol Maya'],
        NL: ['Ninfa Lua', 'Ninfa Lua Nityama', 'Ninfa Lua Grega', 'Ninfa Lua Maya']
    }
    
    const falMest = {completo: ['Anunciação', 'Ascensão', 'Consagração', 'Cruzada', 'Estrela Candente', 'Redenção', 'Ressurreição', 'Sacramento', 'Solar', 'Sublimação', 'Unificação'], abrev: ['AN', 'AS', 'CN', 'CD', 'EC', 'RD', 'RS', 'SC', 'SL', 'SB', 'UN']}

    const povos = ['Abatã', 'Açanã', 'Açay', 'Amaray', 'Amarê', 'Anaçã', 'Anaçuê', 'Anay', 'Aracê', 'Aramê', 'Aramês', 'Aramôs', 'Arianos', 'Aruã', 'Aruaçã', 'Aruçay', 'Aryatã', 'Camuxy', 'Caporã', 'Carapuana', 'Carybãs', 'Cayrã', 'Cayrus', 'Garacy', 'Guacy', 'Ibaporã', 'Ipuã', 'Ipurã', 'Jaçã', 'Jaçay', 'Jaçuy', 'Jacy', 'Jaguary', 'Janatã', 'Japatã', 'Jaranã', 'Jaruã', 'Joacy', 'Jurupy', 'Juruy', 'Jussay', 'Koaçã', 'Muaçuy', 'Muray', 'Murugy', 'Omayã', 'Peguys', 'Pegy', 'Pery', 'Suadã', 'Tapiris', 'Taporã', 'Tapuã', 'Tapurã', 'Tarymã', 'Tumarê', 'Tupagy', 'Tupinambás', 'Tupuy', 'Uray', 'Uruanã', 'Yaçã', 'Yacy', 'Ymucy', 'Yorimã', 'Ytuporã', 'Yubatã', 'Yucarã', 'Yumary', 'Zanays']

    const turnoL: ITurno = {ninfa: ['Doragana', 'Sabarana'], jaguar: ['Dubali', 'Reili']}

    const turnoT: ITurno = {
        ninfa: ['Adelanas', 'Adanares', 'Aganaras', 'Ajouramas', 'Amoranas', 'Galanas', 'Gramaras', 'Maturamas', 'Muranas', 'Savanas', 'Tanaras', 'Tavanas', 'Valúrias', 'Vouganas'],
        jaguar: ['Adelanos', 'Adonares', 'Aganaros', 'Ajouros', 'Amoros', 'Galeros', 'Gramouros', 'Maturos', 'Muranos', 'Savanos', 'Tanaros', 'Tavores', 'Valúrios', 'Vougues']
    }

    const estrelas = {
        sol: ['Geiras', 'Gestas', 'Teizes', 'Vanulos'],
        lua: ['Acelos', 'Ceanes', 'Gertaes', 'Mântios', 'Xênios']
    }

    const princesas = ['Jurema', 'Janaína', 'Iracema']

    const classificacao = {
        sol: ['7º Raio Autorizado Taumantes Raio Rama Adjuração', 'Adjunto Regente Koatay 108 Taumantes Raio Rama Adjuração', 'Adjunto Koatay 108 Triada Harpásios Raio Rama Adjuração', 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000', 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'],
        lua: ['5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã', '5º Yurê Adjunto Regente Cautanenses Raio Rama Ajanã', '5º Yurê Adjunto Koatay 108 Cautanenses Raio Rama Ajanã', '5º Yurê Adjunto Koatay 108 Cautanenses Raio Ajanã Rama 2000', '5º Yurê Adjunto Koatay 108 Vancares Raio Ajanã Rama 2000']
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

    const loadEvento = async (token: string) => {
        try {
            const { data } = await api.get('/evento/get-eventos', {headers:{Authorization: token}})
            const evento = data.evento.map((item: IEventoAPI) => ({
                ...item,
                data: item.data.toString().split('T')[0],
                mensagem: item.mensagem === null ? '' : item.mensagem,
                tipo: item.tipo === null ? '' : item.tipo,
                observ: item.observ === null ? '' : item.observ
            }))
            setEventos(evento)
        } catch (error) {
            console.log('Erro ao carregar a lista de eventos', error);
        }
    }

    const loadConsagracao = async (token: string) => {
        const configList = async (array: Array<IConsagracaoAPI>, cons: number) => {
            const modifiedArray = await Promise.all(array.filter((item: IConsagracaoAPI) => item.consagracao === cons).map(async (item: IConsagracaoAPI) => {
                try {
                    const { data } = await api.get(`/medium/get?medium_id=${item.medium}`, {headers:{Authorization: token}});
                    const mediumCons = data.medium[0] as IMediumAPI;
                    return {
                        consagracao_id: item.consagracao_id,
                        medium: item.medium,
                        consagracao: item.consagracao,
                        termo: item.termo === 1 ? true : false,
                        nome: mediumCons ? mediumCons.nome : '',
                        med: mediumCons ? mediumCons.med : '',
                        sex: mediumCons ? mediumCons.sex : '',
                        foto: mediumCons?.foto ? `http://localhost:4000/upload/medium/${mediumCons.foto}` : '',
                        templo: mediumCons?.templo ? mediumCons.templo : 0,
                        colete: mediumCons ? mediumCons.colete : 0,
                        dtNasc: mediumCons ? mediumCons.dtNasc : '',
                        dtIniciacao: mediumCons?.dtIniciacao ? mediumCons.dtIniciacao : '',
                        classMest: mediumCons?.classMest ? mediumCons.classMest : '',
                        falMest: mediumCons?.falMest ? mediumCons.falMest : '',
                        povo: mediumCons?.povo ? mediumCons.povo : ''
                    };
                } catch (error) {
                    console.error('Erro ao atribuir médium aos dados das consagrações', error);
                    return null;
                }  
            }));
            return modifiedArray.filter(Boolean) as Array<IConsagracao>
        }
        
        try {
            const { data } = await api.get('/consagracao/get-consagracoes', {headers:{Authorization: token}})
            const iniciacao = await configList(data.list, 1);
            const elevacao = await configList(data.list, 2);
            const centuria = await configList(data.list, 3);
            const mudanca = await configList(data.list, 4);
            setListIniciacao(iniciacao);
            setListElevacao(elevacao);
            setListCenturia(centuria);
            setListMudanca(mudanca);
        } catch (error) {
            console.log('Erro ao carregar a lista de médiuns para consagrações', error);
        }
    }

    const searchMediumInCons = (id: number) => {
        const isIniciacao = listIniciacao.find((item: IConsagracao) => item.medium === id);
        const isElevacao = listElevacao.find((item: IConsagracao) => item.medium === id);
        const isCenturia = listCenturia.find((item: IConsagracao) => item.medium === id);
        const isMudanca = listMudanca.find((item: IConsagracao) => item.medium === id);

        const result = isIniciacao ? isIniciacao : isElevacao ? isElevacao : isCenturia ? isCenturia : isMudanca ? isMudanca : defaultConsagracao;
        return result
    }

    const loadCalendario = async (token: string) => {
        try {
            const { data } = await api.get('/calendar/get', {headers:{Authorization: token}})
            const calendar = JSON.parse(data.calendar[0].text);
            Object.keys(calendar).forEach(key => {
                calendar[key] = Number(calendar[key]);
            });
            setCalendario(calendar);
        } catch (error) {
            console.log('Erro ao carregar as informações do calendário', error);
        }
    }

    const loadDesenvolvimento = async (token: string) => {
        try {
            const { data } = await api.get('/desenvolvimento/get-desenvolvimento', {headers:{Authorization: token}})
            const list = data.list.map((item: {desenv_id: number, mes: string, freq: string}) => {
                const freq = JSON.parse(item.freq);
                return {mes: item.mes, frequencia: freq.frequencia};
            });
            setAllFrequencia(list);
        } catch (error) {
            console.log('Erro ao carregar a lista de frequencias do desenvolvimento', error);
        }
    }

    const getData = async (token: string) => {
        await loadMinistro(token);
        await loadGuia(token);
        await loadCavaleiro(token);
        await loadFalMiss(token);
        await loadAdjunto(token);
        await loadTemplo(token);
        await loadEvento(token);
        await loadConsagracao(token);
        await loadCalendario(token);
        await loadDesenvolvimento(token);
    };

    return (
        <ListContext.Provider value={{templos, estados, adjuntos, coletes, classMest, falMest, falMiss, povos, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao, listIniciacao, listElevacao, listCenturia, listMudanca, calendario, allFrequencia, eventos, searchMediumInCons, getData, loadMinistro, loadCavaleiro, loadGuia, loadFalMiss, loadAdjunto, loadTemplo, loadEvento, loadConsagracao, loadCalendario, loadDesenvolvimento}} >
            { children }
        </ListContext.Provider>
    )
}