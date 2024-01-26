import { useState, useContext, useEffect } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IAdjunto, IMentor } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert } from "src/utilities/popups";
import { defaultAdj, defaultMentor } from "src/utilities/default";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { alphabeticOrder } from "src/utilities/functions";

function Adjuntos() {
    const [searchMin, setSearchMin] = useState('');
    const [searchAdj, setSearchAdj] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultAdj);
    const [edited, setEdited] = useState(defaultAdj);
    const [showModal, setShowModal] = useState(false);
    const [dropMinistro, setDropMinistro] = useState(defaultMentor);
    const [searchMinistro, setSearchMinistro] = useState('');
    
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

    useEffect(() => {
        const ministroObject = ministros.find((item: IMentor) => item?.id === dropMinistro?.id);
        updateProps('ministro', ministroObject? ministroObject.id : 0);
    }, [dropMinistro])

    const modalAddAdj = () => {
        setEdit(false);
        setEdited(defaultAdj);
        setSelected(defaultAdj);
        setDropMinistro(defaultMentor);
        setSearchMinistro('');
        setShowModal(true);
    }

    const modalEditAdj = (adj: IAdjunto) => {
        setEdit(true);
        setEdited(adj);
        setSelected(adj);
        setDropMinistro(ministros.find((item: IMentor) => item.id === adj.ministro));
        setSearchMinistro(ministros.find((item: IMentor) => item.id === adj.ministro)?.nome || '');
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultAdj);
        setSelected(defaultAdj);
    }

    const addAdj = async (adjunto: IAdjunto, token: string) => {
        const {adjunto_id, ...newAdjunto} = adjunto;
        try {
            await api.post('/adjunto/create', newAdjunto, {headers:{Authorization: token}})
            Alert('Adjunto adicionado com sucesso', 'success');
            await loadAdjunto(token);
            closeModal();
        } catch (error) {
            console.log('Não foi possível adicionar o adjunto', error);
            Alert('Não foi possível adicionar o adjunto', 'error');
        }
    }

    const editAdj = async (newAdj: IAdjunto, oldAdj: IAdjunto, token: string) => {
        const changedFields = {} as any
        for (const key in newAdj){
            if (newAdj[key as keyof IAdjunto] !== oldAdj[key as keyof IAdjunto]){
                changedFields[key as keyof IAdjunto] = newAdj[key as keyof IAdjunto]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await api.put('/adjunto/update', {adjunto_id: oldAdj.adjunto_id, ...changedFields}, {headers:{Authorization: token}})
                Alert('Adjunto editado com sucesso', 'success');
                await loadAdjunto(token);
                setEdited(defaultAdj);
                setSelected(defaultAdj);
                closeModal();
            } catch (error) {
                console.log('Não foi possível editar o adjunto', error);
                Alert('Não foi possível editar o adjunto', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no adjunto', 'info')
        }
    }
    
    adjuntos.sort((adjA: IAdjunto, adjB: IAdjunto) => {
        const nomeA = ministros.filter((min: IMentor) => min.id === adjA.ministro)[0].nome.toLowerCase();
        const nomeB = ministros.filter((min: IMentor) => min.id === adjB.ministro)[0].nome.toLowerCase();
        return nomeA.localeCompare(nomeB, 'pt-BR');
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
                        <AutocompleteInput 
                            label={(option) => option.nome}
                            default={defaultMentor}
                            options={alphabeticOrder(ministros)}
                            equality={(option, value) => option?.id === value?.id}
                            value={dropMinistro}
                            setValue={setDropMinistro}
                            inputValue={searchMinistro}
                            setInputValue={setSearchMinistro}
                        />
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
                        <ModalButton color='green' onClick={edit? async () => await editAdj(edited, selected, token) : async () => await addAdj(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Adjuntos