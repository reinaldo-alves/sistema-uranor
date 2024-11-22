import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import { ButtonContainer, ConsagracaoCard, ModalMediumContent, MudancaObs, PageSubTitle, PhotoContainer, Results, ResultsData, ResultsPanel, ResultsTable } from "../styles";
import { alphabeticOrder, consagracaoDetails, countMedium, handleEnterPress } from "src/utilities/functions";
import { useCallback, useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao, IMedium } from "src/types/types";
import { Alert, Confirm } from "src/utilities/popups";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultConsagracao, defaultMedium } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import { generateAutorizacao, generateConsReport, generateProtocolo } from "src/utilities/createDocs";
import { Modal, ModalButton, ModalSubTitle, ModalTitle } from "src/components/Modal/modal";
import MainContainer from "src/components/MainContainer/MainContainer";
import Loading from "src/utilities/Loading";
import { NavigateButton } from "src/components/buttons/buttons";
import { InputContainer } from "src/components/cardsContainers/cardsContainers";
import { ColumnTitle, ResultsDetails } from "src/components/texts/texts";

function Iniciacao() {
    const { templos, adjuntos, ministros, coletes, falMest, listIniciacao, listMudanca, loadConsagracao, searchMediumInCons } = useContext(ListContext);
    const { uploadImage, mediuns } = useContext(MediumContext);
    const { token, user } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [columnData, setColumnData] = useState(['auto 25% 15% 15%', 'auto 25%', true])
    const [showModalMedium, setShowModalMedium] = useState(false);
    const [selectModal, setSelectModal] = useState('')
    const [selected, setSelected] = useState({} as IConsagracao);
    const [colete, setColete] = useState(0);
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [updatePhoto, setUpdatePhoto] = useState(true);
    const [dropMedium, setDropMedium] = useState(defaultMedium);
    const [searchMedium, setSearchMedium] = useState('');
    const [checkMudanca, setCheckMudanca] = useState(false);
    const [reportTitle, setReportTitle] = useState('');
  
    const navigate = useNavigate();

    const handleResize = () => {
        if (window.innerWidth > 638) {
            setColumnData(['auto 25% 15% 15%', 'auto 25%', true]);
        } else {
            setColumnData(['auto 50px 60px 50px', 'auto 25%', false]);
        }
    };

    const handleClickMedium = (medium: IConsagracao) => {
        setShowModalMedium(true);
        setSelectModal('medium');
        setSelected(medium);
        setColete(medium.colete);
        setPreview(medium.foto);
    }

    const closeModal = () => {
        setShowModalMedium(false);
        setSelectModal('');
        setSelected({} as IConsagracao);
        setColete(0);
        setPreview('');
        setPhoto(null);
        setUpdatePhoto(false);
        setDropMedium(defaultMedium);
        setSearchMedium('');
        setCheckMudanca(false);
        setReportTitle('');
    }

    const imageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
            setUpdatePhoto(true);
        }
    };

    const editPhoto = async (token: string) => {
        if (updatePhoto) {
            if (photo) {
                try {
                    await Confirm('Tem certeza que quer atualizar a foto deste médium?', 'question', 'Cancelar', 'Confirmar', async () => {
                        await uploadImage(selected.medium, selected.med, token, photo)
                        console.log('foto editada')
                        Alert('Foto atualizada com sucesso', 'success');
                        await loadConsagracao(token);
                        closeModal();
                    })
                } catch (error) {
                    console.log('Não foi possível atualizar a foto do médium', error);
                    Alert('Não foi possível atualizar a foto do médium', 'error');
                }
            }
        } else {
            Alert('A foto não foi alterada', 'info')
        }
    }

    const editColete = async (token: string) => {
        const newColete = colete === 0 ? null : colete;
        const oldColete = selected.colete === 0 ? null : selected.colete;
        if (newColete !== oldColete) {
            try {
                await Confirm('Tem certeza que quer atualizar o colete deste médium?', 'question', 'Cancelar', 'Confirmar', async () => {
                    await api.put('/medium/update', {medium_id: selected.medium, colete: newColete}, {headers:{Authorization: token}})
                    Alert('Colete do médium atualizado com sucesso', 'success');
                    await loadConsagracao(token);
                    closeModal();
                })
            } catch (error) {
                console.log('Não foi possível atualizar o colete do médium', error);
                Alert('Não foi possível atualizar o colete do médium', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no colete do médium', 'info')
        }
    }

    const addIniciacao = async (token: string) => {
        const confirmText = `Adicionar ${dropMedium.nome} ${checkMudanca ? 'nas listas de iniciação e elevação?' : 'na lista de iniciação?'}` 
        const consNumber = checkMudanca ? 4 : 1;
        
        try {
            await Confirm(confirmText, 'question', 'Cancelar', 'Confirmar', async () => {
                await api.post('/consagracao/add', {medium: dropMedium.medium_id, consagracao: consNumber, termo: 0}, {headers:{Authorization: token}})
                Alert('Médium adicionado com sucesso', 'success');
                await loadConsagracao(token);
                closeModal();
            })
        } catch (error) {
            console.log('Não foi possível adicionar o médium da lista de iniciação', error);
            Alert('Não foi possível adicionar o médium da lista de iniciação', 'error');
        }
    }

    const removeIniciacao = async (token: string) => {
        const confirmText = `Tem certeza que quer remover este médium ${selected.consagracao === 4 ? 'das listas de iniciação e elevação?' : 'da lista de iniciação?'}` 
        
        try {
            await Confirm(confirmText, 'question', 'Cancelar', 'Confirmar', async () => {
                await api.delete(`/consagracao/delete?consagracao_id=${selected.consagracao_id}`, {headers:{Authorization: token}})
                Alert('Médium removido com sucesso', 'success');
                await loadConsagracao(token);
                closeModal();
            })
        } catch (error) {
            console.log('Não foi possível excluir médium da lista de iniciação', error);
            Alert('Não foi possível excluir médium da lista de iniciação', 'error');
        }
    }

    useEffect(() => {
        handleResize();
        const handleResizeEvent = () => {
            handleResize();
        }
        window.addEventListener('resize', handleResizeEvent);
        return () => {
            window.removeEventListener('resize', handleResizeEvent);
        };
    }, []);

    useEffect(() => {
        if (photo) {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
        } else if (selected.foto) {
            setPreview(selected.foto);
        } else {
            setPreview(null);
        }
    }, [photo, selected.foto]);
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/consagracoes'},
        {title: 'Iniciação', click: '/consagracoes/iniciacao'},
        {title: 'Elevação', click: '/consagracoes/elevacao'},
        {title: 'Centúria', click: '/consagracoes/centuria'},
        {title: 'Reclassificação', click: '/consagracoes/reclassificacao'},
    ]
    
    const loadConsData = useCallback(async () => {
        await loadConsagracao(token);
        if(mediuns.length) {
            setLoading(false);
        }
    }, [loadConsagracao, token, mediuns]);

    useEffect(() => {
        loadConsData();
    }, [loadConsData])

    if(loading) {
        return <Loading />
    }
   
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title={[...listIniciacao, ...listMudanca].length ? `Lista de médiuns para iniciação - ${countMedium([...listIniciacao, ...listMudanca])}` : 'Nenhum médium para iniciação'}>
                <ConsagracaoCard hide={![...listIniciacao, ...listMudanca].length}>
                    <ResultsTable show={[...listIniciacao, ...listMudanca].length}>
                        <ResultsPanel columns={columnData[0] as string}>
                            <ColumnTitle align="left">{columnData[2]? 'Nome do Médium' : 'Médium'}</ColumnTitle>
                            <ColumnTitle>{columnData[2]? 'Mediunidade' : 'Med.'}</ColumnTitle>
                            <ColumnTitle>{columnData[2]? 'Colete nº' : 'Col.'}</ColumnTitle>
                            <ColumnTitle>Foto</ColumnTitle>
                        </ResultsPanel>
                        {alphabeticOrder([...listIniciacao, ...listMudanca])
                            .map((item: IConsagracao, index: number) => (
                                <Results columns={columnData[0] as string} key={index} onClick={() => handleClickMedium(item)}>
                                    <ResultsData align="left">
                                        {listMudanca.some((el: IConsagracao) => el.medium === item.medium)? `${item.nome} *` : item.nome}
                                        <ResultsDetails resize>{consagracaoDetails(item, mediuns, templos)}</ResultsDetails>
                                    </ResultsData>
                                    <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                    <ResultsData isNegative={!item.colete}>{item.colete ? item.colete : 'Não'}</ResultsData>
                                    <ResultsData isNegative={!item.foto}>{item.foto ? 'Sim' : 'Não'}</ResultsData>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                    <MudancaObs show={listMudanca.length}>* Mudança de mediunidade</MudancaObs>
                </ConsagracaoCard>
                <PageSubTitle hide={![...listIniciacao, ...listMudanca].length}>Documentos</PageSubTitle>
                <ButtonContainer hide={![...listIniciacao, ...listMudanca].length}>
                    <NavigateButton width="230px" onClick={() => generateAutorizacao(alphabeticOrder([...listIniciacao, ...listMudanca]), templos, adjuntos, ministros, 1)}>Gerar Autorizações</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {
                        setSelectModal('Relatório');
                        setShowModalMedium(true);
                    }}>Gerar Relatório</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {
                        setSelectModal('Protocolo');
                        setShowModalMedium(true);
                    }}>Gerar Protocolo</NavigateButton>
                </ButtonContainer>
                <PageSubTitle>Ações</PageSubTitle>
                <ButtonContainer>
                    <NavigateButton width="230px" onClick={() => {
                        setSelectModal('adicionar');
                        setShowModalMedium(true);
                    }}>Adicionar Médium</NavigateButton>
                    <NavigateButton style={{display: `${user.level === 'Administrador' ? 'block' : 'none'}`}} disabled={![...listIniciacao, ...listMudanca].length} width="230px" color="red" onClick={() => navigate('/consagracoes/iniciacao/atualizar')}>Atualizar Iniciação</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={showModalMedium}>
                <ModalMediumContent vis={selectModal === 'medium'}>
                    <ModalTitle>{selected.nome}</ModalTitle>
                    <NavigateButton style={{marginBottom: '20px'}} width="230px" onClick={() => navigate(`/mediuns/consulta/${selected.medium}`)}>Ver ficha</NavigateButton>
                    <NavigateButton width="230px" onClick={() => setSelectModal('colete')}>Atualizar Colete</NavigateButton>
                    <NavigateButton width="230px" onClick={() => setSelectModal('foto')}>Atualizar Foto</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {
                        generateAutorizacao([selected], templos, adjuntos, ministros, 1);
                        closeModal();
                    }}>Gerar Autorização</NavigateButton>
                    <NavigateButton width="230px" color="red" onClick={() => removeIniciacao(token)}>Remover</NavigateButton>
                    <NavigateButton style={{marginTop: '20px'}} width="230px" color="red" onClick={() => closeModal()}>Fechar</NavigateButton>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'colete'}>
                    <ModalSubTitle>{selected.nome}</ModalSubTitle>
                    <ModalTitle>Atualizar Colete</ModalTitle>
                    <InputContainer labelWidth="auto">
                        <label>Colete nº</label>
                        <select value={colete} onChange={(e) => setColete(Number(e.target.value))}>
                            <option value={0}></option>
                            {coletes.map((item: number, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => editColete(token)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'foto'}>
                    <ModalSubTitle>{selected.nome}</ModalSubTitle>
                    <ModalTitle>Atualizar Foto</ModalTitle>
                    <PhotoContainer photo={preview}>
                        {photo || selected.foto ? '' : 'Clique aqui para adicionar uma foto'}
                        <input type="file" accept="image/*" onChange={imageUpdate} />
                    </PhotoContainer>
                    <MudancaObs style={{textAlign: 'center'}} show={selected.foto?.length}>Clique sobre a foto para alterar</MudancaObs>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => editPhoto(token)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'adicionar'}>
                    <ModalSubTitle>{selected.nome}</ModalSubTitle>
                    <ModalTitle>Adicionar Médium para Iniciação</ModalTitle>
                    <InputContainer labelWidth="auto">
                        <label>Nome do Médium</label>
                        <AutocompleteInput 
                            label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                            default={defaultMedium}
                            options={mediuns.filter((item: IMedium) => item.medium_id && !item.dtIniciacao && item.condicao === 'Ativo' && searchMediumInCons(item.medium_id) === defaultConsagracao)}
                            equality={(option, value) => option.medium_id === value.medium_id}
                            value={dropMedium}
                            setValue={setDropMedium}
                            inputValue={searchMedium}
                            setInputValue={setSearchMedium}
                            onKeyUp={() => addIniciacao(token)}
                        />
                    </InputContainer>
                    <InputContainer labelWidth="auto" box>
                        <label>Mudança de mediunidade?</label>
                        <input type="checkbox" checked={checkMudanca} onChange={(e) => setCheckMudanca(e.target.checked)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium === defaultMedium} onClick={() => addIniciacao(token)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'Protocolo' || selectModal === 'Relatório'}>
                    <ModalSubTitle>{selected.nome}</ModalSubTitle>
                    <ModalTitle>{`Gerar ${selectModal}`}</ModalTitle>
                    <InputContainer labelWidth="auto">
                        <label>Título</label>
                        <input type="text" value={reportTitle} onKeyUp={(e) => handleEnterPress(e, () => {
                            if (selectModal === 'Protocolo') {
                                generateProtocolo(alphabeticOrder([...listIniciacao, ...listMudanca]), reportTitle, 1)
                            }
                            if (selectModal === 'Relatório') {
                                generateConsReport(alphabeticOrder([...listIniciacao, ...listMudanca]), templos, adjuntos, ministros, falMest, reportTitle, 1)
                            }
                            closeModal();
                        })} onChange={(e) => setReportTitle(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => {
                            if (selectModal === 'Protocolo') {
                                generateProtocolo(alphabeticOrder([...listIniciacao, ...listMudanca]), reportTitle, 1)
                            }
                            if (selectModal === 'Relatório') {
                                generateConsReport(alphabeticOrder([...listIniciacao, ...listMudanca]), templos, adjuntos, ministros, falMest, reportTitle, 1)
                            }
                            closeModal();
                        }}>Gerar</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
    )
}

export default Iniciacao