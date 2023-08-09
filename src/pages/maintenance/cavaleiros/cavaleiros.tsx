import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton, ResultsDetails } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { ICavaleiro } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";

function Cavaleiros() {
    
    const navigate = useNavigate();
    
    const [id, setId] = useState(0);
    const [ministro, setMinistro] = useState('');
    const [selected, setSelected] = useState({} as ICavaleiro);
    const [showModal, setShowModal] = useState(false);
    
    const { cavaleiros } = useContext(ListContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const modalButtonFunction = () => {
        setShowModal(false)
        setSelected({} as ICavaleiro)
    }
    
    cavaleiros.sort((cavA: ICavaleiro, cavB: ICavaleiro) => {
        if (cavA.nome < cavB.nome) {
          return -1;
        }
        if (cavA.nome > cavB.nome) {
          return 1;
        }
        return 0;
      });      

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Cavaleiros - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome do Cavaleiro</label>
                            <input />
                        </InputContainer>
                        <SearchButton onClick={() => setShowModal(true)}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um ministro para EDITAR</InfoContent>
                        <InfoContent>Resultados encontrados: {cavaleiros.length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {cavaleiros.map((item: ICavaleiro, index: number) => (
                            <Results key={index} onClick={() => setSelected(item)}>
                                <ResultsTitle>{item.nome}</ResultsTitle>
                                <ResultsDetails>Cavaleiro {item.med === 'Apará'? 'Ajanã' : 'Adjuração'}</ResultsDetails>
                            </Results>
                        ))}
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Novo Cavaleiro</ModalTitle>
                    <InputContainer>
                        <label>Nome do Cavaleiro</label>
                        <input type="text" value={ministro} onChange={(e) => setMinistro(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Mediunidade</label>
                        <select>
                            <option value=''></option>
                            <option value='Apará'>Apará</option>
                            <option value='Doutrinador'>Doutrinador</option>
                        </select>
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => modalButtonFunction()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => modalButtonFunction()}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Cavaleiros