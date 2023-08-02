import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, TableContainer, SectionTitle, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IMentor } from "src/types/types";

function Ministros() {
    
    const navigate = useNavigate();
    
    const [id, setId] = useState(0);
    const [ministro, setMinistro] = useState('');
    const [selected, setSelected] = useState({} as IMentor);
    const [showModal, setShowModal] = useState(false);
    
    const { ministros } = useContext(ListContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const modalButtonFunction = () => {
        setShowModal(false)
        setSelected({} as IMentor)
    }
    
    ministros.sort((minA: IMentor, minB: IMentor) => {
        if (minA.nome < minB.nome) {
          return -1;
        }
        if (minA.nome > minB.nome) {
          return 1;
        }
        return 0;
      });      

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <SectionTitle>Ministros - Manutenção</SectionTitle>
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome do Ministro</label>
                            <input />
                        </InputContainer>
                        <SearchButton onClick={() => setShowModal(true)}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um ministro para EDITAR</InfoContent>
                        <InfoContent>Resultados encontrados: {ministros.length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <TableContainer>
                        <ResultsTable>
                            <tbody>
                                {ministros.map((item: IMentor, index: number) => (
                                    <Results key={index} onClick={() => setSelected(item)}>
                                        <td>
                                            <ResultsTitle>{item.nome}</ResultsTitle>
                                        </td>
                                    </Results>
                                ))}
                            </tbody>
                        </ResultsTable>
                    </TableContainer>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Novo Ministro</ModalTitle>
                    <InputContainer>
                        <label>Nome do Ministro</label>
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

export default Ministros