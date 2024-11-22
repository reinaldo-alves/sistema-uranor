import { useState, useContext, useEffect } from "react";
import { ThreeColTable } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IAdjunto, IMedium, IMentor, ITemplo } from "src/types/types";
import MainContainer from "src/components/MainContainer/MainContainer";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert, Confirm } from "src/utilities/popups";
import { defaultAdj, defaultMentor } from "src/utilities/default";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { formatInputText, handleEnterPress, removeDiacritics } from "src/utilities/functions";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import { MediumContext } from "src/contexts/MediumContext";
import { SearchButton } from "src/components/buttons/buttons";
import { InfoCard, InputContainer, Results, ResultsCard, SearchCard, SearchContainer } from "src/components/cardsContainers/cardsContainers";
import { InfoContent, ResultsDetails, ResultsTitle } from "src/components/texts/texts";

function Adjuntos() {
    const [searchMin, setSearchMin] = useState('');
    const [searchAdj, setSearchAdj] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultAdj);
    const [edited, setEdited] = useState(defaultAdj);
    const [showModal, setShowModal] = useState(false);
    const [dropMinistro, setDropMinistro] = useState(defaultMentor);
    const [searchMinistro, setSearchMinistro] = useState('');
    
    const { token } = useContext(UserContext);
    const { adjuntos, ministros, templos, loadAdjunto } = useContext(ListContext);
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
        const ministroObject = ministros.find((item: IMentor) => item?.id === dropMinistro?.id);
        updateProps('ministro', ministroObject? ministroObject.id : 0);
    }, [dropMinistro, ministros])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])

    const modalAddAdj = () => {
        setEdit(false);
        setEdited(defaultAdj);
        setSelected(defaultAdj);
        setDropMinistro(defaultMentor);
        setSearchMinistro('');
        setShowModal(true);
    }

    const modalEditAdj = (adj: IAdjunto) => {
        setEdit(true);
        setEdited(adj);
        setSelected(adj);
        setDropMinistro(ministros.find((item: IMentor) => item.id === adj.ministro));
        setSearchMinistro(ministros.find((item: IMentor) => item.id === adj.ministro)?.nome || '');
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultAdj);
        setSelected(defaultAdj);
    }

    const addAdj = async (adjunto: IAdjunto, token: string) => {
        const {adjunto_id, ...newAdjunto} = adjunto;
        const exists = adjuntos.some((item: IAdjunto) => item.nome.toLowerCase() === adjunto.nome.toLowerCase() && item.ministro === adjunto.ministro);
        if (!adjunto.nome || !adjunto.ministro || !adjunto.classif) {
            Alert('Preencha os dados corretamente', 'warning');
        } else if (exists) {
            Alert('Já existe um adjunto com o mesmo nome e ministro', 'error');
        } else {
            try {
                await api.post('/adjunto/create', newAdjunto, {headers:{Authorization: token}})
                Alert('Adjunto adicionado com sucesso', 'success');
                await loadAdjunto(token);
                closeModal();
            } catch (error) {
                console.log('Não foi possível adicionar o adjunto', error);
                Alert('Não foi possível adicionar o adjunto', 'error');
            }
        }
    }

    const editAdj = async (newAdj: IAdjunto, oldAdj: IAdjunto, token: string) => {
        const changedFields = {} as any
        for (const key in newAdj){
            if (newAdj[key as keyof IAdjunto] !== oldAdj[key as keyof IAdjunto]){
                changedFields[key as keyof IAdjunto] = newAdj[key as keyof IAdjunto]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await api.put('/adjunto/update', {adjunto_id: oldAdj.adjunto_id, ...changedFields}, {headers:{Authorization: token}})
                Alert('Adjunto editado com sucesso', 'success');
                await loadAdjunto(token);
                setEdited(defaultAdj);
                setSelected(defaultAdj);
                closeModal();
            } catch (error) {
                console.log('Não foi possível editar o adjunto', error);
                Alert('Não foi possível editar o adjunto', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no adjunto', 'info')
        }
    }

    const deleteAdj = async (adjunto_id: number) => {
        if (templos.some((item: ITemplo) => item.presidente === adjunto_id)) {
            Alert('Este adjunto é presidente de templo. Remova-o do cadastro do templo e tente novamente', 'info')
        } else {
            await Confirm('ATENÇÃO! O adjunto será excluído e removido de todos os cadastros. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
                try {
                    mediuns.forEach(async (item: IMedium) => {
                        if (item.adjOrigem === adjunto_id) {
                            await api.put('/medium/update', {medium_id: item.medium_id, adjOrigem: null}, {headers:{Authorization: token}})
                        }
                    })
                    await api.delete(`/adjunto/delete?adjunto_id=${adjunto_id}`, {headers:{Authorization: token}})
                    Alert('Adjunto excluído com sucesso', 'success');
                    await loadAdjunto(token);
                    closeModal();
                } catch (error) {
                    console.log('Erro ao excluir adjunto', error);
                    Alert('Erro ao excluir adjunto', 'error');
                }
            });
        }
    }
    
    adjuntos.sort((adjA: IAdjunto, adjB: IAdjunto) => {
        const nomeA = ministros.filter((min: IMentor) => min.id === adjA.ministro)[0].nome.toLowerCase();
        const nomeB = ministros.filter((min: IMentor) => min.id === adjB.ministro)[0].nome.toLowerCase();
        return nomeA.localeCompare(nomeB, 'pt-BR');
      });  

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Adjuntos - Manutenção" >
                <SearchCard>
                    <SearchContainer template="1fr 1fr 180px">
                        <InputContainer>
                            <label>Ministro</label>
                            <input type="text" value={searchMin} onChange={(e) => setSearchMin(e.target.value)} />
                        </InputContainer>
                        <InputContainer>
                            <label>Nome do Adjunto</label>
                            <input type="text" value={searchAdj} onChange={(e) => setSearchAdj(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddAdj()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um adjunto para EDITAR ou EXCLUIR</InfoContent>
                        <InfoContent>
                            Resultados encontrados: {adjuntos
                                .filter((item: IAdjunto) => removeDiacritics(ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome).includes(removeDiacritics(searchMin)))
                                .filter((item: IAdjunto) => removeDiacritics(item.nome).includes(removeDiacritics(searchAdj)))
                                .length}
                        </InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ThreeColTable>
                        {adjuntos
                            .filter((item: IAdjunto) => removeDiacritics(ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome).includes(removeDiacritics(searchMin)))
                            .filter((item: IAdjunto) => removeDiacritics(item.nome).includes(removeDiacritics(searchAdj)))
                            .map((item: IAdjunto, index: number) => (
                                <Results key={index} onClick={() => modalEditAdj(item)}>
                                    <ResultsTitle>Adj. {ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome} - Mestre {item.nome}</ResultsTitle>
                                    <ResultsDetails>Classificação: {item.classif} - Esperança: {item.esperanca? 'Sim' : 'Não'}</ResultsDetails>
                                </Results>
                            ))
                        }
                    </ThreeColTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>{edit? 'Editar Adjunto' : 'Novo Adjunto'}</ModalTitle>
                    <InputContainer>
                        <label>Ministro</label>
                        <AutocompleteInput 
                            label={(option) => option.nome}
                            default={defaultMentor}
                            options={ministros}
                            equality={(option, value) => option?.id === value?.id}
                            value={dropMinistro}
                            setValue={setDropMinistro}
                            inputValue={searchMinistro}
                            setInputValue={setSearchMinistro}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Nome do Adjunto</label>
                        <input type="text" value={edited.nome} onKeyUp={edit? (e) => handleEnterPress(e, async () => await editAdj(edited, selected, token)) : (e) => handleEnterPress(e, async () => await addAdj(edited, token))} onChange={(e) => updateProps('nome', formatInputText(e.target.value))} />
                    </InputContainer>
                    <InputContainer>
                        <label>Classificação</label>
                        <select value={edited.classif} onChange={(e) => updateProps('classif', e.target.value)}>
                            <option value=''></option>
                            <option value='Arcanos'>Arcanos</option>
                            <option value='Rama 2000'>Rama 2000</option>
                        </select>
                    </InputContainer>
                    <InputContainer box>
                        <label>Adjunto Esperança?</label>
                        <input type="checkbox" checked={edited.esperanca} onChange={(e) => updateProps('esperanca', e.target.checked)} />
                    </InputContainer>
                    {edit? 
                        <ModalButton 
                            color="red"
                            style={{alignSelf: 'center'}}
                            onClick={async () => {await deleteAdj(selected.adjunto_id)}}
                        >Excluir</ModalButton>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? async () => await editAdj(edited, selected, token) : async () => await addAdj(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Adjuntos