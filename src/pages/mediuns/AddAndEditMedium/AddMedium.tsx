import { useContext, useState, useEffect } from "react";
import { ListContext } from "src/contexts/ListContext";
import { Divider, FieldContainer, FieldContainerBox, GridContainer, GridDatesContainer, InputContainer, MainContent, MainInfoContainer, Observations, PersonalCard, PhotoContainer, SectionTitle } from "./styles";
import { ICavaleiro, IEstado, IFalange, IMedium, IMentor, ITemplo } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { MediumContext } from "src/contexts/MediumContext";
import { formatCep, formatCpf, formatInputText, formatPhoneNumber, handleEnterPress } from "src/utilities/functions";
import { Alert } from "src/utilities/popups";
import axios from "axios";
import { validateMedium } from "src/utilities/validations";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultAdj, defaultCavaleiro, defaultMedium, defaultMentor } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import { Modal, ModalButton, ModalContent, ModalInputContainer, ModalTitle } from "src/components/Modal/modal";
import MainContainer from "src/components/MainContainer/MainContainer";
import { NavigateButton } from "src/components/buttons/buttons";

function AddMedium() {
    const { templos, estados, adjuntos, coletes, classMest, falMest, povos, falMiss, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao } = useContext(ListContext);
    const { token } = useContext(UserContext);
    const { mediuns, loadMedium, convertMediumToSend, setComponentes, uploadImage } = useContext(MediumContext);

    const [newMedium, setNewMedium] = useState(defaultMedium);
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

    const now = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();

    useEffect(() => {
        console.log(newMedium)
    }, [newMedium])

    useEffect(() => {
        switch (newMedium.sex) {
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
    }, [newMedium.sex, falMiss, turnoL, turnoT])

    useEffect(() => {
        switch (newMedium.sex.concat(newMedium.med)) {
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
    }, [newMedium.med, newMedium.sex, cavaleiros, classMest, classificacao, estrelas])

    const updateFalMiss = (value: number) => {
        updateProps('falMiss', value);
        if(newMedium.classMest) {
            if(newMedium.sex.concat(newMedium.med) === 'MasculinoDoutrinador') {
                if(newMedium.classMest.includes('Mestre Sol')) {
                    if(value === 6) {updateProps('classMest', 'Mestre Sol Mago')}
                    else if(value === 7) {updateProps('classMest', 'Mestre Sol Príncipe Maya')}
                    else {updateProps('classMest', 'Mestre Sol')}
                }
                if(newMedium.classMest.includes('Mestre Luz')) {
                    if(value === 6) {updateProps('classMest', 'Mestre Luz Mago')}
                    else if(value === 7) {updateProps('classMest', 'Mestre Luz Príncipe Maya')}
                    else {updateProps('classMest', 'Mestre Luz')}
                }
            }
            if(newMedium.sex.concat(newMedium.med) === 'MasculinoApará') {
                if(value === 6) {updateProps('classMest', 'Mestre Lua Mago')}
                else if(value === 7) {updateProps('classMest', 'Mestre Lua Príncipe Maya')}
                else {updateProps('classMest', 'Mestre Lua')}
            }
            if(newMedium.sex.concat(newMedium.med) === 'FemininoDoutrinador') {
                if(value === 1 || value === 2) {updateProps('classMest', 'Ninfa Sol Nityama')}
                else if(value === 4) {updateProps('classMest', 'Ninfa Sol Grega')}
                else if(value === 5) {updateProps('classMest', 'Ninfa Sol Maya')}
                else {updateProps('classMest', 'Ninfa Sol')}
            }
            if(newMedium.sex.concat(newMedium.med) === 'FemininoApará') {
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
        if((value === 'Ninfa Sol' || value === 'Ninfa Lua') && [1, 2, 4, 5].includes(newMedium.falMiss)) {
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
        }
    };

    useEffect(() => {
        if (photo) {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
        } else {
            setPreview(null);
        }
    }, [photo]);

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
            if(newMedium.sex === 'Masculino') {
                updateProps('herdeiro', dropMes.medium_id)
            } else if (newMedium.sex === 'Feminino') {
                updateProps('mestre', dropMes.medium_id)
            }
        } else {
            updateProps('mestre', 0)
        }
    }, [dropMes, newMedium.sex])

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
        const cepNumber = newMedium.cep.replace(/\D/g,'')
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
        setNewMedium((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };

    const resetNewMedium = () => {
        setNewMedium(defaultMedium);
        setTSol(false);
        setSearchMin('');
        setSearchCav('');
        setSearchOldCav('');
        setSearchGuia('');
        setSearchMes('');
        setSearchNin('');
        setSearchPad('');
        setSearchMad('');
        setSearchAfi('');
        setSearchPres('');
        setDropPres(defaultAdj);
        setDropMin(defaultMentor);
        setDropCav(defaultCavaleiro);
        setDropOldCav(defaultCavaleiro);
        setDropGuia(defaultMentor);
        setDropMes(defaultMedium);
        setDropNin(defaultMedium);
        setDropPad(defaultMedium);
        setDropMad(defaultMedium);
        setDropAfi(defaultMedium);
        setPhoto(null);
        setPreview(null);
    }

    const generateEvents = async (newMedium: IMedium, id: number, token: string) => {
        try {
            if (dataDevas) {
                const newEvento = {
                    medium: id,
                    data: dataDevas,
                    mensagem: `Consagração de ${newMedium.sex === 'Masculino' ? 'Filho' : newMedium.sex === 'Feminino' ? 'Filha' : ''} de Devas`,
                    tipo: 'Outras Consagrações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (dataJanda) {
                const newEvento = {
                    medium: id,
                    data: dataJanda,
                    mensagem: 'Consagração de Janda',
                    tipo: 'Outras Consagrações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.trinoSol && dataTSol) {
                const newEvento = {
                    medium: id,
                    data: dataTSol,
                    mensagem: `Consagração de Trino Solitário ${newMedium.trinoSol}`,
                    tipo: 'Trino Solitário',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.trinoSar && newMedium.herdeiro && dataTSar) {
                const newEvento = {
                    medium: id,
                    data: dataTSar,
                    mensagem: `Consagração de Trino Sardyos - Herdeiro do Adj. ${ministros.find((m: IMentor) => m.id === mediuns.find((item: IMedium) => item.medium_id === newMedium.herdeiro)?.ministro)?.nome} Mestre ${mediuns.find((item: IMedium) => item.medium_id === newMedium.herdeiro)?.nomeEmissao}`,
                    tipo: 'Trino Sardyos',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.classif && newMedium.dtClassif) {
                const newEvento = {
                    medium: id,
                    data: newMedium.dtClassif,
                    mensagem: `Classificação de ${newMedium.classif}`,
                    tipo: 'Classificações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            if (newMedium.oldClassif && newMedium.oldDtClassif) {
                const newEvento = {
                    medium: id,
                    data: newMedium.oldDtClassif,
                    mensagem: `Classificação de ${newMedium.oldClassif}`,
                    tipo: 'Classificações',
                    observ: ''
                };
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
        } catch (error) {
            console.error('Erro ao adicionar eventos na linha do tempo', error);
        }
        closeModal();
    }

    const addMedium = async (medium: IMedium, token: string) => {
        const mediumObj = convertMediumToSend(medium)
        const {medium_id, ...newMediumObj} = mediumObj;
        try {
            const response = await api.post('/medium/create', newMediumObj, {headers:{Authorization: token}})
            const { medium_id } = response.data;
            await uploadImage(medium_id, newMediumObj.med, token, photo);
            await setComponentes({...medium, medium_id}, token);
            await generateEvents(medium, medium_id, token);
            Alert('Médium adicionado com sucesso', 'success');
            resetNewMedium();
            await loadMedium(token);
            navigate('/mediuns/consulta');
        } catch (error) {
            console.log('Não foi possível adicionar o médium', error);
            Alert('Não foi possível adicionar o médium', 'error');
        }
    }

    const handleAddMedium = async (newMedium: IMedium, token: string) => {
        if (newMedium.devas || newMedium.janda || newMedium.trinoSol || newMedium.trinoSar) {
            setShowModal(true);
        } else {
            await addMedium(newMedium, token);
        }
    }

    const closeModal = () => {
        setDataDevas('');
        setDataJanda('');
        setDataTSol('');
        setDataTSar('');
        setShowModal(false);
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <PersonalCard>
                    <MainContent>
                        <MainInfoContainer>
                            <SectionTitle>Novo Médium</SectionTitle>
                            <FieldContainer>
                                <label>Nome Médium: </label>
                                <input type="text" value={newMedium.nome} onChange={(e) => updateProps('nome', formatInputText(e.target.value))}/>
                            </FieldContainer>
                            <GridContainer>
                                <label>Sexo: </label>
                                <select
                                    value={newMedium.sex}
                                    onChange={(e) => {
                                        updateProps('sex', e.target.value);
                                        updateProps('classMest', '');
                                        updateProps('falMiss', 0);
                                        updateProps('turnoLeg', '');
                                        updateProps('turnoTrab', '');
                                        updateProps('presidente', '');
                                        updateProps('trinoSol', '');
                                        updateProps('trinoSar', false);
                                        updateProps('classif', '');
                                        updateProps('ministro', 0);
                                        updateProps('cavaleiro', 0);
                                        updateProps('oldCavaleiro', 0);
                                        updateProps('guia', 0);
                                        updateProps('estrela', '');
                                        updateProps('dtClassif', '');
                                        updateProps('herdeiro', 0);
                                        updateProps('madrinha', 0);
                                        updateProps('padrinho', 0);
                                        updateProps('ninfa', 0);
                                        updateProps('mestre', 0);
                                        updateProps('afilhado', 0);
                                        updateProps('comando', '');
                                        updateProps('janda', false);
                                    }}
                                >
                                    <option value={''}></option>
                                    <option value={'Feminino'}>Feminino</option>
                                    <option value={'Masculino'}>Masculino</option>
                                </select>
                                <label>Mediunidade: </label>
                                <select value={newMedium.med} onChange={(e) => {
                                    updateProps('med', e.target.value);
                                    updateProps('cavaleiro', 0);
                                    updateProps('oldCavaleiro', 0);
                                    updateProps('cor', '');
                                    updateProps('oldCor', '');
                                    updateProps('estrela', '');
                                    updateProps('classif', '');
                                    updateProps('madrinha', 0);
                                    updateProps('padrinho', 0);
                                    updateProps('ninfa', 0);
                                    updateProps('mestre', 0);
                                    updateProps('afilhado', 0);
                                    updateProps('comando', '');
                                    updateProps('presidente', '');
                                    updateProps('janda', false);
                                    }}
                                >
                                    <option value={''}></option>
                                    <option value={'Apará'}>Apará</option>
                                    <option value={'Doutrinador'}>Doutrinador</option>
                                </select>
                                <label>Templo: </label>
                                <select value={newMedium.templo} onChange={(e) => updateProps('templo', Number(e.target.value))}>
                                    <option value={0}></option>
                                    {templos.map((item: ITemplo, index: number) => (
                                        <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                                    ))}
                                </select>
                                <label>Condição Atual: </label>
                                <select value={newMedium.condicao} onChange={(e) => updateProps('condicao', e.target.value)}>
                                    <option value={'Ativo'}>Ativo</option>
                                    <option value={'Afastado'}>Afastado</option>
                                    <option value={'Entregou as Armas'}>Entregou as Armas</option>
                                    <option value={'Desencarnado'}>Desencarnado</option>
                                </select>
                            </GridContainer>
                        </MainInfoContainer>
                        <PhotoContainer photo={preview}>
                            {photo? '' : 'Clique aqui para adicionar uma foto'}
                            <input type="file" accept="image/*" onChange={imageUpdate} />
                        </PhotoContainer>
                    </MainContent>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados Pessoais</SectionTitle>
                    <GridContainer>
                        <label>Data Nascimento: </label>
                        <input type="date" value={newMedium.dtNasc} onChange={(e) => updateProps('dtNasc', e.target.value)} max={now} />
                        <label>Profissão: </label>
                        <input type="text" value={newMedium.profissao} onChange={(e) => updateProps('profissao', formatInputText(e.target.value))}/>
                        <label>RG: </label>
                        <input type="text" value={newMedium.rg} onChange={(e) => updateProps('rg', e.target.value)}/>
                        <label>CPF: </label>
                        <input type="text" maxLength={14} value={newMedium.cpf} onChange={(e) => updateProps('cpf', formatCpf(e.target.value))}/>
                        <label>Mãe: </label>
                        <input type="text" value={newMedium.mae} onChange={(e) => updateProps('mae', formatInputText(e.target.value))}/>
                        <label>Pai: </label>
                        <input type="text" value={newMedium.pai} onChange={(e) => updateProps('pai', formatInputText(e.target.value))}/>
                        <label>Natural de: </label>
                        <input type="text" value={newMedium.natur} onChange={(e) => updateProps('natur', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={newMedium.naturUF} onChange={(e) => updateProps('naturUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Estado Civil: </label>
                        <select value={newMedium.estCivil} onChange={(e) => updateProps('estCivil', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                        <label>Cônjuge: </label>
                        <input type="text" value={newMedium.conjuge} onChange={(e) => updateProps('conjuge', formatInputText(e.target.value))}/>
                        <label>CEP: </label>
                        <input type="text" maxLength={9} value={newMedium.cep} onChange={(e) => updateProps('cep', formatCep(e.target.value))} onBlur={fillAddressByCep}/>
                        <label>Endereço: </label>
                        <input type="text" value={newMedium.endereco} onChange={(e) => updateProps('endereco', formatInputText(e.target.value))}/>
                        <label>Número: </label>
                        <input type="text" value={newMedium.endNumero} onChange={(e) => updateProps('endNumero', e.target.value)}/>
                        <label>Complemento: </label>
                        <input type="text" value={newMedium.endCompl} onChange={(e) => updateProps('endCompl', formatInputText(e.target.value))}/>
                        <label>Bairro: </label>
                        <input type="text" value={newMedium.endBairro} onChange={(e) => updateProps('endBairro', formatInputText(e.target.value))}/>
                        <label>Cidade: </label>
                        <input type="text" value={newMedium.endCidade} onChange={(e) => updateProps('endCidade', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={newMedium.endUF} onChange={(e) => updateProps('endUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Telefone 1: </label>
                        <input type="tel" maxLength={15} value={newMedium.telefone1} onChange={(e) => updateProps('telefone1', formatPhoneNumber(e.target.value))}/>
                        <label>Telefone 2: </label>
                        <input type="tel" maxLength={15} value={newMedium.telefone2} onChange={(e) => updateProps('telefone2', formatPhoneNumber(e.target.value))}/>
                        <label>E-mail: </label>
                        <input type="email" value={newMedium.email} onChange={(e) => updateProps('email', e.target.value.toLowerCase())}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Datas Mediúnicas</SectionTitle>
                    <GridDatesContainer>
                        <label>Data Ingresso: </label>
                        <input type="date" value={newMedium.dtIngresso} onChange={(e) => updateProps('dtIngresso', e.target.value)} min={newMedium.dtNasc}  max={now} />
                        <label>Data Emplacamento: </label>
                        <input type="date" value={newMedium.dtEmplac} onChange={(e) => updateProps('dtEmplac', e.target.value)} min={newMedium.dtIngresso} max={now} disabled={!newMedium.dtIngresso} />
                        <label>Data Iniciação: </label>
                        <input type="date" value={newMedium.dtIniciacao} onChange={(e) => updateProps('dtIniciacao', e.target.value)} min={newMedium.dtEmplac} max={now} disabled={!newMedium.dtEmplac} />
                        <label>Data Elevação: </label>
                        <input type="date" value={newMedium.dtElevacao} onChange={(e) => updateProps('dtElevacao', e.target.value)} min={newMedium.dtIniciacao} max={now} disabled={!newMedium.dtIniciacao} />
                        <label>Data Centúria: </label>
                        <input type="date" value={newMedium.dtCenturia} onChange={(e) => updateProps('dtCenturia', e.target.value)} min={newMedium.dtElevacao} max={now} disabled={!newMedium.dtElevacao && !newMedium.oldDtElevacao} />
                        <label>Data Sétimo: </label>
                        <input type="date" value={newMedium.dtSetimo} onChange={(e) => updateProps('dtSetimo', e.target.value)} min={newMedium.dtCenturia} max={now} disabled={!newMedium.dtCenturia} />
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
                        <select value={newMedium.temploOrigem} onChange={(e) => updateProps('temploOrigem', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Colete Nº: </label>
                        <select value={newMedium.colete} onChange={(e) => updateProps('colete', Number(e.target.value))}>
                            <option value={0}></option>
                            {coletes.map((item: number, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Classificação: </label>
                        <select value={newMedium.classMest} disabled={!newMedium.dtElevacao} onChange={(e) => updateClassMest(e.target.value)}>
                            <option value={''}></option>
                            {listClassMest.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Falange Mestrado: </label>
                        <select value={newMedium.falMest} disabled={!newMedium.dtElevacao} onChange={(e) => updateProps('falMest', e.target.value)}>
                            <option value={''}></option>
                            {falMest.completo.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Povo: </label>
                        <select value={newMedium.povo} disabled={!newMedium.dtCenturia} onChange={(e) => updateProps('povo', e.target.value)}>
                            <option value={''}></option>
                            {povos.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Falange Missionária: </label>
                        <select
                            value={newMedium.falMiss}
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
                        <select value={newMedium.adjDevas} disabled={!newMedium.falMiss} onChange={(e) => updateProps('adjDevas', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Adejã'}>Adejã</option>
                            <option value={'Alufã'}>Alufã</option>
                        </select>
                        <label>Turno: </label>
                        <select value={newMedium.turnoLeg} disabled={!newMedium.dtCenturia} onChange={(e) => updateProps('turnoLeg', e.target.value)}>
                            <option value={''}></option>
                            {listTurnoL.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Turno Trabalho: </label>
                        <select value={newMedium.turnoTrab} disabled={!newMedium.dtCenturia} onChange={(e) => updateProps('turnoTrab', e.target.value)}>
                            <option value={''}></option>
                            {listTurnoT.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </GridContainer>
                    {newMedium.sex==='Masculino' && newMedium.dtCenturia?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Ministro: </label>
                                <AutocompleteInput 
                                    label={(option) => option.nome}
                                    disabled={newMedium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' || newMedium.classif === '5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || newMedium.classif === ''}
                                    default={defaultMentor}
                                    options={ministros}
                                    equality={(option, value) => option.id === value.id}
                                    value={dropMin}
                                    setValue={setDropMin}
                                    inputValue={searchMin}
                                    setInputValue={setSearchMin}
                                />
                                <label>Data Ministro: </label>
                                <input type="date" value={newMedium.dtMentor} onChange={(e) => updateProps('dtMentor', e.target.value)} min={newMedium.dtCenturia}  max={now} disabled={newMedium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' || newMedium.classif === '5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || newMedium.classif === ''} />
                                <label>Cavaleiro: </label>
                                <AutocompleteInput 
                                    label={(option) => option.nome}
                                    disabled={newMedium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' || newMedium.classif === '5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || newMedium.classif === ''}
                                    default={defaultCavaleiro}
                                    options={listCav}
                                    equality={(option, value) => option.id === value.id}
                                    value={dropCav}
                                    setValue={setDropCav}
                                    inputValue={searchCav}
                                    setInputValue={setSearchCav}
                                />
                                <label>Cor do Cavaleiro: </label>
                                <select value={newMedium.cor} onChange={(e) => updateProps('cor', e.target.value)} disabled={newMedium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' || newMedium.classif === '5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || newMedium.classif === ''} >
                                    {newMedium.med==='Doutrinador'?
                                        <>
                                            <option value={''}></option>
                                            <option value={'Verde'}>Verde</option>
                                        </>
                                    : newMedium.med==='Apará'?
                                        <>
                                            <option value={''}></option>
                                            <option value={'Verde'}>Verde</option>
                                            <option value={'Vermelho'}>Vermelho</option>
                                        </>
                                    : <option value={''}></option>}
                                </select>
                            </GridContainer>
                            <InputContainer>
                                <FieldContainer>
                                    <label>Classificação Atual: </label>
                                    <select value={newMedium.classif} onChange={(e) => {
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
                                    <input type="date" value={newMedium.dtClassif} onChange={(e) => updateProps('dtClassif', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                                </FieldContainer>
                            </InputContainer>
                        </>
                    : newMedium.sex==='Feminino' && newMedium.dtCenturia?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Estrela: </label>
                                <select value={newMedium.estrela} onChange={(e) => updateProps('estrela', e.target.value)}>
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
                                <select value={newMedium.cor} onChange={(e) => updateProps('cor', e.target.value)}>
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
                                <input type="date" value={newMedium.dtMentor} onChange={(e) => updateProps('dtMentor', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                            </GridContainer>
                        </>
                    : ''}
                    {newMedium.med==='Doutrinador'?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                            <label>Data Teste: </label>
                                <input type="date" value={newMedium.dtTest} onChange={(e) => updateProps('dtTest', e.target.value)} min={newMedium.dtNasc}  max={now}/>
                                <label>Princesa: </label>
                                <select value={newMedium.princesa} onChange={(e) => updateProps('princesa', e.target.value)}>
                                    <option value={''}></option>
                                    {princesas.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <label>Nome na emissão: </label>
                                <input type="text" value={newMedium.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', formatInputText(e.target.value))}/>
                            </GridContainer>
                        </>
                    : newMedium.med==='Apará'?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Data Teste: </label>
                                <input type="date" value={newMedium.dtTest} onChange={(e) => updateProps('dtTest', e.target.value)} min={newMedium.dtNasc}  max={now}/>
                                <label>Preto Velho: </label>
                                <input type="text" value={newMedium.pretovelho} onChange={(e) => updateProps('pretovelho', formatInputText(e.target.value))}/>
                                <label>Caboclo: </label>
                                <input type="text" value={newMedium.caboclo} onChange={(e) => updateProps('caboclo', formatInputText(e.target.value))}/>
                                <label>Médico: </label>
                                <input type="text" value={newMedium.medico} onChange={(e) => updateProps('medico', formatInputText(e.target.value))}/>
                                <label>Nome na emissão: </label>
                                <input type="text" value={newMedium.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', formatInputText(e.target.value))}/>
                            </GridContainer> 
                        </>
                    : ''}
                </PersonalCard>
                <PersonalCard hide={newMedium.sex.concat(newMedium.med).length < 10 || !newMedium.dtCenturia}>
                    <SectionTitle>Povo</SectionTitle>
                    {newMedium.sex.concat(newMedium.med)==='MasculinoDoutrinador'?
                        <GridContainer>
                            <label>Escrava: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Apará' && item.sex === 'Feminino')}
                                disabledOptions={(option: IMedium) => option.mestre !== 0}
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
                                disabledOptions={(option: IMedium) => option.afilhado !== 0}
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
                                disabledOptions={(option: IMedium) => option.afilhado !== 0}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropPad}
                                setValue={setDropPad}
                                inputValue={searchPad}
                                setInputValue={setSearchPad}
                            />
                        </GridContainer>
                    : newMedium.sex.concat(newMedium.med)==='MasculinoApará'? 
                        <GridContainer>
                            <label>Afilhado: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')}
                                disabledOptions={(option: IMedium) => option.padrinho !== 0}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropAfi}
                                setValue={setDropAfi}
                                inputValue={searchAfi}
                                setInputValue={setSearchAfi}
                            />
                            <label>Ninfa Sol: </label>
                            <input disabled />
                        </GridContainer>
                    : newMedium.sex.concat(newMedium.med)==='FemininoDoutrinador'?
                        <GridContainer>
                            <label>Afilhado: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')}
                                disabledOptions={(option: IMedium) => option.madrinha !== 0}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropAfi}
                                setValue={setDropAfi}
                                inputValue={searchAfi}
                                setInputValue={setSearchAfi}
                            />
                            <label>Ajanã: </label>
                            <input disabled />
                        </GridContainer>
                    : newMedium.sex.concat(newMedium.med)==='FemininoApará'?
                        <GridContainer>
                            <label>Mestre: </label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')}
                                disabledOptions={(option: IMedium) => option.ninfa !== 0}
                                equality={(option, value) => option.medium_id === value.medium_id}
                                value={dropMes}
                                setValue={setDropMes}
                                inputValue={searchMes}
                                setInputValue={setSearchMes}
                            />
                        </GridContainer>
                    : <div></div>}
                </PersonalCard>
                <PersonalCard hide={newMedium.sex.concat(newMedium.med).length < 10 || !newMedium.dtCenturia}>
                    <SectionTitle>Cargos e Funções</SectionTitle>
                    {newMedium.sex.concat(newMedium.med)==='MasculinoDoutrinador'?
                        <>
                            <InputContainer>
                                <FieldContainer>
                                    <label>Comando: </label>
                                    <select value={newMedium.comando} onChange={(e) => updateProps('comando', e.target.value)}>
                                        <option value={''}></option>
                                        <option value={'Comandante'}>Comandante</option>
                                        <option value={'Janatã'}>Comandante Janatã</option>
                                        <option value={'Lança'}>Lança Vermelha</option>
                                        <option value={'JanatãLança'}>Comandante Janatã / Lança Vermelha</option>
                                    </select>
                                </FieldContainer>
                                <FieldContainer>        
                                    <label>Presidência: </label>
                                    <select value={newMedium.presidente} disabled={!newMedium.classif.includes('Adjunto Koatay 108 Herdeiro Triada Harpásios')} onChange={(e) => {
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
                                </FieldContainer>
                            </InputContainer>
                            <div style={{display: 'flex', justifyContent: 'center', gap: '10px 30px', flexWrap: 'wrap'}}>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={newMedium.devas} checked={newMedium.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                                    <label>Recepcionista</label>
                                </FieldContainerBox>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={newMedium.recepcao} checked={newMedium.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                                    <label>Filho de Devas</label>
                                </FieldContainerBox>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={!newMedium.falMiss} checked={newMedium.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                                    <label>Regente</label>
                                </FieldContainerBox>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <FieldContainerBox>
                                        <input type="checkBox" checked={tSol} disabled={newMedium.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000' || newMedium.presidente === 'Presidente'} onChange={(e) => setTSol(e.target.checked)}/>
                                        <label>Trino Solitário</label>
                                    </FieldContainerBox> 
                                    <FieldContainer width="100px">
                                        <select disabled={!tSol} value={newMedium.trinoSol} onChange={(e) => updateProps('trinoSol', e.target.value)}>
                                            <option value={''}></option>
                                            <option value={'Juremá'}>Juremá</option>
                                            <option value={'Iramar'}>Iramar</option>
                                        </select>
                                    </FieldContainer>
                                </div>
                            </div>
                            {newMedium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' || newMedium.presidente === 'Presidente' ? '' : 
                                <>
                                    <Divider></Divider>
                                    <InputContainer herdeiro>
                                        <FieldContainerBox>
                                            <input type="checkBox" checked={newMedium.trinoSar} onChange={(e) => updateProps('trinoSar', e.target.checked)} />
                                            <label>Trino Sardyos</label>
                                        </FieldContainerBox>
                                        <div style={{display: 'flex', gap: '10px', width: '100%'}}>
                                            <FieldContainer>
                                                <label>Herdeiro de: </label>
                                                <AutocompleteInput 
                                                    label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                                    default={defaultMedium}
                                                    options={mediuns.filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000')}
                                                    disabled={!newMedium.trinoSar}
                                                    equality={(option, value) => option.medium_id === value.medium_id}
                                                    value={dropMes}
                                                    setValue={setDropMes}
                                                    inputValue={searchMes}
                                                    setInputValue={setSearchMes}
                                                />
                                            </FieldContainer>
                                            <FieldContainerBox>
                                                <input type="checkBox" disabled={!newMedium.trinoSar} checked={newMedium.filho} onChange={(e) => updateProps('filho', e.target.checked)}/>
                                                <label>Filho?</label>
                                            </FieldContainerBox>
                                        </div> 
                                    </InputContainer>
                                </>
                            }
                        </>
                    : newMedium.sex.concat(newMedium.med)==='MasculinoApará'? 
                        <>
                            <div style={{display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap'}}>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={newMedium.devas} checked={newMedium.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                                    <label>Recepcionista</label>
                                </FieldContainerBox>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={newMedium.recepcao} checked={newMedium.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                                    <label>Filho de Devas</label>
                                </FieldContainerBox>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={!newMedium.falMiss} checked={newMedium.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                                    <label>Regente</label>
                                </FieldContainerBox>
                            </div>
                            <Divider></Divider>
                            <InputContainer herdeiro>
                                <FieldContainerBox>
                                    <input type="checkBox" checked={newMedium.trinoSar} onChange={(e) => updateProps('trinoSar', e.target.checked)} />
                                    <label>Trino Sardyos</label>
                                </FieldContainerBox>
                                <div style={{display: 'flex', gap: '10px', width: '100%'}}>
                                    <FieldContainer>
                                        <label>Herdeiro de: </label>
                                        <AutocompleteInput 
                                            label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                            default={defaultMedium}
                                            options={mediuns.filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000')}
                                            disabled={!newMedium.trinoSar}
                                            equality={(option, value) => option.medium_id === value.medium_id}
                                            value={dropMes}
                                            setValue={setDropMes}
                                            inputValue={searchMes}
                                            setInputValue={setSearchMes}
                                        />
                                    </FieldContainer>
                                    <FieldContainerBox>
                                        <input type="checkBox" disabled={!newMedium.trinoSar} checked={newMedium.filho} onChange={(e) => updateProps('filho', e.target.checked)}/>
                                        <label>Filho?</label>
                                    </FieldContainerBox>
                                </div> 
                            </InputContainer>
                        </>
                    : newMedium.sex.concat(newMedium.med)==='FemininoDoutrinador'?
                        <div style={{display: 'flex', justifyContent:'center', gap: '10px', flexWrap: 'wrap'}}>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={newMedium.devas} checked={newMedium.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                                <label>Recepcionista</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={newMedium.recepcao} checked={newMedium.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                                <label>Filha de Devas</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={!newMedium.falMiss} checked={newMedium.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                                <label>Regente</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={newMedium.falMiss !== 23 && newMedium.falMiss !== 8} checked={newMedium.janda} onChange={(e) => updateProps('janda', e.target.checked)}/>
                                <label>Janda</label>
                            </FieldContainerBox>
                        </div>
                    : newMedium.sex.concat(newMedium.med)==='FemininoApará'?
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap'}}>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={newMedium.devas} checked={newMedium.recepcao} onChange={(e) => updateProps('recepcao', e.target.checked)}/>
                                <label>Recepcionista</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={newMedium.recepcao} checked={newMedium.devas} onChange={(e) => updateProps('devas', e.target.checked)}/>
                                <label>Filha de Devas</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={!newMedium.falMiss} checked={newMedium.regente} onChange={(e) => updateProps('regente', e.target.checked)}/>
                                <label>Regente</label>
                            </FieldContainerBox>
                        </div>
                    : <div></div>}
                </PersonalCard>
                <PersonalCard hide={!newMedium.med}>
                    <SectionTitle>Dados como {newMedium.med === 'Doutrinador' ? 'Apará' : newMedium.med === 'Apará' ? 'Doutrinador' : ''}</SectionTitle>
                    <GridContainer>
                        <label>Data Teste: </label>
                        <input type="date" value={newMedium.oldDtTest} onChange={(e) => updateProps('oldDtTest', e.target.value)} min={newMedium.dtNasc}  max={now} />
                        <label>Data Emplacamento: </label>
                        <input type="date" value={newMedium.oldDtEmplac} onChange={(e) => updateProps('oldDtEmplac', e.target.value)} min={newMedium.oldDtTest} max={now} disabled={!newMedium.oldDtTest} />
                        <label>Data Iniciação: </label>
                        <input type="date" value={newMedium.oldDtIniciacao} onChange={(e) => updateProps('oldDtIniciacao', e.target.value)} min={newMedium.oldDtEmplac} max={now} disabled={!newMedium.oldDtEmplac} />
                        <label>Data Elevação: </label>
                        <input type="date" value={newMedium.oldDtElevacao} onChange={(e) => updateProps('oldDtElevacao', e.target.value)} min={newMedium.oldDtIniciacao} max={now} disabled={!newMedium.oldDtIniciacao} />
                        {newMedium.sex === 'Masculino' ?
                            <>
                                <label>Classificação: </label>
                                <select value={newMedium.oldClassMest} disabled={!newMedium.oldDtElevacao} onChange={(e) => updateProps('oldClassMest', e.target.value)}>
                                    <option value={''}></option>
                                    {oldListClassMest.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <label>Cavaleiro: </label>
                                <AutocompleteInput 
                                    label={(option) => option.nome}
                                    disabled={!newMedium.dtCenturia}
                                    default={defaultCavaleiro}
                                    options={oldListCav}
                                    equality={(option, value) => option.id === value.id}
                                    value={dropOldCav}
                                    setValue={setDropOldCav}
                                    inputValue={searchOldCav}
                                    setInputValue={setSearchOldCav}
                                />
                                <label>Cor do Cavaleiro: </label>
                                <select value={newMedium.oldCor} disabled={newMedium.oldCavaleiro === 0} onChange={(e) => updateProps('oldCor', e.target.value)}>
                                    {newMedium.med==='Apará'?
                                        <>
                                            <option value={''}></option>
                                            <option value={'Verde'}>Verde</option>
                                        </>
                                    : newMedium.med==='Doutrinador'?
                                        <>
                                            <option value={''}></option>
                                            <option value={'Verde'}>Verde</option>
                                            <option value={'Vermelho'}>Vermelho</option>
                                        </>
                                    : <option value={''}></option>}
                                </select>
                                <label>Data Cavaleiro: </label>
                                <input type="date" value={newMedium.oldDtMentor} disabled={newMedium.oldCavaleiro === 0} onChange={(e) => updateProps('oldDtMentor', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                                <label>Última Classif.: </label>
                                <select value={newMedium.oldClassif} disabled={!newMedium.dtCenturia} onChange={(e) => updateProps('oldClassif', e.target.value)}>
                                    <option value={''}></option>
                                    {oldListClass.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <label>Data: </label>
                                <input type="date" value={newMedium.oldDtClassif} onChange={(e) => updateProps('oldDtClassif', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                                {newMedium.med === 'Apará'?
                                    <>
                                        <label>Trino Solitário: </label>
                                        <select disabled={newMedium.oldClassif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000' || newMedium.presidente === 'Presidente'} value={newMedium.trinoSol} onChange={(e) => updateProps('trinoSol', e.target.value)}>
                                            <option value={''}></option>
                                            <option value={'Juremá'}>Juremá</option>
                                            <option value={'Iramar'}>Iramar</option>
                                        </select>
                                    </>
                                : ''}
                            </>
                        : newMedium.sex === 'Feminino' ?
                            <>
                                <label>Estrela: </label>
                                <select value={newMedium.oldEstrela} onChange={(e) => updateProps('oldEstrela', e.target.value)}>
                                    <option value={''}></option>
                                    {oldListEst.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select> 
                            </>
                        : <div></div>}
                        {newMedium.med === 'Doutrinador' ?
                            <>
                                <label>Preto Velho: </label>
                                <input type="text" value={newMedium.pretovelho} onChange={(e) => updateProps('pretovelho', formatInputText(e.target.value))}/>
                                <label>Caboclo: </label>
                                <input type="text" value={newMedium.caboclo} onChange={(e) => updateProps('caboclo', formatInputText(e.target.value))}/>
                                <label>Médico: </label>
                                <input type="text" value={newMedium.medico} onChange={(e) => updateProps('medico', formatInputText(e.target.value))}/>
                            </>
                        : newMedium.med === 'Apará' ?
                            <>
                                <label>Princesa: </label>
                                <select value={newMedium.princesa} onChange={(e) => updateProps('princesa', e.target.value)}>
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
                    <Observations value={newMedium.observ} onChange={(e) => updateProps('observ', e.target.value)}/>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" color="red" onClick={() => resetNewMedium()}>Cancelar</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validateMedium(newMedium, async () => await handleAddMedium(newMedium, token))}>Cadastrar</NavigateButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Datas</ModalTitle>
                    {newMedium.devas ?
                        <ModalInputContainer>
                            <label>Data da consagração de Devas</label>
                            <input type="date" value={dataDevas} onKeyUp={(e) => handleEnterPress(e, async () => await addMedium(newMedium, token))} onChange={(e) => setDataDevas(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {newMedium.janda ?
                        <ModalInputContainer>
                            <label>Data da consagração de Janda</label>
                            <input type="date" value={dataJanda} onKeyUp={(e) => handleEnterPress(e, async () => await addMedium(newMedium, token))} onChange={(e) => setDataJanda(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {newMedium.trinoSol ?
                        <ModalInputContainer>
                            <label>Data da consagração de Trino Solitário</label>
                            <input type="date" value={dataTSol} onKeyUp={(e) => handleEnterPress(e, async () => await addMedium(newMedium, token))} onChange={(e) => setDataTSol(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {newMedium.trinoSar ?
                        <ModalInputContainer>
                            <label>Data da consagração de Trino Sardyos</label>
                            <input type="date" value={dataTSar} onKeyUp={(e) => handleEnterPress(e, async () => await addMedium(newMedium, token))} onChange={(e) => setDataTSar(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={closeModal}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={async () => await addMedium(newMedium, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default AddMedium