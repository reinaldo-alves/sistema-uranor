import { createContext, useCallback, useMemo, useState } from "react";
import api from "src/api";
import { IAdjunto, ICalendario, ICavaleiro, IConsagracao, IDesenvolvimento, IEstado, IEvento, IFalange, IMenor, IMentor, ITemplo, ITurno } from "src/types/types";
import { IAdjuntoAPI, ICavaleiroAPI, IConsagracaoAPI, IEventoAPI, IFalangeAPI, IGuiaAPI, IMediumAPI, IMenorAPI, IMinistroAPI, ITemploAPI } from "src/types/typesAPI";
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
    const [menores, setMenores] = useState([] as Array<IMenor>);
    const [listIniciacao, setListIniciacao] = useState([] as Array<IConsagracao>);
    const [listElevacao, setListElevacao] = useState([] as Array<IConsagracao>);
    const [listCenturia, setListCenturia] = useState([] as Array<IConsagracao>);
    const [listMudanca, setListMudanca] = useState([] as Array<IConsagracao>);
    const [calendario, setCalendario] = useState({} as ICalendario);
    const [allFrequencia, setAllFrequencia] = useState([] as Array<IDesenvolvimento>)

    const estados = useMemo(() => [
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
    ], []);

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

    const loadTemplo = useCallback(async (token: string) => {
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
    }, [estados]);

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

    const loadConsagracao = useCallback(async (token: string) => {
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
                        foto: mediumCons?.foto ? `${process.env.REACT_APP_IMAGE_URL}/${mediumCons.foto}` : '',
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
            return { iniciacao, elevacao, centuria, mudanca };
        } catch (error) {
            console.log('Erro ao carregar a lista de médiuns para consagrações', error);
            return { iniciacao: [], elevacao: [], centuria: [], mudanca: [] };
        }
    }, []);

    const searchMediumInCons = (id: number) => {
        const isIniciacao = listIniciacao.find((item: IConsagracao) => item.medium === id);
        const isElevacao = listElevacao.find((item: IConsagracao) => item.medium === id);
        const isCenturia = listCenturia.find((item: IConsagracao) => item.medium === id);
        const isMudanca = listMudanca.find((item: IConsagracao) => item.medium === id);

        const result = isIniciacao ? isIniciacao : isElevacao ? isElevacao : isCenturia ? isCenturia : isMudanca ? isMudanca : defaultConsagracao;
        return result
    }

    const loadCalendario = useCallback(async (token: string) => {
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
    }, []);

    const loadDesenvolvimento = useCallback(async (token: string) => {
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
    }, []);

    const loadMenor = useCallback(async (token: string) => {
        try {
            const { data } = await api.get('/menor/get-menor', {headers:{Authorization: token}})
            const menor = data.menor.map((item: IMenorAPI) => ({
                ...item,
                condicao: item.condicao === null ? '' : item.condicao,
                dtNasc: item.dtNasc === null ? '' : item.dtNasc.toString().split('T')[0],
                rg: item.rg === null ? '' : item.rg,
                cpf: item.cpf === null ? '' : item.cpf,
                pai: item.pai === null ? '' : item.pai,
                natur: item.natur === null ? '' : item.natur,
                naturUF: item.naturUF === null ? '' : item.naturUF,
                profissao: item.profissao === null ? '' : item.profissao,
                estCivil: item.estCivil === null ? '' : item.estCivil,
                conjuge: item.conjuge === null ? '' : item.conjuge,
                cep: item.cep === null ? '' : item.cep,
                endereco: item.endereco === null ? '' : item.endereco,
                endNumero: item.endNumero === null ? '' : item.endNumero,
                endCompl: item.endCompl === null ? '' : item.endCompl,
                endBairro: item.endBairro === null ? '' : item.endBairro,
                endCidade: item.endCidade === null ? '' : item.endCidade,
                endUF: item.endUF === null ? '' : item.endUF,
                telefone1: item.telefone1 === null ? '' : item.telefone1,
                telefone2: item.telefone2 === null ? '' : item.telefone2,
                email: item.email === null ? '' : item.email,
                temploOrigem: item.temploOrigem === null ? '' : item.temploOrigem,
                falMiss: item.falMiss === null ? '' : item.falMiss,
                adjDevas: item.adjDevas === null ? '' : item.adjDevas,
                nomeEmissao: item.nomeEmissao === null ? '' : item.nomeEmissao,
                observ: item.observ === null ? '' : item.observ,
                responsavel: item.responsavel === null ? '' : item.responsavel,
                parentesco: item.parentesco === null ? '' : item.parentesco,
                contatoResp: item.contatoResp === null ? '' : item.contatoResp
            }))
            setMenores(menor)
        } catch (error) {
            console.log('Erro ao carregar a lista de médiuns menores', error);
        }
    }, [])

    const convertMenorToSend = (menor: IMenor) => {
        const menorObj = {
            ...menor,
            dtNasc: menor.dtNasc === '' ? null : menor.dtNasc,
            rg: menor.rg === '' ? null : menor.rg,
            cpf: menor.cpf === '' ? null : menor.cpf,
            pai: menor.pai === '' ? null : menor.pai,
            natur: menor.natur === '' ? null : menor.natur,
            naturUF: menor.naturUF === '' ? null : menor.naturUF,
            profissao: menor.profissao === '' ? null : menor.profissao,
            estCivil: menor.estCivil === '' ? null : menor.estCivil,
            conjuge: menor.conjuge === '' ? null : menor.conjuge,
            cep: menor.cep === '' ? null : menor.cep,
            endereco: menor.endereco === '' ? null : menor.endereco,
            endNumero: menor.endNumero === '' ? null : menor.endNumero,
            endCompl: menor.endCompl === '' ? null : menor.endCompl,
            endBairro: menor.endBairro === '' ? null : menor.endBairro,
            endCidade: menor.endCidade === '' ? null : menor.endCidade,
            endUF: menor.endUF === '' ? null : menor.endUF,
            telefone1: menor.telefone1 === '' ? null : menor.telefone1,
            telefone2: menor.telefone2 === '' ? null : menor.telefone2,
            email: menor.email === '' ? null : menor.email,
            temploOrigem: menor.temploOrigem === 0 ? null : menor.temploOrigem,
            falMiss: menor.falMiss === 0 ? null : menor.falMiss,
            adjDevas: menor.adjDevas === '' ? null : menor.adjDevas,
            nomeEmissao: menor.nomeEmissao === '' ? null : menor.nomeEmissao,
            observ: menor.observ === '' ? null : menor.observ,
            responsavel: menor.responsavel === '' ? null : menor.responsavel,
            parentesco: menor.parentesco === '' ? null : menor.parentesco,
            contatoResp: menor.contatoResp === '' ? null : menor.contatoResp
        };
        return menorObj
    }

    const getData = useCallback(async (token: string) => {
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
        await loadMenor(token);
    }, [loadTemplo, loadCalendario, loadDesenvolvimento, loadConsagracao, loadMenor]);

    return (
        <ListContext.Provider value={{templos, estados, adjuntos, coletes, classMest, falMest, falMiss, povos, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao, listIniciacao, listElevacao, listCenturia, listMudanca, calendario, allFrequencia, eventos, menores, searchMediumInCons, getData, loadMinistro, loadCavaleiro, loadGuia, loadFalMiss, loadAdjunto, loadTemplo, loadEvento, loadConsagracao, loadCalendario, loadDesenvolvimento, loadMenor, convertMenorToSend}} >
            { children }
        </ListContext.Provider>
    )
}