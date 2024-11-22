import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import { ResultsCard, ResultsTable } from "./styles";
import { useCallback, useContext, useEffect, useState } from "react";
import { alphabeticOrder, removeDiacritics } from "src/utilities/functions";
import { ListContext } from "src/contexts/ListContext";
import { IMenor } from "src/types/types";
import { UserContext } from "src/contexts/UserContext";
import Loading from "src/utilities/Loading";
import { useNavigate } from "react-router-dom";
import { SearchButton } from "src/components/buttons/buttons";
import { InfoCard, InputContainer, Results, SearchCard, SearchContainer } from "src/components/cardsContainers/cardsContainers";
import { InfoContent, ResultsDetails, ResultsTitle } from "src/components/texts/texts";

function YoungMedium() {
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [searchResp, setSearchResp] = useState('');

    const { token } = useContext(UserContext);
    const { menores, loadMenor } = useContext(ListContext);

    const navigate = useNavigate();

    const loadData = useCallback(async () => {
        await loadMenor(token);
        setLoading(false);
    }, [loadMenor, token]);
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Consultar Médium', click: '/mediuns/consulta'},
        {title: 'Cadastrar Médium', click: '/mediuns/cadastro'},
        {title: 'Médium Menor', click: '/mediuns/menor'}
    ]

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Médium Menor - Consulta" >
                <SearchCard>
                    <SearchContainer template="1fr 1fr 180px">
                        <InputContainer>
                            <label>Nome do Médium Menor</label>
                            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                        </InputContainer>
                        <InputContainer>
                            <label>Nome do Responsável</label>
                            <input type="text" value={searchResp} onChange={(e) => setSearchResp(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => navigate('cadastro')}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um médium menor para EXIBIR, EDITAR ou EXCLUIR</InfoContent>
                        <InfoContent>
                            Resultados encontrados: {menores
                                .filter((item: IMenor) => removeDiacritics(item.nome).includes(removeDiacritics(searchName)))
                                .filter((item: IMenor) => removeDiacritics(item.responsavel).includes(removeDiacritics(searchResp)))
                                .length}
                        </InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {alphabeticOrder(menores)
                            .filter((item: IMenor) => removeDiacritics(item.nome).includes(removeDiacritics(searchName)))
                            .filter((item: IMenor) => removeDiacritics(item.responsavel).includes(removeDiacritics(searchResp)))
                            .map((item: IMenor, index: number) => (
                                <Results key={index} onClick={() => navigate(`${item.menor_id}`)}>
                                    <ResultsTitle>{item.nome}</ResultsTitle>
                                    <ResultsDetails>Responsável: {item.responsavel} - {item.parentesco}</ResultsDetails>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
    )
}

export default YoungMedium