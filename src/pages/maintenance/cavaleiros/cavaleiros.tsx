import { useState, useContext, useEffect } from "react";
import { InfoCard, InputContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchCard, SearchContainer, ResultsDetails } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { ICavaleiro, IMedium } from "src/types/types";
import MainContainer from "src/components/MainContainer/MainContainer";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert, Confirm } from "src/utilities/popups";
import { defaultCavaleiro } from "src/utilities/default";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import { formatInputText, handleEnterPress, removeDiacritics } from "src/utilities/functions";
import { MediumContext } from "src/contexts/MediumContext";
import { SearchButton } from "src/components/buttons/buttons";

function Cavaleiros() {
    const [search, setSearch] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultCavaleiro);
    const [edited, setEdited] = useState(defaultCavaleiro);
    const [showModal, setShowModal] = useState(false);
    
    const { token } = useContext(UserContext);
    const { cavaleiros, loadCavaleiro } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);

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

    const modalAddCav = () => {
        setEdit(false);
        setEdited(defaultCavaleiro);
        setSelected(defaultCavaleiro);
        setShowModal(true);
    }

    const modalEditCav = (cav: ICavaleiro) => {
        setEdit(true);
        setEdited(cav);
        setSelected(cav);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultCavaleiro);
        setSelected(defaultCavaleiro);
    }

    const addCav = async (cavaleiro: ICavaleiro, token: string) => {
        const exists = cavaleiros.some((item: ICavaleiro) => item.nome.toLowerCase() === cavaleiro.nome.toLowerCase());
        if (!cavaleiro.nome || !cavaleiro.med) {
            Alert('Preencha os dados corretamente', 'warning');
        } else if (exists) {
            Alert('Já existe um cavaleiro com esse nome', 'error');
        } else {
            try {
                await api.post('/cavaleiro/create', {nome:cavaleiro.nome, med:cavaleiro.med}, {headers:{Authorization: token}})
                Alert('Cavaleiro adicionado com sucesso', 'success');
                await loadCavaleiro(token);
                closeModal();
            } catch (error) {
                console.log('Não foi possível adicionar o cavaleiro', error);
                Alert('Não foi possível adicionar o cavaleiro', 'error');
            }
        }   
    }

    const editCav = async (newCav: ICavaleiro, oldCav: ICavaleiro, token: string) => {
        const changedFields = {} as any
        for (const key in newCav){
            if (newCav[key as keyof ICavaleiro] !== oldCav[key as keyof ICavaleiro]){
                changedFields[key as keyof ICavaleiro] = newCav[key as keyof ICavaleiro]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await api.put('/cavaleiro/update', {cavaleiro_id: oldCav.id, ...changedFields}, {headers:{Authorization: token}})
                Alert('Cavaleiro editado com sucesso', 'success');
                await loadCavaleiro(token);
                setEdited(defaultCavaleiro);
                setSelected(defaultCavaleiro);
                closeModal();
            } catch (error) {
                console.log('Não foi possível editar o cavaleiro', error);
                Alert('Não foi possível editar o cavaleiro', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no cavaleiro', 'info')
        }
    }

    const deleteCav = async (cavaleiro_id: number) => {
        await Confirm('ATENÇÃO! O nome do cavaleiro será excluído e removido de todos os cadastros. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                mediuns.forEach(async (item: IMedium) => {
                    if (item.cavaleiro === cavaleiro_id) {
                        await api.put('/medium/update', {medium_id: item.medium_id, cavaleiro: null}, {headers:{Authorization: token}})
                    }
                    if (item.oldCavaleiro === cavaleiro_id) {
                        await api.put('/medium/update', {medium_id: item.medium_id, oldCavaleiro: null}, {headers:{Authorization: token}})
                    } 
                })
                await api.delete(`/cavaleiro/delete?cavaleiro_id=${cavaleiro_id}`, {headers:{Authorization: token}})
                Alert('Cavaleiro excluído com sucesso', 'success');
                await loadCavaleiro(token);
                closeModal();
            } catch (error) {
                console.log('Erro ao excluir cavaleiro', error);
                Alert('Erro ao excluir cavaleiro', 'error');
            }
        });
    }
    
    cavaleiros.sort((cavA: ICavaleiro, cavB: ICavaleiro) => {
        const nomeA = cavA.nome.toLowerCase();
        const nomeB = cavB.nome.toLowerCase();
        return nomeA.localeCompare(nomeB, 'pt-BR');
    });      

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Cavaleiros - Manutenção" >
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome do Cavaleiro</label>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddCav()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um cavaleiro para EDITAR ou EXCLUIR</InfoContent>
                        <InfoContent>Resultados encontrados: {cavaleiros.filter((item: ICavaleiro) => removeDiacritics(item.nome).includes(removeDiacritics(search))).length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {cavaleiros
                            .filter((item: ICavaleiro) => removeDiacritics(item.nome).includes(removeDiacritics(search)))
                            .map((item: ICavaleiro, index: number) => (
                                <Results key={index} onClick={() => modalEditCav(item)}>
                                    <ResultsTitle>{item.nome}</ResultsTitle>
                                    <ResultsDetails>Cavaleiro {item.med === 'Apará'? 'Ajanã' : 'Adjuração'}</ResultsDetails>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>{edit? 'Editar Cavaleiro' : 'Novo Cavaleiro'}</ModalTitle>
                    <InputContainer>
                        <label>Nome do Cavaleiro</label>
                        <input type="text" value={edited.nome} onKeyUp={edit? (e) => handleEnterPress(e, async () => await editCav(edited, selected, token)) : (e) => handleEnterPress(e, async () => await addCav(edited, token))} onChange={(e) => updateProps('nome', formatInputText(e.target.value.trim()))} />
                    </InputContainer>
                    <InputContainer>
                        <label>Mediunidade</label>
                        <select value={edited.med} onChange={(e) => updateProps('med', e.target.value)}>
                            <option value=''></option>
                            <option value='Apará'>Apará</option>
                            <option value='Doutrinador'>Doutrinador</option>
                        </select>
                    </InputContainer>
                    {edit? 
                        <ModalButton 
                            color="red"
                            style={{alignSelf: 'center'}}
                            onClick={async () => {await deleteCav(selected.id)}}
                        >Excluir</ModalButton>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? async () => await editCav(edited, selected, token) : async () => await addCav(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Cavaleiros