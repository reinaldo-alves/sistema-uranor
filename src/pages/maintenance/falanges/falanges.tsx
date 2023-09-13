import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IFalange } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert } from "src/utilities/popups";

function Falanges() {   
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState({} as IFalange);
    const [edited, setEdited] = useState({} as IFalange);
    const [showModal, setShowModal] = useState(false);
    
    const { token } = useContext(UserContext);
    const { falMiss, loadFalMiss } = useContext(ListContext);

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

    const showModalFal = (fal: IFalange) => {
        setEdited(fal);
        setSelected(fal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited({} as IFalange);
        setSelected({} as IFalange);
    }

    const editFal = async (newFal: IFalange, oldFal: IFalange, token: string) => {
        const changedFields = {} as any
        for (const key in newFal){
            if (newFal[key as keyof IFalange] !== oldFal[key as keyof IFalange]){
                changedFields[key as keyof IFalange] = newFal[key as keyof IFalange]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await api.put('/falange/update', {falange_id: oldFal.falange_id, ...changedFields}, {headers:{Authorization: token}})
                if(oldFal.falange_id === 1) {
                    Alert('Falange missionária editada com sucesso. Por favor, altere também a falange NITYAMA MADRUXA', 'success');
                } else if(oldFal.falange_id === 2) {
                    Alert('Falange missionária editada com sucesso. Por favor, altere também a falange NITYAMA', 'success');
                } else {
                    Alert('Falange missionária editada com sucesso', 'success');
                }
                await loadFalMiss(token);
                setEdited({} as IFalange);
                setSelected({} as IFalange);
                closeModal();
            } catch (error) {
                console.log('Não foi possível editar a falange missionária', error);
                Alert('Não foi possível editar a falange missionária', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração na falange missionária', 'info')
        }
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
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputContainer>
                        <InfoCard>
                            <InfoContent>Clique sobre uma falange para EDITAR</InfoContent>
                            <InfoContent>Resultados encontrados: {falMiss.filter((item: IFalange) => item.nome.toLowerCase().includes(search.trim().toLowerCase())).length}</InfoContent>
                        </InfoCard>
                    </SearchContainer>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {falMiss
                            .filter((item: IFalange) => item.nome.toLowerCase().includes(search.trim().toLowerCase()))
                            .map((item: IFalange, index: number) => (
                                <Results key={index} onClick={() => showModalFal(item)}>
                                    <ResultsTitle>{item.nome}</ResultsTitle>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Editar Falange Missionária</ModalTitle>
                    <InputContainer>
                        <label>Nome da Falange</label>
                        <input type="text" value={edited.nome} onChange={(e) => updateProps('nome', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Nome da Primeira</label>
                        <input type="text" value={edited.primeira} onChange={(e) => updateProps('primeira', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Classificação do Adjunto de Apoio</label>
                        <input type="text" value={edited.adjMin} onChange={(e) => updateProps('adjMin', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Nome do Adjunto de Apoio</label>
                        <input type="text" value={edited.adjNome} onChange={(e) => updateProps('adjNome', e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={async () => await editFal(edited, selected, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Falanges