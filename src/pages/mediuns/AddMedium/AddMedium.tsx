import { useContext, useState, useEffect } from "react";
import { ListContext } from "src/contexts/ListContext";
import { Divider, FieldContainer, FieldContainerBox, GridContainer, GridDatesContainer, InputContainer, MainContainer, MainContent, MainInfoContainer, MediumButton, Observations, PersonalCard, PhotoContainer, SectionTitle } from "./styles";
import { ICavaleiro, IFalange, IMentor } from "src/types/types";

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
    }, [sex])

    useEffect(() => {
        switch (sex.concat(med)) {
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
                <MainContent>
                    <MainInfoContainer>
                        <SectionTitle>Novo Médium</SectionTitle>
                        <FieldContainer>
                            <label>Nome Médium: </label>
                            <input type="text" />
                        </FieldContainer>
                        <GridContainer>
                            <label>Sexo: </label>
                            <select value={sex} onChange={(e) => setSex(e.target.value)}>
                                <option value={undefined}></option>
                                <option value={'Feminino'}>Feminino</option>
                                <option value={'Masculino'}>Masculino</option>
                            </select>
                            <label>Mediunidade: </label>
                            <select value={med} onChange={(e) => setMed(e.target.value)}>
                                <option value={undefined}></option>
                                <option value={'Apará'}>Apará</option>
                                <option value={'Doutrinador'}>Doutrinador</option>
                            </select>
                            <label>Templo: </label>
                            <select>
                                <option value={undefined}></option>
                                {templos.map((item: string, index: number) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <label>Condição Atual: </label>
                            <select>
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
                    <input type="date" />
                    <label>Profissão: </label>
                    <input type="text" />
                    <label>RG: </label>
                    <input type="text" />
                    <label>CPF: </label>
                    <input type="text" />
                    <label>Mãe: </label>
                    <input type="text" />
                    <label>Pai: </label>
                    <input type="text" />
                    <label>Natural de: </label>
                    <input type="text" />
                    <label>UF: </label>
                    <select>
                        <option value={undefined}></option>
                        {estados.map((item: IEstados, index: number) => (
                            <option key={index} value={item.state}>{item.abrev}</option>
                        ))}
                    </select>
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
                    <label>Cônjuge: </label>
                    <input type="text" />
                    <label>CEP: </label>
                    <input type="text" />
                    <label>Endereço: </label>
                    <input type="text" />
                    <label>Número: </label>
                    <input type="text" />
                    <label>Complemento: </label>
                    <input type="text" />
                    <label>Bairro: </label>
                    <input type="text" />
                    <label>Cidade: </label>
                    <input type="text" />
                    <label>UF: </label>
                    <select>
                        <option value={undefined}></option>
                        {estados.map((item: IEstados, index: number) => (
                            <option key={index} value={item.state}>{item.abrev}</option>
                        ))}
                    </select>
                    <label>Telefone 1: </label>
                    <input type="text" />
                    <label>Telefone 2: </label>
                    <input type="text" />
                    <label>E-mail: </label>
                    <input type="text" />
                </GridContainer>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Datas Mediúnicas</SectionTitle>
                <GridDatesContainer>
                    <label>Data Ingresso: </label>
                    <input type="date" />
                    <label>Data Emplacamento: </label>
                    <input type="date" />
                    <label>Data Iniciação: </label>
                    <input type="date" />
                    <label>Data Elevação: </label>
                    <input type="date" />
                    <label>Data Centúria: </label>
                    <input type="date" />
                    <label>Data Sétimo: </label>
                    <input type="date" />
                </GridDatesContainer>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Dados Mediúnicos</SectionTitle>
                <GridContainer>
                    <label>Adjunto Origem.: </label>
                    <select>
                        <option value={undefined}></option>
                        {adjuntos.map((item: IAdjuntos, index: number) => (
                            <option key={index} value={item.id}>Adj. {item.min} - Mestre {item.adj}</option>
                        ))}
                    </select>
                    <label>Templo Origem: </label>
                    <select>
                        <option value={undefined}></option>
                        {templos.map((item: string, index: number) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <label>Colete N°: </label>
                    <select>
                        <option value={undefined}></option>
                        {coletes.map((item: string, index: number) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <label>Classificação: </label>
                    <select>
                        <option value={undefined}></option>
                        {listClassMest.map((item: string, index: number) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <label>Falange Mestrado: </label>
                    <select>
                        <option value={undefined}></option>
                        {falMest.map((item: string, index: number) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <label>Povo: </label>
                    <select>
                        <option value={undefined}></option>
                        {povos.map((item: string, index: number) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <label>Falange Missionária: </label>
                    <select>
                        <option value={undefined}></option>
                        {listFalMiss.map((item: IFalange, index: number) => (
                            <option key={index} value={item.id}>{item.falange}</option>
                        ))}
                    </select>
                    <label>Adjunto Devas: </label>
                    <select>
                        <option value={undefined}></option>
                        <option value={'Adejã'}>Adejã</option>
                        <option value={'Alufã'}>Alufã</option>
                    </select>
                    <label>Turno: </label>
                    <select>
                        <option value={undefined}></option>
                        {listTurnoL.map((item: string, index: number) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <label>Turno Trabalho: </label>
                    <select>
                        <option value={undefined}></option>
                        {listTurnoT.map((item: string, index: number) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </GridContainer>
                {sex==='Masculino'?
                    <>
                        <Divider></Divider>
                        <GridContainer>
                            <label>Ministro: </label>
                            <select>
                                <option value={undefined}></option>
                                {ministros.map((item: IMentor, index: number) => (
                                    <option key={index} value={item.id}>{item.nome}</option>
                                ))}
                            </select>
                            <label>Data Ministro: </label>
                            <input type="date" />
                            <label>Cavaleiro: </label>
                            <select>
                                <option value={undefined}></option>
                                {listCav.map((item: ICavaleiro, index: number) => (
                                    <option key={index} value={item.id}>{item.nome}</option>
                                ))}
                            </select>
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
                        </GridContainer>
                        <InputContainer>
                            <FieldContainer>
                                <label>Classificação Atual: </label>
                                <select>
                                    <option value={undefined}></option>
                                    {listClass.map((item: string, index: number) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </FieldContainer>
                            <FieldContainer width="190px">
                                <label>Data: </label>
                                <input type="date" />
                            </FieldContainer>
                        </InputContainer>
                    </>
                : sex==='Feminino'?
                    <>
                        <Divider></Divider>
                        <GridContainer>
                            <label>Estrela: </label>
                            <select>
                                <option value={undefined}></option>
                                {listEst.map((item: string, index: number) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <label>Data Guia: </label>
                            <input type="date" />
                            <label>Guia Missionária: </label>
                            <select>
                                <option value={undefined}></option>
                                {guias.map((item: IMentor, index: number) => (
                                    <option key={index} value={item.id}>{item.nome}</option>
                                ))}
                            </select>
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
                        </GridContainer>
                    </>
                : ''}
                {med==='Doutrinador'?
                    <>
                        <Divider></Divider>
                        <GridContainer>
                            <label>Princesa: </label>
                            <select>
                                <option value={undefined}></option>
                                {princesas.map((item: string, index: number) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <label>Nome na emissão: </label>
                            <input type="text" />
                        </GridContainer>
                    </>
                : med==='Apará'?
                    <>
                        <Divider></Divider>
                        <GridContainer>
                            <label>Preto Velho: </label>
                            <input type="text" />
                            <label>Caboclo: </label>
                            <input type="text" />
                            <label>Médico: </label>
                            <input type="text" />
                            <label>Nome na emissão: </label>
                            <input type="text" />
                        </GridContainer> 
                    </>
                : ''}
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Povo</SectionTitle>
                {sex.concat(med)==='MasculinoDoutrinador'?
                    <GridContainer>
                        <label>Escrava: </label>
                        <select>
                            <option value={undefined}></option>
                        </select>
                        <label>Madrinha: </label>
                        <select>
                            <option value={undefined}></option>
                        </select>
                        <label>Padrinho: </label>
                        <select>
                            <option value={undefined}></option>
                        </select>
                    </GridContainer>
                : sex.concat(med)==='MasculinoApará'? 
                    <GridContainer>
                        <label>Afilhado: </label>
                        <select>
                            <option value={undefined}></option>
                        </select>
                        <label>Ninfa Sol: </label>
                        <select>
                            <option value={undefined}></option>
                        </select>
                    </GridContainer>
                : sex.concat(med)==='FemininoDoutrinador'?
                    <GridContainer>
                        <label>Afilhado: </label>
                        <select>
                            <option value={undefined}></option>
                        </select>
                        <label>Ajanã: </label>
                        <select>
                            <option value={undefined}></option>
                        </select>
                    </GridContainer>
                : sex.concat(med)==='FemininoApará'?
                    <GridContainer>
                        <label>Mestre: </label>
                        <select>
                            <option value={undefined}></option>
                        </select>
                    </GridContainer>
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
                            <div style={{display: 'flex'}}>
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
                            </div>
                        </InputContainer>
                        <Divider></Divider>
                        <InputContainer>
                            <div style={{width: '100%', display: 'flex', gap: '10px'}}>
                                <FieldContainerBox>
                                    <input type="checkBox" onChange={(e) => setTSol(!tSol)}/>
                                    <label>Trino Solitário</label>
                                </FieldContainerBox> 
                                <FieldContainer>
                                    <select disabled={!tSol}>
                                        <option value={undefined}></option>
                                        <option value={'Juremá'}>Juremá</option>
                                        <option value={'Iramar'}>Iramar</option>
                                    </select>
                                </FieldContainer>
                            </div>
                            <FieldContainer width="190px">
                                <label>Data: </label>
                                <input type="date" disabled={!tSol} />
                            </FieldContainer>
                        </InputContainer>
                        <Divider></Divider>
                        <InputContainer>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <FieldContainerBox>
                                    <input type="checkBox" onChange={(e) => setTSar(!tSar)} />
                                    <label>Trino Sardyos</label>
                                </FieldContainerBox>
                                <FieldContainer width="190px">
                                    <label>Data: </label>
                                    <input type="date" disabled={!tSar}/>
                                </FieldContainer>
                            </div>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
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
                            </div>
                        </InputContainer>
                    </>
                : sex.concat(med)==='MasculinoApará'? 
                    <>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap'}}>
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
                        </div>
                        <Divider></Divider>
                        <InputContainer>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <FieldContainerBox>
                                    <input type="checkBox" onChange={(e) => setTSar(!tSar)} />
                                    <label>Trino Sardyos</label>
                                </FieldContainerBox>
                                <FieldContainer width="190px">
                                    <label>Data: </label>
                                    <input type="date" disabled={!tSar}/>
                                </FieldContainer>
                            </div>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
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
                            </div>
                        </InputContainer>
                    </>
                : sex.concat(med)==='FemininoDoutrinador'?
                    <div style={{display: 'flex', justifyContent:'center', gap: '10px', flexWrap: 'wrap'}}>
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
                    </div>
                : sex.concat(med)==='FemininoApará'?
                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap'}}>
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
                    </div>
                : <div></div>}
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Observações</SectionTitle>
                <Observations rows={4} />
            </PersonalCard>
            <div style={{width: '90%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-around'}}>
                <MediumButton color="red">Cancelar</MediumButton>
                <MediumButton color="green">Cadastrar</MediumButton>
            </div>
        </MainContainer>
    )
}

export default AddMedium