import { useContext, useState, useEffect } from "react";
import { ListContext } from "src/contexts/ListContext";
import { Divider, FieldContainer, FieldContainerBox, GridContainer, GridDatesContainer, InputContainer, MainContainer, MainContent, MainInfoContainer, MediumButton, Observations, PersonalCard, PhotoContainer, PhotoPosition, SectionTitle } from "./styles";
import { IAdjunto, ICavaleiro, IEstado, IFalange, IMedium, IMentor, ITemplo } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { MediumContext } from "src/contexts/MediumContext";
import { formatCep, formatCpf, formatPhoneNumber } from "src/utilities/functions";
import { Alert, Confirm } from "src/utilities/popups";
import axios from "axios";
import { validateMedium } from "src/utilities/validations";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "src/utilities/Loading";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultCavaleiro, defaultMedium, defaultMentor } from "src/utilities/default";

function EditMedium() {
    const { templos, estados, adjuntos, coletes, classMest, falMest, povos, falMiss, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao, getData } = useContext(ListContext);
    const { token, getUser } = useContext(UserContext);
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
    const [dropMin, setDropMin] = useState(defaultMentor);
    const [dropCav, setDropCav] = useState(defaultCavaleiro);
    const [dropOldCav, setDropOldCav] = useState(defaultCavaleiro);
    const [dropGuia, setDropGuia] = useState(defaultMentor);
    const [dropMes, setDropMes] = useState(defaultMedium);
    const [dropNin, setDropNin] = useState(defaultMedium);
    const [dropPad, setDropPad] = useState(defaultMedium);
    const [dropMad, setDropMad] = useState(defaultMedium);
    const [dropAfi, setDropAfi] = useState(defaultMedium);
    const [searchMin, setSearchMin] = useState('');
    const [searchCav, setSearchCav] = useState('');
    const [searchOldCav, setSearchOldCav] = useState('');
    const [searchGuia, setSearchGuia] = useState('');
    const [searchMes, setSearchMes] = useState('');
    const [searchNin, setSearchNin] = useState('');
    const [searchPad, setSearchPad] = useState('');
    const [searchMad, setSearchMad] = useState('');
    const [searchAfi, setSearchAfi] = useState('');

    const now = new Date().toISOString().split('T')[0];

    const defineMedium = () => {
        const foundMedium: IMedium = mediuns.find((item: IMedium) => item.medium_id === Number(params.id));
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
    }
    
    const getInfo = async () => {
        try {
            await loadMedium(token);
            await getData(token);
            await getUser(token);
        } catch (error) {
            console.error('Erro ao buscar informações', error);
            Alert('Erro ao buscar informações', 'error');
        }
    }
    
    useEffect(() => {
        getInfo();
        window.scrollTo({top: 0});
    }, [])
    
    useEffect(() => {
        if(mediuns.length > 0){
            defineMedium();
        }
    }, [mediuns, params.id])
    
    useEffect(() => {
        console.log(medium)
        if(medium !== defaultMedium) {
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
                setListTurnoL([]);
        }
    }, [medium.sex, falMiss])

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
    }, [medium.med, medium.sex])

    useEffect(() => {
        if(medium.classMest) {
            if(medium.sex.concat(medium.med) === 'MasculinoDoutrinador') {
                if(medium.classMest.includes('Mestre Sol')) {
                    if(medium.falMiss === 6) {updateProps('classMest', 'Mestre Sol Mago')}
                    else if(medium.falMiss === 7) {updateProps('classMest', 'Mestre Sol Príncipe Maya')}
                    else {updateProps('classMest', 'Mestre Sol')}
                }
                if(medium.classMest.includes('Mestre Luz')) {
                    if(medium.falMiss === 6) {updateProps('classMest', 'Mestre Luz Mago')}
                    else if(medium.falMiss === 7) {updateProps('classMest', 'Mestre Luz Príncipe Maya')}
                    else {updateProps('classMest', 'Mestre Luz')}
                }
            }
            if(medium.sex.concat(medium.med) === 'MasculinoApará') {
                if(medium.falMiss === 6) {updateProps('classMest', 'Mestre Lua Mago')}
                else if(medium.falMiss === 7) {updateProps('classMest', 'Mestre Lua Príncipe Maya')}
                else {updateProps('classMest', 'Mestre Lua')}
            }
            if(medium.sex.concat(medium.med) === 'FemininoDoutrinador') {
                if(medium.falMiss === 1 || medium.falMiss === 2) {updateProps('classMest', 'Ninfa Sol Nityama')}
                else if(medium.falMiss === 4) {updateProps('classMest', 'Ninfa Sol Grega')}
                else if(medium.falMiss === 5) {updateProps('classMest', 'Ninfa Sol Maya')}
                else {updateProps('classMest', 'Ninfa Sol')}
            }
            if(medium.sex.concat(medium.med) === 'FemininoApará') {
                if(medium.falMiss === 1 || medium.falMiss === 2) {updateProps('classMest', 'Ninfa Lua Nityama')}
                else if(medium.falMiss === 4) {updateProps('classMest', 'Ninfa Lua Grega')}
                else if(medium.falMiss === 5) {updateProps('classMest', 'Ninfa Lua Maya')}
                else {updateProps('classMest', 'Ninfa Lua')}
            }
        }
    }, [medium.falMiss])

    useEffect(() => {
        if(medium.classMest === 'Mestre Sol' || medium.classMest === 'Mestre Luz' || medium.classMest === 'Mestre Lua') {
            updateProps('falMiss', 0);
        }
        if((medium.classMest === 'Ninfa Sol' || medium.classMest === 'Ninfa Lua') && [1, 2, 4, 5].includes(medium.falMiss)) {
            updateProps('falMiss', 0);
        }
        if(medium.classMest === 'Ninfa Sol Nityama' || medium.classMest === 'Ninfa Lua Nityama') {
            updateProps('falMiss', 1);
        }
        if(medium.classMest === 'Ninfa Sol Grega' || medium.classMest === 'Ninfa Lua Grega') {
            updateProps('falMiss', 4);
        }
        if(medium.classMest === 'Ninfa Sol Maya' || medium.classMest === 'Ninfa Lua Maya') {
            updateProps('falMiss', 5);
        }
        if(medium.classMest === 'Mestre Sol Mago' || medium.classMest === 'Mestre Luz Mago' || medium.classMest === 'Mestre Lua Mago') {
            updateProps('falMiss', 6);
        }
        if(medium.classMest === 'Mestre Sol Príncipe Maya' || medium.classMest === 'Mestre Luz Príncipe Maya' || medium.classMest === 'Mestre Lua Príncipe Maya') {
            updateProps('falMiss', 7);
        }
    }, [medium.classMest])

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
    }, [dropMes])

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

    const editMedium = async (newMedium: IMedium, oldMedium: IMedium, token: string) => {
        const newMediumObj = convertMediumToSend(newMedium);
        const oldMediumObj = convertMediumToSend(oldMedium);
        const changedFields = {} as any
        for (const key in newMediumObj){
            if (newMediumObj[key as keyof IMedium] !== oldMediumObj[key as keyof IMedium]){
                changedFields[key as keyof IMedium] = newMediumObj[key as keyof IMedium]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await Confirm('Tem certeza que quer editar este médium?', 'question', 'Cancelar', 'Confirmar', async () => {
                    await api.put('/medium/update', {medium_id: oldMediumObj.medium_id, ...changedFields}, {headers:{Authorization: token}})
                    if (newMediumObj.foto && newMediumObj.foto !== oldMediumObj.foto) {
                        await uploadImage(oldMediumObj.medium_id, token, photo);
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
                        await uploadImage(oldMediumObj.medium_id, token, photo)
                        console.log('foto editada')
                        Alert('Médium editado com sucesso', 'success');
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
                                <input type="text" value={medium.nome} onChange={(e) => updateProps('nome', e.target.value)}/>
                            </FieldContainer>
                            <GridContainer>
                                <label>Sexo: </label>
                                <span>{medium.sex}</span>
                                <label>Mediunidade: </label>
                                <span>{medium.med}</span>
                                <label>Templo: </label>
                                <select value={medium.templo} onChange={(e) => updateProps('templo', e.target.value)}>
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
                <PersonalCard>
                    <SectionTitle>Dados Pessoais</SectionTitle>
                    <GridContainer>
                        <label>Data Nascimento: </label>
                        <input type="date" value={medium.dtNasc} onChange={(e) => updateProps('dtNasc', e.target.value)} max={now} />
                        <label>Profissão: </label>
                        <input type="text" value={medium.profissao} onChange={(e) => updateProps('profissao', e.target.value)}/>
                        <label>RG: </label>
                        <input type="text" value={medium.rg} onChange={(e) => updateProps('rg', e.target.value)}/>
                        <label>CPF: </label>
                        <input type="text" maxLength={14} value={medium.cpf} onChange={(e) => updateProps('cpf', formatCpf(e.target.value))}/>
                        <label>Mãe: </label>
                        <input type="text" value={medium.mae} onChange={(e) => updateProps('mae', e.target.value)}/>
                        <label>Pai: </label>
                        <input type="text" value={medium.pai} onChange={(e) => updateProps('pai', e.target.value)}/>
                        <label>Natural de: </label>
                        <input type="text" value={medium.natur} onChange={(e) => updateProps('natur', e.target.value)}/>
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
                        <input type="text" value={medium.conjuge} onChange={(e) => updateProps('conjuge', e.target.value)}/>
                        <label>CEP: </label>
                        <input type="text" maxLength={9} value={medium.cep} onChange={(e) => updateProps('cep', formatCep(e.target.value))} onBlur={fillAddressByCep}/>
                        <label>Endereço: </label>
                        <input type="text" value={medium.endereco} onChange={(e) => updateProps('endereco', e.target.value)}/>
                        <label>Número: </label>
                        <input type="text" value={medium.endNumero} onChange={(e) => updateProps('endNumero', e.target.value)}/>
                        <label>Complemento: </label>
                        <input type="text" value={medium.endCompl} onChange={(e) => updateProps('endCompl', e.target.value)}/>
                        <label>Bairro: </label>
                        <input type="text" value={medium.endBairro} onChange={(e) => updateProps('endBairro', e.target.value)}/>
                        <label>Cidade: </label>
                        <input type="text" value={medium.endCidade} onChange={(e) => updateProps('endCidade', e.target.value)}/>
                        <label>UF: </label>
                        <select value={medium.endUF} onChange={(e) => updateProps('endUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Telefone 1: </label>
                        <input type="tel" maxLength={15} value={medium.telefone1} onChange={(e) => updateProps('telefone1', formatPhoneNumber(e.target.value))}/>
                        <label>Telefone 2: </label>
                        <input type="tel" maxLength={15} value={medium.telefone2} onChange={(e) => updateProps('telefone2', formatPhoneNumber(e.target.value))}/>
                        <label>E-mail: </label>
                        <input type="text" value={medium.email} onChange={(e) => updateProps('email', e.target.value)}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Datas Mediúnicas</SectionTitle>
                    <GridDatesContainer>
                        <label>Data Ingresso: </label>
                        <input type="date" value={medium.dtIngresso} onChange={(e) => updateProps('dtIngresso', e.target.value)} min={medium.dtNasc}  max={now} />
                        <label>Data Emplacamento: </label>
                        <input type="date" value={medium.dtEmplac} onChange={(e) => updateProps('dtEmplac', e.target.value)} min={medium.dtIngresso} max={now} disabled={!medium.dtIngresso} />
                        <label>Data Iniciação: </label>
                        <input type="date" value={medium.dtIniciacao} onChange={(e) => updateProps('dtIniciacao', e.target.value)} min={medium.dtEmplac} max={now} disabled={!medium.dtEmplac} />
                        <label>Data Elevação: </label>
                        <input type="date" value={medium.dtElevacao} onChange={(e) => updateProps('dtElevacao', e.target.value)} min={medium.dtIniciacao} max={now} disabled={!medium.dtIniciacao} />
                        <label>Data Centúria: </label>
                        <input type="date" value={medium.dtCenturia} onChange={(e) => updateProps('dtCenturia', e.target.value)} min={medium.dtElevacao} max={now} disabled={!medium.dtElevacao && !medium.oldDtElevacao} />
                        <label>Data Sétimo: </label>
                        <input type="date" value={medium.dtSetimo} onChange={(e) => updateProps('dtSetimo', e.target.value)} min={medium.dtCenturia} max={now} disabled={!medium.dtCenturia} />
                    </GridDatesContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados Mediúnicos</SectionTitle>
                    <GridContainer>
                        <label>Adjunto Origem.: </label>
                        <select value={medium.adjOrigem} onChange={(e) => updateProps('adjOrigem', e.target.value)}>
                            <option value={0}></option>
                            {adjuntos.map((item: IAdjunto, index: number) => (
                                <option key={index} value={item.adjunto_id}>Adj. {ministros.find((min: IMentor) => min.id === item.ministro).nome} - Mestre {item.nome}</option>
                            ))}
                        </select>
                        <label>Templo Origem: </label>
                        <select value={medium.temploOrigem} onChange={(e) => updateProps('temploOrigem', e.target.value)}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Colete N°: </label>
                        <select value={medium.colete} onChange={(e) => updateProps('colete', e.target.value)}>
                            <option value={0}></option>
                            {coletes.map((item: number, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Classificação: </label>
                        <select value={medium.classMest} disabled={!medium.dtElevacao} onChange={(e) => updateProps('classMest', e.target.value)}>
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
                                updateProps('falMiss', parseInt(e.target.value))
                                if(parseInt(e.target.value) === 0){
                                    updateProps('regente', false);
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
                                    disabled={medium.classif === '7° Raio Autorizado Taumantes Raio Rama Adjuração' || medium.classif === '5° Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || medium.classif === ''}
                                    default={defaultMentor}
                                    options={ministros}
                                    equality={(option, value) => option.id === value.id}
                                    value={dropMin}
                                    setValue={setDropMin}
                                    inputValue={searchMin}
                                    setInputValue={setSearchMin}
                                />
                                <label>Data Ministro: </label>
                                <input type="date" value={medium.dtMentor} onChange={(e) => updateProps('dtMentor', e.target.value)} min={medium.dtCenturia}  max={now} disabled={medium.classif === '7° Raio Autorizado Taumantes Raio Rama Adjuração' || medium.classif === '5° Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || medium.classif === ''} />
                                <label>Cavaleiro: </label>
                                <AutocompleteInput 
                                    disabled={medium.classif === '7° Raio Autorizado Taumantes Raio Rama Adjuração' || medium.classif === '5° Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || medium.classif === ''}
                                    default={defaultCavaleiro}
                                    options={listCav}
                                    equality={(option, value) => option.id === value.id}
                                    value={dropCav}
                                    setValue={setDropCav}
                                    inputValue={searchCav}
                                    setInputValue={setSearchCav}
                                />
                                <label>Cor do Cavaleiro: </label>
                                <select value={medium.cor} onChange={(e) => updateProps('cor', e.target.value)} disabled={medium.classif === '7° Raio Autorizado Taumantes Raio Rama Adjuração' || medium.classif === '5° Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' || medium.classif === ''} >
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
                            <InputContainer>
                                <FieldContainer>
                                    <label>Classificação Atual: </label>
                                    <select value={medium.classif} onChange={(e) => {
                                        updateProps('classif', e.target.value)
                                        if(e.target.value === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000') {
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
                            </InputContainer>
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
                                <label>Princesa: </label>
                                <select value={medium.princesa} onChange={(e) => updateProps('princesa', e.target.value)}>
                                    <option value={''}></option>
                                    {princesas.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <label>Nome na emissão: </label>
                                <input type="text" value={medium.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', e.target.value)}/>
                            </GridContainer>
                        </>
                    : medium.med==='Apará'?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Preto Velho: </label>
                                <input type="text" value={medium.pretovelho} onChange={(e) => updateProps('pretovelho', e.target.value)}/>
                                <label>Caboclo: </label>
                                <input type="text" value={medium.caboclo} onChange={(e) => updateProps('caboclo', e.target.value)}/>
                                <label>Médico: </label>
                                <input type="text" value={medium.medico} onChange={(e) => updateProps('medico', e.target.value)}/>
                                <label>Nome na emissão: </label>
                                <input type="text" value={medium.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', e.target.value)}/>
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
                            <InputContainer>
                                <FieldContainer>
                                    <label>Comando: </label>
                                    <select value={medium.comando} onChange={(e) => updateProps('comando', e.target.value)}>
                                        <option value={''}></option>
                                        <option value={'Comandante'}>Comandante</option>
                                        <option value={'Janatã'}>Comandante Janatã</option>
                                        <option value={'Lança'}>Lança Vermelha</option>
                                        <option value={'JanatãLança'}>Comandante Janatã / Lança Vermelha</option>
                                    </select>
                                </FieldContainer>
                                <FieldContainer>        
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
                                </FieldContainer>
                            </InputContainer>
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
                            {medium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000' || medium.presidente === 'Presidente' ? '' : 
                                <>
                                    <Divider></Divider>
                                    <InputContainer>
                                        <div style={{width: '100%', display: 'flex', gap: '10px'}}>
                                            <FieldContainerBox>
                                                <input type="checkBox" checked={tSol} disabled={medium.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000' || medium.presidente === 'Presidente'} onChange={(e) => setTSol(e.target.checked)}/>
                                                <label>Trino Solitário</label>
                                            </FieldContainerBox> 
                                            <FieldContainer>
                                                <select disabled={!tSol} value={medium.trinoSol} onChange={(e) => updateProps('trinoSol', e.target.value)}>
                                                    <option value={''}></option>
                                                    <option value={'Juremá'}>Juremá</option>
                                                    <option value={'Iramar'}>Iramar</option>
                                                </select>
                                            </FieldContainer>
                                        </div>
                                        <FieldContainer width="190px">
                                            <label>Data: </label>
                                            <input type="date" disabled={!tSol} value={medium.dtTrinoSol} onChange={(e) => updateProps('dtTrinoSol', e.target.value)} min={medium.dtCenturia}  max={now} />
                                        </FieldContainer>
                                    </InputContainer>
                                    <Divider></Divider>
                                    <div style={{display: 'flex', gap: '10px'}}>
                                        <FieldContainerBox>
                                            <input type="checkBox" checked={medium.trinoSar} onChange={(e) => updateProps('trinoSar', e.target.checked)} />
                                            <label>Trino Sardyos</label>
                                        </FieldContainerBox>
                                        <FieldContainer>
                                            <label>Data: </label>
                                            <input type="date" disabled={!medium.trinoSar} value={medium.dtTrinoSar} onChange={(e) => updateProps('dtTrinoSar', e.target.value)} min={medium.dtCenturia}  max={now} />
                                        </FieldContainer>
                                    </div>
                                    <InputContainer herdeiro>
                                        <FieldContainer>
                                            <label>Herdeiro de: </label>
                                            <AutocompleteInput 
                                                default={defaultMedium}
                                                options={mediuns.filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000')}
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
                                    </InputContainer>
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
                            <div style={{display: 'flex', gap: '10px'}}>
                                <FieldContainerBox>
                                    <input type="checkBox" checked={medium.trinoSar} onChange={(e) => updateProps('trinoSar', e.target.checked)} />
                                    <label>Trino Sardyos</label>
                                </FieldContainerBox>
                                <FieldContainer>
                                    <label>Data: </label>
                                    <input type="date" disabled={!medium.trinoSar} value={medium.dtTrinoSar} onChange={(e) => updateProps('dtTrinoSar', e.target.value)} min={medium.dtCenturia}  max={now} />
                                </FieldContainer>
                            </div>
                            <InputContainer herdeiro> 
                                <FieldContainer>
                                    <label>Herdeiro de: </label>
                                    <AutocompleteInput 
                                        default={defaultMedium}
                                        options={mediuns.filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000')}
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
                            </InputContainer>
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
                                <input type="text" value={medium.pretovelho} onChange={(e) => updateProps('pretovelho', e.target.value)}/>
                                <label>Caboclo: </label>
                                <input type="text" value={medium.caboclo} onChange={(e) => updateProps('caboclo', e.target.value)}/>
                                <label>Médico: </label>
                                <input type="text" value={medium.medico} onChange={(e) => updateProps('medico', e.target.value)}/>
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
                    {medium.sex.concat(medium.med) === 'MasculinoApará'?
                        <>
                            <Divider></Divider>
                            <InputContainer>
                                <div style={{width: '100%', display: 'flex', gap: '10px'}}>
                                    <FieldContainerBox>
                                        <input type="checkBox" checked={tSol} disabled={medium.oldClassif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000' || medium.presidente === 'Presidente'} onChange={(e) => setTSol(e.target.checked)}/>
                                        <label>Trino Solitário</label>
                                    </FieldContainerBox> 
                                    <FieldContainer>
                                        <select disabled={!tSol} value={medium.trinoSol} onChange={(e) => updateProps('trinoSol', e.target.value)}>
                                            <option value={''}></option>
                                            <option value={'Juremá'}>Juremá</option>
                                            <option value={'Iramar'}>Iramar</option>
                                        </select>
                                    </FieldContainer>
                                </div>
                                <FieldContainer width="190px">
                                    <label>Data: </label>
                                    <input type="date" disabled={!tSol} value={medium.dtTrinoSol} onChange={(e) => updateProps('dtTrinoSol', e.target.value)} min={medium.dtCenturia}  max={now} />
                                </FieldContainer>
                            </InputContainer>
                        </>
                    : <div></div>}
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Observações</SectionTitle>
                    <Observations rows={5} maxLength={250} value={medium.observ} onChange={(e) => updateProps('observ', e.target.value)}/>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around'}}>
                    <MediumButton color="red" onClick={() => navigate(`/mediuns/consulta/${params.id}`)}>Cancelar</MediumButton>
                    <MediumButton color="green" onClick={() => validateMedium(medium, async () => await editMedium(medium, selected, token))}>Salvar</MediumButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default EditMedium