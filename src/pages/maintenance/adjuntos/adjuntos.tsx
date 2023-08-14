import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IAdjunto, IMentor } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";

function Adjuntos() {
    const defaultAdj = {adjunto_id: 0, nome: '', ministro: 0, classif: '', esperanca: false}
    
    const [searchMin, setSearchMin] = useState('');
    const [searchAdj, setSearchAdj] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultAdj);
    const [edited, setEdited] = useState(defaultAdj);
    const [showModal, setShowModal] = useState(false);
    
    const { token } = useContext(UserContext);
    const { adjuntos, ministros, loadAdjunto } = useContext(ListContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const updateProps = (property: string, newValue: any) => {
        setEdited((prevData: any) => ({
        ...prevData,
        [property]: newValue
        }));
    };

    const modalAddAdj = () => {
        setEdit(false);
        setEdited(defaultAdj);
        setSelected(defaultAdj);
        setShowModal(true);
    }

    const modalEditAdj = (adj: IAdjunto) => {
        setEdit(true);
        setEdited(adj);
        setSelected(adj);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultAdj);
        setSelected(defaultAdj);
    }

    const addAdj = (adjunto: IAdjunto, token: string) => {
        const {adjunto_id, ...newAdjunto} = adjunto;
        api.post('/adjunto/create', newAdjunto, {headers:{Authorization: token}}).then(() => {
            alert('Adjunto adicionado com sucesso');
            loadAdjunto(token);
            closeModal();
        }).catch((error) => {
            console.log('Não foi possível adicionar o adjunto', error);
        })
    }

    const editAdj = (newAdj: IAdjunto, oldAdj: IAdjunto, token: string) => {
        const changedFields = {} as any
        for (const key in newAdj){
            if (newAdj[key as keyof IAdjunto] !== oldAdj[key as keyof IAdjunto]){
                changedFields[key as keyof IAdjunto] = newAdj[key as keyof IAdjunto]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            api.put('/adjunto/update', {adjunto_id: oldAdj.adjunto_id, ...changedFields}, {headers:{Authorization: token}}).then(() => {
                alert('Adjunto editado com sucesso');
                loadAdjunto(token);
                setEdited(defaultAdj);
                setSelected(defaultAdj);
                closeModal();
            }).catch((error) => {
                console.log('Não foi possível editar o adjunto', error);
            })
        } else {
            alert('Não foi feita nenhuma alteração no adjunto')
        }
    }
    
    adjuntos.sort((adjA: IAdjunto, adjB: IAdjunto) => {
        if (adjA.ministro < adjB.ministro) {
          return -1;
        }
        if (adjA.ministro > adjB.ministro) {
          return 1;
        }
        return 0;
      });  

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Adjuntos - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Ministro</label>
                            <input type="text" value={searchMin} onChange={(e) => setSearchMin(e.target.value)} />
                        </InputContainer>
                        <InputContainer>
                            <label>Nome do Adjunto</label>
                            <input type="text" value={searchAdj} onChange={(e) => setSearchAdj(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddAdj()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um adjunto para EDITAR</InfoContent>
                        <InfoContent>
                            Resultados encontrados: {adjuntos
                                .filter((item: IAdjunto) => ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome.toLowerCase().includes(searchMin.trim().toLowerCase()))
                                .filter((item: IAdjunto) => item.nome.toLowerCase().includes(searchAdj.trim().toLowerCase()))
                                .length}
                        </InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {adjuntos
                            .filter((item: IAdjunto) => ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome.toLowerCase().includes(searchMin.trim().toLowerCase()))
                            .filter((item: IAdjunto) => item.nome.toLowerCase().includes(searchAdj.trim().toLowerCase()))
                            .map((item: IAdjunto, index: number) => (
                                <Results key={index} onClick={() => modalEditAdj(item)}>
                                    <ResultsTitle>Adj. {ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome} - Mestre {item.nome}</ResultsTitle>
                                    <ResultsDetails>Classificação: {item.classif} - Esperança: {item.esperanca? 'Sim' : 'Não'}</ResultsDetails>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>{edit? 'Editar Adjunto' : 'Novo Adjunto'}</ModalTitle>
                    <InputContainer>
                        <label>Ministro</label>
                        <select value={edited.ministro} onChange={(e) => updateProps('ministro', e.target.value)}>
                            <option value={0}></option>
                            {ministros.map((item: IMentor, index: number) => (
                                <option key={index} value={item.id}>{item.nome}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label>Nome do Adjunto</label>
                        <input type="text" value={edited.nome} onChange={(e) => updateProps('nome', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Classificação</label>
                        <select value={edited.classif} onChange={(e) => updateProps('classif', e.target.value)}>
                            <option value=''></option>
                            <option value='Arcanos'>Arcanos</option>
                            <option value='Rama 2000'>Rama 2000</option>
                        </select>
                    </InputContainer>
                    <InputContainer box>
                        <label>Adjunto Esperança?</label>
                        <input type="checkbox" checked={edited.esperanca} onChange={(e) => updateProps('esperanca', e.target.checked)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? () => editAdj(edited, selected, token) : () => addAdj(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Adjuntos