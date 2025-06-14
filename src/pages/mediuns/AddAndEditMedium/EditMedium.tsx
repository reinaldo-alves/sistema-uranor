import { useContext, useState, useEffect, useCallback } from "react";
import { ListContext } from "src/contexts/ListContext";
import { Divider, FieldContainer, FieldContainerBox, FieldWrapper, GridContainer, GridDatesContainer, MainContent, MainInfoContainer, PhotoContainer, PhotoPosition } from "./styles";
import { IAdjunto, ICavaleiro, IEstado, IEvento, IFalange, IMedium, IMentor, ITemplo } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { MediumContext } from "src/contexts/MediumContext";
import { formatCep, formatCpf, formatInputText, formatPhoneNumber, handleEnterPress } from "src/utilities/functions";
import { Alert, Confirm } from "src/utilities/popups";
import axios from "axios";
import { validateMedium } from "src/utilities/validations";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "src/utilities/Loading";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultAdj, defaultCavaleiro, defaultMedium, defaultMentor } from "src/utilities/default";
import { Modal, ModalButton, ModalContent, ModalInputContainer, ModalTitle } from "src/components/Modal/modal";
import { IEventoAPI } from "src/types/typesAPI";
import MainContainer from "src/components/MainContainer/MainContainer";
import { NavigateButton } from "src/components/buttons/buttons";
import { PersonalCard } from "src/components/cardsContainers/cardsContainers";
import { Observations, SectionTitle } from "src/components/texts/texts";

