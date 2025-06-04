import { useContext, useState, useEffect, useCallback } from "react";
import { ListContext } from "src/contexts/ListContext";
import { FieldContainer, GridContainer } from "./styles";
import { IEstado, IFalange, IMenor, ITemplo } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { MediumContext } from "src/contexts/MediumContext";
import { convertDate, formatCep, formatCpf, formatInputText, formatPhoneNumber, handleEnterPress } from "src/utilities/functions";
import { Alert, Confirm } from "src/utilities/popups";
import axios from "axios";
import { validateMenor } from "src/utilities/validations";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "src/utilities/Loading";
import PageNotFound from "src/pages/PageNotFound/PageNotFound";
import { defaultMenor } from "src/utilities/default";
import { Modal, ModalButton, ModalContent, ModalInputContainer, ModalTitle } from "src/components/Modal/modal";
import MainContainer from "src/components/MainContainer/MainContainer";
import { NavigateButton } from "src/components/buttons/buttons";
import { PersonalCard } from "src/components/cardsContainers/cardsContainers";
import { Observations, SectionTitle } from "src/components/texts/texts";

function EditYoungMedium() {
    const { menores, loadMenor, convertMenorToSend, templos, estados, falMiss, getData } = useContext(ListContext);
    const { user, token, getUser } = useContext(UserContext);
    const { mediuns } = useContext(MediumContext);
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [menor, setMenor] = useState(defaultMenor);
    const [selected, setSelected] = useState(defaultMenor);
    const [listFalMiss, setListFalMiss] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dataTransf, setDataTransf] = useState('');
    const [dataCondicao, setDataCondicao] = useState('');

    const now = new Date().toISOString().split('T')[0];

    const defineMenor = useCallback(() => {
        const foundMenor: IMenor = menores.find((item: IMenor) => item.menor_id === Number(params.id));
        setMenor(foundMenor);
        setSelected(foundMenor);
    }, [params.id, menores]);
    
    const getInfo = useCallback(async () => {
        try {
            await loadMenor(token);
            await getData(token);
            await getUser(token);
        } catch (error) {
            console.error('Erro ao buscar informações', error);
            Alert('Erro ao buscar informações', 'error');
        }
    }, [loadMenor, getData, getUser, token])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    
    useEffect(() => {
        getInfo();
    }, [getInfo])
    
    useEffect(() => {
        if(mediuns.length > 0){
            defineMenor();
        }
    }, [mediuns, params.id, defineMenor])
    
    useEffect(() => {
        console.log(menor)
        if(menor.menor_id) {
            setLoading(false);
        }
    }, [menor])

    useEffect(() => {
        switch (menor.sex) {
            case 'Masculino':
                setListFalMiss(falMiss.filter((item: IFalange) => item.ninfa === false));
                break;
            case 'Feminino':
                setListFalMiss(falMiss.filter((item: IFalange) => [1, 4, 5].includes(item.falange_id)));
                break;
            default:
                setListFalMiss([]);
        }
    }, [menor.sex, falMiss])

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]

    const fillAddressByCep = async () => {
        const cepNumber = menor.cep.replace(/\D/g,'')
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
        setMenor((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };

    const generateObserv = (newMenor: IMenor, oldMenor: IMenor) => {
        const contentArray = [newMenor.observ];
        if (dataCondicao) {
            const message = newMenor.condicao === 'Ativo' ? `Retornou à doutrina em ${convertDate(dataCondicao)}` : newMenor.condicao === 'Entregou as Armas' ? `Entregou as armas em ${convertDate(dataCondicao)}` : newMenor.condicao === 'Desencarnado' ? `Desencarnou em ${convertDate(dataCondicao)}` : '';
            contentArray.push(message);
        }
        if (dataTransf) {
            const oldTemplo = templos.find((item: ITemplo) => item.templo_id === oldMenor.templo);
            const newTemplo = templos.find((item: ITemplo) => item.templo_id === newMenor.templo);
            const message = `Transferido de ${oldTemplo?.cidade} - ${oldTemplo?.estado.abrev} para o templo de ${newTemplo?.cidade} - ${newTemplo?.estado.abrev} em ${convertDate(dataTransf)}`;
            contentArray.push(message);
        }
        closeModal();
        return contentArray.length > 1 ? contentArray.filter(Boolean).join('. ') : newMenor.observ;
    }

    const editMedium = async (newMenor: IMenor, oldMenor: IMenor, token: string) => {
        newMenor.observ = generateObserv(newMenor, oldMenor);
        const newMenorObj = convertMenorToSend(newMenor);
        const oldMenorObj = convertMenorToSend(oldMenor);
        const changedFields = {} as any
        for (const key in newMenorObj){
            if (newMenorObj[key as keyof IMenor] !== oldMenorObj[key as keyof IMenor]){
                changedFields[key as keyof IMenor] = newMenorObj[key as keyof IMenor]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await Confirm('Tem certeza que quer editar este médium menor?', 'question', 'Cancelar', 'Confirmar', async () => {
                    await api.put('/menor/update', {menor_id: oldMenorObj.menor_id, ...changedFields}, {headers:{Authorization: token}})
                    Alert('Médium menor editado com sucesso', 'success');
                    await loadMenor(token);
                    navigate(`/mediuns/menor/${params.id}`);
                })
            } catch (error) {
                console.log('Não foi possível editar o médium menor', error);
                Alert('Não foi possível editar o médium menor', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no médium menor', 'info')
        }
    }

    const handleEditMenor = async (newMedium: IMenor, oldMedium: IMenor, token: string) => {
        if ((newMedium.condicao !== oldMedium.condicao && newMedium.condicao !== 'Afastado') || (newMedium.templo !== oldMedium.templo)) {
            setShowModal(true);
        } else {
            await editMedium(newMedium, oldMedium, token);
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

    if(!menor) {
        return <PageNotFound />
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <PersonalCard>
                    <SectionTitle>Editar Médium Menor</SectionTitle>
                    <FieldContainer>
                        <label>Nome Médium: </label>
                        <input type="text" value={menor.nome} onChange={(e) => updateProps('nome', formatInputText(e.target.value))}/>
                        <label>Sexo: </label>
                        <input type="text" value={menor.sex} disabled />
                    </FieldContainer>
                    <GridContainer>
                        <label>Templo: </label>
                        <select value={menor.templo} onChange={(e) => updateProps('templo', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Condição Atual: </label>
                        <select value={menor.condicao} onChange={(e) => updateProps('condicao', e.target.value)}>
                            <option value={'Ativo'}>Ativo</option>
                            <option value={'Afastado'}>Afastado</option>
                            <option value={'Entregou as Armas'}>Entregou as Armas</option>
                            <option value={'Desencarnado'}>Desencarnado</option>
                        </select>
                    </GridContainer>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" color="red" onClick={() => navigate(`/mediuns/menor/${params.id}`)}>Cancelar</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validateMenor(menor, async () => await handleEditMenor(menor, selected, token))}>Salvar</NavigateButton>
                </div>
                <PersonalCard>
                    <SectionTitle>Dados Pessoais</SectionTitle>
                    <GridContainer>
                        <label>Data Nascimento: </label>
                        <input type="date" value={menor.dtNasc} onChange={(e) => updateProps('dtNasc', e.target.value)} max={now} />
                        <label>Profissão: </label>
                        <input type="text" value={menor.profissao} onChange={(e) => updateProps('profissao', formatInputText(e.target.value))}/>
                        <label>RG: </label>
                        <input type="text" value={menor.rg} onChange={(e) => updateProps('rg', e.target.value)}/>
                        <label>CPF: </label>
                        <input type="text" maxLength={14} value={menor.cpf} onChange={(e) => updateProps('cpf', formatCpf(e.target.value))}/>
                        <label>Mãe: </label>
                        <input type="text" value={menor.mae} onChange={(e) => updateProps('mae', formatInputText(e.target.value))}/>
                        <label>Pai: </label>
                        <input type="text" value={menor.pai} onChange={(e) => updateProps('pai', formatInputText(e.target.value))}/>
                        <label>Natural de: </label>
                        <input type="text" value={menor.natur} onChange={(e) => updateProps('natur', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={menor.naturUF} onChange={(e) => updateProps('naturUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Estado Civil: </label>
                        <select value={menor.estCivil} onChange={(e) => updateProps('estCivil', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                        <label>Cônjuge: </label>
                        <input type="text" value={menor.conjuge} onChange={(e) => updateProps('conjuge', formatInputText(e.target.value))}/>
                        <label>CEP: </label>
                        <input type="text" maxLength={9} value={menor.cep} onChange={(e) => updateProps('cep', formatCep(e.target.value))} onBlur={fillAddressByCep}/>
                        <label>Endereço: </label>
                        <input type="text" value={menor.endereco} onChange={(e) => updateProps('endereco', formatInputText(e.target.value))}/>
                        <label>Número: </label>
                        <input type="text" value={menor.endNumero} onChange={(e) => updateProps('endNumero', e.target.value)}/>
                        <label>Complemento: </label>
                        <input type="text" value={menor.endCompl} onChange={(e) => updateProps('endCompl', formatInputText(e.target.value))}/>
                        <label>Bairro: </label>
                        <input type="text" value={menor.endBairro} onChange={(e) => updateProps('endBairro', formatInputText(e.target.value))}/>
                        <label>Cidade: </label>
                        <input type="text" value={menor.endCidade} onChange={(e) => updateProps('endCidade', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={menor.endUF} onChange={(e) => updateProps('endUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Telefone: </label>
                        <input type="tel" maxLength={15} value={menor.telefone1} onChange={(e) => updateProps('telefone1', formatPhoneNumber(e.target.value))}/>
                        <label>Tel. Emergência: </label>
                        <input type="tel" maxLength={15} value={menor.telefone2} onChange={(e) => updateProps('telefone2', formatPhoneNumber(e.target.value))}/>
                        <label>E-mail: </label>
                        <input type="email" value={menor.email} onChange={(e) => updateProps('email', e.target.value.toLowerCase())}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados do Responsável</SectionTitle>
                    <GridContainer>
                        <label>Responsável: </label>
                        <input type="text" value={menor.responsavel} onChange={(e) => updateProps('responsavel', formatInputText(e.target.value))}/>
                        <label>Parentesco: </label>
                        <input type="text" value={menor.parentesco} onChange={(e) => updateProps('parentesco', formatInputText(e.target.value))}/>
                        <label>Contato Responsável: </label>
                        <input type="tel" maxLength={15} value={menor.contatoResp} onChange={(e) => updateProps('contatoResp', formatPhoneNumber(e.target.value))}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados Mediúnicos</SectionTitle>
                    <GridContainer>
                        <label>Templo Origem: </label>
                        <select value={menor.temploOrigem} disabled={user.level !== 'Administrador' && Boolean(menor.temploOrigem)} onChange={(e) => updateProps('temploOrigem', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Nome na emissão: </label>
                        <input type="text" value={menor.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', formatInputText(e.target.value))}/>
                        <label>Falange Missionária: </label>
                        <select value={menor.falMiss} onChange={(e) => updateProps('falMiss', Number(e.target.value))}>
                            <option value={0}></option>
                            {listFalMiss.map((item: IFalange, index: number) => (
                                <option key={index} value={item.falange_id}>{item.nome}</option>
                            ))}
                        </select>
                        <label>Adjunto Devas: </label>
                        <select value={menor.adjDevas} disabled={!menor.falMiss} onChange={(e) => updateProps('adjDevas', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Adejã'}>Adejã</option>
                            <option value={'Alufã'}>Alufã</option>
                        </select>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Observações</SectionTitle>
                    <Observations value={menor.observ} onChange={(e) => updateProps('observ', e.target.value)}/>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" color="red" onClick={() => navigate(`/mediuns/menor/${params.id}`)}>Cancelar</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validateMenor(menor, async () => await handleEditMenor(menor, selected, token))}>Salvar</NavigateButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Datas</ModalTitle>
                    {menor.condicao !== selected.condicao && menor.condicao !== 'Afastado' ?
                        <ModalInputContainer>
                            <label>Data de {menor.condicao === 'Ativo' ? 'retorno à doutrina' : menor.condicao === 'Entregou as Armas' ? 'entrega das armas' : menor.condicao === 'Desencarnado' ? 'desencarne' : ''}</label>
                            <input type="date" value={dataCondicao} onKeyUp={(e) => handleEnterPress(e, async () => await editMedium(menor, selected, token))} onChange={(e) => setDataCondicao(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    {menor.templo !== selected.templo ?
                        <ModalInputContainer>
                            <label>Data de transferência de templo</label>
                            <input type="date" value={dataTransf} onKeyUp={(e) => handleEnterPress(e, async () => await editMedium(menor, selected, token))} onChange={(e) => setDataTransf(e.target.value)} />
                        </ModalInputContainer>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={closeModal}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={async () => await editMedium(menor, selected, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default EditYoungMedium