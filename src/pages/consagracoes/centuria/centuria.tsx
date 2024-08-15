import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import { ButtonContainer, ConsagracaoCard, InputContainer, ModalMediumContent, NavigateButton, PageSubTitle, Results, ResultsData, ResultsDetails, ResultsPanel, ResultsTable, ResultsTitle } from "../styles";
import { alphabeticOrder, countMedium, handleEnterPress, setSituation } from "src/utilities/functions";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao, IMedium, ITemplo } from "src/types/types";
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

function Centuria() {
    const { templos, adjuntos, ministros, falMest, listCenturia, loadConsagracao, searchMediumInCons } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);
    const { user, token } = useContext(UserContext);

    const [columnData, setColumnData] = useState(['auto 25% 15% 15%', 'auto 25%', true])
    const [showModalMedium, setShowModalMedium] = useState(false);
    const [selectModal, setSelectModal] = useState('')
    const [selected, setSelected] = useState({} as IConsagracao);
    const [dropMedium, setDropMedium] = useState(defaultMedium);
    const [searchMedium, setSearchMedium] = useState('');
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
    }

    const closeModal = () => {
        setShowModalMedium(false);
        setSelectModal('');
        setSelected({} as IConsagracao);
        setDropMedium(defaultMedium);
        setSearchMedium('');
        setReportTitle('');
    }

    const addCenturia = async (token: string) => {
        const confirmText = `Adicionar ${dropMedium.nome} na lista de centúria?` 
        
        try {
            await Confirm(confirmText, 'question', 'Cancelar', 'Confirmar', async () => {
                await api.post('/consagracao/add', {medium: dropMedium.medium_id, consagracao: 3, termo: 0}, {headers:{Authorization: token}})
                Alert('Médium adicionado com sucesso', 'success');
                await loadConsagracao(token);
                closeModal();
            })
        } catch (error) {
            console.log('Não foi possível adicionar o médium da lista de centúria', error);
            Alert('Não foi possível adicionar o médium da lista de centúria', 'error');
        }
    }

    const removeCenturia = async (token: string) => {       
        try {
            await Confirm('Tem certeza que quer remover este médium da lista de centúria', 'question', 'Cancelar', 'Confirmar', async () => {
                await api.delete(`/consagracao/delete?consagracao_id=${selected.consagracao_id}`, {headers:{Authorization: token}})
                Alert('Médium removido com sucesso', 'success');
                await loadConsagracao(token);
                closeModal();
            })
        } catch (error) {
            console.log('Não foi possível excluir médium da lista de centúria', error);
            Alert('Não foi possível excluir médium da lista de centúria', 'error');
        }
    }

    useEffect(() => {
        loadConsagracao(token);
        handleResize();
        const handleResizeEvent = () => {
            handleResize();
        }
        window.addEventListener('resize', handleResizeEvent);
        return () => {
            window.removeEventListener('resize', handleResizeEvent);
        };
    }, []);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/consagracoes'},
        {title: 'Iniciação', click: '/consagracoes/iniciacao'},
        {title: 'Elevação', click: '/consagracoes/elevacao'},
        {title: 'Centúria', click: '/consagracoes/centuria'},
        {title: 'Reclassificação', click: '/consagracoes/reclassificacao'},
    ]
   
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title={listCenturia.length ? `Lista de médiuns para centúria - ${countMedium(listCenturia)}` : 'Nenhum médium para centúria'}>
                <ConsagracaoCard hide={!listCenturia.length}>
                    <ResultsTable show={listCenturia.length}>
                        <ResultsPanel columns={columnData[1] as string}>
                            <ResultsTitle align="left">{columnData[2]? 'Nome do Médium' : 'Médium'}</ResultsTitle>
                            <ResultsTitle>{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                        </ResultsPanel>
                        {alphabeticOrder(listCenturia)
                            .map((item: IConsagracao, index: number) => (
                                <Results columns={columnData[1] as string} key={index} onClick={() => handleClickMedium(item)}>
                                    <ResultsData align="left">
                                        {item.nome}
                                        <ResultsDetails>Templo: {templos.filter((temp: ITemplo) => temp.templo_id === item.templo)[0]?.cidade} - {templos.filter((temp: ITemplo) => temp.templo_id === item.templo)[0]?.estado.abrev} - Telefone: {mediuns.find((m: IMedium) => m.medium_id === item.medium)?.telefone1}{mediuns.find((m: IMedium) => m.medium_id === item.medium)?.telefone1 && mediuns.find((m: IMedium) => m.medium_id === item.medium)?.telefone2 ? ' / ' : ''}{mediuns.find((m: IMedium) => m.medium_id === item.medium)?.telefone2}</ResultsDetails>
                                    </ResultsData>
                                    <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                </Results>
                            ))
                        }
                    </ResultsTable>
                </ConsagracaoCard>
                <PageSubTitle hide={!listCenturia.length}>Documentos</PageSubTitle>
                <ButtonContainer hide={!listCenturia.length}>
                    <NavigateButton width="230px" onClick={() => generateAutorizacao(alphabeticOrder(listCenturia), templos, adjuntos, ministros, 3)}>Gerar Autorizações</NavigateButton>
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
                    <NavigateButton style={{display: `${user.level === 'Administrador' ? 'block' : 'none'}`}} disabled={!listCenturia.length} width="230px" color="red" onClick={() => navigate('/consagracoes/centuria/atualizar')}>Atualizar Centúria</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={showModalMedium}>
                <ModalMediumContent vis={selectModal === 'medium'}>
                    <ModalTitle>{selected.nome}</ModalTitle>
                    <NavigateButton style={{marginBottom: '20px'}} width="230px" onClick={() => navigate(`/mediuns/consulta/${selected.medium}`)}>Ver ficha</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {
                        generateAutorizacao([selected], templos, adjuntos, ministros, 3);
                        closeModal();
                    }}>Gerar Autorização</NavigateButton>
                    <NavigateButton width="230px" color="red" onClick={() => removeCenturia(token)}>Remover</NavigateButton>
                    <NavigateButton style={{marginTop: '20px'}} width="230px" color="red" onClick={() => closeModal()}>Fechar</NavigateButton>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'adicionar'}>
                    <ModalSubTitle>{selected.nome}</ModalSubTitle>
                    <ModalTitle>Adicionar Médium para Centúria</ModalTitle>
                    <InputContainer>
                        <label>Nome do Médium</label>
                        <AutocompleteInput 
                            label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                            default={defaultMedium}
                            options={mediuns.filter((item: IMedium) => item.medium_id && !item.dtCenturia && item.condicao === 'Ativo' && searchMediumInCons(item.medium_id) === defaultConsagracao)}
                            equality={(option, value) => option.medium_id === value.medium_id}
                            value={dropMedium}
                            setValue={setDropMedium}
                            inputValue={searchMedium}
                            setInputValue={setSearchMedium}
                            onKeyUp={() => addCenturia(token)}
                        />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium === defaultMedium} onClick={() => addCenturia(token)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'Protocolo' || selectModal === 'Relatório'}>
                    <ModalSubTitle>{selected.nome}</ModalSubTitle>
                    <ModalTitle>{`Gerar ${selectModal}`}</ModalTitle>
                    <InputContainer>
                        <label>Título</label>
                        <input type="text" value={reportTitle} onKeyUp={(e) => handleEnterPress(e, () => {
                            if (selectModal === 'Protocolo') {
                                generateProtocolo(alphabeticOrder(listCenturia), reportTitle, 3);
                            }
                            if (selectModal === 'Relatório') {
                                generateConsReport(alphabeticOrder(listCenturia), templos, adjuntos, ministros, falMest, reportTitle, 3);
                            }
                            closeModal();
                        })} onChange={(e) => setReportTitle(e.target.value)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => {
                            if (selectModal === 'Protocolo') {
                                generateProtocolo(alphabeticOrder(listCenturia), reportTitle, 3);
                            }
                            if (selectModal === 'Relatório') {
                                generateConsReport(alphabeticOrder(listCenturia), templos, adjuntos, ministros, falMest, reportTitle, 3);
                            }
                            closeModal();
                        }}>Gerar</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
    )
}

export default Centuria