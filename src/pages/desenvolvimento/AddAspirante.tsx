import { useContext, useState, useEffect } from "react";
import { ListContext } from "src/contexts/ListContext";
import { FieldContainer, GridContainer, MainContent, MainInfoContainer, PhotoContainer } from "./styles";
import { IDesenvolvimento, IEstado, IMedium, IMentor, ITemplo } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { MediumContext } from "src/contexts/MediumContext";
import { formatCep, formatCpf, formatInputText, formatPhoneNumber } from "src/utilities/functions";
import { Alert } from "src/utilities/popups";
import axios from "axios";
import { validateAspirante } from "src/utilities/validations";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultAdj, defaultMedium } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import MainContainer from "src/components/MainContainer/MainContainer";
import { NavigateButton } from "src/components/buttons/buttons";
import { PersonalCard } from "src/components/cardsContainers/cardsContainers";
import { Observations, SectionTitle } from "src/components/texts/texts";

function AddAspirante() {
    const { templos, estados, adjuntos, ministros, princesas, loadDesenvolvimento, allFrequencia } = useContext(ListContext);
    const { token } = useContext(UserContext);
    const { loadMedium, convertMediumToSend, uploadImage } = useContext(MediumContext);

    const [newMedium, setNewMedium] = useState(defaultMedium);
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dropPres, setDropPres] = useState(defaultAdj);
    const [searchPres, setSearchPres] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const now = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();

    useEffect(() => {
        console.log(newMedium)
    }, [newMedium])

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

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Frequência', click: '/desenvolvimento/frequencia'},
        {title: 'Cadastrar Aspirante', click: '/desenvolvimento/cadastro'},
        {title: 'Documentos', click: '/desenvolvimento/documentos'}
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
        setSelectedMonth('');
        setPhoto(null);
        setPreview(null);
    }
    
    const addMediumInDesenv = async (medium_id: number) => {
        const findFrequencia = allFrequencia.find((item: IDesenvolvimento) => item.mes === selectedMonth);
        const frequencia = findFrequencia ? findFrequencia : {mes: selectedMonth, frequencia: []}
        console.log('frequencia é ', frequencia);
        const frequenciaArray = [
            ...frequencia.frequencia,
            {medium: medium_id, dia1: '-', dia2: '-', dia3: '-', dia4: '-', dia5: '-'}
        ];
        console.log('frequenciaArray é ', frequenciaArray);
        const text = JSON.stringify({frequencia: frequenciaArray});
        console.log('text é ', text);
        try {
            await api.post('/desenvolvimento/update', {mes: selectedMonth, freq: text}, {headers:{Authorization: token}})
            await loadDesenvolvimento(token);
        } catch (error) {
            console.log('Não foi possível adicionar o médium ao desenvolvimento', error);
            Alert('Não foi possível adicionar o médium ao desenvolvimento', 'error');
        }
    };

    const addMedium = async (medium: IMedium, token: string) => {
        const mediumObj = convertMediumToSend(medium)
        const {medium_id, ...newMediumObj} = mediumObj;
        try {
            const response = await api.post('/medium/create', newMediumObj, {headers:{Authorization: token}})
            const { medium_id } = response.data;
            await uploadImage(medium_id, newMediumObj.med, token, photo);
            await loadMedium(token);
            await addMediumInDesenv(medium_id);
            Alert('Médium adicionado com sucesso', 'success');
            resetNewMedium();
            navigate('/desenvolvimento/frequencia');
        } catch (error) {
            console.log('Não foi possível adicionar o médium', error);
            Alert('Não foi possível adicionar o médium', 'error');
        }
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <PersonalCard>
                    <MainContent>
                        <MainInfoContainer>
                            <SectionTitle>Novo Médium - Desenvolvimento</SectionTitle>
                            <FieldContainer>
                                <label>Nome Médium: </label>
                                <input type="text" value={newMedium.nome} onChange={(e) => updateProps('nome', formatInputText(e.target.value))}/>
                            </FieldContainer>
                            <GridContainer>
                                <label>Sexo: </label>
                                <select value={newMedium.sex} onChange={(e) => updateProps('sex', e.target.value)}>
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
                        <label>Telefone: </label>
                        <input type="tel" maxLength={15} value={newMedium.telefone1} onChange={(e) => updateProps('telefone1', formatPhoneNumber(e.target.value))}/>
                        <label>Tel. Emergência: </label>
                        <input type="tel" maxLength={15} value={newMedium.telefone2} onChange={(e) => updateProps('telefone2', formatPhoneNumber(e.target.value))}/>
                        <label>E-mail: </label>
                        <input type="text" value={newMedium.email} onChange={(e) => updateProps('email', e.target.value.toLowerCase())}/>
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Dados Mediúnicos</SectionTitle>
                    <GridContainer>
                        <label>Data Ingresso: </label>
                        <input type="date" value={newMedium.dtIngresso} onChange={(e) => {
                            updateProps('dtIngresso', e.target.value);
                            updateProps('dtTest', e.target.value);
                        }} min={newMedium.dtNasc}  max={now} />
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
                        <select value={newMedium.temploOrigem} onChange={(e) => updateProps('temploOrigem', e.target.value)}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                        {newMedium.med==='Doutrinador'?
                            <>
                                <label>Princesa: </label>
                                <select value={newMedium.princesa} onChange={(e) => updateProps('princesa', e.target.value)}>
                                    <option value={''}></option>
                                    {princesas.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </>
                        : newMedium.med==='Apará'?
                            <>
                                <label>Preto Velho: </label>
                                <input type="text" value={newMedium.pretovelho} onChange={(e) => updateProps('pretovelho', formatInputText(e.target.value))}/>
                                <label>Caboclo: </label>
                                <input type="text" value={newMedium.caboclo} onChange={(e) => updateProps('caboclo', formatInputText(e.target.value))}/>
                                <label>Médico: </label>
                                <input type="text" value={newMedium.medico} onChange={(e) => updateProps('medico', formatInputText(e.target.value))}/>
                            </>
                        : ''}
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Adicionar na Frequência</SectionTitle>
                    <GridContainer freq>
                        <label>Mês: </label>
                        <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} max={now.slice(0, 7)} />
                    </GridContainer>
                </PersonalCard>
                <PersonalCard>
                    <SectionTitle>Observações</SectionTitle>
                    <Observations value={newMedium.observ} onChange={(e) => updateProps('observ', e.target.value)}/>
                </PersonalCard>
                <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
                    <NavigateButton width="150px" height="45px" color="red" onClick={() => resetNewMedium()}>Cancelar</NavigateButton>
                    <NavigateButton width="150px" height="45px" onClick={() => validateAspirante(newMedium, selectedMonth, async () => await addMedium(newMedium, token))}>Cadastrar</NavigateButton>
                </div>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default AddAspirante