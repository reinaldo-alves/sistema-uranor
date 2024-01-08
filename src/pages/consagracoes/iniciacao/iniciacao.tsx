import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { ButtonContainer, ConsagracaoCard, InputContainer, MainContainer, Modal, ModalButton, ModalMediumContent, ModalSubTitle, ModalTitle, MudancaObs, NavigateButton, PageSubTitle, PhotoContainer, Results, ResultsData, ResultsPanel, ResultsTable, ResultsTitle } from "../styles";
import { countMedium } from "src/utilities/functions";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao, IMedium } from "src/types/types";
import { Alert, Confirm } from "src/utilities/popups";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultMedium } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import { generateAutorizacao } from "src/utilities/createDocs";

function Iniciacao() {
    const { templos, adjuntos, ministros, listIniciacao, listMudanca, coletes, loadConsagracao, searchMediumInCons } = useContext(ListContext);
    const { uploadImage, mediuns } = useContext(MediumContext);
    const { token } = useContext(UserContext);

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
    const [allMediuns, setAllMediuns] = useState([] as Array<IMedium>);
  
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
    }

    function alphabeticOrder(array: Array<any>) {
        array.sort((minA: any, minB: any) => {
            if (minA.nome < minB.nome) {
              return -1;
            }
            if (minA.nome > minB.nome) {
              return 1;
            }
            return 0;
        }); 
        return array
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
                        await uploadImage(selected.medium, token, photo)
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

    const generateMediumList = () => {
        const array: Array<IMedium> = [];
        alphabeticOrder([...listIniciacao, ...listMudanca]).forEach((item: IConsagracao) => {
            const medium = mediuns.find((m: IMedium) => m.medium_id === item.medium);
            if (medium) {array.push(medium)}
        });
        setAllMediuns(array);
    }

    const loadConsData = async () => {
        await loadConsagracao(token);
        generateMediumList();
    }

    useEffect(() => {
        loadConsData();
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
   
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content={[...listIniciacao, ...listMudanca].length ? `Lista de médiuns para iniciação - ${countMedium([...listIniciacao, ...listMudanca])}` : 'Nenhum médium para iniciação'} />
                <ConsagracaoCard hide={![...listIniciacao, ...listMudanca].length}>
                    <ResultsTable show={[...listIniciacao, ...listMudanca].length}>
                        <thead>
                            <ResultsPanel columns={columnData[0] as string}>
                                <ResultsTitle scope="col" align="left">Nome do Médium</ResultsTitle>
                                <ResultsTitle scope="col">{columnData[2]? 'Mediunidade' : 'Med.'}</ResultsTitle>
                                <ResultsTitle scope="col">{columnData[2]? 'Colete n°' : 'Col.'}</ResultsTitle>
                                <ResultsTitle scope="col">Foto</ResultsTitle>
                            </ResultsPanel>
                        </thead>
                        <tbody>
                            {alphabeticOrder([...listIniciacao, ...listMudanca])
                                .map((item: IConsagracao, index: number) => (
                                    <Results columns={columnData[0] as string} key={index} onClick={() => handleClickMedium(item)}>
                                        <ResultsData align="left">{listMudanca.some((el: IConsagracao) => el.medium === item.medium)? `${item.nome} *` : item.nome}</ResultsData>
                                        <ResultsData>{columnData[2]? item.med : item.med[0]}</ResultsData>
                                        <ResultsData isNegative={!item.colete}>{item.colete ? item.colete : 'Não'}</ResultsData>
                                        <ResultsData isNegative={!item.foto}>{item.foto ? 'Sim' : 'Não'}</ResultsData>
                                    </Results>
                                ))
                            }
                        </tbody>
                    </ResultsTable>
                    <MudancaObs show={listMudanca.length}>* Mudança de mediunidade</MudancaObs>
                </ConsagracaoCard>
                <PageSubTitle hide={![...listIniciacao, ...listMudanca].length}>Documentos</PageSubTitle>
                <ButtonContainer hide={![...listIniciacao, ...listMudanca].length}>
                    <NavigateButton width="230px" onClick={() => generateAutorizacao(allMediuns, templos, adjuntos, ministros, 1)}>Gerar Autorizações</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Relatório</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Protocolo</NavigateButton>
                </ButtonContainer>
                <PageSubTitle>Ações</PageSubTitle>
                <ButtonContainer>
                    <NavigateButton width="230px" onClick={() => {
                        setSelectModal('adicionar');
                        setShowModalMedium(true);
                    }}>Adicionar Médium</NavigateButton>
                    <NavigateButton disabled={![...listIniciacao, ...listMudanca].length} width="230px" color="red" onClick={() => navigate('/consagracoes/iniciacao/atualizar')}>Atualizar Iniciação</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={showModalMedium}>
                <ModalMediumContent vis={selectModal === 'medium'}>
                    <ModalTitle>{selected.nome}</ModalTitle>
                    <NavigateButton width="230px" onClick={() => setSelectModal('colete')}>Atualizar Colete</NavigateButton>
                    <NavigateButton width="230px" onClick={() => setSelectModal('foto')}>Atualizar Foto</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {
                        generateAutorizacao(mediuns.filter((item: IMedium) => item.medium_id === selected.medium), templos, adjuntos, ministros, 1);
                        closeModal();
                    }}>Gerar Autorização</NavigateButton>
                    <NavigateButton width="230px" color="red" onClick={() => removeIniciacao(token)}>Remover</NavigateButton>
                    <NavigateButton style={{marginTop: '20px'}} width="230px" color="red" onClick={() => closeModal()}>Fechar</NavigateButton>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'colete'}>
                    <ModalSubTitle>{selected.nome}</ModalSubTitle>
                    <ModalTitle>Atualizar Colete</ModalTitle>
                    <InputContainer>
                        <label>Colete n°</label>
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
                    <InputContainer>
                        <label>Nome do Médium</label>
                        <AutocompleteInput 
                            default={defaultMedium}
                            options={mediuns.filter((item: IMedium) => item.dtEmplac && !item.dtIniciacao && !searchMediumInCons(item.medium_id))}
                            equality={(option, value) => option.medium_id === value.medium_id}
                            value={dropMedium}
                            setValue={setDropMedium}
                            inputValue={searchMedium}
                            setInputValue={setSearchMedium}
                        />
                    </InputContainer>
                    <InputContainer box>
                        <label>Mudança de mediunidade?</label>
                        <input type="checkbox" checked={checkMudanca} onChange={(e) => setCheckMudanca(e.target.checked)} />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium === defaultMedium} onClick={() => addIniciacao(token)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
    )
}

export default Iniciacao