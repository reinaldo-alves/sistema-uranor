import { useState, useContext, useEffect } from "react";
import { ButtonContainer, InfoCard, InfoContainer, InfoContent, InputContainer, MainContainer, MediumButton, MediumInfo, MediumName, MediumPhoto, MessageNull, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchCard, TableContainer, TextContainer } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import { MediumContext } from "src/contexts/MediumContext";
import { IMedium, ITemplo } from "src/types/types";
import SideMenu from "src/components/SideMenu/SideMenu";
import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "src/components/header/header";
import { UserContext } from "src/contexts/UserContext";
import { setSituation } from "src/utilities/functions";

function SearchMedium() {
    
    const navigate = useNavigate();
    
    const noMedium = {} as IMedium
    
    const [searchName, setSearchName] = useState('');
    const [searchTemp, setSearchTemp] = useState('');
    const [selected, setSelected] = useState(noMedium);
    const [counterPosition, setCounterPosition] = useState(true);
    const [textPosition, setTextPosition] = useState('');
    
    const { templos } = useContext(ListContext);
    const { token } = useContext(UserContext);
    const { mediuns, loadMedium } = useContext(MediumContext);

    useEffect(() => {
        loadMedium(token);
    }, [])

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
    
    mediuns.sort((pessoaA: IMedium, pessoaB: IMedium) => {
        if (pessoaA.nome < pessoaB.nome) {
          return -1;
        }
        if (pessoaA.nome > pessoaB.nome) {
          return 1;
        }
        return 0;
      });      

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <SearchCard>
                    <InputContainer>
                        <label>Nome do Médium</label>
                        <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Templo</label>
                        <select value={searchTemp} onChange={(e) => setSearchTemp(e.target.value)}>
                            <option value=''>Todos</option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                    </InputContainer>
                </SearchCard>
                <ResultsCard>
                    <TableContainer>
                        <ResultsTable>
                            {mediuns
                                .filter((item: IMedium) => item.nome.toLowerCase().includes(searchName.trim().toLowerCase()))
                                .filter(searchTemp === '' ? (item: IMedium) => item.nome !== '' : (item: IMedium) => item.templo === Number(searchTemp))
                                .map((item: any, index: number) => (
                                    <Results key={index} onClick={() => setSelected(item)}>
                                        <ResultsTitle>{item.nome}</ResultsTitle>
                                        <ResultsDetails>{item.med} - {templos.filter((temp: ITemplo) => temp.templo_id === item.templo)[0].cidade} - {templos.filter((temp: ITemplo) => temp.templo_id === item.templo)[0].estado.abrev}</ResultsDetails>
                                    </Results>
                                ))
                            }
                        </ResultsTable>
                    </TableContainer>
                    <div style={{display: 'flex', flexDirection: `${counterPosition? 'column' : 'column-reverse'}`, width: '100%', height: '100%', justifyContent: `${counterPosition? 'flex-start' : 'flex-end'}`, alignItems: 'center'}}>
                        <InfoCard>
                            {!selected.medium_id?
                                <MessageNull>{`Selecione um médium na lista ${textPosition}`}</MessageNull>
                            :
                                <InfoContent>
                                    <MediumName>{selected.nome}</MediumName>
                                    <InfoContainer>
                                        <MediumPhoto image={selected.foto}>{selected.foto? '' : 'SEM FOTO'}</MediumPhoto>
                                        <ButtonContainer>
                                            <MediumInfo>ID: <span>{selected.medium_id.toString().padStart(5, '0')}</span></MediumInfo>
                                            <MediumButton onClick={() => navigate(`/mediuns/consulta/${selected.medium_id}`)}>Exibir</MediumButton>
                                            <MediumButton onClick={() => navigate(`/mediuns/editar/${selected.medium_id}`)}>Editar</MediumButton>
                                        </ButtonContainer>
                                    </InfoContainer>
                                    <TextContainer>
                                        <MediumInfo>Mediunidade: <span>{selected.med}</span></MediumInfo>
                                        <MediumInfo>Sexo: <span>{selected.sex}</span></MediumInfo>
                                        <MediumInfo>Situação: <span>{setSituation(selected)}</span></MediumInfo>
                                        <MediumInfo>Templo: <span>{templos.filter((temp: ITemplo) => temp.templo_id === selected.templo)[0].cidade} - {templos.filter((temp: ITemplo) => temp.templo_id === selected.templo)[0].estado.abrev}</span></MediumInfo>
                                        <MediumInfo>Condição Atual: <span>{selected.condicao}</span></MediumInfo>
                                    </TextContainer>
                                </InfoContent>
                            }
                        </InfoCard>
                        <MediumInfo>
                            Resultados encontrados: {mediuns
                            .filter((item: IMedium) => item.nome.toLowerCase().includes(searchName.trim().toLowerCase()))
                            .filter(searchTemp === '' ? (item: IMedium) => item.nome !== '' : (item: IMedium) => item.templo === Number(searchTemp))
                            .length}
                        </MediumInfo>
                    </div>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default SearchMedium