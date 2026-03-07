import { useState, useContext, useEffect } from "react";
import { ThreeColTable } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IInstrutor, IMedium, IMentor } from "src/types/types";
import { IInstrutorAPI } from "src/types/typesAPI";
import MainContainer from "src/components/MainContainer/MainContainer";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert, Confirm } from "src/utilities/popups";
import { defaultInst, defaultMentor } from "src/utilities/default";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { formatInputText, handleEnterPress, removeDiacritics } from "src/utilities/functions";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import { MediumContext } from "src/contexts/MediumContext";
import { SearchButton } from "src/components/buttons/buttons";
import { InfoCard, InputContainer, Results, ResultsCard, SearchCard, SearchContainer } from "src/components/cardsContainers/cardsContainers";
import { InfoContent, ResultsDetails, ResultsTitle } from "src/components/texts/texts";

function Instrutores() {
    const [searchMin, setSearchMin] = useState('');
    const [searchAdj, setSearchAdj] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(defaultInst);
    const [edited, setEdited] = useState(defaultInst);
    const [showModal, setShowModal] = useState(false);
    const [dropMinistro, setDropMinistro] = useState(defaultMentor);
    const [searchMinistro, setSearchMinistro] = useState('');
    
    const { user, token } = useContext(UserContext);
    const { instrutores, ministros, loadInstrutor } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/cursos'},
        {title: 'Iniciação', click: '/cursos/iniciacao'},
        {title: 'Elevação', click: '/cursos/elevacao'},
        {title: 'Centúria', click: '/cursos/centuria'},
        {title: 'Sétimo Raio', click: '/cursos/setimo'}
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

    const modalAddInst = () => {
        setEdit(false);
        setEdited(defaultInst);
        setSelected(defaultInst);
        setDropMinistro(defaultMentor);
        setSearchMinistro('');
        setShowModal(true);
    }

    const modalEditInst = (inst: IInstrutor) => {
        setEdit(true);
        setEdited(inst);
        setSelected(inst);
        setDropMinistro(ministros.find((item: IMentor) => item.id === inst.ministro));
        setSearchMinistro(ministros.find((item: IMentor) => item.id === inst.ministro)?.nome || '');
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setEdited(defaultInst);
        setSelected(defaultInst);
    }

    const convertInstToSend = (instrutor: IInstrutor): IInstrutorAPI => {
        const cursos = parseInt([instrutor.iniciacao, instrutor.elevacao, instrutor.centuria, instrutor.setimo].map(v => (v ? '1' : '0')).join(''), 2)
        return {
            instrutor_id: instrutor.instrutor_id,
            nome: instrutor.nome,
            ministro: instrutor.ministro === 0 ? null : instrutor.ministro,
            cursos
        }
    }

    const addInst = async (instrutor: IInstrutor, token: string) => {
        const convInstrutor = convertInstToSend(instrutor)
        const {instrutor_id, ...newInstrutor} = convInstrutor;
        const exists = instrutores.some((item: IInstrutor) => item.nome.toLowerCase() === instrutor.nome.toLowerCase() && item.ministro === instrutor.ministro);
        if (!instrutor.nome || !instrutor.ministro) {
            Alert('Preencha os dados corretamente', 'warning');
        } else if (exists) {
            Alert('Já existe um instrutor com o mesmo nome e ministro', 'error');
        } else {
            try {
                await api.post('/instrutor/create', newInstrutor, {headers:{Authorization: token}})
                Alert('Instrutor adicionado com sucesso', 'success');
                await loadInstrutor(token);
                closeModal();
            } catch (error) {
                console.log('Não foi possível adicionar o instrutor', error);
                Alert('Não foi possível adicionar o instrutor', 'error');
            }
        }
    }

    const editInst = async (prevNewInst: IInstrutor, prevOldInst: IInstrutor, token: string) => {
        const changedFields = {} as any
        const newInst = convertInstToSend(prevNewInst);
        const oldInst = convertInstToSend(prevOldInst);
        for (const key in newInst){
            if (newInst[key as keyof IInstrutorAPI] !== oldInst[key as keyof IInstrutorAPI]){
                changedFields[key as keyof IInstrutorAPI] = newInst[key as keyof IInstrutorAPI]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await api.put('/instrutor/update', {instrutor_id: oldInst.instrutor_id, ...changedFields}, {headers:{Authorization: token}})
                Alert('Instrutor editado com sucesso', 'success');
                await loadInstrutor(token);
                setEdited(defaultInst);
                setSelected(defaultInst);
                closeModal();
            } catch (error) {
                console.log('Não foi possível editar o instrutor', error);
                Alert('Não foi possível editar o instrutor', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no instrutor', 'info')
        }
    }

    // FAZER A EXCLUSÃO DE INSTRUTORES DEPOIS, PARA VER SE É VIÁVEL ANULAR A EXCLUSÃO OU REMOVER O CURSO PRIMEIRO
    // const deleteAdj = async (instrutor_id: number) => {
    //     if (templos.some((item: ITemplo) => item.presidente === adjunto_id)) {
    //         Alert('Este adjunto é presidente de templo. Remova-o do cadastro do templo e tente novamente', 'info')
    //     } else {
    //         await Confirm('ATENÇÃO! O adjunto será excluído e removido de todos os cadastros. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
    //             try {
    //                 mediuns.forEach(async (item: IMedium) => {
    //                     if (item.adjOrigem === adjunto_id) {
    //                         await api.put('/medium/update', {medium_id: item.medium_id, adjOrigem: null}, {headers:{Authorization: token}})
    //                     }
    //                 })
    //                 await api.delete(`/adjunto/delete?adjunto_id=${adjunto_id}`, {headers:{Authorization: token}})
    //                 Alert('Adjunto excluído com sucesso', 'success');
    //                 await loadInstrutor(token);
    //                 closeModal();
    //             } catch (error) {
    //                 console.log('Erro ao excluir adjunto', error);
    //                 Alert('Erro ao excluir adjunto', 'error');
    //             }
    //         });
    //     }
    // }

    const cursoString = (inst: IInstrutor) => {
        const booleanArray = [inst.iniciacao, inst.elevacao, inst.centuria, inst.setimo];
        const labelArray = ['Iniciação', 'Elevação', 'Centúria', '7° Raio'];
        const labelString = labelArray.filter((_, i) => booleanArray[i]).join(' - ');
        return labelString === '' ? '(Instrutor Inativo)' : labelString;
    }
    
    instrutores.sort((adjA: IInstrutor, adjB: IInstrutor) => {
        const nomeA = ministros.filter((min: IMentor) => min.id === adjA.ministro)[0].nome.toLowerCase();
        const nomeB = ministros.filter((min: IMentor) => min.id === adjB.ministro)[0].nome.toLowerCase();
        return nomeA.localeCompare(nomeB, 'pt-BR');
      });  

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Instrutores - Manutenção" >
                <SearchCard>
                    <SearchContainer template="1fr 1fr 180px">
                        <InputContainer>
                            <label>Ministro</label>
                            <input type="text" value={searchMin} onChange={(e) => setSearchMin(e.target.value)} />
                        </InputContainer>
                        <InputContainer>
                            <label>Nome do Instrutor</label>
                            <input type="text" value={searchAdj} onChange={(e) => setSearchAdj(e.target.value)} />
                        </InputContainer>
                        <SearchButton onClick={() => modalAddInst()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um instrutor para EDITAR{user.level === 'Administrador' ? ' ou EXCLUIR' : ''}</InfoContent>
                        <InfoContent>
                            Resultados encontrados: {instrutores
                                .filter((item: IInstrutor) => removeDiacritics(ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome).includes(removeDiacritics(searchMin)))
                                .filter((item: IInstrutor) => removeDiacritics(item.nome).includes(removeDiacritics(searchAdj)))
                                .length}
                        </InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ThreeColTable>
                        {instrutores
                            .filter((item: IInstrutor) => removeDiacritics(ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome).includes(removeDiacritics(searchMin)))
                            .filter((item: IInstrutor) => removeDiacritics(item.nome).includes(removeDiacritics(searchAdj)))
                            .map((item: IInstrutor, index: number) => (
                                <Results key={index} onClick={() => modalEditInst(item)}>
                                    <ResultsTitle>Adj. {ministros.filter((min: IMentor) => min.id === item.ministro)[0].nome} - Mestre {item.nome}</ResultsTitle>
                                    <ResultsDetails>{cursoString(item)}</ResultsDetails>
                                </Results>
                            ))
                        }
                    </ThreeColTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>{edit? 'Editar Instrutor' : 'Novo Instrutor'}</ModalTitle>
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
                        <label>Nome do Instrutor</label>
                        <input type="text" value={edited.nome} onKeyUp={edit? (e) => handleEnterPress(e, async () => await editInst(edited, selected, token)) : (e) => handleEnterPress(e, async () => await addInst(edited, token))} onChange={(e) => updateProps('nome', formatInputText(e.target.value))} />
                    </InputContainer>
                    <InputContainer style={{width: '150px'}} box>
                        <label>Iniciação</label>
                        <input type="checkbox" checked={edited.iniciacao} onChange={(e) => updateProps('iniciacao', e.target.checked)} />
                    </InputContainer>
                    <InputContainer style={{width: '150px'}} box>
                        <label>Elevação</label>
                        <input type="checkbox" checked={edited.elevacao} onChange={(e) => updateProps('elevacao', e.target.checked)} />
                    </InputContainer>
                    <InputContainer style={{width: '150px'}} box>
                        <label>Centúria</label>
                        <input type="checkbox" checked={edited.centuria} onChange={(e) => updateProps('centuria', e.target.checked)} />
                    </InputContainer>
                    <InputContainer style={{width: '150px'}} box>
                        <label>7° Raio</label>
                        <input type="checkbox" checked={edited.setimo} onChange={(e) => updateProps('setimo', e.target.checked)} />
                    </InputContainer>
                    {/* {edit? 
                        <ModalButton 
                            color="red"
                            style={{alignSelf: 'center'}}
                            onClick={async () => {await deleteAdj(selected.adjunto_id)}}
                        >Excluir</ModalButton>
                    : ''} */}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={edit? async () => await editInst(edited, selected, token) : async () => await addInst(edited, token)}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Instrutores