import { useState, useContext, useEffect } from "react";
import { ButtonContainer, InfoCard, InfoContainer, InfoContent, InputContainer, MainContainer, MediumButton, MediumInfo, MediumName, MediumPhoto, MessageNull, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, TableContainer, TextContainer } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import { MediumContext } from "src/contexts/MediumContext";
import { IMedium } from "src/types/types";

function SearchMedium() {
    
    const navigate = useNavigate();
    
    const noMedium = {id: '', nome: '', med: '', templo: '', sexo: '', situacao: '', condicao: '', foto: ''}
    
    const [selected, setSelected] = useState(noMedium);
    const [counterPosition, setCounterPosition] = useState(true);
    const [textPosition, setTextPosition] = useState('');
    
    const { templos } = useContext(ListContext);

    const { medium } = useContext(MediumContext);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth > 786) {
                setTextPosition("ao lado");
                setCounterPosition(true);
            } else {
                setTextPosition("acima");
                setCounterPosition(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    
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
                        {templos.map((item: string, index: number) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </InputContainer>
            </SearchCard>
            <ResultsCard>
                <TableContainer>
                    <ResultsTable>
                        <tbody>
                            {medium.map((item: IMedium, index: number) => (
                                <Results key={index} onClick={() => setSelected(item)}>
                                    <td>
                                        <ResultsTitle>{item.nome}</ResultsTitle>
                                        <ResultsDetails>{item.med} - {item.templo}</ResultsDetails>
                                    </td>
                                </Results>
                            ))}
                        </tbody>
                    </ResultsTable>
                </TableContainer>
                <div style={{display: 'flex', flexDirection: `${counterPosition? 'column' : 'column-reverse'}`, width: '100%', height: '100%', justifyContent: `${counterPosition? 'flex-start' : 'flex-end'}`, alignItems: 'center'}}>
                    <InfoCard>
                        {!selected.id?
                            <MessageNull>{`Selecione um médium na lista ${textPosition}`}</MessageNull>
                        :
                            <InfoContent>
                                <MediumName>{selected.nome}</MediumName>
                                <InfoContainer>
                                    <MediumPhoto image={selected.foto} />
                                    <ButtonContainer>
                                        <MediumInfo>ID: <span>{selected.id}</span></MediumInfo>
                                        <MediumButton onClick={() => navigate(`/mediuns/consulta/${selected.id}`)}>Exibir</MediumButton>
                                        <MediumButton>Editar</MediumButton>
                                    </ButtonContainer>
                                </InfoContainer>
                                <TextContainer>
                                    <MediumInfo>Mediunidade: <span>{selected.med}</span></MediumInfo>
                                    <MediumInfo>Sexo: <span>{selected.sexo}</span></MediumInfo>
                                    <MediumInfo>Situação: <span>{selected.situacao}</span></MediumInfo>
                                    <MediumInfo>Templo: <span>{selected.templo}</span></MediumInfo>
                                    <MediumInfo>Condição Atual: <span>{selected.condicao}</span></MediumInfo>
                                </TextContainer>
                            </InfoContent>
                        }
                    </InfoCard>
                    <MediumInfo>Resultados encontrados: {medium.length}</MediumInfo>
                </div>
            </ResultsCard>
        </MainContainer>
    )
}

export default SearchMedium