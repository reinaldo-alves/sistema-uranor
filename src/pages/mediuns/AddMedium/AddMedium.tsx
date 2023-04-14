import { useContext, useState, useEffect } from "react";
import { ListContext } from "src/contexts/ListContext";
import { FieldContainer, FieldContainerBox, InputContainer, MainContainer, MainInfoContainer, MediumButton, Observations, PersonalCard, PhotoContainer, SectionTitle } from "./styles";

interface IAdjuntos {id: string, min: string, adj: string}
interface IEstados {abrev: string, state: string}

function AddMedium() {
    const { templos, estados, adjuntos, coletes, classMest, falMest, povos, falMiss, turnoL, turnoT, ministros, cavaleiros, guias, estrelas, princesas, classificacao } = useContext(ListContext);
    
    const [med, setMed] = useState('');
    const [sex, setSex] = useState('');
    const [listClassMest, setListClassMest] = useState([]);
    const [listFalMiss, setListFalMiss] = useState([]);
    const [listTurnoL, setListTurnoL] = useState([]);
    const [listTurnoT, setListTurnoT] = useState([]);
    const [listCav, setListCav] = useState([]);
    const [listEst, setListEst] = useState([]);
    const [listClass, setListClass] = useState([]);
    const [tSol, setTSol] = useState(false);
    const [tSar, setTSar] = useState(false);
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        switch (sex) {
            case 'Masculino':
                setListFalMiss(falMiss.jaguar);
                setListTurnoL(turnoL.jaguar);
                setListTurnoT(turnoT.jaguar);
                break;
            case 'Feminino':
                setListFalMiss(falMiss.ninfa);
                setListTurnoL(turnoL.ninfa);
                setListTurnoT(turnoT.ninfa);
                break;
            default:
                setListFalMiss([]);
                setListTurnoL([]);
                setListTurnoL([]);
        }
    }, [sex])

    useEffect(() => {
        switch (sex.concat(med)) {
            case 'MasculinoDoutrinador':
                setListClassMest(classMest.MS);
                setListCav(cavaleiros.sol);
                setListClass(classificacao.sol);
                break;
            case 'MasculinoApará':
                setListClassMest(classMest.ML);
                setListCav(cavaleiros.lua);
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
    }, [med, sex])

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

    return (
        <MainContainer>
            <PersonalCard>
                <div style={{display:'flex', gap:'30px', width:'100%'}}>
                    <MainInfoContainer>

                        <SectionTitle>Novo Médium</SectionTitle>
                        <InputContainer>
                            <FieldContainer width="110px">
                                <label>ID: </label>
                                <input type="text" />
                            </FieldContainer>
                            <FieldContainer>
                                <label>Nome do Médium: </label>
                                <input type="text" />
                            </FieldContainer>
                        </InputContainer>
                        <InputContainer>
                            <FieldContainer>
                                <label>Sexo: </label>
                                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                                    <option value={undefined}></option>
                                    <option value={'Feminino'}>Feminino</option>
                                    <option value={'Masculino'}>Masculino</option>
                                </select>
                            </FieldContainer>
                            <FieldContainer>
                                <label>Mediunidade: </label>
                                <select value={med} onChange={(e) => setMed(e.target.value)}>
                                    <option value={undefined}></option>
                                    <option value={'Apará'}>Apará</option>
                                    <option value={'Doutrinador'}>Doutrinador</option>
                                </select>
                            </FieldContainer>
                        </InputContainer>
                        <InputContainer>
                            <FieldContainer>
                                <label>Templo: </label>
                                <select>
                                    <option value={undefined}></option>
                                    {templos.map((item: string) => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>
                            </FieldContainer>
                            <FieldContainer width="340px">
                                <label>Condição Atual: </label>
                                <select>
                                    <option value={'Ativo'}>Ativo</option>
                                    <option value={'Afastado'}>Afastado</option>
                                    <option value={'Entregou as Armas'}>Entregou as Armas</option>
                                    <option value={'Desencarnado'}>Desencarnado</option>
                                </select>
                            </FieldContainer>
                        </InputContainer>
                    </MainInfoContainer>
                    <PhotoContainer photo={preview}>
                        {photo? '' : 'Clique aqui para adicionar uma foto'}
                        <input type="file" accept="image/*" onChange={imageUpdate} />
                    </PhotoContainer>
                </div>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Dados Pessoais</SectionTitle>
                <InputContainer>
                    <FieldContainer width="330px">
                        <label>Data de Nascimento: </label>
                        <input type="date" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>RG: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>CPF: </label>
                        <input type="text" />
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer>
                        <label>Mãe: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>Pai: </label>
                        <input type="text" />
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer>
                        <label>Natural de: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer width="110px">
                        <label>UF: </label>
                        <select>
                            <option value={undefined}></option>
                            {estados.map((item: IEstados) => (
                                <option value={item.state}>{item.abrev}</option>
                            ))}
                        </select>
                    </FieldContainer>
                    <FieldContainer>
                        <label>Profissão: </label>
                        <input type="text" />
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer width="270px">
                        <label>Estado Civil: </label>
                        <select>
                            <option value={undefined}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                    </FieldContainer>
                    <FieldContainer>
                        <label>Cônjuge: </label>
                        <input type="text" />
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer width="170px">
                        <label>CEP: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>Endereço: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer width="150px">
                        <label>Número: </label>
                        <input type="text" />
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer>
                        <label>Complemento: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>Bairro: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>Cidade: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer width="110px">
                        <label>UF: </label>
                        <select>
                            <option value={undefined}></option>
                            {estados.map((item: IEstados) => (
                                <option value={item.state}>{item.abrev}</option>
                            ))}
                        </select>
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer width="240px">
                        <label>Telefone 1: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer width="240px">
                        <label>Telefone 2: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>E-mail: </label>
                        <input type="text" />
                    </FieldContainer>
                </InputContainer>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Datas Mediúnicas</SectionTitle>
                <InputContainer>
                    <FieldContainer style={{justifyContent:'space-between'}}>
                        <label>Data de Ingresso: </label>
                        <input style={{width: '159px'}} type="date" />
                    </FieldContainer>
                    <FieldContainer style={{justifyContent:'space-between'}}>
                        <label>Data de Emplacamento: </label>
                        <input style={{width: '159px'}} type="date" />
                    </FieldContainer>
                    <FieldContainer style={{justifyContent:'space-between'}}>
                        <label>Data de Iniciação: </label>
                        <input style={{width: '159px'}} type="date" />
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer style={{justifyContent:'space-between'}}>
                        <label>Data de Elevação: </label>
                        <input style={{width: '159px'}} type="date" />
                    </FieldContainer>
                    <FieldContainer style={{justifyContent:'space-between'}}>
                        <label>Data de Centúria: </label>
                        <input style={{width: '159px'}} type="date" />
                    </FieldContainer>
                    <FieldContainer style={{justifyContent:'space-between'}}>
                        <label>Data de Sétimo: </label>
                        <input style={{width: '159px'}} type="date" />
                    </FieldContainer>
                </InputContainer>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Dados Mediúnicos</SectionTitle>
                <InputContainer>
                    <FieldContainer>
                        <label>Adj. Origem.: </label>
                        <select>
                            <option value={undefined}></option>
                            {adjuntos.map((item: IAdjuntos) => (
                                <option value={item.id}>Adj. {item.min} - Mestre {item.adj}</option>
                            ))}
                        </select>
                    </FieldContainer>
                    <FieldContainer>
                        <label>Templo de origem: </label>
                        <select>
                            <option value={undefined}></option>
                            {templos.map((item: string) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </FieldContainer>
                    <FieldContainer width="160px">
                        <label>Colete N°: </label>
                        <select>
                            <option value={undefined}></option>
                            {coletes.map((item: string) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer>
                        <label>Classificação: </label>
                        <select>
                            <option value={undefined}></option>
                            {listClassMest.map((item: string) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </FieldContainer>
                    <FieldContainer width="370px">
                        <label>Falange de Mestrado: </label>
                        <select>
                            <option value={undefined}></option>
                            {falMest.map((item: string) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </FieldContainer>
                    <FieldContainer width="190px">
                        <label>Povo: </label>
                        <select>
                            <option value={undefined}></option>
                            {povos.map((item: string) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer>
                        <label>Falange Missionária: </label>
                        <select>
                            <option value={undefined}></option>
                            {listFalMiss.map((item: string) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </FieldContainer>
                    <FieldContainer width="230px">
                        <label>Adjunto Devas: </label>
                        <select>
                            <option value={undefined}></option>
                            <option value={'Adejã'}>Adejã</option>
                            <option value={'Alufã'}>Alufã</option>
                        </select>
                    </FieldContainer>
                    <FieldContainer width="180px">
                        <label>Turno: </label>
                        <select>
                            <option value={undefined}></option>
                            {listTurnoL.map((item: string) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </FieldContainer>
                    <FieldContainer width="310px">
                        <label>Turno de Trabalho: </label>
                        <select>
                            <option value={undefined}></option>
                            {listTurnoT.map((item: string) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </FieldContainer>
                </InputContainer>
                {sex==='Masculino'?
                    <>
                        <InputContainer>
                            <FieldContainer>
                                <label>Ministro: </label>
                                <select>
                                    <option value={undefined}></option>
                                    {ministros.map((item: string) => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>
                            </FieldContainer>
                            <FieldContainer>
                                <label>Cavaleiro: </label>
                                <select>
                                    <option value={undefined}></option>
                                    {listCav.map((item: string) => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>
                            </FieldContainer>
                            <FieldContainer width="280px">
                                <label>Cor do Cavaleiro: </label>
                                <select>
                                    {med==='Doutrinador'?
                                        <option value={'Verde'}>Verde</option>
                                    : med==='Apará'?
                                        <>
                                            <option value={undefined}></option>
                                            <option value={'Verde'}>Verde</option>
                                            <option value={'Vermelho'}>Vermelho</option>
                                        </>
                                    : <option value={undefined}></option>}
                                </select>
                            </FieldContainer>
                        </InputContainer>
                        <InputContainer>
                            <FieldContainer>
                                <label>Classificação Atual: </label>
                                <select>
                                    <option value={undefined}></option>
                                    {listClass.map((item: string) => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>
                            </FieldContainer>
                            <FieldContainer width="210px">
                                <label>Data: </label>
                                <input type="date" />
                            </FieldContainer>
                        </InputContainer>
                    </>
                : sex==='Feminino'?
                    <InputContainer>
                        <FieldContainer>
                            <label>Estrela: </label>
                            <select>
                                <option value={undefined}></option>
                                {listEst.map((item: string) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>
                        </FieldContainer>
                        <FieldContainer>
                            <label>Guia Missionária: </label>
                            <select>
                                <option value={undefined}></option>
                                {guias.map((item: string) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>
                        </FieldContainer>
                        <FieldContainer width="280px">
                            <label>Cor da Guia: </label>
                            <select>
                                <option value={undefined}></option>
                                <option value={'Amarela'}>Amarela</option>
                                <option value={'Azul'}>Azul</option>
                                <option value={'Branca'}>Branca</option>
                                <option value={'Lilás'}>Lilás</option>
                                <option value={'Rósea'}>Rósea</option>
                                <option value={'Verde'}>Verde</option>
                                <option value={'Vermelha'}>Vermelha</option>
                            </select>
                        </FieldContainer>
                    </InputContainer>
                : ''}
                {med==='Doutrinador'?
                    <InputContainer>
                        <FieldContainer>
                            <label>Princesa: </label>
                            <select>
                                <option value={undefined}></option>
                                {princesas.map((item: string) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>
                        </FieldContainer>
                        <FieldContainer width="55%">
                            <label>Nome na emissão: </label>
                            <input type="text" />
                        </FieldContainer>
                    </InputContainer>
                : med==='Apará'?
                    <>
                        <InputContainer>
                            <FieldContainer>
                                <label>Preto Velho: </label>
                                <input type="text" />
                            </FieldContainer>
                            <FieldContainer>
                                <label>Caboclo: </label>
                                <input type="text" />
                            </FieldContainer>
                        </InputContainer>
                        <InputContainer>
                            <FieldContainer>
                                <label>Médico: </label>
                                <input type="text" />
                            </FieldContainer>
                            <FieldContainer width="55%">
                                <label>Nome na emissão: </label>
                                <input type="text" />
                            </FieldContainer>
                        </InputContainer>
                    </> 
                : ''}
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Povo</SectionTitle>
                {sex.concat(med)==='MasculinoDoutrinador'?
                    <>
                        <InputContainer>
                            <FieldContainer>
                                <label>Escrava: </label>
                                <select>
                                    <option value={undefined}></option>
                                </select>
                            </FieldContainer>
                            <FieldContainer>
                                <label>Madrinha: </label>
                                <select>
                                    <option value={undefined}></option>
                                </select>
                            </FieldContainer>
                        </InputContainer>
                        <InputContainer>
                            <FieldContainer width="50%">
                                <label>Padrinho: </label>
                                <select>
                                    <option value={undefined}></option>
                                </select>
                            </FieldContainer> 
                        </InputContainer>
                    </>
                : sex.concat(med)==='MasculinoApará'? 
                    <InputContainer>
                        <FieldContainer>
                            <label>Afilhado: </label>
                            <select>
                                <option value={undefined}></option>
                            </select>
                        </FieldContainer>
                        <FieldContainer>
                            <label>Ninfa Sol: </label>
                            <select>
                                <option value={undefined}></option>
                            </select>
                        </FieldContainer>
                    </InputContainer>
                : sex.concat(med)==='FemininoDoutrinador'?
                    <InputContainer>
                        <FieldContainer>
                            <label>Afilhado: </label>
                            <select>
                                <option value={undefined}></option>
                            </select>
                        </FieldContainer>
                        <FieldContainer>
                            <label>Ajanã: </label>
                            <select>
                                <option value={undefined}></option>
                            </select>
                        </FieldContainer>
                    </InputContainer>
                : sex.concat(med)==='FemininoApará'?
                    <InputContainer>
                        <FieldContainer width="50%">
                            <label>Mestre: </label>
                            <select>
                                <option value={undefined}></option>
                            </select>
                        </FieldContainer> 
                    </InputContainer>
                : <div></div>}
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Cargos e Funções</SectionTitle>
                {sex.concat(med)==='MasculinoDoutrinador'?
                    <>
                        <InputContainer>
                            <FieldContainer>
                                <label>Comando: </label>
                                <select>
                                    <option value={undefined}></option>
                                    <option value={'Comandante'}>Comandante</option>
                                    <option value={'Janatã'}>Comandante Janatã</option>
                                    <option value={'Lança'}>Lança Vermelha</option>
                                    <option value={'JanatãLança'}>Comandante Janatã / Lança Vermelha</option>
                                </select>
                            </FieldContainer>
                            <FieldContainer>        
                                <label>Presidência: </label>
                                <select>
                                    <option value={undefined}></option>
                                    <option value={'Presidente'}>Presidente</option>
                                    <option value={'Vice'}>Vice-presidente</option>
                                </select>
                            </FieldContainer>
                            <FieldContainerBox>
                                <input type="checkBox" />
                                <label>Recepcionista</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" />
                                <label>Filho de Devas</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" />
                                <label>Regente</label>
                            </FieldContainerBox>
                        </InputContainer>
                        <InputContainer>
                            <FieldContainerBox>
                                <input type="checkBox" onChange={(e) => setTSol(!tSol)}/>
                                <label>Trino Solitário</label>
                            </FieldContainerBox> 
                            <FieldContainer width="300px">
                                <select disabled={!tSol}>
                                    <option value={undefined}></option>
                                    <option value={'Juremá'}>Juremá</option>
                                    <option value={'Iramar'}>Iramar</option>
                                </select>
                            </FieldContainer>
                            <FieldContainer width="210px">
                                <label>Data: </label>
                                <input type="date" disabled={!tSol} />
                            </FieldContainer>
                        </InputContainer>
                        <InputContainer>
                            <FieldContainerBox>
                                <input type="checkBox" onChange={(e) => setTSar(!tSar)} />
                                <label>Trino Sardyos</label>
                            </FieldContainerBox>
                            <FieldContainer width="210px">
                                <label>Data: </label>
                                <input type="date" disabled={!tSar}/>
                            </FieldContainer>
                            <FieldContainer>
                                <label>Herdeiro do Mestre: </label>
                                <select disabled={!tSar}>
                                    <option value={undefined}></option>
                                </select>
                            </FieldContainer>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={!tSar} />
                                <label>Filho?</label>
                            </FieldContainerBox>
                        </InputContainer>
                    </>
                : sex.concat(med)==='MasculinoApará'? 
                    <>
                        <InputContainer style={{justifyContent:'center'}}>
                            <FieldContainerBox>
                                <input type="checkBox" />
                                <label>Recepcionista</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" />
                                <label>Filho de Devas</label>
                            </FieldContainerBox>
                            <FieldContainerBox>
                                <input type="checkBox" />
                                <label>Regente</label>
                            </FieldContainerBox>
                        </InputContainer>
                        <InputContainer>
                            <FieldContainerBox>
                                <input type="checkBox" onChange={(e) => setTSar(!tSar)} />
                                <label>Trino Sardyos</label>
                            </FieldContainerBox>
                            <FieldContainer width="210px">
                                <label>Data: </label>
                                <input type="date" disabled={!tSar}/>
                            </FieldContainer>
                            <FieldContainer>
                                <label>Herdeiro do Mestre: </label>
                                <select disabled={!tSar}>
                                    <option value={undefined}></option>
                                </select>
                            </FieldContainer>
                            <FieldContainerBox>
                                <input type="checkBox" disabled={!tSar} />
                                <label>Filho?</label>
                            </FieldContainerBox>
                        </InputContainer>
                    </>
                : sex.concat(med)==='FemininoDoutrinador'?
                    <InputContainer style={{justifyContent:'center'}}>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Recepcionista</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Filha de Devas</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Regente</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Janda</label>
                        </FieldContainerBox>
                    </InputContainer>
                : sex.concat(med)==='FemininoApará'?
                    <InputContainer style={{justifyContent:'center'}}>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Recepcionista</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Filha de Devas</label>
                        </FieldContainerBox>
                        <FieldContainerBox>
                            <input type="checkBox" />
                            <label>Regente</label>
                        </FieldContainerBox>
                    </InputContainer>
                : <div></div>}
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Observações</SectionTitle>
                <Observations rows={3} />
            </PersonalCard>
            <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around'}}>
                <MediumButton color="red">Cancelar</MediumButton>
                <MediumButton color="green">Cadastrar</MediumButton>
            </div>
        </MainContainer>
    )
}

export default AddMedium