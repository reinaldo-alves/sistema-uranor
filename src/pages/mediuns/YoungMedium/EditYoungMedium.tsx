import { useContext, useState, useEffect, useCallback } from "react";
import { ListContext } from "src/contexts/ListContext";
import { FieldContainer, GridContainer, MainContent, MainFieldsContainer, PhotoContainer, PhotoPosition } from "./styles";
import { IEstado, IFalange, IPaje, ITemplo } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { MediumContext } from "src/contexts/MediumContext";
import { convertDate, formatCep, formatCpf, formatInputText, formatPhoneNumber, handleEnterPress } from "src/utilities/functions";
import { Alert, Confirm } from "src/utilities/popups";
import axios from "axios";
import { validatePaje } from "src/utilities/validations";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "src/utilities/Loading";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import { defaultPaje } from "src/utilities/default";
import { Modal, ModalButton, ModalContent, ModalInputContainer, ModalTitle } from "src/components/Modal/modal";
import MainContainer from "src/components/MainContainer/MainContainer";
import { NavigateButton } from "src/components/buttons/buttons";
import { PersonalCard } from "src/components/cardsContainers/cardsContainers";
import { Observations, SectionTitle } from "src/components/texts/texts";

function EditYoungMedium() {
    const { pajes, loadPaje, convertPajeToSend, templos, estados, falMiss, getData } = useContext(ListContext);
    const { user, token, getUser } = useContext(UserContext);
    const { mediuns, uploadImage, convertMediumToSend } = useContext(MediumContext);
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [paje, setPaje] = useState(defaultPaje);
    const [selected, setSelected] = useState(defaultPaje);
    const [listFalMiss, setListFalMiss] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dataTransf, setDataTransf] = useState('');
    const [dataCondicao, setDataCondicao] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [updatePhoto, setUpdatePhoto] = useState(false);

    const now = new Date().toISOString().split('T')[0];

    const definePaje = useCallback(() => {
        const foundPaje: IPaje = pajes.find((item: IPaje) => item.medium_id === Number(params.id));
        setPaje(foundPaje);
        setSelected(foundPaje);
    }, [params.id, pajes]);
    
    const getInfo = useCallback(async () => {
        try {
            await loadPaje(token);
            await getData(token);
            await getUser(token);
        } catch (error) {
            console.error('Erro ao buscar informações', error);
            Alert('Erro ao buscar informações', 'error');
        }
    }, [loadPaje, getData, getUser, token])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    
    useEffect(() => {
        getInfo();
    }, [getInfo])
    
    useEffect(() => {
        if(mediuns.length > 0){
            definePaje();
        }
    }, [mediuns, params.id, definePaje])
    
    useEffect(() => {
        console.log(paje)
        if(paje.medium_id) {
            setLoading(false);
        }
    }, [paje])

    useEffect(() => {
        switch (paje.sex) {
            case 'Masculino':
                setListFalMiss(falMiss.filter((item: IFalange) => item.ninfa === false));
                break;
            case 'Feminino':
                setListFalMiss(falMiss.filter((item: IFalange) => [1, 4, 5].includes(item.falange_id)));
                break;
            default:
                setListFalMiss([]);
        }
    }, [paje.sex, falMiss])

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Pajé', click: '/mediuns/paje'}
    ]

    const fillAddressByCep = async () => {
        const cepNumber = paje.cep.replace(/\D/g,'')
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
        setPaje((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };

    const imageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
            setUpdatePhoto(true);
        }
    };

    const removeImage = () => {
        if (photo || paje.foto) {
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
        } else if (paje.foto) {
            setPreview(paje.foto);
        } else {
            setPreview(null);
        }
    }, [photo, paje.foto]);

    const generateObserv = (newPaje: IPaje, oldPaje: IPaje) => {
        const contentArray = [newPaje.observ];
        if (dataCondicao) {
            const message = newPaje.condicao === 'Ativo' ? `Retornou à doutrina em ${convertDate(dataCondicao)}` : newPaje.condicao === 'Entregou as Armas' ? `Entregou as armas em ${convertDate(dataCondicao)}` : newPaje.condicao === 'Desencarnado' ? `Desencarnou em ${convertDate(dataCondicao)}` : '';
            contentArray.push(message);
        }
        if (dataTransf) {
            const oldTemplo = templos.find((item: ITemplo) => item.templo_id === oldPaje.templo);
            const newTemplo = templos.find((item: ITemplo) => item.templo_id === newPaje.templo);
            const message = `Transferido de ${oldTemplo?.cidade} - ${oldTemplo?.estado.abrev} para o templo de ${newTemplo?.cidade} - ${newTemplo?.estado.abrev} em ${convertDate(dataTransf)}`;
            contentArray.push(message);
        }
        closeModal();
        return contentArray.length > 1 ? contentArray.filter(Boolean).join('. ') : newPaje.observ;
    }

    const editPaje = async (newPaje: IPaje, oldPaje: IPaje, token: string) => {
        newPaje.observ = generateObserv(newPaje, oldPaje);
        try {
            const extractPajeData = (paje: IPaje) => convertPajeToSend({dtFalange: paje.dtFalange, responsavel: paje.responsavel, parentesco: paje.parentesco, contatoResp: paje.contatoResp});
            const extractMediumData = (paje: IPaje) => {
                const { dtFalange, responsavel, parentesco, contatoResp, ...mediumData } = paje;
                return convertMediumToSend({...mediumData, med: 'Pajé'});
            };
            const oldMediumObj = extractMediumData(oldPaje);
            const oldPajeObj = extractPajeData(oldPaje);
            const newMediumObj = extractMediumData(newPaje);
            const newPajeObj = extractPajeData(newPaje);
            const getChangedFields = (oldObj: any, newObj: any) => {
                return Object.keys(newObj).reduce((changes: any, key: string) => {
                    if (newObj[key] !== oldObj[key]) {
                        changes[key] = newObj[key];
                    }
                    return changes;
                }, {} as Record<string, any>);
            }
            const mediumChanges = getChangedFields(oldMediumObj, newMediumObj);
            const pajeChanges = getChangedFields(oldPajeObj, newPajeObj);
            if (Object.keys(mediumChanges).length > 0 || Object.keys(pajeChanges).length > 0) {
                await Confirm('Tem certeza que quer editar este pajé?', 'question', 'Cancelar', 'Confirmar', async () => {
                    if (Object.keys(mediumChanges).length > 0) {
                        await api.put('/medium/update', {medium_id: oldMediumObj.medium_id, ...mediumChanges}, {headers:{Authorization: token}});
                    }
                    if (Object.keys(pajeChanges).length > 0) {
                        await api.put('/paje/update', {medium: oldMediumObj.medium_id, ...pajeChanges}, {headers:{Authorization: token}});
                    }
                    if (newMediumObj.foto && newMediumObj.foto !== oldMediumObj.foto) {
                        await uploadImage(oldMediumObj.medium_id, 'Pajé', token, photo);
                        console.log('foto editada')
                    } else if (updatePhoto && photo) {
                        await uploadImage(oldMediumObj.medium_id, 'Pajé', token, photo)
                    }
                    Alert('Pajé editado com sucesso', 'success');
                    await loadPaje(token);
                    navigate(`/mediuns/paje/${params.id}`);
                })
            } else if (updatePhoto && photo) {
                await Confirm('Tem certeza que quer editar este pajé?', 'question', 'Cancelar', 'Confirmar', async () => {
                    await uploadImage(oldMediumObj.medium_id, 'Pajé', token, photo);
                    console.log('foto editada');
                    Alert('Pajé editado com sucesso', 'success');
                    await loadPaje(token);
                    navigate(`/mediuns/paje/${params.id}`);
                });
            } else {
                Alert('Não foi feita nenhuma alteração no pajé', 'info')
            }
            
        } catch (error) {
            console.log('Não foi possível editar o pajé', error);
            Alert('Não foi possível editar o pajé', 'error');
        }
    }

    const handleEditPaje = async (newPaje: IPaje, oldPaje: IPaje, token: string) => {
        if ((newPaje.condicao !== oldPaje.condicao && newPaje.condicao !== 'Afastado') || (newPaje.templo !== oldPaje.templo)) {
            setShowModal(true);
        } else {
            await editPaje(newPaje, oldPaje, token);
        }
    }

    const closeModal = () => {
        setDataTransf('');
        setDataCondicao('');
        setShowModal(false);
    }

    if(loading) {
        return <Loading />
    }

    if(!paje) {
        return <PageNotFound />
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <PersonalCard>
                    <MainContent>
                        <MainFieldsContainer>
                            <SectionTitle>Editar Pajé</SectionTitle>
                            <SectionTitle>{selected.nome} - ID: {selected.medium_id.toString().padStart(5, '0')}</SectionTitle>
                            <FieldContainer>
                                <label>Nome Pajé: </label>
                                <input type="text" value={paje.nome} onChange={(e) => updateProps('nome', formatInputText(e.target.value))}/>
                                <label>Sexo: </label>
                                <input type="text" value={paje.sex} disabled />
                            </FieldContainer>
                            <GridContainer>
                                <label>Templo: </label>
                                <select value={paje.templo} onChange={(e) => updateProps('templo', Number(e.target.value))}>
                                    <option value={0}></option>
                                    {templos.map((item: ITemplo, index: number) => (
                                        <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                                    ))}
                                </select>
                                <label>Condição Atual: </label>
                                <select value={paje.condicao} onChange={(e) => updateProps('condicao', e.target.value)}>
                                    <option value={'Ativo'}>Ativo</option>
                                    <option value={'Afastado'}>Afastado</option>
                                    <option value={'Entregou as Armas'}>Entregou as Armas</option>
                                    <option value={'Desencarnado'}>Desencarnado</option>
                                </select>
                            </GridContainer>
                        </MainFieldsContainer>
                        <PhotoPosition hide={!photo && !paje.foto}>
                            <PhotoContainer photo={preview}>
                                {photo || paje.foto? '' : 'Clique aqui para adicionar uma foto'}
                                <input type="file" accept="image/*" onChange={imageUpdate} />
                            </PhotoContainer>
                            <span onClick={removeImage}>Remover foto</span>
                        </PhotoPosition>
                    </MainContent>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" color="red" onClick={() => navigate(`/mediuns/paje/${params.id}`)}>Cancelar</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validatePaje(paje, async () => await handleEditPaje(paje, selected, token))}>Salvar</NavigateButton>
                </div>
                <PersonalCard>
                    <SectionTitle>Dados Pessoais</SectionTitle>
                    <GridContainer>
                        <label>Data Nascimento: </label>
                        <input type="date" value={paje.dtNasc} onChange={(e) => updateProps('dtNasc', e.target.value)} max={now} />
                        <label>Profissão: </label>
                        <input type="text" value={paje.profissao} onChange={(e) => updateProps('profissao', formatInputText(e.target.value))}/>
                        <label>RG: </label>
                        <input type="text" value={paje.rg} onChange={(e) => updateProps('rg', e.target.value)}/>
                        <label>CPF: </label>
                        <input type="text" maxLength={14} value={paje.cpf} onChange={(e) => updateProps('cpf', formatCpf(e.target.value))}/>
                        <label>Mãe: </label>
                        <input type="text" value={paje.mae} onChange={(e) => updateProps('mae', formatInputText(e.target.value))}/>
                        <label>Pai: </label>
                        <input type="text" value={paje.pai} onChange={(e) => updateProps('pai', formatInputText(e.target.value))}/>
                        <label>Natural de: </label>
                        <input type="text" value={paje.natur} onChange={(e) => updateProps('natur', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={paje.naturUF} onChange={(e) => updateProps('naturUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Estado Civil: </label>
                        <select value={paje.estCivil} onChange={(e) => updateProps('estCivil', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                        <label>Cônjuge: </label>
                        <input type="text" value={paje.conjuge} onChange={(e) => updateProps('conjuge', formatInputText(e.target.value))}/>
                        <label>CEP: </label>
                        <input type="text" maxLength={9} value={paje.cep} onChange={(e) => updateProps('cep', formatCep(e.target.value))} onBlur={fillAddressByCep}/>
                        <label>Endereço: </label>
                        <input type="text" value={paje.endereco} onChange={(e) => updateProps('endereco', formatInputText(e.target.value))}/>
                        <label>Número: </label>
                        <input type="text" value={paje.endNumero} onChange={(e) => updateProps('endNumero', e.target.value)}/>
                        <label>Complemento: </label>
                        <input type="text" value={paje.endCompl} onChange={(e) => updateProps('endCompl', formatInputText(e.target.value))}/>
                        <label>Bairro: </label>
                        <input type="text" value={paje.endBairro} onChange={(e) => updateProps('endBairro', formatInputText(e.target.value))}/>
                        <label>Cidade: </label>
                        <input type="text" value={paje.endCidade} onChange={(e) => updateProps('endCidade', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={paje.endUF} onChange={(e) => updateProps('endUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Telefone: </label>
                        <input type="tel" maxLength={15} value={paje.telefone1} onChange={(e) => updateProps('telefone1', formatPhoneNumber(e.target.value))}/>
                        <label>E-mail: </label>
                        <input type="email" value={paje.email} onChange={(e) => updateProps('email', e.target.value.toLowerCase())}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados do Responsável</SectionTitle>
                    <GridContainer>
                        <label>Responsável: </label>
                        <input type="text" value={paje.responsavel} onChange={(e) => updateProps('responsavel', formatInputText(e.target.value))}/>
                        <label>Parentesco: </label>
                        <input type="text" value={paje.parentesco} onChange={(e) => updateProps('parentesco', formatInputText(e.target.value))}/>
                        <label>Contato Responsável: </label>
                        <input type="tel" maxLength={15} value={paje.contatoResp} onChange={(e) => updateProps('contatoResp', formatPhoneNumber(e.target.value))}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados Mediúnicos</SectionTitle>
                    <GridContainer>
                        <label>Ingresso Falange: </label>
                        <input type="date" value={paje.dtFalange} onChange={(e) => updateProps('dtFalange', e.target.value)} min={paje.dtNasc} max={now} />
                        <label>Templo Origem: </label>
                        <select value={paje.temploOrigem} disabled={user.level !== 'Administrador' && Boolean(paje.temploOrigem)} onChange={(e) => updateProps('temploOrigem', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Falange Missionária: </label>
                        <select value={paje.falMiss} onChange={(e) => updateProps('falMiss', Number(e.target.value))}>
                            <option value={0}></option>
                            {listFalMiss.map((item: IFalange, index: number) => (
                                <option key={index} value={item.falange_id}>{item.nome}</option>
                            ))}
                        </select>
                        <label>Adjunto Devas: </label>
                        <select value={paje.adjDevas} disabled={!paje.falMiss} onChange={(e) => updateProps('adjDevas', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Adejã'}>Adejã</option>
                            <option value={'Alufã'}>Alufã</option>
                        </select>
                        <label>Nome na emissão: </label>
                        <input type="text" value={paje.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', formatInputText(e.target.value))}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Observações</SectionTitle>
                    <Observations value={paje.observ} onChange={(e) => updateProps('observ', e.target.value)}/>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" color="red" onClick={() => navigate(`/mediuns/paje/${params.id}`)}>Cancelar</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validatePaje(paje, async () => await handleEditPaje(paje, selected, token))}>Salvar</NavigateButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Datas</ModalTitle>
                    {paje.condicao !== selected.condicao && paje.condicao !== 'Afastado' ?
                        <ModalInputContainer>
                            <label>Data de {paje.condicao === 'Ativo' ? 'retorno à doutrina' : paje.condicao === 'Entregou as Armas' ? 'entrega das armas' : paje.condicao === 'Desencarnado' ? 'desencarne' : ''}</label>
                            <input type="date" value={dataCondicao} onKeyUp={(e) => handleEnterPress(e, async () => await editPaje(paje, selected, token))} onChange={(e) => setDataCondicao(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {paje.templo !== selected.templo ?
                        <ModalInputContainer>
                            <label>Data de transferência de templo</label>
                            <input type="date" value={dataTransf} onKeyUp={(e) => handleEnterPress(e, async () => await editPaje(paje, selected, token))} onChange={(e) => setDataTransf(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={closeModal}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={async () => await editPaje(paje, selected, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default EditYoungMedium