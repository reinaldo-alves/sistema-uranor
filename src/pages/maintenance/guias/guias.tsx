import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IMentor } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";

function Guias() {
    const [search, setSearch] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(0);
    const [guia, setGuia] = useState('');
    const [showModal, setShowModal] = useState(false);    
    
    const { token } = useContext(UserContext)
    const { guias, loadGuia } = useContext(ListContext);

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

    const addGuia = (nome: string, token: string) => {
        api.post('/guia/create', {nome}, {headers:{Authorization: token}}).then(() => {
            alert('Guia missionária adicionada com sucesso');
            loadGuia(token);
            closeModal();
        }).catch((error) => {
            console.log('Não foi possível adicionar a guia missionária', error);
        })
    }

    const editGuia = (guia_id: number, nome: string, token: string) => {
        api.put('/guia/update', {guia_id, nome}, {headers:{Authorization: token}}).then(() => {
            alert('Guia missionária editada com sucesso');
            loadGuia(token);
            closeModal();
        }).catch((error) => {
            console.log('Não foi possível editar a guia missionária', error);
        })
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
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddGuia()}>Adicionar nova</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre uma guia missionária para EDITAR</InfoContent>
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
                        <input type="text" value={guia} onChange={(e) => setGuia(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit ? () => editGuia(id, guia, token) : () => addGuia(guia, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Guias