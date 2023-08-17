import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IAdjunto, IEstado, IMentor, ITemplo } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";

function Templos() {
    const defaultTemp = {templo_id: 0, cidade: '', estado: {abrev: '', state: ''}, presidente: 0}
    
    const [searchName, setSearchName] = useState('');
    const [searchState, setSearchState] = useState('');
    const [searchMin, setSearchMin] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultTemp);
    const [edited, setEdited] = useState(defaultTemp);
    const [showModal, setShowModal] = useState(false);
    
    const { token } = useContext(UserContext);
    const { ministros, adjuntos, templos, estados, loadTemplo } = useContext(ListContext);

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

    const modalAddTemp = () => {
        setEdit(false);
        setEdited(defaultTemp);
        setSelected(defaultTemp);
        setShowModal(true);
    }

    const modalEditTemp: any = (temp: ITemplo) => {
        setEdit(true);
        setEdited(temp);
        setSelected(temp);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultTemp);
        setSelected(defaultTemp);
    }

    const addTemp = (templo: ITemplo, token: string) => {
        const {templo_id, ...newTemplo} = templo;
        api.post('/templo/create', newTemplo, {headers:{Authorization: token}}).then(() => {
            alert('Templo adicionado com sucesso');
            loadTemplo(token);
            closeModal();
        }).catch((error) => {
            console.log('Não foi possível adicionar o templo', error);
        })
    }

    const editTemp = (newTemp: ITemplo, oldTemp: ITemplo, token: string) => {
        const changedFields = {} as any;
        const newTempConverted = {...newTemp, estado: newTemp.estado.abrev};
        const oldTempConverted = {...oldTemp, estado: oldTemp.estado.abrev};
        for (const key in newTempConverted){
            if (newTempConverted[key as keyof ITemplo] !== oldTempConverted[key as keyof ITemplo]){
                changedFields[key as keyof ITemplo] = newTempConverted[key as keyof ITemplo]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            api.put('/templo/update', {templo_id: oldTempConverted.templo_id, ...changedFields}, {headers:{Authorization: token}}).then(() => {
                alert('Templo editado com sucesso');
                loadTemplo(token);
                setEdited(defaultTemp);
                setSelected(defaultTemp);
                closeModal();
            }).catch((error) => {
                console.log('Não foi possível editar o templo', error);
            })
        } else {
            alert('Não foi feita nenhuma alteração no templo')
        }
    }
    
    templos.sort((temA: ITemplo, temB: ITemplo) => {
        if (temA.cidade < temB.cidade) {
          return -1;
        }
        if (temA.cidade > temB.cidade) {
          return 1;
        }
        return 0;
      });    

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Templos - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome do Templo</label>
                            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                        </InputContainer>
                        <InputContainer>
                            <label>Estado</label>
                            <select value={searchState} onChange={(e) => setSearchState(e.target.value)}>
                                <option value=''>Todos</option>
                                {estados.map((item: IEstado, index: number) => (
                                    <option key={index} value={item.abrev}>{item.abrev}</option>
                                ))}
                            </select>
                        </InputContainer>
                        <InputContainer>
                            <label>Ministro</label>
                            <input type="text" value={searchMin} onChange={(e) => setSearchMin(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddTemp()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um templo para EDITAR</InfoContent>
                        <InfoContent>
                            Resultados encontrados: {templos
                                .filter((item: ITemplo) => ministros.filter((min: IMentor) => min.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === item.presidente)[0].ministro)[0].nome.toLowerCase().includes(searchMin.trim().toLowerCase()))
                                .filter((item: ITemplo) => item.estado.abrev.includes(searchState))
                                .filter((item: ITemplo) => item.cidade.toLowerCase().includes(searchName.trim().toLowerCase()))
                                .length}
                        </InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {templos
                            .filter((item: ITemplo) => ministros.filter((min: IMentor) => min.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === item.presidente)[0].ministro)[0].nome.toLowerCase().includes(searchMin.trim().toLowerCase()))
                            .filter((item: ITemplo) => item.estado.abrev.includes(searchState))
                            .filter((item: ITemplo) => item.cidade.toLowerCase().includes(searchName.trim().toLowerCase()))
                            .map((item: ITemplo, index: number) => (
                                <Results key={index} onClick={() => modalEditTemp(item)}>
                                    <ResultsTitle>{item.cidade} - {item.estado.abrev}</ResultsTitle>
                                    <ResultsDetails>Adj. {ministros.filter((min: IMentor) => min.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === item.presidente)[0].ministro)[0].nome} - Mestre {adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === item.presidente)[0].nome}</ResultsDetails>
                                </Results>
                        ))}
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>{edit? 'Editar Templo' : 'Novo Templo'}</ModalTitle>
                    <InputContainer>
                        <label>Nome do Templo (Cidade)</label>
                        <input type="text" value={edited.cidade} onChange={(e) => updateProps('cidade', e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Estado</label>
                        <select value={edited.estado.abrev} onChange={(e) => updateProps('estado', e.target.value)}>
                            <option value=''></option>
                            {estados.map((item: IEstado, index: number) => (
                                <option key={index} value={item.abrev}>{item.state}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label>Presidente</label>
                        <select value={edited.presidente} onChange={(e) => updateProps('presidente', e.target.value)}>
                            <option value=''></option>
                            {adjuntos
                                .filter((item: IAdjunto) => item.esperanca === false)
                                .map((item: IAdjunto, index: number) => (
                                    <option key={index} value={item.adjunto_id}>Adj. {ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome} - Mestre {item.nome}</option>
                                ))
                            }
                        </select>
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? () => editTemp(edited, selected, token) : () => addTemp(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Templos