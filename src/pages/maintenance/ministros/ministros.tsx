import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IMentor } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import api from "src/api";
import { UserContext } from "src/contexts/UserContext";
import { Alert } from "src/utilities/popups";

function Ministros() {
    const [search, setSearch] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(0);
    const [ministro, setMinistro] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    const { token } = useContext(UserContext)
    const { ministros, loadMinistro } = useContext(ListContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const modalAddMin = () => {
        setEdit(false);
        setMinistro('')
        setId(0);
        setShowModal(true);
    }

    const modalEditMin = (min: IMentor) => {
        setEdit(true);
        setMinistro(min.nome);
        setId(min.id);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
        setMinistro('')
        setId(0);
    }

    const addMin = async (nome: string, token: string) => {
        try {
            await api.post('/ministro/create', {nome}, {headers:{Authorization: token}})
            Alert('Ministro adicionado com sucesso', 'success');
            await loadMinistro(token);
            closeModal();
        } catch (error) {
            console.log('Não foi possível adicionar o ministro', error);
            Alert('Não foi possível adicionar o ministro', 'error');
        }
    }

    const editMin = async (ministro_id: number, nome: string, token: string) => {
        try {
            await api.put('/ministro/update', {ministro_id, nome}, {headers:{Authorization: token}})
            Alert('Ministro editado com sucesso', 'success');
            await loadMinistro(token);
            closeModal();
        } catch (error) {
            console.log('Não foi possível editar o ministro', error);
            Alert('Não foi possível editar o ministro', 'error');
        }
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
                <MainTitle content="Ministros - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome do Ministro</label>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddMin()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um ministro para EDITAR</InfoContent>
                        <InfoContent>Resultados encontrados: {ministros.filter((item: IMentor) => item.nome.toLowerCase().includes(search.trim().toLowerCase())).length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {ministros
                            .filter((item: IMentor) => item.nome.toLowerCase().includes(search.trim().toLowerCase()))
                            .map((item: IMentor, index: number) => (
                                <Results key={index} onClick={() => modalEditMin(item)}>
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
                    <ModalTitle>{edit ? 'Editar Ministro' : 'Novo Ministro'}</ModalTitle>
                    <InputContainer>
                        <label>Nome do Ministro</label>
                        <input type="text" value={ministro} onChange={(e) => setMinistro(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit ? async () => await editMin(id, ministro, token) : async () => await addMin(ministro, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Ministros