import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IFalange } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";

function Falanges() {
    
    const navigate = useNavigate();
    
    const [id, setId] = useState(0);
    const [ministro, setMinistro] = useState(0);
    const [adjunto, setAdjunto] = useState('');
    const [classif, setClassif] = useState('');
    const [esperanca, setEsperanca] = useState(false);
    const [selected, setSelected] = useState({} as IFalange);
    const [showModal, setShowModal] = useState(false);
    
    const { falMiss } = useContext(ListContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const modalButtonFunction = () => {
        setShowModal(false)
        setSelected({} as IFalange)
    }

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Falanges Missionárias - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Falange Missionária</label>
                            <input />
                        </InputContainer>
                        <InfoCard>
                            <InfoContent>Clique sobre uma falange para EDITAR</InfoContent>
                            <InfoContent>Resultados encontrados: {falMiss.length}</InfoContent>
                        </InfoCard>
                    </SearchContainer>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {falMiss.map((item: IFalange, index: number) => (
                            <Results key={index} onClick={() => setShowModal(true)}>
                                <ResultsTitle>{item.nome}</ResultsTitle>
                            </Results>
                        ))}
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Editar Falange Missionária</ModalTitle>
                    <InputContainer>
                        <label>Nome da Falange</label>
                        <input type="text" value={adjunto} onChange={(e) => setAdjunto(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Nome da Primeira</label>
                        <input type="text" value={adjunto} onChange={(e) => setAdjunto(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Classificação do Adjunto de Apoio</label>
                        <input type="text" value={adjunto} onChange={(e) => setAdjunto(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Nome do Adjunto de Apoio</label>
                        <input type="text" value={adjunto} onChange={(e) => setAdjunto(e.target.value)} />
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

export default Falanges