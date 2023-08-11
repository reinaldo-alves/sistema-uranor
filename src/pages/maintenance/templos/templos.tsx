import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IAdjunto, IEstado, ITemplo } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";

function Templos() {
    
    const navigate = useNavigate();
    
    const [id, setId] = useState(0);
    const [ministro, setMinistro] = useState(0);
    const [adjunto, setAdjunto] = useState('');
    const [classif, setClassif] = useState('');
    const [esperanca, setEsperanca] = useState(false);
    const [selected, setSelected] = useState({} as ITemplo);
    const [showModal, setShowModal] = useState(false);
    
    const { adjuntos, templos, estados } = useContext(ListContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const modalButtonFunction = () => {
        setShowModal(false)
        setSelected({} as ITemplo)
    }
    
    templos.sort((temA: ITemplo, temB: ITemplo) => {
        if (temA.cidade < temB.cidade) {
          return -1;
        }
        if (temA.cidade > temB.cidade) {
          return 1;
        }
        return 0;
      });      

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Templos - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome do Templo</label>
                            <input />
                        </InputContainer>
                        <InputContainer>
                            <label>Estado</label>
                            <select>
                                <option value=''></option>
                                {estados.map((item: IEstado, index: number) => (
                                    <option key={index} value={item.abrev}>{item.abrev}</option>
                                ))}
                            </select>
                        </InputContainer>
                        <InputContainer>
                            <label>Ministro</label>
                            <input />
                        </InputContainer>
                        <SearchButton onClick={() => setShowModal(true)}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um adjunto para EDITAR</InfoContent>
                        <InfoContent>Resultados encontrados: {templos.length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {templos.map((item: ITemplo, index: number) => (
                            <Results key={index} onClick={() => setSelected(item)}>
                                <ResultsTitle>{item.cidade} - {item.estado}</ResultsTitle>
                                <ResultsDetails>Adj. {adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === item.presidente).min} - Mestre {adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === item.presidente).adj}</ResultsDetails>
                            </Results>
                        ))}
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Novo Templo</ModalTitle>
                    <InputContainer>
                        <label>Nome do Templo (Cidade)</label>
                        <input type="text" value={adjunto} onChange={(e) => setAdjunto(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Estado</label>
                        <select>
                            <option value=''></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.abrev}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label>Presidente</label>
                        <select>
                            <option value=''></option>
                            {adjuntos.map((item: IAdjunto, index: number) => (
                                <option key={index} value={item.adjunto_id}>Adj. {item.ministro} - Mestre {item.nome}</option>
                            ))}
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

export default Templos