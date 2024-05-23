import { useState, useContext } from "react";
import { InfoCard, InputContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IMedium, IMentor } from "src/types/types";
import MainContainer from "src/components/MainContainer/MainContainer";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert, Confirm } from "src/utilities/popups";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import { formatInputText, handleEnterPress } from "src/utilities/functions";
import { MediumContext } from "src/contexts/MediumContext";

function Guias() {
    const [search, setSearch] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(0);
    const [guia, setGuia] = useState('');
    const [showModal, setShowModal] = useState(false);    
    
    const { token } = useContext(UserContext);
    const { guias, loadGuia } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const modalAddGuia = () => {
        setEdit(false);
        setGuia('')
        setId(0);
        setShowModal(true);
    }

    const modalEditGuia = (min: IMentor) => {
        setEdit(true);
        setGuia(min.nome);
        setId(min.id);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
        setGuia('')
        setId(0);
    }

    const addGuia = async (nome: string, token: string) => {
        const exists = guias.some((item: IMentor) => item.nome.toLowerCase() === nome.toLowerCase());
        if (!nome) {
            Alert('Preencha os dados corretamente', 'warning');
        } else if (exists) {
            Alert('Já existe uma guia missionária com esse nome', 'error');
        } else {
            try {
                await api.post('/guia/create', {nome}, {headers:{Authorization: token}})
                Alert('Guia missionária adicionada com sucesso', 'success');
                await loadGuia(token);
                closeModal();
            } catch (error) {
                console.log('Não foi possível adicionar a guia missionária', error);
                Alert('Não foi possível adicionar a guia missionária', 'error');
            }
        } 
    }

    const editGuia = async (guia_id: number, nome: string, token: string) => {
        const guia = guias.find((item: IMentor) => item.id === guia_id)
        if (guia.nome === nome) {
            Alert('Não foi feita nenhuma alteração na guia missionária', 'info')
        } else {
            try {
                await api.put('/guia/update', {guia_id, nome}, {headers:{Authorization: token}})
                Alert('Guia missionária editada com sucesso', 'success');
                await loadGuia(token);
                closeModal();
            } catch (error) {
                console.log('Não foi possível editar a guia missionária', error);
                Alert('Não foi possível editar a guia missionária', 'error');
            }
        }
    }

    const deleteGuia = async (guia_id: number) => {
        await Confirm('ATENÇÃO! O nome da guia missionária será excluído e removido de todos os cadastros. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                mediuns.forEach(async (item: IMedium) => {
                    if (item.guia === guia_id) {
                        await api.put('/medium/update', {medium_id: item.medium_id, guia: null}, {headers:{Authorization: token}})
                    } 
                })
                await api.delete(`/guia/delete?guia_id=${guia_id}`, {headers:{Authorization: token}})
                Alert('Guia missionária excluída com sucesso', 'success');
                await loadGuia(token);
                closeModal();
            } catch (error) {
                console.log('Erro ao excluir guia missionária', error);
                Alert('Erro ao excluir guia missionária', 'error');
            }
        });
    }
    
    guias.sort((guiaA: IMentor, guiaB: IMentor) => {
        const nomeA = guiaA.nome.toLowerCase();
        const nomeB = guiaB.nome.toLowerCase();
        return nomeA.localeCompare(nomeB, 'pt-BR');
      });      

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Guias Missionárias - Manutenção">
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome da Guia Missionária</label>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddGuia()}>Adicionar nova</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre uma guia missionária para EDITAR ou EXCLUIR</InfoContent>
                        <InfoContent>Resultados encontrados: {guias.filter((item: IMentor) => item.nome.toLowerCase().includes(search.trim().toLowerCase())).length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {guias
                            .filter((item: IMentor) => item.nome.toLowerCase().includes(search.trim().toLowerCase()))
                            .map((item: IMentor, index: number) => (
                                <Results key={index} onClick={() => modalEditGuia(item)}>
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
                    <ModalTitle>{edit ? 'Editar Guia Missionária' : 'Nova Guia Missionária'}</ModalTitle>
                    <InputContainer>
                        <label>Nome da Guia Missionária</label>
                        <input type="text" value={guia} onKeyUp={edit? (e) => handleEnterPress(e, async () => await editGuia(id, guia, token)) : (e) => handleEnterPress(e, async () => await addGuia(guia, token))} onChange={(e) => setGuia(formatInputText(e.target.value.trim()))} />
                    </InputContainer>
                    {edit? 
                        <ModalButton 
                            color="red"
                            style={{alignSelf: 'center'}}
                            onClick={async () => {await deleteGuia(id)}}
                        >Excluir</ModalButton>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit ? async () => await editGuia(id, guia, token) : async () => await addGuia(guia, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Guias