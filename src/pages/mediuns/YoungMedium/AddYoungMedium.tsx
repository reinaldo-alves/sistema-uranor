import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "src/contexts/ListContext";
import { FieldContainer, GridContainer, MainContent, MainFieldsContainer, PhotoContainer } from "./styles";
import { IEstado, IFalange, IPaje, ITemplo } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { formatCep, formatCpf, formatInputText, formatPhoneNumber } from "src/utilities/functions";
import { Alert } from "src/utilities/popups";
import axios from "axios";
import { defaultPaje } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import MainContainer from "src/components/MainContainer/MainContainer";
import { validatePaje } from "src/utilities/validations";
import { NavigateButton } from "src/components/buttons/buttons";
import { PersonalCard } from "src/components/cardsContainers/cardsContainers";
import { Observations, SectionTitle } from "src/components/texts/texts";
import { MediumContext } from "src/contexts/MediumContext";

function AddYoungMedium() {
    const { templos, estados, falMiss, loadPaje, convertPajeToSend } = useContext(ListContext);
    const { token } = useContext(UserContext);
    const { uploadImage, convertMediumToSend } = useContext(MediumContext);

    const [newPaje, setNewPaje] = useState(defaultPaje);
    const [listFalMiss, setListFalMiss] = useState([]);
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const now = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();

    useEffect(() => {
        console.log(newPaje)
    }, [newPaje])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])

    useEffect(() => {
        switch (newPaje.sex) {
            case 'Masculino':
                setListFalMiss(falMiss.filter((item: IFalange) => item.ninfa === false));
                break;
            case 'Feminino':
                setListFalMiss(falMiss.filter((item: IFalange) => [1, 4, 5].includes(item.falange_id)));
                break;
            default:
                setListFalMiss([]);
        }
    }, [newPaje.sex, falMiss])

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Pajé', click: '/mediuns/paje'}
    ]

    const fillAddressByCep = async () => {
        const cepNumber = newPaje.cep.replace(/\D/g,'')
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
        setNewPaje((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
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
    
    const addMedium = async (paje: IPaje, token: string) => {
        const {medium_id, dtFalange, responsavel, parentesco, contatoResp, ...mediumObj} = paje;
        const newMediumObj = convertMediumToSend({...mediumObj, med: 'Pajé'});
        const newPajeObj = convertPajeToSend({dtFalange, responsavel, parentesco, contatoResp})
        try {
            const response = await api.post('/medium/create', newMediumObj, {headers:{Authorization: token}});
            const { medium_id } = response.data;
            await uploadImage(medium_id, 'Pajé', token, photo);
            await api.post('/paje/create', {medium: medium_id, ...newPajeObj}, {headers:{Authorization: token}});
            Alert('Pajé adicionado com sucesso', 'success');
            setNewPaje(defaultPaje);
            await loadPaje(token);
            navigate('/mediuns/paje');
        } catch (error) {
            console.log('Não foi possível adicionar o pajé', error);
            Alert('Não foi possível adicionar o pajé', 'error');
        }
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <PersonalCard>
                    <MainContent>
                        <MainFieldsContainer>
                            <SectionTitle>Cadastrar Novo Pajé</SectionTitle>
                            <FieldContainer>
                                <label>Nome Pajé: </label>
                                <input type="text" value={newPaje.nome} onChange={(e) => updateProps('nome', formatInputText(e.target.value))}/>
                                <label>Sexo: </label>
                                <select
                                    value={newPaje.sex}
                                    onChange={(e) => {
                                        updateProps('sex', e.target.value);
                                        updateProps('falMiss', 0);
                                    }}
                                >
                                    <option value={''}></option>
                                    <option value={'Feminino'}>Feminino</option>
                                    <option value={'Masculino'}>Masculino</option>
                                </select>
                            </FieldContainer>
                            <GridContainer>
                                <label>Templo: </label>
                                <select value={newPaje.templo} onChange={(e) => updateProps('templo', Number(e.target.value))}>
                                    <option value={0}></option>
                                    {templos.map((item: ITemplo, index: number) => (
                                        <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                                    ))}
                                </select>
                                <label>Condição Atual: </label>
                                <select value={newPaje.condicao} onChange={(e) => updateProps('condicao', e.target.value)}>
                                    <option value={'Ativo'}>Ativo</option>
                                    <option value={'Afastado'}>Afastado</option>
                                    <option value={'Entregou as Armas'}>Entregou as Armas</option>
                                    <option value={'Desencarnado'}>Desencarnado</option>
                                </select>
                            </GridContainer>
                        </MainFieldsContainer>
                        <PhotoContainer photo={preview}>
                            {photo? '' : 'Clique aqui para adicionar uma foto'}
                            <input type="file" accept="image/*" onChange={imageUpdate} />
                        </PhotoContainer>
                    </MainContent>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" onClick={() => navigate('/mediuns/paje')}>{'< Voltar'}</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validatePaje(newPaje, async () => await addMedium(newPaje, token))}>Cadastrar</NavigateButton>
                </div>
                <PersonalCard>
                    <SectionTitle>Dados Pessoais</SectionTitle>
                    <GridContainer>
                        <label>Data Nascimento: </label>
                        <input type="date" value={newPaje.dtNasc} onChange={(e) => updateProps('dtNasc', e.target.value)} max={now} />
                        <label>Profissão: </label>
                        <input type="text" value={newPaje.profissao} onChange={(e) => updateProps('profissao', formatInputText(e.target.value))}/>
                        <label>RG: </label>
                        <input type="text" value={newPaje.rg} onChange={(e) => updateProps('rg', e.target.value)}/>
                        <label>CPF: </label>
                        <input type="text" maxLength={14} value={newPaje.cpf} onChange={(e) => updateProps('cpf', formatCpf(e.target.value))}/>
                        <label>Mãe: </label>
                        <input type="text" value={newPaje.mae} onChange={(e) => updateProps('mae', formatInputText(e.target.value))}/>
                        <label>Pai: </label>
                        <input type="text" value={newPaje.pai} onChange={(e) => updateProps('pai', formatInputText(e.target.value))}/>
                        <label>Natural de: </label>
                        <input type="text" value={newPaje.natur} onChange={(e) => updateProps('natur', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={newPaje.naturUF} onChange={(e) => updateProps('naturUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Estado Civil: </label>
                        <select value={newPaje.estCivil} onChange={(e) => updateProps('estCivil', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                        <label>Cônjuge: </label>
                        <input type="text" value={newPaje.conjuge} onChange={(e) => updateProps('conjuge', formatInputText(e.target.value))}/>
                        <label>CEP: </label>
                        <input type="text" maxLength={9} value={newPaje.cep} onChange={(e) => updateProps('cep', formatCep(e.target.value))} onBlur={fillAddressByCep}/>
                        <label>Endereço: </label>
                        <input type="text" value={newPaje.endereco} onChange={(e) => updateProps('endereco', formatInputText(e.target.value))}/>
                        <label>Número: </label>
                        <input type="text" value={newPaje.endNumero} onChange={(e) => updateProps('endNumero', e.target.value)}/>
                        <label>Complemento: </label>
                        <input type="text" value={newPaje.endCompl} onChange={(e) => updateProps('endCompl', formatInputText(e.target.value))}/>
                        <label>Bairro: </label>
                        <input type="text" value={newPaje.endBairro} onChange={(e) => updateProps('endBairro', formatInputText(e.target.value))}/>
                        <label>Cidade: </label>
                        <input type="text" value={newPaje.endCidade} onChange={(e) => updateProps('endCidade', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={newPaje.endUF} onChange={(e) => updateProps('endUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Telefone: </label>
                        <input type="tel" maxLength={15} value={newPaje.telefone1} onChange={(e) => updateProps('telefone1', formatPhoneNumber(e.target.value))}/>
                        <label>E-mail: </label>
                        <input type="email" value={newPaje.email} onChange={(e) => updateProps('email', e.target.value.toLowerCase())}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados do Responsável</SectionTitle>
                    <GridContainer>
                        <label>Responsável: </label>
                        <input type="text" value={newPaje.responsavel} onChange={(e) => updateProps('responsavel', formatInputText(e.target.value))}/>
                        <label>Parentesco: </label>
                        <input type="text" value={newPaje.parentesco} onChange={(e) => updateProps('parentesco', formatInputText(e.target.value))}/>
                        <label>Contato Responsável: </label>
                        <input type="tel" maxLength={15} value={newPaje.contatoResp} onChange={(e) => updateProps('contatoResp', formatPhoneNumber(e.target.value))}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados Mediúnicos</SectionTitle>
                    <GridContainer>
                        <label>Ingresso Falange: </label>
                        <input type="date" value={newPaje.dtFalange} onChange={(e) => updateProps('dtFalange', e.target.value)} min={newPaje.dtNasc} max={now} />
                        <label>Templo Origem: </label>
                        <select value={newPaje.temploOrigem} onChange={(e) => updateProps('temploOrigem', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Falange Missionária: </label>
                        <select value={newPaje.falMiss} disabled={!newPaje.sex} onChange={(e) => updateProps('falMiss', Number(e.target.value))}>
                            <option value={0}></option>
                            {listFalMiss.map((item: IFalange, index: number) => (
                                <option key={index} value={item.falange_id}>{item.nome}</option>
                            ))}
                        </select>
                        <label>Adjunto Devas: </label>
                        <select value={newPaje.adjDevas} disabled={!newPaje.falMiss} onChange={(e) => updateProps('adjDevas', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Adejã'}>Adejã</option>
                            <option value={'Alufã'}>Alufã</option>
                        </select>
                        <label>Nome na emissão: </label>
                        <input type="text" value={newPaje.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', formatInputText(e.target.value))}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Observações</SectionTitle>
                    <Observations value={newPaje.observ} onChange={(e) => updateProps('observ', e.target.value)}/>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" onClick={() => navigate('/mediuns/paje')}>{'< Voltar'}</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validatePaje(newPaje, async () => await addMedium(newPaje, token))}>Cadastrar</NavigateButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default AddYoungMedium