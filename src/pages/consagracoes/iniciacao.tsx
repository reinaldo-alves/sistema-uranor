import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import { ButtonContainer, ConsagracaoCard, InputContainer, MainContainer, Modal, ModalButton, ModalMediumContent, ModalSubTitle, ModalTitle, MudancaObs, NavigateButton, PageSubTitle, PhotoContainer, Results, ResultsData, ResultsPanel, ResultsTable, ResultsTitle } from "./styles";
import { alphabeticOrder, countMedium } from "src/utilities/functions";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IConsagracao } from "src/types/types";

function Iniciacao() {
    const { listIniciacao, listMudanca, coletes } = useContext(ListContext);

    const [columnData, setColumnData] = useState(['auto 25% 15% 15%', 'auto 25%', true])
    const [showModalMedium, setShowModalMedium] = useState(false);
    const [selectModal, setSelectModal] = useState('')
    const [selected, setSelected] = useState({nome: '', colete: 0, foto: ''});
    const [colete, setColete] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
  
    const handleResize = () => {
        if (window.innerWidth > 638) {
            setColumnData(['auto 25% 15% 15%', 'auto 25%', true]);
        } else {
            setColumnData(['auto 50px 60px 50px', 'auto 25%', false]);
        }
    };

    const handleClickMedium = (medium: any) => {
        setShowModalMedium(true);
        setSelectModal('medium');
        setSelected(medium);
        setColete(medium.colete);
        setPreview(medium.foto);
    }

    const closeModal = () => {
        setShowModalMedium(false);
        setSelectModal('');
        setSelected({nome: '', colete: 0, foto: ''});
        setColete('');
        setPreview('');
        setPhoto(null);
    }

    const imageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
        }
    };

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
   
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content={`Lista de médiuns para iniciação - ${countMedium([...listIniciacao, ...listMudanca])}`} />
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
                                .map((item: any, index: number) => (
                                    <Results columns={columnData[0] as string} key={index} onClick={() => handleClickMedium(item)}>
                                        <ResultsData align="left">{listMudanca.some((el: IConsagracao) => el.nome === item.nome)? `${item.nome} *` : item.nome}</ResultsData>
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
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Autorizações</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Relatório</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Protocolo</NavigateButton>
                </ButtonContainer>
                <PageSubTitle>Ações</PageSubTitle>
                <ButtonContainer>
                    <NavigateButton width="230px" onClick={() => alert('vai')}>Adicionar Médium</NavigateButton>
                    <NavigateButton disabled={![...listIniciacao, ...listMudanca].length} width="230px" color="red" onClick={() => alert('foi')}>Atualizar Iniciação</NavigateButton>
                </ButtonContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={showModalMedium}>
                <ModalMediumContent vis={selectModal === 'medium'}>
                    <ModalTitle>{selected.nome}</ModalTitle>
                    <NavigateButton width="230px" onClick={() => setSelectModal('colete')}>Atualizar Colete</NavigateButton>
                    <NavigateButton width="230px" onClick={() => setSelectModal('foto')}>Atualizar Foto</NavigateButton>
                    <NavigateButton width="230px" onClick={() => {}}>Gerar Autorização</NavigateButton>
                    <NavigateButton style={{marginTop: '20px'}} width="230px" color="red" onClick={() => closeModal()}>Fechar</NavigateButton>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'colete'}>
                    <ModalSubTitle>{selected.nome}</ModalSubTitle>
                    <ModalTitle>Atualizar Colete</ModalTitle>
                    <InputContainer>
                        <label>Colete n°</label>
                        <select value={colete} onChange={(e) => setColete(e.target.value)}>
                            <option value={0}></option>
                            {coletes.map((item: number, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => console.log(colete)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'foto'}>
                    <ModalSubTitle>{selected.nome}</ModalSubTitle>
                    <ModalTitle>Atualizar Foto</ModalTitle>
                    <PhotoContainer photo={preview}>
                        {photo || selected.foto ? '' : 'Clique aqui para adicionar uma foto'}
                        <input type="file" accept="image/*" onChange={imageUpdate} />
                    </PhotoContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => {
                            console.log(photo);
                            console.log(preview);
                        }}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
    )
}

export default Iniciacao