function EditMedium() {
    const { templos, estados, adjuntos, coletes, classMest, falMest, povos, falMiss, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao, getData } = useContext(ListContext);
    const { user, token, getUser } = useContext(UserContext);
    const { mediuns, loadMedium, convertMediumToSend, setComponentes, removeComponentes, uploadImage } = useContext(MediumContext);
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [medium, setMedium] = useState(defaultMedium);
    const [selected, setSelected] = useState(defaultMedium);
    const [listClassMest, setListClassMest] = useState([]);
    const [listFalMiss, setListFalMiss] = useState([]);
    const [listTurnoL, setListTurnoL] = useState([]);
    const [listTurnoT, setListTurnoT] = useState([]);
    const [listCav, setListCav] = useState([] as Array<ICavaleiro>);
    const [listEst, setListEst] = useState([]);
    const [listClass, setListClass] = useState([]);
    const [oldListClassMest, setOldListClassMest] = useState([]);
    const [oldListClass, setOldListClass] = useState([]);
    const [oldListCav, setOldListCav] = useState([] as Array<ICavaleiro>);
    const [oldListEst, setOldListEst] = useState([]);
    const [tSol, setTSol] = useState(false);
    const [updatePhoto, setUpdatePhoto] = useState(false);
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dropPres, setDropPres] = useState(defaultAdj);
    const [dropMin, setDropMin] = useState(defaultMentor);
    const [dropCav, setDropCav] = useState(defaultCavaleiro);
    const [dropOldCav, setDropOldCav] = useState(defaultCavaleiro);
    const [dropGuia, setDropGuia] = useState(defaultMentor);
    const [dropMes, setDropMes] = useState(defaultMedium);
    const [dropNin, setDropNin] = useState(defaultMedium);
    const [dropPad, setDropPad] = useState(defaultMedium);
    const [dropMad, setDropMad] = useState(defaultMedium);
    const [dropAfi, setDropAfi] = useState(defaultMedium);
    const [searchPres, setSearchPres] = useState('');
    const [searchMin, setSearchMin] = useState('');
    const [searchCav, setSearchCav] = useState('');
    const [searchOldCav, setSearchOldCav] = useState('');
    const [searchGuia, setSearchGuia] = useState('');
    const [searchMes, setSearchMes] = useState('');
    const [searchNin, setSearchNin] = useState('');
    const [searchPad, setSearchPad] = useState('');
    const [searchMad, setSearchMad] = useState('');
    const [searchAfi, setSearchAfi] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [dataDevas, setDataDevas] = useState('');
    const [dataJanda, setDataJanda] = useState('');
    const [dataTSol, setDataTSol] = useState('');
    const [dataTSar, setDataTSar] = useState('');
    const [dataTransf, setDataTransf] = useState('');
    const [dataCondicao, setDataCondicao] = useState('');

    const now = new Date().toISOString().split('T')[0];

    const defineMedium = useCallback(() => {
        const foundMedium: IMedium = mediuns.find((item: IMedium) => item.medium_id === Number(params.id));
        const pres = adjuntos.find((item: IAdjunto) => item.adjunto_id === foundMedium.adjOrigem);
        const min = ministros.find((item: IMentor) => item.id === foundMedium.ministro);
        const cav = cavaleiros.find((item: ICavaleiro) => item.id === foundMedium.cavaleiro);
        const oldCav = cavaleiros.find((item: ICavaleiro) => item.id === foundMedium.oldCavaleiro);
        const guia = guias.find((item: IMentor) => item.id === foundMedium.guia);
        const mes = mediuns.find((item: IMedium) => item.medium_id === foundMedium.mestre);
        const nin = mediuns.find((item: IMedium) => item.medium_id === foundMedium.ninfa);
        const pad = mediuns.find((item: IMedium) => item.medium_id === foundMedium.padrinho);
        const mad = mediuns.find((item: IMedium) => item.medium_id === foundMedium.madrinha);
        const afi = mediuns.find((item: IMedium) => item.medium_id === foundMedium.afilhado);
        const her = mediuns.find((item: IMedium) => item.medium_id === foundMedium.herdeiro);
        setMedium(foundMedium);
        setSelected(foundMedium);
        setDropPres(pres? pres : defaultAdj);
        setDropMin(min? min : defaultMentor);
        setDropCav(cav? cav : defaultCavaleiro);
        setDropOldCav(oldCav? oldCav : defaultCavaleiro);
        setDropGuia(guia? guia : defaultMentor);
        setDropMes(mes? mes : her? her : defaultMedium);
        setDropNin(nin? nin : defaultMedium);
        setDropPad(pad? pad : defaultMedium);
        setDropMad(mad? mad : defaultMedium);
        setDropAfi(afi? afi : defaultMedium);
        setTSol(foundMedium.trinoSol? true : false);
    }, [adjuntos, cavaleiros, guias, mediuns, ministros, params.id]);
    
    const getInfo = useCallback(async () => {
        try {
            await loadMedium(token);
            await getData(token);
            await getUser(token);
        } catch (error) {
            console.error('Erro ao buscar informações', error);
            Alert('Erro ao buscar informações', 'error');
        }
    }, [loadMedium, getData, getUser, token])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    
    useEffect(() => {
        getInfo();
    }, [getInfo])
    
    useEffect(() => {
        if(mediuns.length > 0){
            defineMedium();
        }
    }, [mediuns, params.id, defineMedium])
    
    useEffect(() => {
        console.log(medium)
        if(medium.medium_id) {
            setLoading(false);
        }
    }, [medium])

    useEffect(() => {
        switch (medium.sex) {
            case 'Masculino':
                setListFalMiss(falMiss.filter((item: IFalange) => item.ninfa === false));
                setListTurnoL(turnoL.jaguar);
                setListTurnoT(turnoT.jaguar);
                break;
            case 'Feminino':
                setListFalMiss(falMiss.filter((item: IFalange) => item.ninfa === true));
                setListTurnoL(turnoL.ninfa);
                setListTurnoT(turnoT.ninfa);
                break;
            default:
                setListFalMiss([]);
                setListTurnoL([]);
                setListTurnoT([]);
        }
    }, [medium.sex, falMiss, turnoL, turnoT])

    useEffect(() => {
        switch (medium.sex.concat(medium.med)) {
            case 'MasculinoDoutrinador':
                setListClassMest(classMest.MS);
                setListCav(cavaleiros.filter((item: ICavaleiro) => item.med === 'Doutrinador'));
                setListClass(classificacao.sol);
                setOldListClassMest(classMest.ML);
                setOldListCav(cavaleiros.filter((item: ICavaleiro) => item.med === 'Apará'));
                setOldListClass(classificacao.lua);
                break;
            case 'MasculinoApará':
                setListClassMest(classMest.ML);
                setListCav(cavaleiros.filter((item: ICavaleiro) => item.med === 'Apará'));
                setListClass(classificacao.lua);
                setOldListClassMest(classMest.MS);
                setOldListCav(cavaleiros.filter((item: ICavaleiro) => item.med === 'Doutrinador'));
                setOldListClass(classificacao.sol);
                break;
            case 'FemininoDoutrinador':
                setListClassMest(classMest.NS);
                setListEst(estrelas.sol);
                setOldListClassMest(classMest.NL);
                setOldListEst(estrelas.lua);
                break;
            case 'FemininoApará':
                setListClassMest(classMest.NL);
                setListEst(estrelas.lua);
                setOldListClassMest(classMest.NS);
                setOldListEst(estrelas.sol);
                break;
            default:
                setListClassMest([]);
                setListCav([]);
                setOldListCav([]);
                setListEst([]);
                setListClass([]);
                setOldListClass([]);
                setOldListClassMest([]);
                setOldListEst([]);
        }
    }, [medium.med, medium.sex, cavaleiros, classMest, classificacao, estrelas])

    const updateFalMiss = (value: number) => {
        updateProps('falMiss', value);
        if(medium.classMest) {
            if(medium.sex.concat(medium.med) === 'MasculinoDoutrinador') {
                if(medium.classMest.includes('Mestre Sol')) {
                    if(value === 6) {updateProps('classMest', 'Mestre Sol Mago')}
                    else if(value === 7) {updateProps('classMest', 'Mestre Sol Príncipe Maya')}
                    else {updateProps('classMest', 'Mestre Sol')}
                }
                if(medium.classMest.includes('Mestre Luz')) {
                    if(value === 6) {updateProps('classMest', 'Mestre Luz Mago')}
                    else if(value === 7) {updateProps('classMest', 'Mestre Luz Príncipe Maya')}
                    else {updateProps('classMest', 'Mestre Luz')}
                }
            }
            if(medium.sex.concat(medium.med) === 'MasculinoApará') {
                if(value === 6) {updateProps('classMest', 'Mestre Lua Mago')}
                else if(value === 7) {updateProps('classMest', 'Mestre Lua Príncipe Maya')}
                else {updateProps('classMest', 'Mestre Lua')}
            }
            if(medium.sex.concat(medium.med) === 'FemininoDoutrinador') {
                if(value === 1 || value === 2) {updateProps('classMest', 'Ninfa Sol Nityama')}
                else if(value === 4) {updateProps('classMest', 'Ninfa Sol Grega')}
                else if(value === 5) {updateProps('classMest', 'Ninfa Sol Maya')}
                else {updateProps('classMest', 'Ninfa Sol')}
            }
            if(medium.sex.concat(medium.med) === 'FemininoApará') {
                if(value === 1 || value === 2) {updateProps('classMest', 'Ninfa Lua Nityama')}
                else if(value === 4) {updateProps('classMest', 'Ninfa Lua Grega')}
                else if(value === 5) {updateProps('classMest', 'Ninfa Lua Maya')}
                else {updateProps('classMest', 'Ninfa Lua')}
            }
        }
    }

    const updateClassMest = (value: string) => {
        updateProps('classMest', value);
        if(value === 'Mestre Sol' || value === 'Mestre Luz' || value === 'Mestre Lua') {
            updateProps('falMiss', 0);
        }
        if((value === 'Ninfa Sol' || value === 'Ninfa Lua') && [1, 2, 4, 5].includes(medium.falMiss)) {
            updateProps('falMiss', 0);
        }
        if(value === 'Ninfa Sol Nityama' || value === 'Ninfa Lua Nityama') {
            updateProps('falMiss', 1);
        }
        if(value === 'Ninfa Sol Grega' || value === 'Ninfa Lua Grega') {
            updateProps('falMiss', 4);
        }
        if(value === 'Ninfa Sol Maya' || value === 'Ninfa Lua Maya') {
            updateProps('falMiss', 5);
        }
        if(value === 'Mestre Sol Mago' || value === 'Mestre Luz Mago' || value === 'Mestre Lua Mago') {
            updateProps('falMiss', 6);
        }
        if(value === 'Mestre Sol Príncipe Maya' || value === 'Mestre Luz Príncipe Maya' || value === 'Mestre Lua Príncipe Maya') {
            updateProps('falMiss', 7);
        }
    };

    const imageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
            setUpdatePhoto(true);
        }
    };

    const removeImage = () => {
        if (photo || medium.foto) {
            Confirm('Tem certeza que quer remover esta foto?', 'question', 'Cancelar', 'Confirmar', () => {
                updateProps('foto', '');
                setPhoto(null);
                setPreview(null);
                setUpdatePhoto(true);
            })
        }
    }

    useEffect(() => {
        if (photo) {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
        } else if (medium.foto) {
            setPreview(medium.foto);
        } else {
            setPreview(null);
        }
    }, [photo, medium.foto]);

    useEffect(() => {
        if(dropPres) {
            updateProps('adjOrigem', dropPres.adjunto_id)
        } else {
            updateProps('adjOrigem', 0)
        }
    }, [dropPres])

    useEffect(() => {
        if(dropMin) {
            updateProps('ministro', dropMin.id)
        } else {
            updateProps('ministro', 0)
        }
    }, [dropMin])

    useEffect(() => {
        if(dropCav) {
            updateProps('cavaleiro', dropCav.id)
        } else {
            updateProps('cavaleiro', 0)
        }
    }, [dropCav])

    useEffect(() => {
        if(dropOldCav) {
            updateProps('oldCavaleiro', dropOldCav.id)
        } else {
            updateProps('oldCavaleiro', 0)
        }
    }, [dropOldCav])

    useEffect(() => {
        if(dropGuia) {
            updateProps('guia', dropGuia.id)
        } else {
            updateProps('guia', 0)
        }
    }, [dropGuia])

    useEffect(() => {
        if(dropMes) {
            if(medium.sex === 'Masculino') {
                updateProps('herdeiro', dropMes.medium_id)
            } else if (medium.sex === 'Feminino') {
                updateProps('mestre', dropMes.medium_id)
            }
        } else {
            updateProps('mestre', 0)
        }
    }, [dropMes, medium.sex])

    useEffect(() => {
        if(dropNin) {
            updateProps('ninfa', dropNin.medium_id)
        } else {
            updateProps('ninfa', 0)
        }
    }, [dropNin])

    useEffect(() => {
        if(dropPad) {
            updateProps('padrinho', dropPad.medium_id)
        } else {
            updateProps('padrinho', 0)
        }
    }, [dropPad])

    useEffect(() => {
        if(dropMad) {
            updateProps('madrinha', dropMad.medium_id)
        } else {
            updateProps('madrinha', 0)
        }
    }, [dropMad])

    useEffect(() => {
        if(dropAfi) {
            updateProps('afilhado', dropAfi.medium_id)
        } else {
            updateProps('afilhado', 0)
        }
    }, [dropAfi])

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]

    const fillAddressByCep = async () => {
        const cepNumber = medium.cep.replace(/\D/g,'')
        if(cepNumber.length === 8) {
            try {
                const responseCep = await axios.get(`http://viacep.com.br/ws/${cepNumber}/json/`);
                updateProps('endereco', responseCep.data.logradouro);
                updateProps('endBairro', responseCep.data.bairro);
                updateProps('endCidade', responseCep.data.localidade);
                updateProps('endUF', responseCep.data.uf);
            } catch(error) {
                console.log(error)
            }
        }
    }

    const updateProps = (property: string, newValue: any) => {
        setMedium((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };

    const generateEvents = async (newMedium: IMedium, oldMedium: IMedium, token: string) => {
        try {
            if (dataDevas) {
                const newEvento = {
                    medium: newMedium.medium_id,
                    data: dataDevas,
                    mensagem: `Consagração de ${newMedium.sex === 'Masculino' ? 'Filho' : newMedium.sex === 'Feminino' ? 'Filha' : ''} de Devas`,
                    tipo: 'Outras Consagrações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (dataJanda) {
                const newEvento = {
                    medium: newMedium.medium_id,
                    data: dataJanda,
                    mensagem: 'Consagração de Janda',
                    tipo: 'Outras Consagrações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.trinoSol && newMedium.trinoSol !== oldMedium.trinoSol && dataTSol) {
                const newEvento = {
                    medium: newMedium.medium_id,
                    data: dataTSol,
                    mensagem: `Consagração de Trino Solitário ${newMedium.trinoSol}`,
                    tipo: 'Trino Solitário',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.trinoSar && newMedium.herdeiro && !oldMedium.trinoSar && dataTSar) {
                const newEvento = {
                    medium: newMedium.medium_id,
                    data: dataTSar,
                    mensagem: `Consagração de Trino Sardyos - Herdeiro do Adj. ${ministros.find((m: IMentor) => m.id === mediuns.find((item: IMedium) => item.medium_id === newMedium.herdeiro)?.ministro)?.nome} Mestre ${mediuns.find((item: IMedium) => item.medium_id === newMedium.herdeiro)?.nomeEmissao}`,
                    tipo: 'Trino Sardyos',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (dataCondicao) {
                const newEvento = {
                    medium: newMedium.medium_id,
                    data: dataCondicao,
                    mensagem: newMedium.condicao === 'Ativo' ? 'Retornou à Doutrina' : newMedium.condicao === 'Entregou as Armas' ? 'Entregou as Armas' : newMedium.condicao === 'Desencarnado' ? 'Desencarnou' : '',
                    tipo: newMedium.condicao === 'Ativo' ? 'Retornou à Doutrina' : newMedium.condicao === 'Entregou as Armas' ? 'Entregou as Armas' : newMedium.condicao === 'Desencarnado' ? 'Desencarnou' : '',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (dataTransf) {
                const oldTemplo = templos.find((item: ITemplo) => item.templo_id === oldMedium.templo);
                const newTemplo = templos.find((item: ITemplo) => item.templo_id === newMedium.templo);
                const newEvento = {
                    medium: newMedium.medium_id,
                    data: dataTransf,
                    mensagem: `Transferido de ${oldTemplo?.cidade} - ${oldTemplo?.estado.abrev} para o templo de ${newTemplo?.cidade} - ${newTemplo?.estado.abrev}`,
                    tipo: 'Mudança de Templo',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.adjOrigem !== oldMedium.adjOrigem) {
                const oldAdj = adjuntos.find((item: IAdjunto) => item.adjunto_id === oldMedium.adjOrigem);
                const newAdj = adjuntos.find((item: IAdjunto) => item.adjunto_id === newMedium.adjOrigem);
                const oldMin = ministros.find((item: IMentor) => item.id === oldAdj.ministro);
                const newMin = ministros.find((item: IMentor) => item.id === newAdj.ministro);
                const newEvento = {
                    medium: newMedium.medium_id,
                    data: now,
                    mensagem: `Mudança de Adjunto de Origem: de Adj. ${oldMin?.nome} Mestre ${oldAdj?.nome} para Adj. ${newMin?.nome} Mestre ${newAdj?.nome}`,
                    tipo: 'Mudança de Adjunto de Origem',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.turnoLeg && oldMedium.turnoLeg && newMedium.turnoLeg !== oldMedium.turnoLeg) {
                const newEvento = {
                    medium: newMedium.medium_id,
                    data: now,
                    mensagem: `Mudança de Turno: de ${oldMedium.turnoLeg} para ${newMedium.turnoLeg}`,
                    tipo: 'Mudança de Turno',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if ((newMedium.classif && newMedium.dtClassif) || (newMedium.oldClassif && newMedium.oldDtClassif)) {
                const { data } = await api.get(`/evento/get?medium=${newMedium?.medium_id}`, {headers:{Authorization: token}});
                const evento = data.evento.map((item: IEventoAPI) => ({
                    ...item,
                    data: item.data === null ? '' : item.data.toString().split('T')[0],
                }));
                const existClassif = evento.some((item: IEvento) => item.tipo === 'Classificações' && item.mensagem.split('de ')[1] === newMedium?.classif && item.data === newMedium.dtClassif);
                const existOldClassif = evento.some((item: IEvento) => item.tipo === 'Classificações' && item.mensagem.split('de ')[1] === newMedium?.oldClassif && item.data === newMedium.oldDtClassif);
                if (newMedium.classif && newMedium.dtClassif && !existClassif) {
                    const newEvento = {
                        medium: newMedium.medium_id,
                        data: newMedium.dtClassif,
                        mensagem: `Classificação de ${newMedium.classif}`,
                        tipo: 'Classificações',
                        observ: ''
                    };
                    await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
                }
                if (newMedium.oldClassif && newMedium.oldDtClassif && !existOldClassif) {
                    const newEvento = {
                        medium: newMedium.medium_id,
                        data: newMedium.oldDtClassif,
                        mensagem: `Classificação de ${newMedium.oldClassif}`,
                        tipo: 'Classificações',
                        observ: ''
                    };
                    await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
                }
            }
        } catch (error) {
            console.error('Erro ao adicionar eventos na linha do tempo', error);
        }
        closeModal();
    }

    const editMedium = async (newMedium: IMedium, oldMedium: IMedium, token: string) => {
        const newMediumObj = convertMediumToSend(newMedium);
        const oldMediumObj = convertMediumToSend(oldMedium);
        if (newMediumObj.classif !== oldMediumObj.classif && newMediumObj.dtClassif === oldMediumObj.dtClassif && oldMediumObj.dtClassif) {
            Alert('Atualize a data da nova classificação', 'warning');
            return
        }
        const changedFields = {} as any
        for (const key in newMediumObj){
            if (newMediumObj[key as keyof IMedium] !== oldMediumObj[key as keyof IMedium]){
                changedFields[key as keyof IMedium] = newMediumObj[key as keyof IMedium]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await Confirm('Tem certeza que quer editar este médium?', 'question', 'Cancelar', 'Confirmar', async () => {
                    await generateEvents(newMedium, oldMedium, token);
                    await api.put('/medium/update', {medium_id: oldMediumObj.medium_id, ...changedFields}, {headers:{Authorization: token}})
                    if (newMediumObj.foto && newMediumObj.foto !== oldMediumObj.foto) {
                        await uploadImage(oldMediumObj.medium_id, newMediumObj.med, token, photo);
                        console.log('foto editada')
                    }
                    if (newMediumObj.mestre !== oldMediumObj.mestre || newMediumObj.ninfa !== oldMediumObj.ninfa || newMediumObj.padrinho !== oldMediumObj.padrinho || newMediumObj.madrinha !== oldMediumObj.madrinha || newMediumObj.afilhado !== oldMediumObj.afilhado) {
                        await removeComponentes(oldMediumObj, token);
                        if (newMediumObj.sex.concat(newMediumObj.med) === 'MasculinoApará' && !newMediumObj.afilhado && newMediumObj.ninfa) {
                            await setComponentes({...newMediumObj, ninfa: null}, token);
                        } else if (newMediumObj.sex.concat(newMediumObj.med) === 'FemininoDoutrinador' && !newMediumObj.afilhado && newMediumObj.mestre) {
                            await setComponentes({...newMediumObj, mestre: null}, token);
                        } else {
                            await setComponentes(newMediumObj, token);
                        }
                    }
                    if (updatePhoto && photo) {
                        await uploadImage(oldMediumObj.medium_id, newMediumObj.med, token, photo)
                    }
                    Alert('Médium editado com sucesso', 'success');
                    await loadMedium(token);
                    navigate(`/mediuns/consulta/${params.id}`);
                })
            } catch (error) {
                console.log('Não foi possível editar o médium', error);
                Alert('Não foi possível editar o médium', 'error');
            }
        } else if (updatePhoto) {
            if (photo) {
                try {
                    await Confirm('Tem certeza que quer editar este médium?', 'question', 'Cancelar', 'Confirmar', async () => {
                        await uploadImage(oldMediumObj.medium_id, newMediumObj.med, token, photo)
                        console.log('foto editada')
                        Alert('Médium editado com sucesso', 'success');
                        await loadMedium(token);
                        navigate(`/mediuns/consulta/${params.id}`);
                    })
                } catch (error) {
                    console.log('Não foi possível editar a foto do médium', error);
                    Alert('Não foi possível editar a foto do médium', 'error');
                }
            }
        } else {
            Alert('Não foi feita nenhuma alteração no médium', 'info')
        }
    }

    const handleEditMedium = async (newMedium: IMedium, oldMedium: IMedium, token: string) => {
        if ((newMedium.devas && !oldMedium.devas) || (newMedium.janda && !oldMedium.janda) || (newMedium.condicao !== oldMedium.condicao && newMedium.condicao !== 'Afastado') || (newMedium.templo !== oldMedium.templo) || (newMedium.trinoSol && newMedium.trinoSol !== oldMedium.trinoSol) || (newMedium.trinoSar && !oldMedium.trinoSar)) {
            setShowModal(true);
        } else {
            await editMedium(newMedium, oldMedium, token);
        }
    }

    const closeModal = () => {
        setDataDevas('');
        setDataJanda('');
        setDataTSol('');
        setDataTSar('');
        setDataTransf('');
        setDataCondicao('');
        setShowModal(false);
    }

    if(loading) {
        return <Loading />
    }

    if(!medium) {
        return <PageNotFound />
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <PersonalCard>
                    <MainContent>
                        <MainInfoContainer>
                            <SectionTitle>Editar Médium</SectionTitle>
                            <SectionTitle>{selected.nome} - ID: {selected.medium_id.toString().padStart(5, '0')}</SectionTitle>
                            <Divider></Divider>
                            <FieldContainer>
                                <label>Nome Médium: </label>
                                <input type="text" value={medium.nome} onChange={(e) => updateProps('nome', formatInputText(e.target.value))}/>
                            </FieldContainer>
                            <GridContainer>
                                <label>Sexo: </label>
                                <span>{medium.sex}</span>
                                <label>Mediunidade: </label>
                                <span>{medium.med}</span>
                                <label>Templo: </label>
                                <select value={medium.templo} onChange={(e) => updateProps('templo', Number(e.target.value))}>
                                    <option value={0}></option>
                                    {templos.map((item: ITemplo, index: number) => (
                                        <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                                    ))}
                                </select>
                                <label>Condição Atual: </label>
                                <select value={medium.condicao} onChange={(e) => updateProps('condicao', e.target.value)}>
                                    <option value={'Ativo'}>Ativo</option>
                                    <option value={'Afastado'}>Afastado</option>
                                    <option value={'Entregou as Armas'}>Entregou as Armas</option>
                                    <option value={'Desencarnado'}>Desencarnado</option>
                                </select>
                            </GridContainer>
                        </MainInfoContainer>
                        <PhotoPosition hide={!photo && !medium.foto}>
                            <PhotoContainer photo={preview}>
                                {photo || medium.foto ? '' : 'Clique aqui para adicionar uma foto'}
                                <input type="file" accept="image/*" onChange={imageUpdate} />
                            </PhotoContainer>
                            <span onClick={removeImage}>Remover foto</span>
                        </PhotoPosition>
                    </MainContent>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" color="red" onClick={() => navigate(`/mediuns/consulta/${params.id}`)}>Cancelar</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validateMedium(mediuns,medium, async () => await handleEditMedium(medium, selected, token))}>Salvar</NavigateButton>
                </div>
                <PersonalCard>
                    <SectionTitle>Dados Pessoais</SectionTitle>
                    <GridContainer>
                        <label>Data Nascimento: </label>
                        <input type="date" value={medium.dtNasc} onChange={(e) => updateProps('dtNasc', e.target.value)} max={now} />
                        <label>Profissão: </label>
                        <input type="text" value={medium.profissao} onChange={(e) => updateProps('profissao', formatInputText(e.target.value))}/>
                        <label>RG: </label>
                        <input type="text" value={medium.rg} onChange={(e) => updateProps('rg', e.target.value)}/>
                        <label>CPF: </label>
                        <input type="text" maxLength={14} value={medium.cpf} onChange={(e) => updateProps('cpf', formatCpf(e.target.value))}/>
                        <label>Mãe: </label>
                        <input type="text" value={medium.mae} onChange={(e) => updateProps('mae', formatInputText(e.target.value))}/>
                        <label>Pai: </label>
                        <input type="text" value={medium.pai} onChange={(e) => updateProps('pai', formatInputText(e.target.value))}/>
                        <label>Natural de: </label>
                        <input type="text" value={medium.natur} onChange={(e) => updateProps('natur', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={medium.naturUF} onChange={(e) => updateProps('naturUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Estado Civil: </label>
                        <select value={medium.estCivil} onChange={(e) => updateProps('estCivil', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                        <label>Cônjuge: </label>
                        <input type="text" value={medium.conjuge} onChange={(e) => updateProps('conjuge', formatInputText(e.target.value))}/>
                        <label>CEP: </label>
                        <input type="text" maxLength={9} value={medium.cep} onChange={(e) => updateProps('cep', formatCep(e.target.value))} onBlur={fillAddressByCep}/>
                        <label>Endereço: </label>
                        <input type="text" value={medium.endereco} onChange={(e) => updateProps('endereco', formatInputText(e.target.value))}/>
                        <label>Número: </label>
                        <input type="text" value={medium.endNumero} onChange={(e) => updateProps('endNumero', e.target.value)}/>
                        <label>Complemento: </label>
                        <input type="text" value={medium.endCompl} onChange={(e) => updateProps('endCompl', formatInputText(e.target.value))}/>
                        <label>Bairro: </label>
                        <input type="text" value={medium.endBairro} onChange={(e) => updateProps('endBairro', formatInputText(e.target.value))}/>
                        <label>Cidade: </label>
                        <input type="text" value={medium.endCidade} onChange={(e) => updateProps('endCidade', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={medium.endUF} onChange={(e) => updateProps('endUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Telefone: </label>
                        <input type="tel" maxLength={15} value={medium.telefone1} onChange={(e) => updateProps('telefone1', formatPhoneNumber(e.target.value))}/>
                        <label>Tel. Emergência: </label>
                        <input type="tel" maxLength={15} value={medium.telefone2} onChange={(e) => updateProps('telefone2', formatPhoneNumber(e.target.value))}/>
                        <label>E-mail: </label>
                        <input type="email" value={medium.email} onChange={(e) => updateProps('email', e.target.value.toLowerCase())}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Datas Mediúnicas</SectionTitle>
                    <GridDatesContainer>
                        <label>Data Ingresso: </label>
                        <input type="date" value={medium.dtIngresso} onChange={(e) => updateProps('dtIngresso', e.target.value)} min={medium.dtNasc}  max={now} disabled={user.level !== 'Administrador' && Boolean(selected.dtIngresso)}/>
                        <label>Data Emplacamento: </label>
                        <input type="date" value={medium.dtEmplac} onChange={(e) => updateProps('dtEmplac', e.target.value)} min={medium.dtIngresso} max={now} disabled={!medium.dtIngresso || (user.level !== 'Administrador' && Boolean(selected.dtEmplac))} />
                        <label>Data Iniciação: </label>
                        <input type="date" value={medium.dtIniciacao} onChange={(e) => updateProps('dtIniciacao', e.target.value)} min={medium.dtEmplac} max={now} disabled={!medium.dtEmplac || (user.level !== 'Administrador' && Boolean(selected.dtIniciacao))} />
                        <label>Data Elevação: </label>
                        <input type="date" value={medium.dtElevacao} onChange={(e) => updateProps('dtElevacao', e.target.value)} min={medium.dtIniciacao} max={now} disabled={!medium.dtIniciacao || (user.level !== 'Administrador' && Boolean(selected.dtElevacao))} />
                        <label>Data Centúria: </label>
                        <input type="date" value={medium.dtCenturia} onChange={(e) => updateProps('dtCenturia', e.target.value)} min={medium.dtElevacao} max={now} disabled={(!medium.dtElevacao && !medium.oldDtElevacao) || (user.level !== 'Administrador' && Boolean(selected.dtCenturia))} />
                        <label>Data Sétimo: </label>
                        <input type="date" value={medium.dtSetimo} onChange={(e) => updateProps('dtSetimo', e.target.value)} min={medium.dtCenturia} max={now} disabled={!medium.dtCenturia || (user.level !== 'Administrador' && Boolean(selected.dtSetimo))} />
                    </GridDatesContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados Mediúnicos</SectionTitle>
                    <GridContainer>
                        <label>Adjunto Origem.: </label>
                        <AutocompleteInput 
                            label={(option) => option === defaultAdj ? '' : `Adj. ${ministros.filter((min: IMentor) => min.id === option.ministro)[0].nome} - Mestre ${option.nome}` }
                            default={defaultAdj}
                            options={adjuntos}
                            equality={(option, value) => option?.adjunto_id === value?.adjunto_id}
                            value={dropPres}
                            setValue={setDropPres}
                            inputValue={searchPres}
                            setInputValue={setSearchPres}
                        />
                        <label>Templo Origem: </label>
                        <select value={medium.temploOrigem} disabled={user.level !== 'Administrador' && Boolean(medium.temploOrigem)} onChange={(e) => updateProps('temploOrigem', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Colete Nº: </label>
                        <select value={medium.colete} onChange={(e) => updateProps('colete', Number(e.target.value))}>
                            <option value={0}></option>
                            {coletes.map((item: number, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Classificação: </label>
                        <select value={medium.classMest} disabled={!medium.dtElevacao} onChange={(e) => updateClassMest(e.target.value)}>
                            <option value={''}></option>
                            {listClassMest.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Falange Mestrado: </label>
                        <select value={medium.falMest} disabled={!medium.dtElevacao} onChange={(e) => updateProps('falMest', e.target.value)}>
                            <option value={''}></option>
                            {falMest.completo.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Povo: </label>
                        <select value={medium.povo} disabled={!medium.dtCenturia} onChange={(e) => updateProps('povo', e.target.value)}>
                            <option value={''}></option>
                            {povos.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Falange Missionária: </label>
                        <select
                            value={medium.falMiss}
                            onChange={(e) => {
                                updateFalMiss(Number(e.target.value))
                                if(Number(e.target.value) === 0){
                                    updateProps('regente', false);
                                }
                                if(Number(e.target.value) !== 8 || Number(e.target.value) !== 23) {
                                    updateProps('janda', false);
                                }
                            }}
                        >
                            <option value={0}></option>
                            {listFalMiss.map((item: IFalange, index: number) => (
                                <option key={index} value={item.falange_id}>{item.nome}</option>
                            ))}
                        </select>
                        <label>Adjunto Devas: </label>
                        <select value={medium.adjDevas} disabled={!medium.falMiss} onChange={(e) => updateProps('adjDevas', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Adejã'}>Adejã</option>
                            <option value={'Alufã'}>Alufã</option>
                        </select>
                        <label>Turno: </label>
                        <select value={medium.turnoLeg} disabled={!medium.dtCenturia} onChange={(e) => updateProps('turnoLeg', e.target.value)}>
                            <option value={''}></option>
                            {listTurnoL.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Turno Trabalho: </label>
                        <select value={medium.turnoTrab} disabled={!medium.dtCenturia} onChange={(e) => updateProps('turnoTrab', e.target.value)}>
                            <option value={''}></option>
                            {listTurnoT.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </GridContainer>
                    {medium.sex==='Masculino' && medium.dtCenturia?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Ministro: </label>
                                <AutocompleteInput 
                                    label={(option) => option.nome}
                                    disabled={medium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' || medium.classif === '5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || medium.classif === ''}
                                    default={defaultMentor}
                                    options={ministros}
                                    equality={(option, value) => option.id === value.id}
                                    value={dropMin}
                                    setValue={setDropMin}
                                    inputValue={searchMin}
                                    setInputValue={setSearchMin}
                                />
                                <label>Data Ministro: </label>
                                <input type="date" value={medium.dtMentor} onChange={(e) => updateProps('dtMentor', e.target.value)} min={medium.dtCenturia}  max={now} disabled={medium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' || medium.classif === '5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || medium.classif === ''} />
                                <label>Cavaleiro: </label>
                                <AutocompleteInput 
                                    label={(option) => option.nome}
                                    disabled={medium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' || medium.classif === '5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || medium.classif === ''}
                                    default={defaultCavaleiro}
                                    options={listCav}
                                    equality={(option, value) => option.id === value.id}
                                    value={dropCav}
                                    setValue={setDropCav}
                                    inputValue={searchCav}
                                    setInputValue={setSearchCav}
                                />
                                <label>Cor do Cavaleiro: </label>
                                <select value={medium.cor} onChange={(e) => updateProps('cor', e.target.value)} disabled={medium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' || medium.classif === '5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || medium.classif === ''} >
                                    {medium.med==='Doutrinador'?
                                        <>
                                            <option value={''}></option>
                                            <option value={'Verde'}>Verde</option>
                                        </>
                                    : medium.med==='Apará'?
                                        <>
                                            <option value={''}></option>
                                            <option value={'Verde'}>Verde</option>
                                            <option value={'Vermelho'}>Vermelho</option>
                                        </>
                                    : <option value={''}></option>}
                                </select>
                            </GridContainer>
                            <FieldWrapper>
                                <FieldContainer>
                                    <label>Classificação Atual: </label>
                                    <select value={medium.classif} onChange={(e) => {
                                        updateProps('classif', e.target.value)
                                        if(e.target.value === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000') {
                                            updateProps('trinoSol', '');
                                            updateProps('trinoSar', false);
                                            updateProps('filho', false);
                                            updateProps('herdeiro', 0);
                                            updateProps('turnoTrab', 'Ajouros');
                                            setTSol(false);
                                        }
                                    }}>
                                        <option value={''}></option>
                                        {listClass.map((item: string, index: number) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </FieldContainer>
                                <FieldContainer width="190px">
                                    <label>Data: </label>
                                    <input type="date" value={medium.dtClassif} onChange={(e) => updateProps('dtClassif', e.target.value)} min={medium.dtCenturia}  max={now} />
                                </FieldContainer>
                            </FieldWrapper>
                        </>
                    : medium.sex==='Feminino' && medium.dtCenturia?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Estrela: </label>
                                <select value={medium.estrela} onChange={(e) => updateProps('estrela', e.target.value)}>
                                    <option value={''}></option>
                                    {listEst.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <label>Guia Missionária: </label>
                                <AutocompleteInput 
                                    label={(option) => option.nome}
                                    default={defaultMentor}
                                    options={guias}
                                    equality={(option, value) => option.id === value.id}
                                    value={dropGuia}
                                    setValue={setDropGuia}
                                    inputValue={searchGuia}
                                    setInputValue={setSearchGuia}
                                />
                                <label>Cor da Guia: </label>
                                <select value={medium.cor} onChange={(e) => updateProps('cor', e.target.value)}>
                                    <option value={undefined}></option>
                                    <option value={'Amarela'}>Amarela</option>
                                    <option value={'Azul'}>Azul</option>
                                    <option value={'Branca'}>Branca</option>
                                    <option value={'Lilás'}>Lilás</option>
                                    <option value={'Rósea'}>Rósea</option>
                                    <option value={'Verde'}>Verde</option>
                                    <option value={'Vermelha'}>Vermelha</option>
                                </select>
                                <label>Data Guia: </label>
                                <input type="date" value={medium.dtMentor} onChange={(e) => updateProps('dtMentor', e.target.value)} min={medium.dtCenturia}  max={now} />
                            </GridContainer>
                        </>
                    : ''}
                    {medium.med==='Doutrinador'?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Data Teste: </label>
                                <input type="date" value={medium.dtTest} onChange={(e) => updateProps('dtTest', e.target.value)} min={medium.dtNasc}  max={now}/>
                                <label>Princesa: </label>
                                <select value={medium.princesa} onChange={(e) => updateProps('princesa', e.target.value)}>
                                    <option value={''}></option>
                                    {princesas.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <label>Nome na emissão: </label>
                                <input type="text" value={medium.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', formatInputText(e.target.value))}/>
                            </GridContainer>
                        </>
                    : medium.med==='Apará'?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Data Teste: </label>
                                <input type="date" value={medium.dtTest} onChange={(e) => updateProps('dtTest', e.target.value)} min={medium.dtNasc}  max={now}/>
                                <label>Preto Velho: </label>
                                <input type="text" value={medium.pretovelho} onChange={(e) => updateProps('pretovelho', formatInputText(e.target.value))}/>
                                <label>Caboclo: </label>
                                <input type="text" value={medium.caboclo} onChange={(e) => updateProps('caboclo', formatInputText(e.target.value))}/>
                                <label>Médico: </label>
                                <input type="text" value={medium.medico} onChange={(e) => updateProps('medico', formatInputText(e.target.value))}/>
                                <label>Nome na emissão: </label>
                                <input type="text" value={medium.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', formatInputText(e.target.value))}/>
                            </GridContainer> 
                        </>
                    : ''}
                </PersonalCard>
                <PersonalCard hide={medium.sex.concat(medium.med).length < 10 || !medium.dtCenturia}>
                    <SectionTitle>Povo</SectionTitle>
                    {medium.sex.concat(medium.med)==='MasculinoDoutrinador'?
                        <GridContainer>
                            <label>Escrava: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Apará' && item.sex === 'Feminino')}
                                disabledOptions={(option: IMedium) => option.mestre !== 0 && option.medium_id !== selected.ninfa}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropNin}
                                setValue={setDropNin}
                                inputValue={searchNin}
                                setInputValue={setSearchNin}
                            />
                            <label>Madrinha: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Feminino')}
                                disabledOptions={(option: IMedium) => option.afilhado !== 0 && option.medium_id !== selected.madrinha}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropMad}
                                setValue={setDropMad}
                                inputValue={searchMad}
                                setInputValue={setSearchMad}
                            />
                            <label>Padrinho: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Apará' && item.sex === 'Masculino')}
                                disabledOptions={(option: IMedium) => option.afilhado !== 0 && option.medium_id !== selected.padrinho}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropPad}
                                setValue={setDropPad}
                                inputValue={searchPad}
                                setInputValue={setSearchPad}
                            />
                        </GridContainer>
                    : medium.sex.concat(medium.med)==='MasculinoApará'? 
                        <GridContainer>
                            <label>Afilhado: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')}
                                disabledOptions={(option: IMedium) => option.padrinho !== 0  && option.medium_id !== selected.afilhado}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropAfi}
                                setValue={setDropAfi}
                                inputValue={searchAfi}
                                setInputValue={setSearchAfi}
                            />
                            <label>Ninfa Sol: </label>
                            <input disabled value={medium.afilhado !== selected.afilhado ? '' : mediuns.find((item: IMedium) => item.medium_id === medium.ninfa) ? mediuns.find((item: IMedium) => item.medium_id === medium.ninfa).nome : ''} />
                        </GridContainer>
                    : medium.sex.concat(medium.med)==='FemininoDoutrinador'?
                        <GridContainer>
                            <label>Afilhado: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')}
                                disabledOptions={(option: IMedium) => option.madrinha !== 0  && option.medium_id !== selected.afilhado}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropAfi}
                                setValue={setDropAfi}
                                inputValue={searchAfi}
                                setInputValue={setSearchAfi}
                            />
                            <label>Ajanã: </label>
                            <input disabled value={medium.afilhado !== selected.afilhado ? '' : mediuns.find((item: IMedium) => item.medium_id === medium.mestre) ? mediuns.find((item: IMedium) => item.medium_id === medium.mestre).nome : ''} />
                        </GridContainer>
                    : medium.sex.concat(medium.med)==='FemininoApará'?
                        <GridContainer>
                            <label>Mestre: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')}
                                disabledOptions={(option: IMedium) => option.ninfa !== 0  && option.medium_id !== selected.mestre}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropMes}
                                setValue={setDropMes}
                                inputValue={searchMes}
                                setInputValue={setSearchMes}
                            />
                        </GridContainer>
                    : <div></div>}
                </PersonalCard>
                <PersonalCard hide={medium.sex.concat(medium.med).length < 10 || !medium.dtCenturia}>
                    <SectionTitle>Cargos e Funções</SectionTitle>
                    {medium.sex.concat(medium.med)==='MasculinoDoutrinador'?
                        <>
                            <GridContainer>
                                <label>Comando: </label>
                                <select value={medium.comando} onChange={(e) => updateProps('comando', e.target.value)}>
                                    <option value={''}></option>
                                    <option value={'Comandante'}>Comandante</option>
                                    <option value={'Janatã'}>Comandante Janatã</option>
                                    <option value={'Lança'}>Lança Vermelha</option>
                                    <option value={'JanatãLança'}>Comandante Janatã / Lança Vermelha</option>
                                </select>      
                                <label>Presidência: </label>
                                <select value={medium.presidente} disabled={!medium.classif.includes('Adjunto Koatay 108 Herdeiro Triada Harpásios')} onChange={(e) => {
                                    updateProps('presidente', e.target.value);
                                    if(e.target.value === 'Presidente') {
                                        updateProps('recepcao', false);
                                        updateProps('devas', false);
                                        updateProps('trinoSol', '');
                                        updateProps('trinoSar', false);
                                        updateProps('filho', false);
                                        updateProps('herdeiro', 0);
                                        updateProps('turnoTrab', 'Ajouros');
                                        updateProps('falMiss', 0);
                                        setTSol(false);
                                    }
                                }}>
                                    <option value={''}></option>
                                    <option value={'Presidente'}>Presidente</option>
                                    <option value={'Vice'}>Vice-presidente</option>
                                </select>
                            </GridContainer>
                            <div style={{display: 'flex', justifyContent: 'center', gap: '10px 30px', flexWrap: 'wrap'}}>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={medium.devas} checked={medium.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                                    <label>Recepcionista</label>
                                </FieldContainerBox>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={medium.recepcao} checked={medium.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                                    <label>Filho de Devas</label>
                                </FieldContainerBox>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={!medium.falMiss} checked={medium.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                                    <label>Regente</label>
                                </FieldContainerBox>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <FieldContainerBox>
                                        <input type="checkBox" checked={tSol} disabled={medium.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000' || medium.presidente === 'Presidente'} onChange={(e) => {
                                            setTSol(e.target.checked);
                                            if (!e.target.checked) {
                                                updateProps('trinoSol', '');
                                            }
                                        }}/>
                                        <label>Trino Solitário</label>
                                    </FieldContainerBox> 
                                    <FieldContainer width="100px">
                                        <select disabled={!tSol} value={medium.trinoSol} onChange={(e) => updateProps('trinoSol', e.target.value)}>
                                            <option value={''}></option>
                                            <option value={'Juremá'}>Juremá</option>
                                            <option value={'Iramar'}>Iramar</option>
                                        </select>
                                    </FieldContainer>
                                </div>
                            </div>
                            {medium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' || medium.presidente === 'Presidente' ? '' : 
                                <>
                                    <Divider></Divider>
                                    <FieldWrapper herdeiro>
                                        <FieldContainerBox>
                                            <input type="checkBox" checked={medium.trinoSar} onChange={(e) => {
                                                updateProps('trinoSar', e.target.checked)
                                                if(!e.target.checked) {
                                                    updateProps('herdeiro', 0);
                                                    updateProps('filho', false);
                                                    setDropMes(defaultMedium);
                                                    setSearchMes('');
                                                }
                                            }} />
                                            <label>Trino Sardyos</label>
                                        </FieldContainerBox>
                                        <div style={{display: 'flex', gap: '10px', width: '100%'}}>
                                            <FieldContainer>
                                                <label>Herdeiro de: </label>
                                                <AutocompleteInput 
                                                    label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                                    default={defaultMedium}
                                                    options={mediuns.filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000')}
                                                    disabled={!medium.trinoSar}
                                                    equality={(option, value) => option.medium_id === value.medium_id}
                                                    value={dropMes}
                                                    setValue={setDropMes}
                                                    inputValue={searchMes}
                                                    setInputValue={setSearchMes}
                                                />
                                            </FieldContainer>
                                            <FieldContainerBox>
                                                <input type="checkBox" disabled={!medium.trinoSar} checked={medium.filho} onChange={(e) => updateProps('filho', e.target.checked)}/>
                                                <label>Filho?</label>
                                            </FieldContainerBox>
                                        </div>
                                    </FieldWrapper>
                                </>
                            }
                        </>
                    : medium.sex.concat(medium.med)==='MasculinoApará'? 
                        <>
                            <div style={{display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap'}}>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={medium.devas} checked={medium.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                                    <label>Recepcionista</label>
                                </FieldContainerBox>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={medium.recepcao} checked={medium.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                                    <label>Filho de Devas</label>
                                </FieldContainerBox>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={!medium.falMiss} checked={medium.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                                    <label>Regente</label>
                                </FieldContainerBox>
                            </div>
                            <Divider></Divider>
                            <FieldWrapper herdeiro> 
                                <FieldContainerBox>
                                    <input type="checkBox" checked={medium.trinoSar} onChange={(e) => {
                                        updateProps('trinoSar', e.target.checked)
                                        if(!e.target.checked) {
                                            updateProps('herdeiro', 0);
                                            updateProps('filho', false);
                                            setDropMes(defaultMedium);
                                            setSearchMes('');
                                        }
                                    }} />
                                    <label>Trino Sardyos</label>
                                </FieldContainerBox>
                                <div style={{display: 'flex', gap: '10px', width: '100%'}}>
                                    <FieldContainer>
                                        <label>Herdeiro de: </label>
                                        <AutocompleteInput 
                                            label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                            default={defaultMedium}
                                            options={mediuns.filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000')}
                                            disabled={!medium.trinoSar}
                                            equality={(option, value) => option.medium_id === value.medium_id}
                                            value={dropMes}
                                            setValue={setDropMes}
                                            inputValue={searchMes}
                                            setInputValue={setSearchMes}
                                        />
                                    </FieldContainer>
                                    <FieldContainerBox>
                                        <input type="checkBox" disabled={!medium.trinoSar} checked={medium.filho} onChange={(e) => updateProps('filho', e.target.checked)}/>
                                        <label>Filho?</label>
                                    </FieldContainerBox>
                                </div>
                            </FieldWrapper>
                        </>
                    : medium.sex.concat(medium.med)==='FemininoDoutrinador'?
                        <div style={{display: 'flex', justifyContent:'center', gap: '10px', flexWrap: 'wrap'}}>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={medium.devas} checked={medium.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                                <label>Recepcionista</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={medium.recepcao} checked={medium.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                                <label>Filha de Devas</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={!medium.falMiss} checked={medium.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                                <label>Regente</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={medium.falMiss !== 23 && medium.falMiss !== 8} checked={medium.janda} onChange={(e) => updateProps('janda', e.target.checked)}/>
                                <label>Janda</label>
                            </FieldContainerBox>
                        </div>
                    : medium.sex.concat(medium.med)==='FemininoApará'?
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap'}}>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={medium.devas} checked={medium.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                                <label>Recepcionista</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={medium.recepcao} checked={medium.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                                <label>Filha de Devas</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={!medium.falMiss} checked={medium.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                                <label>Regente</label>
                            </FieldContainerBox>
                        </div>
                    : <div></div>}
                </PersonalCard>
                <PersonalCard hide={!medium.med}>
                    <SectionTitle>Dados como {medium.med === 'Doutrinador' ? 'Apará' : medium.med === 'Apará' ? 'Doutrinador' : ''}</SectionTitle>
                    <GridContainer>
                        <label>Data Teste: </label>
                        <input type="date" value={medium.oldDtTest} onChange={(e) => updateProps('oldDtTest', e.target.value)} min={medium.dtNasc}  max={now} />
                        <label>Data Emplacamento: </label>
                        <input type="date" value={medium.oldDtEmplac} onChange={(e) => updateProps('oldDtEmplac', e.target.value)} min={medium.oldDtTest} max={now} disabled={!medium.oldDtTest} />
                        <label>Data Iniciação: </label>
                        <input type="date" value={medium.oldDtIniciacao} onChange={(e) => updateProps('oldDtIniciacao', e.target.value)} min={medium.oldDtEmplac} max={now} disabled={!medium.oldDtEmplac} />
                        <label>Data Elevação: </label>
                        <input type="date" value={medium.oldDtElevacao} onChange={(e) => updateProps('oldDtElevacao', e.target.value)} min={medium.oldDtIniciacao} max={now} disabled={!medium.oldDtIniciacao} />
                        {medium.sex === 'Masculino' ?
                            <>
                                <label>Classificação: </label>
                                <select value={medium.oldClassMest} disabled={!medium.oldDtElevacao} onChange={(e) => updateProps('oldClassMest', e.target.value)}>
                                    <option value={''}></option>
                                    {oldListClassMest.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <label>Cavaleiro: </label>
                                <AutocompleteInput 
                                    label={(option) => option.nome}
                                    disabled={!medium.dtCenturia}
                                    default={defaultCavaleiro}
                                    options={oldListCav}
                                    equality={(option, value) => option.id === value.id}
                                    value={dropOldCav}
                                    setValue={setDropOldCav}
                                    inputValue={searchOldCav}
                                    setInputValue={setSearchOldCav}
                                />
                                <label>Cor do Cavaleiro: </label>
                                <select value={medium.oldCor} disabled={medium.oldCavaleiro === 0} onChange={(e) => updateProps('oldCor', e.target.value)}>
                                    {medium.med==='Apará'?
                                        <>
                                            <option value={''}></option>
                                            <option value={'Verde'}>Verde</option>
                                        </>
                                    : medium.med==='Doutrinador'?
                                        <>
                                            <option value={''}></option>
                                            <option value={'Verde'}>Verde</option>
                                            <option value={'Vermelho'}>Vermelho</option>
                                        </>
                                    : <option value={''}></option>}
                                </select>
                                <label>Data Cavaleiro: </label>
                                <input type="date" value={medium.oldDtMentor} disabled={medium.oldCavaleiro === 0} onChange={(e) => updateProps('oldDtMentor', e.target.value)} min={medium.dtCenturia}  max={now} />
                                <label>Última Classif.: </label>
                                <select value={medium.oldClassif} disabled={!medium.dtCenturia} onChange={(e) => updateProps('oldClassif', e.target.value)}>
                                    <option value={''}></option>
                                    {oldListClass.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <label>Data: </label>
                                <input type="date" value={medium.oldDtClassif} onChange={(e) => updateProps('oldDtClassif', e.target.value)} min={medium.dtCenturia}  max={now} />
                                {medium.med === 'Apará'?
                                    <>
                                        <label>Trino Solitário: </label>
                                        <select disabled={medium.oldClassif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000' || medium.presidente === 'Presidente'} value={medium.trinoSol} onChange={(e) => updateProps('trinoSol', e.target.value)}>
                                            <option value={''}></option>
                                            <option value={'Juremá'}>Juremá</option>
                                            <option value={'Iramar'}>Iramar</option>
                                        </select>
                                    </>
                                : ''}
                            </>
                        : medium.sex === 'Feminino' ?
                            <>
                                <label>Estrela: </label>
                                <select value={medium.oldEstrela} onChange={(e) => updateProps('oldEstrela', e.target.value)}>
                                    <option value={''}></option>
                                    {oldListEst.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select> 
                            </>
                        : <div></div>}
                        {medium.med === 'Doutrinador' ?
                            <>
                                <label>Preto Velho: </label>
                                <input type="text" value={medium.pretovelho} onChange={(e) => updateProps('pretovelho', formatInputText(e.target.value))}/>
                                <label>Caboclo: </label>
                                <input type="text" value={medium.caboclo} onChange={(e) => updateProps('caboclo', formatInputText(e.target.value))}/>
                                <label>Médico: </label>
                                <input type="text" value={medium.medico} onChange={(e) => updateProps('medico', formatInputText(e.target.value))}/>
                            </>
                        : medium.med === 'Apará' ?
                            <>
                                <label>Princesa: </label>
                                <select value={medium.princesa} onChange={(e) => updateProps('princesa', e.target.value)}>
                                    <option value={''}></option>
                                    {princesas.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </>
                        : <div></div>}
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Observações</SectionTitle>
                    <Observations value={medium.observ} onChange={(e) => updateProps('observ', e.target.value)}/>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" color="red" onClick={() => navigate(`/mediuns/consulta/${params.id}`)}>Cancelar</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validateMedium(mediuns, medium, async () => await handleEditMedium(medium, selected, token))}>Salvar</NavigateButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Datas</ModalTitle>
                    {medium.devas && !selected.devas ?
                        <ModalInputContainer>
                            <label>Data da consagração de Devas</label>
                            <input type="date" value={dataDevas} onKeyUp={(e) => handleEnterPress(e, async () => await editMedium(medium, selected, token))} onChange={(e) => setDataDevas(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {medium.janda && !selected.janda ?
                        <ModalInputContainer>
                            <label>Data da consagração de Janda</label>
                            <input type="date" value={dataJanda} onKeyUp={(e) => handleEnterPress(e, async () => await editMedium(medium, selected, token))} onChange={(e) => setDataJanda(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {medium.trinoSol && medium.trinoSol !== selected.trinoSol ?
                        <ModalInputContainer>
                            <label>Data da consagração de Trino Solitário</label>
                            <input type="date" value={dataTSol} onKeyUp={(e) => handleEnterPress(e, async () => await editMedium(medium, selected, token))} onChange={(e) => setDataTSol(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {medium.trinoSar && !selected.trinoSar ?
                        <ModalInputContainer>
                            <label>Data da consagração de Trino Sardyos</label>
                            <input type="date" value={dataTSar} onKeyUp={(e) => handleEnterPress(e, async () => await editMedium(medium, selected, token))} onChange={(e) => setDataTSar(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {medium.condicao !== selected.condicao && medium.condicao !== 'Afastado' ?
                        <ModalInputContainer>
                            <label>Data de {medium.condicao === 'Ativo' ? 'retorno à doutrina' : medium.condicao === 'Entregou as Armas' ? 'entrega das armas' : medium.condicao === 'Desencarnado' ? 'desencarne' : ''}</label>
                            <input type="date" value={dataCondicao} onKeyUp={(e) => handleEnterPress(e, async () => await editMedium(medium, selected, token))} onChange={(e) => setDataCondicao(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {medium.templo !== selected.templo ?
                        <ModalInputContainer>
                            <label>Data de transferência de templo</label>
                            <input type="date" value={dataTransf} onKeyUp={(e) => handleEnterPress(e, async () => await editMedium(medium, selected, token))} onChange={(e) => setDataTransf(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={closeModal}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={async () => await editMedium(medium, selected, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default EditMedium