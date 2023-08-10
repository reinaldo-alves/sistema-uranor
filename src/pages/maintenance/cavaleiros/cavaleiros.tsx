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
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(0);
    const [cavaleiro, setCavaleiro] = useState('');
    const [med, setMed] = useState('');
    const [selected, setSelected] = useState({} as ICavaleiro);
    const [edited, setEdited] = useState({});
    const [showModal, setShowModal] = useState(false);
    
    const { token } = useContext(UserContext)
    const { cavaleiros, loadCavaleiro } = useContext(ListContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const modalAddCav = () => {
        setEdit(false);
        setId(0);
        setCavaleiro('');
        setMed('');
        setSelected({} as ICavaleiro);
        setShowModal(true);
    }

    const modalEditCav = (cav: ICavaleiro) => {
        setEdit(true);
        setId(cav.id);
        setCavaleiro(cav.nome);
        setMed(cav.med);
        setSelected(cav)
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
        setId(0);
        setCavaleiro('');
        setMed('');
        setSelected({} as ICavaleiro);
    }

    const addCav = (nome: string, med: string, token: string) => {
        api.post('/cavaleiro/create', {nome, med}, {headers:{Authorization: token}}).then(() => {
            alert('Cavaleiro adicionado com sucesso');
            loadCavaleiro(token);
            closeModal();
        }).catch((error) => {
            console.log('Não foi possível adicionar o cavaleiro', error);
        })
    }

    const editCav = (cavaleiro_id: number, nome: string, med: string, token: string) => {
        // api.get(`/cavaleiro/get?cavaleiro_id=${cavaleiro_id}`, {headers:{Authorization: token}}).then(({ data }) => {
        //     setSelected(data.cavaleiro)
        // }).catch(() => {
        //     setSelected({} as ICavaleiro)
        // })
        // console.log(selected)
        // if(selected.nome !== nome) {
        //     api.put('/cavaleiro/update', {cavaleiro_id, nome, med}, {headers:{Authorization: token}}).then(() => {
        //         alert('Cavaleiro editado com sucesso');
        //         loadCavaleiro(token);
        //         closeModal();
        //     }).catch((error) => {
        //         console.log('Não foi possível editar o cavaleiro');
        //     })
        // }
        
        
        
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
                            <input />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddCav()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um ministro para EDITAR</InfoContent>
                        <InfoContent>Resultados encontrados: {cavaleiros.length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {cavaleiros.map((item: ICavaleiro, index: number) => (
                            <Results key={index} onClick={() => modalEditCav(item)}>
                                <ResultsTitle>{item.nome}</ResultsTitle>
                                <ResultsDetails>Cavaleiro {item.med === 'Apará'? 'Ajanã' : 'Adjuração'}</ResultsDetails>
                            </Results>
                        ))}
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>{edit? 'Editar Cavaleiro' : 'Novo Cavaleiro'}</ModalTitle>
                    <InputContainer>
                        <label>Nome do Cavaleiro</label>
                        <input type="text" value={cavaleiro} onChange={(e) => setCavaleiro(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Mediunidade</label>
                        <select>
                            <option value=''></option>
                            <option value='Apará'>Apará</option>
                            <option value='Doutrinador'>Doutrinador</option>
                        </select>
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? () => editCav(id, cavaleiro, med, token) : () => addCav(cavaleiro, med, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Cavaleiros