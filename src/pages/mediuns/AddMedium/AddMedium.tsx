import { useContext, useState, useEffect } from "react";
import { ListContext } from "src/contexts/ListContext";
import { CustomInput, Divider, FieldContainer, FieldContainerBox, GridContainer, GridDatesContainer, InputContainer, MainContainer, MainContent, MainInfoContainer, MediumButton, Observations, OptionsList, PersonalCard, PhotoContainer, SectionTitle } from "./styles";
import { IAdjunto, ICavaleiro, IEstado, IFalange, IMedium, IMentor, ITemplo, ITurno } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { MediumContext } from "src/contexts/MediumContext";
import { formatCep, formatCpf, formatPhoneNumber } from "src/utilities/functions";
import { Alert, Confirm } from "src/utilities/popups";
import axios from "axios";
import { validateAddMedium } from "src/utilities/validations";

function AddMedium() {
    const { templos, estados, adjuntos, coletes, classMest, falMest, povos, falMiss, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao } = useContext(ListContext);
    const { token } = useContext(UserContext);
    const { mediuns, loadMedium } = useContext(MediumContext);
    const defaultMedium = {
        medium_id: 0,
        nome: '',
        med: '',
        sex: '',
        foto: '',
        condicao: 'Ativo',
        templo: 0,
        dtNasc: '',
        rg: '',
        cpf: '',
        mae: '',
        pai: '',
        natur: '',
        naturUF: '',
        profissao: '',
        estCivil: '',
        conjuge: '',
        cep: '',
        endereco: '',
        endNumero: '',
        endCompl: '',
        endBairro: '',
        endCidade: '',
        endUF: '',
        telefone1: '',
        telefone2: '',
        email: '',
        dtIngresso: '',
        dtEmplac: '',
        dtIniciacao: '',
        dtElevacao: '',
        dtCenturia: '',
        dtSetimo: '',
        dtTestD: '',
        dtTestA: '',
        dtEmplD: '',
        dtEmplA: '',
        dtInicD: '',
        dtInicA: '',
        dtElevD: '',
        dtElevA: '',
        adjOrigem: 0,
        temploOrigem: 0,
        colete: 0,
        classMest: '',
        falMest: '',
        povo: '',
        falMiss: 0,
        adjDevas: '',
        turnoLeg: '',
        turnoTrab: '',
        ministro: 0,
        cavaleiro: 0,
        dtMinistro: '',
        guia: 0,
        dtGuia: '',
        cor: '',
        estrela: '',
        classif: '',
        dtClassif: '',
        princesa: '',
        pretovelho: '',
        caboclo: '',
        medico: '',
        nomeEmissao: '',
        ninfa: 0,
        mestre: 0,
        padrinho: 0,
        madrinha: 0,
        afilhado: 0,
        comando: '',
        presidente: '',
        recepcao: false,
        devas: false,
        regente: false,
        janda: false,
        trinoSol: '',
        dtTrinoSol: '',
        trinoSar: false,
        dtTrinoSar: '',
        herdeiro: 0,
        filho: false,
        observ: ''
    } as IMedium;

    const [newMedium, setNewMedium] = useState(defaultMedium);
    const [listClassMest, setListClassMest] = useState([]);
    const [listFalMiss, setListFalMiss] = useState([]);
    const [listTurnoL, setListTurnoL] = useState([]);
    const [listTurnoT, setListTurnoT] = useState([]);
    const [listCav, setListCav] = useState([] as Array<ICavaleiro>);
    const [listEst, setListEst] = useState([]);
    const [listClass, setListClass] = useState([]);
    const [tSol, setTSol] = useState(false);
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dropMin, setDropMin] = useState(false);
    const [dropCav, setDropCav] = useState(false);
    const [dropGuia, setDropGuia] = useState(false);
    const [dropMes, setDropMes] = useState(false);
    const [dropNin, setDropNin] = useState(false);
    const [dropPad, setDropPad] = useState(false);
    const [dropMad, setDropMad] = useState(false);
    const [dropAfi, setDropAfi] = useState(false);
    const [searchMin, setSearchMin] = useState('');
    const [searchCav, setSearchCav] = useState('');
    const [searchGuia, setSearchGuia] = useState('');
    const [searchMes, setSearchMes] = useState('');
    const [searchNin, setSearchNin] = useState('');
    const [searchPad, setSearchPad] = useState('');
    const [searchMad, setSearchMad] = useState('');
    const [searchAfi, setSearchAfi] = useState('');

    const now = new Date().toISOString().split('T')[0];

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
                setListTurnoL([]);
        }
    }, [newMedium.sex])

    useEffect(() => {
        switch (newMedium.sex.concat(newMedium.med)) {
            case 'MasculinoDoutrinador':
                setListClassMest(classMest.MS);
                setListCav(cavaleiros.filter((item: ICavaleiro) => item.med === 'Doutrinador'));
                setListClass(classificacao.sol);
                break;
            case 'MasculinoApará':
                setListClassMest(classMest.ML);
                setListCav(cavaleiros.filter((item: ICavaleiro) => item.med === 'Apará'));
                setListClass(classificacao.lua);
                break;
            case 'FemininoDoutrinador':
                setListClassMest(classMest.NS);
                setListEst(estrelas.sol);
                break;
            case 'FemininoApará':
                setListClassMest(classMest.NL);
                setListEst(estrelas.lua);
                break;
            default:
                setListClassMest([]);
                setListCav([]);
                setListEst([]);
                setListClass([]);
        }
    }, [newMedium.med, newMedium.sex])

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

    const uploadImage = async (medium_id: number,token: string) => {
        if(photo){
            const formData = new FormData();
            formData.append('image', photo);
            const headers = {
                'headers': {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            }
            await api.post(`/medium/upload-image?medium_id=${medium_id}`, formData, headers).then(({ data }) => {
                updateProps('foto', data.filename);
                console.log('Foto adicionada ao objeto', newMedium);
            }).catch((error) => {
                console.log('Erro ao fazer upload da imagem', error);
            })
        } else {
            console.log('Nenhuma foto foi adicionada');
        }
    }

    const setComponentes = (medium: IMedium) => {
        const mestre = mediuns.find((item: IMedium) => item.medium_id === medium.mestre);
        const ninfa = mediuns.find((item: IMedium) => item.medium_id === medium.ninfa);
        const madrinha = mediuns.find((item: IMedium) => item.medium_id === medium.madrinha);
        const padrinho = mediuns.find((item: IMedium) => item.medium_id === medium.padrinho);
        const afilhado = mediuns.find((item: IMedium) => item.medium_id === medium.afilhado);
        
        if (medium.sex.concat(medium.med) === 'MasculinoDoutrinador') {
            if(ninfa) {
                api.put('/medium/update', {medium_id: ninfa.medium_id, mestre: medium.medium_id}, {headers:{Authorization: token}}).then(() => {
                    console.log(`${ninfa.nome} agora é escrava de ${medium.nome}`)
                }).catch((error) => {
                    console.log('Erro ao adicionar escrava', error);
                })
            }
            if(madrinha) {
                api.put('/medium/update', {medium_id: madrinha.medium_id, afilhado: medium.medium_id, mestre: padrinho? padrinho.medium_id : 0}, {headers:{Authorization: token}}).then(() => {
                    console.log(`${madrinha.nome} agora é madrinha de ${medium.nome}`)
                }).catch((error) => {
                    console.log('Erro ao adicionar madrinha', error);
                })
            }
            if(padrinho) {
                api.put('/medium/update', {medium_id: padrinho.medium_id, afilhado: medium.medium_id, ninfa: madrinha? madrinha.medium_id : 0}, {headers:{Authorization: token}}).then(() => {
                    console.log(`${padrinho.nome} agora é padrinho de ${medium.nome}`)
                }).catch((error) => {
                    console.log('Erro ao adicionar padrinho', error);
                })
            }  
        } else if (medium.sex.concat(medium.med) === 'MasculinoApará') {
            if(afilhado) {
                api.put('/medium/update', {medium_id: afilhado.medium_id, padrinho: medium.medium_id}, {headers:{Authorization: token}}).then(() => {
                    console.log(`${afilhado.nome} agora é afilhado de ${medium.nome}`)
                }).catch((error) => {
                    console.log('Erro ao adicionar afilhado', error);
                })
            }
        } else if (medium.sex.concat(medium.med) === 'FemininoDoutrinador') {
            if(afilhado) {
                api.put('/medium/update', {medium_id: afilhado.medium_id, madrinha: medium.medium_id}, {headers:{Authorization: token}}).then(() => {
                    console.log(`${afilhado.nome} agora é afilhado de ${medium.nome}`)
                }).catch((error) => {
                    console.log('Erro ao adicionar afilhado', error);
                })
            }
        } else if (medium.sex.concat(medium.med) === 'FemininoApará') {
            if(mestre) {
                api.put('/medium/update', {medium_id: mestre.medium_id, ninfa: medium.medium_id}, {headers:{Authorization: token}}).then(() => {
                    console.log(`${mestre.nome} agora é mestre de ${medium.nome}`)
                }).catch((error) => {
                    console.log('Erro ao adicionar mestre', error);
                })
            }
        } else {
            console.log('');
        }
    }   

    const resetNewMedium = () => {
        setNewMedium(defaultMedium);
        setTSol(false);
        setSearchMin('');
        setSearchCav('');
        setSearchGuia('');
        setSearchMes('');
        setSearchNin('');
        setSearchPad('');
        setSearchMad('');
        setSearchAfi('');
        setPhoto(null);
        setPreview(null);
    }

    const addMedium = (medium: IMedium, token: string) => {
        uploadImage(0, token);
        const mediumObj = {
            ...medium,
            dtNasc: medium.dtNasc === '' ? null : medium.dtNasc,
            dtIngresso: medium.dtIngresso === '' ? null : medium.dtIngresso,
            dtEmplac: medium.dtEmplac === '' ? null : medium.dtEmplac,
            dtIniciacao: medium.dtIniciacao === '' ? null : medium.dtIniciacao,
            dtElevacao: medium.dtElevacao === '' ? null : medium.dtElevacao,
            dtCenturia: medium.dtCenturia === '' ? null : medium.dtCenturia,
            dtSetimo: medium.dtSetimo === '' ? null : medium.dtSetimo,
            dtTestD: medium.med === 'Doutrinador' ? medium.dtIngresso : null,
            dtTestA: medium.med === 'Apará' ? medium.dtIngresso : null,
            dtEmplD: medium.med === 'Doutrinador' ? medium.dtEmplac : null,
            dtEmplA: medium.med === 'Apará' ? medium.dtEmplac : null,
            dtInicD: medium.med === 'Doutrinador' ? medium.dtIniciacao : null,
            dtInicA: medium.med === 'Apará' ? medium.dtIniciacao : null,
            dtElevD: medium.med === 'Doutrinador' ? medium.dtElevacao : null,
            dtElevA: medium.med === 'Apará' ? medium.dtElevacao : null,
            dtMinistro: medium.dtMinistro === '' ? null : medium.dtMinistro,
            dtGuia: medium.dtGuia === '' ? null : medium.dtGuia,
            dtClassif: medium.dtClassif === '' ? null : medium.dtClassif,
            dtTrinoSol: medium.dtTrinoSol === '' ? null : medium.dtTrinoSol,
            dtTrinoSar: medium.dtTrinoSar === '' ? null : medium.dtTrinoSar,
            colete: medium.colete === 0 ? null : medium.colete,
            ministro: medium.ministro === 0 ? null : medium.ministro,
            cavaleiro: medium.cavaleiro === 0 ? null : medium.cavaleiro,
            guia: medium.guia === 0 ? null : medium.guia,
            falMiss: medium.falMiss === 0 ? null : medium.falMiss,
            adjOrigem: medium.adjOrigem === 0 ? null : medium.adjOrigem,
            temploOrigem: medium.temploOrigem === 0 ? null : medium.temploOrigem,
            mestre: medium.mestre === 0 ? null : medium.mestre,
            ninfa: medium.ninfa === 0 ? null : medium.ninfa,
            padrinho: medium.padrinho === 0 ? null : medium.padrinho,
            madrinha: medium.madrinha === 0 ? null : medium.madrinha,
            afilhado: medium.afilhado === 0 ? null : medium.afilhado
        };
        const {medium_id, ...newMediumObj} = mediumObj;
        api.post('/medium/create', newMediumObj, {headers:{Authorization: token}}).then((response) => {
            const { medium_id } = response.data;
            setComponentes({...medium, medium_id});
            Alert('Médium adicionado com sucesso', 'success');
            resetNewMedium();
            loadMedium(token);
        }).catch((error) => {
            console.log('Não foi possível adicionar o médium', error);
        })
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
                                <input type="text" value={newMedium.nome} onChange={(e) => updateProps('nome', e.target.value)}/>
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
                                        updateProps('presidente', false);
                                        updateProps('trinoSol', '');
                                        updateProps('trinoSar', false);
                                        updateProps('classif', '');
                                        updateProps('ministro', 0);
                                        updateProps('cavaleiro', 0);
                                        updateProps('guia', 0);
                                        updateProps('estrela', '');
                                        updateProps('dtTrinoSar', '');
                                        updateProps('dtTrinoSol', '');
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
                                <select value={newMedium.med} onChange={(e) => updateProps('med', e.target.value)}>
                                    <option value={''}></option>
                                    <option value={'Apará'}>Apará</option>
                                    <option value={'Doutrinador'}>Doutrinador</option>
                                </select>
                                <label>Templo: </label>
                                <select value={newMedium.templo} onChange={(e) => updateProps('templo', e.target.value)}>
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
                        <input type="text" value={newMedium.profissao} onChange={(e) => updateProps('profissao', e.target.value)}/>
                        <label>RG: </label>
                        <input type="text" value={newMedium.rg} onChange={(e) => updateProps('rg', e.target.value)}/>
                        <label>CPF: </label>
                        <input type="text" maxLength={14} value={newMedium.cpf} onChange={(e) => updateProps('cpf', formatCpf(e.target.value))}/>
                        <label>Mãe: </label>
                        <input type="text" value={newMedium.mae} onChange={(e) => updateProps('mae', e.target.value)}/>
                        <label>Pai: </label>
                        <input type="text" value={newMedium.pai} onChange={(e) => updateProps('pai', e.target.value)}/>
                        <label>Natural de: </label>
                        <input type="text" value={newMedium.natur} onChange={(e) => updateProps('natur', e.target.value)}/>
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
                        <input type="text" value={newMedium.conjuge} onChange={(e) => updateProps('conjuge', e.target.value)}/>
                        <label>CEP: </label>
                        <input type="text" maxLength={9} value={newMedium.cep} onChange={(e) => updateProps('cep', formatCep(e.target.value))} onBlur={fillAddressByCep}/>
                        <label>Endereço: </label>
                        <input type="text" value={newMedium.endereco} onChange={(e) => updateProps('endereco', e.target.value)}/>
                        <label>Número: </label>
                        <input type="text" value={newMedium.endNumero} onChange={(e) => updateProps('endNumero', e.target.value)}/>
                        <label>Complemento: </label>
                        <input type="text" value={newMedium.endCompl} onChange={(e) => updateProps('endCompl', e.target.value)}/>
                        <label>Bairro: </label>
                        <input type="text" value={newMedium.endBairro} onChange={(e) => updateProps('endBairro', e.target.value)}/>
                        <label>Cidade: </label>
                        <input type="text" value={newMedium.endCidade} onChange={(e) => updateProps('endCidade', e.target.value)}/>
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
                        <input type="text" value={newMedium.email} onChange={(e) => updateProps('email', e.target.value)}/>
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
                        <input type="date" value={newMedium.dtCenturia} onChange={(e) => updateProps('dtCenturia', e.target.value)} min={newMedium.dtElevacao} max={now} disabled={!newMedium.dtElevacao} />
                        <label>Data Sétimo: </label>
                        <input type="date" value={newMedium.dtSetimo} onChange={(e) => updateProps('dtSetimo', e.target.value)} min={newMedium.dtCenturia} max={now} disabled={!newMedium.dtCenturia} />
                    </GridDatesContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados Mediúnicos</SectionTitle>
                    <GridContainer>
                        <label>Adjunto Origem.: </label>
                        <select value={newMedium.adjOrigem} onChange={(e) => updateProps('adjOrigem', e.target.value)}>
                            <option value={0}></option>
                            {adjuntos.map((item: IAdjunto, index: number) => (
                                <option key={index} value={item.adjunto_id}>Adj. {ministros.find((min: IMentor) => min.id === item.ministro).nome} - Mestre {item.nome}</option>
                            ))}
                        </select>
                        <label>Templo Origem: </label>
                        <select value={newMedium.temploOrigem} onChange={(e) => updateProps('temploOrigem', e.target.value)}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Colete N°: </label>
                        <select value={newMedium.colete} onChange={(e) => updateProps('colete', e.target.value)}>
                            <option value={0}></option>
                            {coletes.map((item: number, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Classificação: </label>
                        <select value={newMedium.classMest} disabled={!newMedium.dtElevacao} onChange={(e) => updateProps('classMest', e.target.value)}>
                            <option value={''}></option>
                            {listClassMest.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label>Falange Mestrado: </label>
                        <select value={newMedium.falMest} disabled={!newMedium.dtElevacao} onChange={(e) => updateProps('falMest', e.target.value)}>
                            <option value={''}></option>
                            {falMest.map((item: string, index: number) => (
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
                                <CustomInput>
                                    <input
                                        type="text"
                                        value={searchMin}
                                        onChange={(e) => setSearchMin(e.target.value)}
                                        onFocus={() => setDropMin(true)}
                                        onBlur={() => setTimeout(() => setDropMin(false), 150)}
                                    />
                                    <OptionsList show={dropMin}>
                                        <ul>
                                            {ministros
                                                .filter((item: IMentor) => item.nome.toLowerCase().includes(searchMin.toLowerCase().trim()))
                                                .length === 0
                                            ? (
                                                <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                            ) : (
                                                ministros
                                                    .filter((item: IMentor) => item.nome.toLowerCase().includes(searchMin.toLowerCase().trim()))
                                                    .map((item: IMentor, index: number) => (
                                                        <li
                                                            key={index}
                                                            onClick={() => {
                                                                updateProps('ministro', item.id);
                                                                setSearchMin(ministros.find((min: IMentor) => min.id === item.id).nome);
                                                                setDropMin(false);
                                                            }}
                                                        >
                                                            {item.nome}
                                                        </li>
                                                ))
                                            )}
                                        </ul>
                                    </OptionsList>
                                </CustomInput>
                                <label>Data Ministro: </label>
                                <input type="date" value={newMedium.dtMinistro} onChange={(e) => updateProps('dtMinistro', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                                <label>Cavaleiro: </label>
                                <CustomInput>
                                    <input
                                        type="text"
                                        value={searchCav}
                                        onChange={(e) => setSearchCav(e.target.value)}
                                        onFocus={() => setDropCav(true)}
                                        onBlur={() => setTimeout(() => setDropCav(false), 150)}
                                    />
                                    <OptionsList show={dropCav}>
                                        <ul>
                                            {listCav
                                                .filter((item: ICavaleiro) => item.nome.toLowerCase().includes(searchCav.toLowerCase().trim()))
                                                .length === 0
                                            ? (
                                                <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                            ) : (
                                                listCav
                                                    .filter((item: ICavaleiro) => item.nome.toLowerCase().includes(searchCav.toLowerCase().trim()))
                                                    .map((item: ICavaleiro, index: number) => (
                                                        <li
                                                            key={index}
                                                            onClick={() => {
                                                                updateProps('cavaleiro', item.id);
                                                                const foundCav = listCav.find((cav: ICavaleiro) => cav.id === item.id)
                                                                if (foundCav) {
                                                                    setSearchCav(foundCav.nome);
                                                                }
                                                                setDropCav(false);
                                                            }}
                                                        >
                                                            {item.nome}
                                                        </li>
                                                ))
                                            )}
                                        </ul>
                                    </OptionsList>
                                </CustomInput>
                                <label>Cor do Cavaleiro: </label>
                                <select value={newMedium.cor} onChange={(e) => updateProps('cor', e.target.value)}>
                                    {newMedium.med==='Doutrinador'?
                                        <option value={'Verde'}>Verde</option>
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
                                    <select value={newMedium.classif} onChange={(e) => updateProps('classif', e.target.value)}>
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
                                <CustomInput>
                                    <input
                                        type="text"
                                        value={searchGuia}
                                        onChange={(e) => setSearchGuia(e.target.value)}
                                        onFocus={() => setDropGuia(true)}
                                        onBlur={() => setTimeout(() => setDropGuia(false), 250)}
                                    />
                                    <OptionsList show={dropGuia}>
                                        <ul>
                                            {guias
                                                .filter((item: IMentor) => item.nome.toLowerCase().includes(searchGuia.toLowerCase().trim()))
                                                .length === 0
                                            ? (
                                                <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                            ) : (
                                                guias
                                                    .filter((item: IMentor) => item.nome.toLowerCase().includes(searchGuia.toLowerCase().trim()))
                                                    .map((item: IMentor, index: number) => (
                                                        <li
                                                            key={index}
                                                            onClick={() => {
                                                                updateProps('guia', item.id);
                                                                setSearchGuia(guias.find((guia: IMentor) => guia.id === item.id).nome);
                                                                setDropGuia(false);
                                                            }}
                                                        >
                                                            {item.nome}
                                                        </li>
                                                ))
                                            )}
                                        </ul>
                                    </OptionsList>
                                </CustomInput>
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
                                <input type="date" value={newMedium.dtGuia} onChange={(e) => updateProps('dtGuia', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                            </GridContainer>
                        </>
                    : ''}
                    {newMedium.med==='Doutrinador'?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Princesa: </label>
                                <select value={newMedium.princesa} onChange={(e) => updateProps('princesa', e.target.value)}>
                                    <option value={''}></option>
                                    {princesas.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <label>Nome na emissão: </label>
                                <input type="text" value={newMedium.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', e.target.value)}/>
                            </GridContainer>
                        </>
                    : newMedium.med==='Apará'?
                        <>
                            <Divider></Divider>
                            <GridContainer>
                                <label>Preto Velho: </label>
                                <input type="text" value={newMedium.pretovelho} onChange={(e) => updateProps('pretovelho', e.target.value)}/>
                                <label>Caboclo: </label>
                                <input type="text" value={newMedium.caboclo} onChange={(e) => updateProps('caboclo', e.target.value)}/>
                                <label>Médico: </label>
                                <input type="text" value={newMedium.medico} onChange={(e) => updateProps('medico', e.target.value)}/>
                                <label>Nome na emissão: </label>
                                <input type="text" value={newMedium.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', e.target.value)}/>
                            </GridContainer> 
                        </>
                    : ''}
                </PersonalCard>
                <PersonalCard hide={newMedium.sex.concat(newMedium.med).length < 10 || !newMedium.dtCenturia}>
                    <SectionTitle>Povo</SectionTitle>
                    {newMedium.sex.concat(newMedium.med)==='MasculinoDoutrinador'?
                        <GridContainer>
                            <label>Escrava: </label>
                            <CustomInput>
                                <input
                                    type="text"
                                    value={searchNin}
                                    onChange={(e) => setSearchNin(e.target.value)}
                                    onFocus={() => setDropNin(true)}
                                    onBlur={() => setTimeout(() => setDropNin(false), 150)}
                                />
                                <OptionsList show={dropNin}>
                                    <ul>
                                        {mediuns
                                            .filter((item: IMedium) => item.dtCenturia && item.med === 'Apará' && item.sex === 'Feminino')
                                            .filter((item: IMedium) => item.nome.toLowerCase().includes(searchNin.toLowerCase().trim()))
                                            .length === 0
                                        ? (
                                            <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                        ) : (
                                            mediuns
                                                .filter((item: IMedium) => item.dtCenturia && item.med === 'Apará' && item.sex === 'Feminino')
                                                .filter((item: IMedium) => item.nome.toLowerCase().includes(searchNin.toLowerCase().trim()))
                                                .map((item: IMedium, index: number) => (
                                                    <li
                                                        key={index}
                                                        style={item.mestre? {fontStyle: 'italic', color: '#777'} : {}}
                                                        onClick={!item.mestre? () => {
                                                            updateProps('ninfa', item.medium_id);
                                                            setSearchNin(mediuns.find((med: IMedium) => med.medium_id === item.medium_id).nome);
                                                            setDropNin(false);
                                                        } : () => Alert('Ninfa selecionada já é escrava de outro mestre', 'error')}
                                                    >
                                                        {item.nome}
                                                    </li>
                                            ))
                                        )}
                                    </ul>
                                </OptionsList>
                            </CustomInput>
                            <label>Madrinha: </label>
                            <CustomInput>
                                <input
                                    type="text"
                                    value={searchMad}
                                    onChange={(e) => setSearchMad(e.target.value)}
                                    onFocus={() => setDropMad(true)}
                                    onBlur={() => setTimeout(() => setDropMad(false), 150)}
                                />
                                <OptionsList show={dropMad}>
                                    <ul>
                                        {mediuns
                                            .filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Feminino')
                                            .filter((item: IMedium) => item.nome.toLowerCase().includes(searchMad.toLowerCase().trim()))
                                            .length === 0
                                        ? (
                                            <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                        ) : (
                                            mediuns
                                                .filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Feminino')
                                                .filter((item: IMedium) => item.nome.toLowerCase().includes(searchMad.toLowerCase().trim()))
                                                .map((item: IMedium, index: number) => (
                                                    <li
                                                        key={index}
                                                        style={item.afilhado? {fontStyle: 'italic', color: '#777'} : {}}
                                                        onClick={!item.afilhado? () => {
                                                            updateProps('madrinha', item.medium_id);
                                                            setSearchMad(mediuns.find((med: IMedium) => med.medium_id === item.medium_id).nome);
                                                            setDropMad(false);
                                                        } : () => Alert('Ninfa selecionada já é madrinha de outro mestre', 'error')}
                                                    >
                                                        {item.nome}
                                                    </li>
                                            ))
                                        )}
                                    </ul>
                                </OptionsList>
                            </CustomInput>
                            <label>Padrinho: </label>
                            <CustomInput>
                                <input
                                    type="text"
                                    value={searchPad}
                                    onChange={(e) => setSearchPad(e.target.value)}
                                    onFocus={() => setDropPad(true)}
                                    onBlur={() => setTimeout(() => setDropPad(false), 150)}
                                />
                                <OptionsList show={dropPad}>
                                    <ul>
                                        {mediuns
                                            .filter((item: IMedium) => item.dtCenturia && item.med === 'Apará' && item.sex === 'Masculino')
                                            .filter((item: IMedium) => item.nome.toLowerCase().includes(searchPad.toLowerCase().trim()))
                                            .length === 0
                                        ? (
                                            <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                        ) : (
                                            mediuns
                                                .filter((item: IMedium) => item.dtCenturia && item.med === 'Apará' && item.sex === 'Masculino')
                                                .filter((item: IMedium) => item.nome.toLowerCase().includes(searchPad.toLowerCase().trim()))
                                                .map((item: IMedium, index: number) => (
                                                    <li
                                                        key={index}
                                                        style={item.afilhado? {fontStyle: 'italic', color: '#777'} : {}}
                                                        onClick={!item.afilhado? () => {
                                                            updateProps('padrinho', item.medium_id);
                                                            setSearchPad(mediuns.find((med: IMedium) => med.medium_id === item.medium_id).nome);
                                                            setDropPad(false);
                                                        } : () => Alert('Mestre selecionado já é padrinho de outro mestre', 'error')}
                                                    >
                                                        {item.nome}
                                                    </li>
                                            ))
                                        )}
                                    </ul>
                                </OptionsList>
                            </CustomInput>
                        </GridContainer>
                    : newMedium.sex.concat(newMedium.med)==='MasculinoApará'? 
                        <GridContainer>
                            <label>Afilhado: </label>
                            <CustomInput>
                                <input
                                    type="text"
                                    value={searchAfi}
                                    onChange={(e) => setSearchAfi(e.target.value)}
                                    onFocus={() => setDropAfi(true)}
                                    onBlur={() => setTimeout(() => setDropAfi(false), 150)}
                                />
                                <OptionsList show={dropAfi}>
                                    <ul>
                                        {mediuns
                                            .filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')
                                            .filter((item: IMedium) => item.nome.toLowerCase().includes(searchAfi.toLowerCase().trim()))
                                            .length === 0
                                        ? (
                                            <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                        ) : (
                                            mediuns
                                                .filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')
                                                .filter((item: IMedium) => item.nome.toLowerCase().includes(searchAfi.toLowerCase().trim()))
                                                .map((item: IMedium, index: number) => (
                                                    <li
                                                        key={index}
                                                        style={item.padrinho? {fontStyle: 'italic', color: '#777'} : {}}
                                                        onClick={!item.padrinho? () => {
                                                            updateProps('afilhado', item.medium_id);
                                                            setSearchAfi(mediuns.find((med: IMedium) => med.medium_id === item.medium_id).nome);
                                                            setDropAfi(false);
                                                        } : () => Alert('Mestre selecionado já tem padrinho', 'error')}
                                                    >
                                                        {item.nome}
                                                    </li>
                                            ))
                                        )}
                                    </ul>
                                </OptionsList>
                            </CustomInput>
                            <label>Ninfa Sol: </label>
                            <input disabled />
                        </GridContainer>
                    : newMedium.sex.concat(newMedium.med)==='FemininoDoutrinador'?
                        <GridContainer>
                            <label>Afilhado: </label>
                            <CustomInput>
                                <input
                                    type="text"
                                    value={searchAfi}
                                    onChange={(e) => setSearchAfi(e.target.value)}
                                    onFocus={() => setDropAfi(true)}
                                    onBlur={() => setTimeout(() => setDropAfi(false), 150)}
                                />
                                <OptionsList show={dropAfi}>
                                    <ul>
                                        {mediuns
                                            .filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')
                                            .filter((item: IMedium) => item.nome.toLowerCase().includes(searchAfi.toLowerCase().trim()))
                                            .length === 0
                                        ? (
                                            <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                        ) : (
                                            mediuns
                                                .filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')
                                                .filter((item: IMedium) => item.nome.toLowerCase().includes(searchAfi.toLowerCase().trim()))
                                                .map((item: IMedium, index: number) => (
                                                    <li
                                                        key={index}
                                                        style={item.madrinha? {fontStyle: 'italic', color: '#777'} : {}}
                                                        onClick={!item.madrinha? () => {
                                                            updateProps('afilhado', item.medium_id);
                                                            setSearchAfi(mediuns.find((med: IMedium) => med.medium_id === item.medium_id).nome);
                                                            setDropAfi(false);
                                                        } : () => Alert('Mestre selecionado já tem madrinha', 'error')}
                                                    >
                                                        {item.nome}
                                                    </li>
                                            ))
                                        )}
                                    </ul>
                                </OptionsList>
                            </CustomInput>
                            <label>Ajanã: </label>
                            <input disabled />
                        </GridContainer>
                    : newMedium.sex.concat(newMedium.med)==='FemininoApará'?
                        <GridContainer>
                            <label>Mestre: </label>
                            <CustomInput>
                                <input
                                    type="text"
                                    value={searchMes}
                                    onChange={(e) => setSearchMes(e.target.value)}
                                    onFocus={() => setDropMes(true)}
                                    onBlur={() => setTimeout(() => setDropMes(false), 150)}
                                />
                                <OptionsList show={dropMes}>
                                    <ul>
                                        {mediuns
                                            .filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')
                                            .filter((item: IMedium) => item.nome.toLowerCase().includes(searchMes.toLowerCase().trim()))
                                            .length === 0
                                        ? (
                                            <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                        ) : (
                                            mediuns
                                                .filter((item: IMedium) => item.dtCenturia && item.med === 'Doutrinador' && item.sex === 'Masculino')
                                                .filter((item: IMedium) => item.nome.toLowerCase().includes(searchMes.toLowerCase().trim()))
                                                .map((item: IMedium, index: number) => (
                                                    <li
                                                        key={index}
                                                        style={item.ninfa? {fontStyle: 'italic', color: '#777'} : {}}
                                                        onClick={!item.ninfa? () => {
                                                            updateProps('mestre', item.medium_id);
                                                            setSearchMes(mediuns.find((med: IMedium) => med.medium_id === item.medium_id).nome);
                                                            setDropMes(false);
                                                        } : () => Alert('Mestre selecionado já tem escrava', 'error')}
                                                    >
                                                        {item.nome}
                                                    </li>
                                            ))
                                        )}
                                    </ul>
                                </OptionsList>
                            </CustomInput>
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
                                    <select value={newMedium.presidente} disabled={!newMedium.classif.includes('Adjunto Koatay 108 Herdeiro Triada Harpásios')} onChange={(e) => updateProps('presidente', e.target.value)}>
                                        <option value={''}></option>
                                        <option value={'Presidente'}>Presidente</option>
                                        <option value={'Vice'}>Vice-presidente</option>
                                    </select>
                                </FieldContainer>
                            </InputContainer>
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
                            {newMedium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000' || newMedium.presidente === 'Presidente' ? '' : 
                                <>
                                    <Divider></Divider>
                                    <InputContainer>
                                        <div style={{width: '100%', display: 'flex', gap: '10px'}}>
                                            <FieldContainerBox>
                                                <input type="checkBox" checked={tSol} disabled={newMedium.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000' || newMedium.presidente === 'Presidente'} onChange={(e) => setTSol(e.target.checked)}/>
                                                <label>Trino Solitário</label>
                                            </FieldContainerBox> 
                                            <FieldContainer>
                                                <select disabled={!tSol} value={newMedium.trinoSol} onChange={(e) => updateProps('trinoSol', e.target.value)}>
                                                    <option value={''}></option>
                                                    <option value={'Juremá'}>Juremá</option>
                                                    <option value={'Iramar'}>Iramar</option>
                                                </select>
                                            </FieldContainer>
                                        </div>
                                        <FieldContainer width="190px">
                                            <label>Data: </label>
                                            <input type="date" disabled={!tSol} value={newMedium.dtTrinoSol} onChange={(e) => updateProps('dtTrinoSol', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                                        </FieldContainer>
                                    </InputContainer>
                                    <Divider></Divider>
                                    <div style={{display: 'flex', gap: '10px'}}>
                                        <FieldContainerBox>
                                            <input type="checkBox" checked={newMedium.trinoSar} onChange={(e) => updateProps('trinoSar', e.target.checked)} />
                                            <label>Trino Sardyos</label>
                                        </FieldContainerBox>
                                        <FieldContainer>
                                            <label>Data: </label>
                                            <input type="date" disabled={!newMedium.trinoSar} value={newMedium.dtTrinoSar} onChange={(e) => updateProps('dtTrinoSar', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                                        </FieldContainer>
                                    </div>
                                    <InputContainer herdeiro>
                                        <FieldContainer>
                                            <label>Herdeiro de: </label>
                                            <CustomInput>
                                                <input 
                                                    disabled={!newMedium.trinoSar}
                                                    type="text"
                                                    value={searchMes}
                                                    onChange={(e) => setSearchMes(e.target.value)}
                                                    onFocus={() => setDropMes(true)}
                                                    onBlur={() => setTimeout(() => setDropMes(false), 150)}
                                                />
                                                <OptionsList show={dropMes}>
                                                    <ul>
                                                        {mediuns
                                                            .filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000')
                                                            .filter((item: IMedium) => item.nome.toLowerCase().includes(searchMes.toLowerCase().trim()))
                                                            .length === 0
                                                        ? (
                                                            <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                                        ) : (
                                                            mediuns
                                                                .filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000')
                                                                .filter((item: IMedium) => item.nome.toLowerCase().includes(searchMes.toLowerCase().trim()))
                                                                .map((item: IMedium, index: number) => (
                                                                    <li
                                                                        key={index}
                                                                        onClick={() => {
                                                                            updateProps('herdeiro', item.medium_id);
                                                                            setSearchMes(mediuns.find((med: IMedium) => med.medium_id === item.medium_id).nome);
                                                                            setDropMes(false);
                                                                        }}
                                                                    >
                                                                        {item.nome}
                                                                    </li>
                                                                ))
                                                            )}
                                                    </ul>
                                                </OptionsList>
                                            </CustomInput>
                                        </FieldContainer>
                                        <FieldContainerBox>
                                            <input type="checkBox" disabled={!newMedium.trinoSar} checked={newMedium.filho} onChange={(e) => updateProps('filho', e.target.checked)}/>
                                            <label>Filho?</label>
                                        </FieldContainerBox>
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
                            <div style={{display: 'flex', gap: '10px'}}>
                                <FieldContainerBox>
                                    <input type="checkBox" checked={newMedium.trinoSar} onChange={(e) => updateProps('trinoSar', e.target.checked)} />
                                    <label>Trino Sardyos</label>
                                </FieldContainerBox>
                                <FieldContainer>
                                    <label>Data: </label>
                                    <input type="date" disabled={!newMedium.trinoSar} value={newMedium.dtTrinoSar} onChange={(e) => updateProps('dtTrinoSar', e.target.value)} min={newMedium.dtCenturia}  max={now} />
                                </FieldContainer>
                            </div>
                            <InputContainer herdeiro> 
                                <FieldContainer>
                                    <label>Herdeiro de: </label>
                                    <CustomInput>
                                        <input 
                                            disabled={!newMedium.trinoSar}
                                            type="text"
                                            value={searchMes}
                                            onChange={(e) => setSearchMes(e.target.value)}
                                            onFocus={() => setDropMes(true)}
                                            onBlur={() => setTimeout(() => setDropMes(false), 150)}
                                        />
                                        <OptionsList show={dropMes}>
                                            <ul>
                                                {mediuns
                                                    .filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000')
                                                    .filter((item: IMedium) => item.nome.toLowerCase().includes(searchMes.toLowerCase().trim()))
                                                    .length === 0
                                                ? (
                                                    <li style={{fontStyle: 'italic', color: '#777'}}>- Não encontrado -</li>
                                                ) : (
                                                    mediuns
                                                        .filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000')
                                                        .filter((item: IMedium) => item.nome.toLowerCase().includes(searchMes.toLowerCase().trim()))
                                                        .map((item: IMedium, index: number) => (
                                                            <li
                                                                key={index}
                                                                onClick={() => {
                                                                    updateProps('herdeiro', item.medium_id);
                                                                    setSearchMes(mediuns.find((med: IMedium) => med.medium_id === item.medium_id).nome);
                                                                    setDropMes(false);
                                                                }}
                                                            >
                                                                {item.nome}
                                                            </li>
                                                    ))
                                                )}
                                            </ul>
                                        </OptionsList>
                                    </CustomInput>
                                </FieldContainer>
                                <FieldContainerBox>
                                    <input type="checkBox" disabled={!newMedium.trinoSar} checked={newMedium.filho} onChange={(e) => updateProps('filho', e.target.checked)}/>
                                    <label>Filho?</label>
                                </FieldContainerBox>
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
                <PersonalCard>
                    <SectionTitle>Observações</SectionTitle>
                    <Observations rows={5} maxLength={250} value={newMedium.observ} onChange={(e) => updateProps('observ', e.target.value)}/>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around'}}>
                    <MediumButton color="red" onClick={() => resetNewMedium()}>Cancelar</MediumButton>
                    <MediumButton color="gray" onClick={() => validateAddMedium(newMedium, () => Alert('Tudo certo!', 'success'))}>Teste</MediumButton>
                    <MediumButton color="green" onClick={() => validateAddMedium(newMedium, () => addMedium(newMedium, token))}>Cadastrar</MediumButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default AddMedium