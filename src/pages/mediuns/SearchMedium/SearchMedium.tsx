import { useState, useContext } from "react";
import { ButtonContainer, InfoCard, InfoContainer, InputContainer, MainContainer, MediumButton, MediumInfo, MediumName, MediumPhoto, Results, ResultsCard, ResultsCell, ResultsTable, SearchButton, SearchCard, TableContainer, TextContainer } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import { MediumContext } from "src/contexts/MediumContext";

type IMedium = any;

function SearchMedium() {
    
    const navigate = useNavigate();
    
    const noMedium = {id: '', nome: '', med: '', templo: '', sexo: '', situacao: '', condicao: '', foto: ''}
    
    const [selected, setSelected] = useState(noMedium); 
    
    const { templos } = useContext(ListContext);

    const { medium } = useContext(MediumContext);
    
    medium.sort((pessoaA: IMedium, pessoaB: IMedium) => {
        if (pessoaA.nome < pessoaB.nome) {
          return -1;
        }
        if (pessoaA.nome > pessoaB.nome) {
          return 1;
        }
        return 0;
      });      

    return (
        <MainContainer>
            <SearchCard>
                <InputContainer>
                    <label>Nome do Médium</label>
                    <input />
                </InputContainer>
                <InputContainer>
                    <label>Templo</label>
                    <select>
                        <option value=''>Todos</option>
                        {templos.map((item: string) => (
                            <option value={item}>{item}</option>
                        ))}
                    </select>
                </InputContainer>
                <SearchButton>Buscar</SearchButton>
            </SearchCard>
            <ResultsCard>
                <TableContainer>
                    <ResultsTable>
                        <tbody>
                            {medium.map((item: IMedium) => (
                                <Results onClick={() => setSelected(item)}>
                                    <ResultsCell align="left">{item.nome}</ResultsCell>
                                    <ResultsCell width="150px">{item.med}</ResultsCell>
                                    <ResultsCell width="200px">{item.templo}</ResultsCell>
                                </Results>
                            ))}
                        </tbody>
                    </ResultsTable>
                </TableContainer>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between'}}>
                    <InfoCard>
                        {selected===noMedium?
                            <MediumInfo align="center">Selecione um médium na lista ao lado</MediumInfo>
                        :
                            <>
                                <MediumName>{selected.nome}</MediumName>
                                <ButtonContainer>
                                    <MediumButton onClick={() => navigate(`/mediuns/consulta/${selected.id}`)}>Exibir</MediumButton>
                                    <MediumButton>Editar</MediumButton>
                                </ButtonContainer>
                                <InfoContainer>
                                    <MediumPhoto image={selected.foto} />
                                    <TextContainer>
                                        <MediumInfo>ID: <span>{selected.id}</span></MediumInfo>
                                        <MediumInfo>Mediunidade: <span>{selected.med}</span></MediumInfo>
                                        <MediumInfo>Sexo: <span>{selected.sexo}</span></MediumInfo>
                                        <MediumInfo>Situação: <span>{selected.situacao}</span></MediumInfo>
                                        <MediumInfo>Templo: <span>{selected.templo}</span></MediumInfo>
                                        <MediumInfo>Condição Atual: <span>{selected.condicao}</span></MediumInfo>
                                    </TextContainer>
                                </InfoContainer>
                            </>
                        }
                    </InfoCard>
                    <MediumInfo align="center">Resultados encontrados: {medium.length}</MediumInfo>
                </div>
            </ResultsCard>
        </MainContainer>
    )
}

export default SearchMedium