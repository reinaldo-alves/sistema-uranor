import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, TableContainer, SectionTitle, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IAdjunto, IMentor } from "src/types/types";

function Adjuntos() {
    
    const navigate = useNavigate();
    
    const [id, setId] = useState(0);
    const [ministro, setMinistro] = useState(0);
    const [adjunto, setAdjunto] = useState('');
    const [classif, setClassif] = useState('');
    const [esperanca, setEsperanca] = useState(false);
    const [selected, setSelected] = useState({} as IAdjunto);
    const [showModal, setShowModal] = useState(false);
    
    const { adjuntos, ministros } = useContext(ListContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const modalButtonFunction = () => {
        setShowModal(false)
        setSelected({} as IAdjunto)
    }
    
    adjuntos.sort((adjA: IAdjunto, adjB: IAdjunto) => {
        if (adjA.min < adjB.min) {
          return -1;
        }
        if (adjA.min > adjB.min) {
          return 1;
        }
        return 0;
      });      

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <SectionTitle>Adjuntos - Manutenção</SectionTitle>
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Ministro</label>
                            <input />
                        </InputContainer>
                        <InputContainer>
                            <label>Nome do Adjunto</label>
                            <input />
                        </InputContainer>
                        <SearchButton onClick={() => setShowModal(true)}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um adjunto para EDITAR</InfoContent>
                        <InfoContent>Resultados encontrados: {adjuntos.length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <TableContainer>
                        <ResultsTable>
                            <tbody>
                                {adjuntos.map((item: IAdjunto, index: number) => (
                                    <Results key={index} onClick={() => setSelected(item)}>
                                        <td>
                                            <ResultsTitle>Adj. {item.min} - Mestre {item.adj}</ResultsTitle>
                                            <ResultsDetails>Classificação: {item.classif} - Esperança: {item.esperanca? 'Sim' : 'Não'}</ResultsDetails>
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
                    <ModalTitle>Novo Adjunto</ModalTitle>
                    <InputContainer>
                        <label>Ministro</label>
                        <select>
                            <option value=''></option>
                            {ministros.map((item: IMentor, index: number) => (
                                <option key={index} value={item.id}>{item.nome}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label>Nome do Adjunto</label>
                        <input type="text" value={adjunto} onChange={(e) => setAdjunto(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Classificação</label>
                        <select>
                            <option value=''></option>
                            <option value='Arcanos'>Arcanos</option>
                            <option value='Rama 2000'>Rama 2000</option>
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label>Adjunto Esperança?</label>
                        <select>
                            <option value={0}>Não</option>
                            <option value={1}>Sim</option>
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

export default Adjuntos