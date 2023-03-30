import { InputContainer, MainContainer, SearchButton, SearchCard } from "./styles";

function SearchMedium() {
    return (
        <MainContainer>
            <SearchCard>
                <InputContainer>
                    <label>Nome do Médium</label>
                    <input />
                </InputContainer>
                <InputContainer>
                    <label>Templo</label>
                    <input />
                </InputContainer>
                <SearchButton>Buscar</SearchButton>
            </SearchCard>
        </MainContainer>
    )
}

export default SearchMedium