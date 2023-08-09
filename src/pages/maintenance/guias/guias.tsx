import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IMentor } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";

function Guias() {
    
    const navigate = useNavigate();
    
    const [id, setId] = useState(0);
    const [ministro, setMinistro] = useState('');
    const [selected, setSelected] = useState({} as IMentor);
    const [showModal, setShowModal] = useState(false);
    
    const { guias } = useContext(ListContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const modalButtonFunction = () => {
        setShowModal(false)
        setSelected({} as IMentor)
    }
    
    guias.sort((guiaA: IMentor, guiaB: IMentor) => {
        if (guiaA.nome < guiaB.nome) {
          return -1;
        }
        if (guiaA.nome > guiaB.nome) {
          return 1;
        }
        return 0;
      });      

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Guias Missionárias - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome da Guia Missionária</label>
                            <input />
                        </InputContainer>
                        <SearchButton onClick={() => setShowModal(true)}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um ministro para EDITAR</InfoContent>
                        <InfoContent>Resultados encontrados: {guias.length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {guias.map((item: IMentor, index: number) => (
                            <Results key={index} onClick={() => setSelected(item)}>
                                <ResultsTitle>{item.nome}</ResultsTitle>
                            </Results>
                        ))}
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Nova Guia Missionária</ModalTitle>
                    <InputContainer>
                        <label>Nome da Guia Missionária</label>
                        <input type="text" value={ministro} onChange={(e) => setMinistro(e.target.value)} />
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

export default Guias