import { useState, useContext, useEffect } from "react";
import { InfoCard, InputContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IAdjunto, IEstado, IMedium, IMentor, ITemplo } from "src/types/types";
import MainContainer from "src/components/MainContainer/MainContainer";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert, Confirm } from "src/utilities/popups";
import { defaultAdj, defaultTemp } from "src/utilities/default";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { formatInputText, handleEnterPress } from "src/utilities/functions";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import { MediumContext } from "src/contexts/MediumContext";

function Templos() {
    const [searchName, setSearchName] = useState('');
    const [searchState, setSearchState] = useState('');
    const [searchMin, setSearchMin] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultTemp);
    const [edited, setEdited] = useState(defaultTemp);
    const [showModal, setShowModal] = useState(false);
    const [dropPres, setDropPres] = useState(defaultAdj);
    const [searchPres, setSearchPres] = useState('');
    
    const { token } = useContext(UserContext);
    const { ministros, adjuntos, templos, estados, loadTemplo } = useContext(ListContext);
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

    useEffect(() => {
        const presObject = adjuntos.find((item: IAdjunto) => item?.adjunto_id === dropPres?.adjunto_id);
        updateProps('presidente', presObject? presObject.adjunto_id : 0);
    }, [dropPres])

    const modalAddTemp = () => {
        setEdit(false);
        setEdited(defaultTemp);
        setSelected(defaultTemp);
        setDropPres(defaultAdj);
        setSearchPres('');
        setShowModal(true);
    }

    const modalEditTemp = (temp: ITemplo) => {
        setEdit(true);
        setEdited(temp);
        setSelected(temp);
        setDropPres(adjuntos.find((item: IAdjunto) => item.adjunto_id === temp.presidente));
        setSearchPres(`Adj. ${ministros.filter((min: IMentor) => min.id === adjuntos.filter((ad: IAdjunto) => ad.adjunto_id === temp.presidente)[0].ministro)[0].nome} - Mestre ${adjuntos.find((item: IAdjunto) => item.adjunto_id === temp.presidente)?.nome}` || '');
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultTemp);
        setSelected(defaultTemp);
    }

    const addTemp = async (templo: ITemplo, token: string) => {
        const {templo_id, ...newTemplo} = templo;
        const exists = templos.some((item: ITemplo) => item.cidade.toLowerCase() === templo.cidade.toLowerCase() && item.presidente === templo.presidente);
        if (!templo.cidade || !templo.estado || !templo.presidente) {
            Alert('Preencha os dados corretamente', 'warning');
        } else if (exists) {
            Alert('Já existe um templo com o mesmo nome e adjunto', 'error');
        } else {
            try {
                await api.post('/templo/create', newTemplo, {headers:{Authorization: token}})
                Alert('Templo adicionado com sucesso', 'success');
                await loadTemplo(token);
                closeModal();
            } catch (error) {
                console.log('Não foi possível adicionar o templo', error);
                Alert('Não foi possível adicionar o templo', 'error');
            }
        }
    }

    const editTemp = async (newTemp: ITemplo, oldTemp: ITemplo, token: string) => {
        const changedFields = {} as any;
        const newTempConverted = {...newTemp, estado: newTemp.estado.abrev};
        const oldTempConverted = {...oldTemp, estado: oldTemp.estado.abrev};
        for (const key in newTempConverted){
            if (newTempConverted[key as keyof ITemplo] !== oldTempConverted[key as keyof ITemplo]){
                changedFields[key as keyof ITemplo] = newTempConverted[key as keyof ITemplo]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await api.put('/templo/update', {templo_id: oldTempConverted.templo_id, ...changedFields}, {headers:{Authorization: token}})
                Alert('Templo editado com sucesso', 'success');
                await loadTemplo(token);
                setEdited(defaultTemp);
                setSelected(defaultTemp);
                closeModal();
            } catch (error) {
                console.log('Não foi possível editar o templo', error);
                Alert('Não foi possível editar o templo', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no templo', 'info')
        }
    }

    const deleteTemp = async (templo_id: number) => {
        if (mediuns.some((item: IMedium) => item.templo === templo_id || item.temploOrigem === templo_id)) {
            Alert('Ainda há médiuns ligados a este templo', 'warning')
        } else {
            await Confirm('ATENÇÃO! O templo será excluído do sistema. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
                try {
                    await api.delete(`/templo/delete?templo_id=${templo_id}`, {headers:{Authorization: token}})
                    Alert('Templo excluído com sucesso', 'success');
                    await loadTemplo(token);
                    closeModal();
                } catch (error) {
                    console.log('Erro ao excluir templo', error);
                    Alert('Erro ao excluir templo', 'error');
                }
            });
        }
    }
    
    templos.sort((temA: ITemplo, temB: ITemplo) => {
        const nomeA = temA.cidade.toLowerCase();
        const nomeB = temB.cidade.toLowerCase();
        return nomeA.localeCompare(nomeB, 'pt-BR');
      });    

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Templos - Manutenção" >
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
                        <InfoContent>Clique sobre um templo para EDITAR ou EXCLUIR</InfoContent>
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
                        <input type="text" value={edited.cidade} onKeyUp={edit? (e) => handleEnterPress(e, async () => await editTemp(edited, selected, token)) : (e) => handleEnterPress(e, async () => await addTemp(edited, token))} onChange={(e) => updateProps('cidade', formatInputText(e.target.value))} />
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
                        <AutocompleteInput 
                            label={(option) => option === defaultAdj ? '' : `Adj. ${ministros.filter((min: IMentor) => min.id === option.ministro)[0].nome} - Mestre ${option.nome}` }
                            default={defaultAdj}
                            options={adjuntos.filter((item: IAdjunto) => item.esperanca === false)}
                            equality={(option, value) => option?.adjunto_id === value?.adjunto_id}
                            value={dropPres}
                            setValue={setDropPres}
                            inputValue={searchPres}
                            setInputValue={setSearchPres}
                            onKeyUp={edit? async () => await editTemp(edited, selected, token) : async () => await addTemp(edited, token)}
                        />
                    </InputContainer>
                    {edit? 
                        <ModalButton 
                            color="red"
                            style={{alignSelf: 'center'}}
                            onClick={async () => {await deleteTemp(selected.templo_id)}}
                        >Excluir</ModalButton>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? async () => await editTemp(edited, selected, token) : async () => await addTemp(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Templos