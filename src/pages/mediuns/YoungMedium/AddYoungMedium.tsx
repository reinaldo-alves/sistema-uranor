import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "src/contexts/ListContext";
import { FieldContainer, GridContainer, Observations, PersonalCard, SectionTitle } from "./styles";
import { IEstado, IFalange, IMenor, ITemplo } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { formatCep, formatCpf, formatInputText, formatPhoneNumber } from "src/utilities/functions";
import { Alert } from "src/utilities/popups";
import axios from "axios";
import { defaultMenor } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import MainContainer from "src/components/MainContainer/MainContainer";
import { validateMenor } from "src/utilities/validations";
import { NavigateButton } from "src/components/buttons/buttons";

function AddYoungMedium() {
    const { templos, estados, falMiss, loadMenor, convertMenorToSend } = useContext(ListContext);
    const { token } = useContext(UserContext);

    const [newMenor, setNewMenor] = useState(defaultMenor);
    const [listFalMiss, setListFalMiss] = useState([]);

    const now = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();

    useEffect(() => {
        console.log(newMenor)
    }, [newMenor])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])

    useEffect(() => {
        switch (newMenor.sex) {
            case 'Masculino':
                setListFalMiss(falMiss.filter((item: IFalange) => item.ninfa === false));
                break;
            case 'Feminino':
                setListFalMiss(falMiss.filter((item: IFalange) => [1, 4, 5].includes(item.falange_id)));
                break;
            default:
                setListFalMiss([]);
        }
    }, [newMenor.sex, falMiss])

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]

    const fillAddressByCep = async () => {
        const cepNumber = newMenor.cep.replace(/\D/g,'')
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
        setNewMenor((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };
    
    const addMedium = async (menor: IMenor, token: string) => {
        const menorObj = convertMenorToSend(menor)
        const {menor_id, ...newMenorObj} = menorObj;
        try {
            await api.post('/menor/create', newMenorObj, {headers:{Authorization: token}})
            Alert('Médium menor adicionado com sucesso', 'success');
            setNewMenor(defaultMenor);
            await loadMenor(token);
            navigate('/mediuns/menor');
        } catch (error) {
            console.log('Não foi possível adicionar o médium menor', error);
            Alert('Não foi possível adicionar o médium menor', 'error');
        }
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <PersonalCard>
                    <SectionTitle>Cadastrar Novo Médium Menor</SectionTitle>
                    <FieldContainer>
                        <label>Nome Médium: </label>
                        <input type="text" value={newMenor.nome} onChange={(e) => updateProps('nome', formatInputText(e.target.value))}/>
                        <label>Sexo: </label>
                        <select
                            value={newMenor.sex}
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
                        <select value={newMenor.templo} onChange={(e) => updateProps('templo', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Condição Atual: </label>
                        <select value={newMenor.condicao} onChange={(e) => updateProps('condicao', e.target.value)}>
                            <option value={'Ativo'}>Ativo</option>
                            <option value={'Afastado'}>Afastado</option>
                            <option value={'Entregou as Armas'}>Entregou as Armas</option>
                            <option value={'Desencarnado'}>Desencarnado</option>
                        </select>
                    </GridContainer>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" onClick={() => navigate('/mediuns/menor')}>{'< Voltar'}</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validateMenor(newMenor, async () => await addMedium(newMenor, token))}>Cadastrar</NavigateButton>
                </div>
                <PersonalCard>
                    <SectionTitle>Dados Pessoais</SectionTitle>
                    <GridContainer>
                        <label>Data Nascimento: </label>
                        <input type="date" value={newMenor.dtNasc} onChange={(e) => updateProps('dtNasc', e.target.value)} max={now} />
                        <label>Profissão: </label>
                        <input type="text" value={newMenor.profissao} onChange={(e) => updateProps('profissao', formatInputText(e.target.value))}/>
                        <label>RG: </label>
                        <input type="text" value={newMenor.rg} onChange={(e) => updateProps('rg', e.target.value)}/>
                        <label>CPF: </label>
                        <input type="text" maxLength={14} value={newMenor.cpf} onChange={(e) => updateProps('cpf', formatCpf(e.target.value))}/>
                        <label>Mãe: </label>
                        <input type="text" value={newMenor.mae} onChange={(e) => updateProps('mae', formatInputText(e.target.value))}/>
                        <label>Pai: </label>
                        <input type="text" value={newMenor.pai} onChange={(e) => updateProps('pai', formatInputText(e.target.value))}/>
                        <label>Natural de: </label>
                        <input type="text" value={newMenor.natur} onChange={(e) => updateProps('natur', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={newMenor.naturUF} onChange={(e) => updateProps('naturUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Estado Civil: </label>
                        <select value={newMenor.estCivil} onChange={(e) => updateProps('estCivil', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                        <label>Cônjuge: </label>
                        <input type="text" value={newMenor.conjuge} onChange={(e) => updateProps('conjuge', formatInputText(e.target.value))}/>
                        <label>CEP: </label>
                        <input type="text" maxLength={9} value={newMenor.cep} onChange={(e) => updateProps('cep', formatCep(e.target.value))} onBlur={fillAddressByCep}/>
                        <label>Endereço: </label>
                        <input type="text" value={newMenor.endereco} onChange={(e) => updateProps('endereco', formatInputText(e.target.value))}/>
                        <label>Número: </label>
                        <input type="text" value={newMenor.endNumero} onChange={(e) => updateProps('endNumero', e.target.value)}/>
                        <label>Complemento: </label>
                        <input type="text" value={newMenor.endCompl} onChange={(e) => updateProps('endCompl', formatInputText(e.target.value))}/>
                        <label>Bairro: </label>
                        <input type="text" value={newMenor.endBairro} onChange={(e) => updateProps('endBairro', formatInputText(e.target.value))}/>
                        <label>Cidade: </label>
                        <input type="text" value={newMenor.endCidade} onChange={(e) => updateProps('endCidade', formatInputText(e.target.value))}/>
                        <label>UF: </label>
                        <select value={newMenor.endUF} onChange={(e) => updateProps('endUF', e.target.value)}>
                            <option value={''}></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                        <label>Telefone 1: </label>
                        <input type="tel" maxLength={15} value={newMenor.telefone1} onChange={(e) => updateProps('telefone1', formatPhoneNumber(e.target.value))}/>
                        <label>Telefone 2: </label>
                        <input type="tel" maxLength={15} value={newMenor.telefone2} onChange={(e) => updateProps('telefone2', formatPhoneNumber(e.target.value))}/>
                        <label>E-mail: </label>
                        <input type="email" value={newMenor.email} onChange={(e) => updateProps('email', e.target.value.toLowerCase())}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados do Responsável</SectionTitle>
                    <GridContainer>
                        <label>Responsável: </label>
                        <input type="text" value={newMenor.responsavel} onChange={(e) => updateProps('responsavel', formatInputText(e.target.value))}/>
                        <label>Parentesco: </label>
                        <input type="text" value={newMenor.parentesco} onChange={(e) => updateProps('parentesco', formatInputText(e.target.value))}/>
                        <label>Contato Responsável: </label>
                        <input type="tel" maxLength={15} value={newMenor.contatoResp} onChange={(e) => updateProps('contatoResp', formatPhoneNumber(e.target.value))}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados Mediúnicos</SectionTitle>
                    <GridContainer>
                        <label>Templo Origem: </label>
                        <select value={newMenor.temploOrigem} onChange={(e) => updateProps('temploOrigem', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        <label>Nome na emissão: </label>
                        <input type="text" value={newMenor.nomeEmissao} onChange={(e) => updateProps('nomeEmissao', formatInputText(e.target.value))}/>
                        <label>Falange Missionária: </label>
                        <select value={newMenor.falMiss} disabled={!newMenor.sex} onChange={(e) => updateProps('falMiss', Number(e.target.value))}>
                            <option value={0}></option>
                            {listFalMiss.map((item: IFalange, index: number) => (
                                <option key={index} value={item.falange_id}>{item.nome}</option>
                            ))}
                        </select>
                        <label>Adjunto Devas: </label>
                        <select value={newMenor.adjDevas} disabled={!newMenor.falMiss} onChange={(e) => updateProps('adjDevas', e.target.value)}>
                            <option value={''}></option>
                            <option value={'Adejã'}>Adejã</option>
                            <option value={'Alufã'}>Alufã</option>
                        </select>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Observações</SectionTitle>
                    <Observations value={newMenor.observ} onChange={(e) => updateProps('observ', e.target.value)}/>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" onClick={() => navigate('/mediuns/menor')}>{'< Voltar'}</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validateMenor(newMenor, async () => await addMedium(newMenor, token))}>Cadastrar</NavigateButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default AddYoungMedium