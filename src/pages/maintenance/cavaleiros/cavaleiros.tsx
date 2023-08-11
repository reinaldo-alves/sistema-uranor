import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton, ResultsDetails } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { ICavaleiro } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";

function Cavaleiros() {
    const defaultCav = {id: 0, nome: '', med: ''}

    const [search, setSearch] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultCav);
    const [edited, setEdited] = useState(defaultCav);
    const [showModal, setShowModal] = useState(false);
    
    const { token } = useContext(UserContext);
    const { cavaleiros, loadCavaleiro } = useContext(ListContext);

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
        setEdited(defaultCav);
        setSelected(defaultCav);
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
        setEdited(defaultCav);
        setSelected(defaultCav);
    }

    const addCav = (cavaleiro: ICavaleiro, token: string) => {
        api.post('/cavaleiro/create', {nome:cavaleiro.nome, med:cavaleiro.med}, {headers:{Authorization: token}}).then(() => {
            alert('Cavaleiro adicionado com sucesso');
            loadCavaleiro(token);
            closeModal();
        }).catch((error) => {
            console.log('Não foi possível adicionar o cavaleiro', error);
        })
    }

    const editCav = (newCav: ICavaleiro, oldCav: ICavaleiro, token: string) => {
        const changedFields = {} as any
        for (const key in newCav){
            if (newCav[key as keyof ICavaleiro] !== oldCav[key as keyof ICavaleiro]){
                changedFields[key as keyof ICavaleiro] = newCav[key as keyof ICavaleiro]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            api.put('/cavaleiro/update', {cavaleiro_id: oldCav.id, ...changedFields}, {headers:{Authorization: token}}).then(() => {
                alert('Cavaleiro editado com sucesso');
                loadCavaleiro(token);
                setEdited(defaultCav);
                setSelected(defaultCav);
                closeModal();
            }).catch((error) => {
                console.log('Não foi possível editar o cavaleiro', error);
            })
        } else {
            alert('Não foi feita nenhuma alteração no cavaleiro')
        }
    }
    
    cavaleiros.sort((cavA: ICavaleiro, cavB: ICavaleiro) => {
        if (cavA.nome < cavB.nome) {
          return -1;
        }
        if (cavA.nome > cavB.nome) {
          return 1;
        }
        return 0;
    });      

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Cavaleiros - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome do Cavaleiro</label>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddCav()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um cavaleiro para EDITAR</InfoContent>
                        <InfoContent>Resultados encontrados: {cavaleiros.filter((item: ICavaleiro) => item.nome.toLowerCase().includes(search.trim().toLowerCase())).length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {cavaleiros
                            .filter((item: ICavaleiro) => item.nome.toLowerCase().includes(search.trim().toLowerCase()))
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
                        <input type="text" value={edited.nome} onChange={(e) => updateProps('nome', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Mediunidade</label>
                        <select value={edited.med} onChange={(e) => updateProps('med', e.target.value)}>
                            <option value=''></option>
                            <option value='Apará'>Apará</option>
                            <option value='Doutrinador'>Doutrinador</option>
                        </select>
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? () => editCav(edited, selected, token) : () => addCav(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Cavaleiros