import { useState, useContext, useEffect } from "react";
import { InfoCard, InputContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IMedium, IMentor } from "src/types/types";
import MainContainer from "src/components/MainContainer/MainContainer";
import api from "src/api";
import { UserContext } from "src/contexts/UserContext";
import { Alert, Confirm } from "src/utilities/popups";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import { formatInputText, handleEnterPress, removeDiacritics } from "src/utilities/functions";
import { MediumContext } from "src/contexts/MediumContext";

function Ministros() {
    const [search, setSearch] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(0);
    const [ministro, setMinistro] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    const { token } = useContext(UserContext);
    const { ministros, loadMinistro } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);

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
        const exists = ministros.some((item: IMentor) => item.nome.toLowerCase() === nome.toLowerCase());
        if (!nome) {
            Alert('Preencha os dados corretamente', 'warning');
        } else if (exists) {
            Alert('Já existe um ministro com esse nome', 'error');
        } else {
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
    }

    const editMin = async (ministro_id: number, nome: string, token: string) => {
        const min = ministros.find((item: IMentor) => item.id === ministro_id)
        if (min.nome === nome) {
            Alert('Não foi feita nenhuma alteração no ministro', 'info')
        } else {
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
    }

    const deleteMin = async (ministro_id: number) => {
        await Confirm('ATENÇÃO! O nome do ministro será excluído e removido de todos os cadastros. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                mediuns.forEach(async (item: IMedium) => {
                    if (item.ministro === ministro_id) {
                        await api.put('/medium/update', {medium_id: item.medium_id, ministro: null}, {headers:{Authorization: token}})
                    } 
                })
                await api.delete(`/ministro/delete?ministro_id=${ministro_id}`, {headers:{Authorization: token}})
                Alert('Ministro excluído com sucesso', 'success');
                await loadMinistro(token);
                closeModal();
            } catch (error) {
                console.log('Erro ao excluir ministro', error);
                Alert('Erro ao excluir ministro', 'error');
            }
        });
    }
    
    ministros.sort((minA: IMentor, minB: IMentor) => {
        const nomeA = minA.nome.toLowerCase();
        const nomeB = minB.nome.toLowerCase();
        return nomeA.localeCompare(nomeB, 'pt-BR');
    });

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Ministros - Manutenção">
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome do Ministro</label>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddMin()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um ministro para EDITAR ou EXCLUIR</InfoContent>
                        <InfoContent>Resultados encontrados: {ministros.filter((item: IMentor) => removeDiacritics(item.nome).includes(removeDiacritics(search))).length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {ministros
                            .filter((item: IMentor) => removeDiacritics(item.nome).includes(removeDiacritics(search)))
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
                        <input type="text" value={ministro} onKeyUp={edit? (e) => handleEnterPress(e, async () => await editMin(id, ministro, token)) : (e) => handleEnterPress(e, async () => await addMin(ministro, token))} onChange={(e) => setMinistro(formatInputText(e.target.value.trim()))} />
                    </InputContainer>
                    {edit? 
                        <ModalButton 
                            color="red"
                            style={{alignSelf: 'center'}}
                            onClick={async () => {await deleteMin(id)}}
                        >Excluir</ModalButton>
                    : ''}
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