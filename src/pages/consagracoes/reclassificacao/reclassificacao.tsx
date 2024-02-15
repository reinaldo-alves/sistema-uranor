import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import { ButtonReclassDoc, CardsContainer, InputContainer, MainContainer, ModalMediumContent, NavigateButton } from "../styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultMedium } from "src/utilities/default";
import { useContext, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { MediumContext } from "src/contexts/MediumContext";
import { IMedium } from "src/types/types";
import { generateReclass, generateTrinoDevas } from "src/utilities/createDocs";
import { alphabeticOrder } from "src/utilities/functions";
import { UserContext } from "src/contexts/UserContext";
import { Modal, ModalButton, ModalTitle } from "src/components/Modal/modal";

function Reclassificacao() {
    const { adjuntos, ministros, cavaleiros } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);
    const { user } = useContext(UserContext);

    const [showModal, setShowModal] = useState('');
    const [dynamicFiels, setDynamicFields] = useState(['id'] as Array<string>);
    const [dropMedium, setDropMedium] = useState([defaultMedium] as Array<IMedium>);
    const [searchMedium, setSearchMedium] = useState([] as Array<string>);
    const [adjuntoPai, setAdjuntoPai] = useState(defaultMedium);
    const [searchPai, setSearchPai] = useState('');

    const addDynamicField = () => {
        setDynamicFields([...dynamicFiels, Date.now().toString()]);
        setDropMedium([...dropMedium, defaultMedium]);
        setSearchMedium([...searchMedium, '']);
    }

    const handleDropMedium = (index: number, newValue: IMedium) => {
        const newDropMedium = [...dropMedium];
        newDropMedium[index] = newValue;
        setDropMedium(newDropMedium);
    }
    
    const handleSearchMedium = (index: number, newValue: string) => {
        const newSearchMedium = [...searchMedium];
        newSearchMedium[index] = newValue;
        setSearchMedium(newSearchMedium);
    }

    const mediumOptions = (cons: string) => {
        if (cons === 'Filho de Devas') {
            return mediuns.filter((item: IMedium) => Boolean(item.dtCenturia) === true);
        } else if (cons === 'Trino Solitário') {
            return mediuns.filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios Raio Adjuração Rama 2000');
        } else if (cons === 'Trino Sardyos') {
            return mediuns.filter((item: IMedium) => item.sex === 'Masculino' && Boolean(item.dtElevacao) === true && item.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000');
        } else {
            return []
        }
    }
    
    const closeModal = () => {
        setDropMedium([defaultMedium]);
        setDynamicFields(['id']);
        setSearchMedium([]);
        setShowModal('');
    }
    
    const docs = [
        {name: 'Documento para reclassificação', link: 'reclass'},
        {name: 'Autorização para consagrar Devas', link: 'Filho de Devas'},
        {name: 'Autorização para consagrar Trino Solitário', link: 'Trino Solitário'},
        {name: 'Autorização para consagrar Trino Sardyos', link: 'Trino Sardyos'}
    ]
    
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
                <MainTitle content="Documentos - Classificações e Consagrações" />
                <CardsContainer>
                    {docs.map((item, index) => (
                        <ButtonReclassDoc key={index} onClick={() => setShowModal(item.link)}>{item.name}</ButtonReclassDoc>
                    ))}
                </CardsContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={Boolean(showModal)}>
                <ModalMediumContent vis={showModal === 'reclass'}>
                    <ModalTitle>Documento para reclassificação</ModalTitle>
                    <InputContainer>
                        <label>Selecione um médium</label>
                        <AutocompleteInput 
                            label={(option) => option.nome}
                            default={defaultMedium}
                            options={alphabeticOrder(mediuns.filter((item: IMedium) => Boolean(item.dtCenturia) === true && item.sex === 'Masculino'))}
                            equality={(option, value) => option?.medium_id === value?.medium_id}
                            value={dropMedium[0]}
                            setValue={(newValue: IMedium) => handleDropMedium(0, newValue)}
                            inputValue={searchMedium[0]}
                            setInputValue={(newValue: string) => handleSearchMedium(0, newValue)}
                        />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium[0] === defaultMedium} onClick={() => {
                            generateReclass(dropMedium[0], adjuntos, ministros, cavaleiros, user);
                            closeModal();
                        }}>Gerar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={showModal === 'Filho de Devas' || showModal === 'Trino Solitário' || showModal === 'Trino Sardyos'}>
                    <ModalTitle>Autorização - {showModal}</ModalTitle>
                    <InputContainer style={{gap: '10px'}}>
                        <label>Selecione médiuns</label>
                        {dynamicFiels.map((fieldId: string, index: number) => (
                            <AutocompleteInput 
                                key={fieldId}
                                label={(option) => option.nome}
                                default={defaultMedium}
                                options={alphabeticOrder(mediumOptions(showModal))}
                                equality={(option, value) => option?.medium_id === value?.medium_id}
                                disabledOptions={(option) => option? dropMedium.some(m => m?.medium_id === option?.medium_id) : false}
                                value={dropMedium[index]}
                                setValue={(newValue: IMedium) => handleDropMedium(index, newValue)}
                                inputValue={searchMedium[index]}
                                setInputValue={(newValue: string) => handleSearchMedium(index, newValue)}
                            />
                        ))} 
                    </InputContainer>
                    <NavigateButton width="230px" style={{minHeight: '35px'}} disabled={dynamicFiels.length > 1 && mediumOptions(showModal).length === dynamicFiels.length} onClick={addDynamicField}>Adicionar outro médium</NavigateButton>
                    {showModal === 'Trino Sardyos' ?
                        <InputContainer style={{gap: '10px'}}>
                            <label>Selecione o adjunto</label>
                            <AutocompleteInput 
                                label={(option) => option.nome}
                                default={defaultMedium}
                                options={alphabeticOrder(mediuns.filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000'))}
                                equality={(option, value) => option?.medium_id === value?.medium_id}
                                value={adjuntoPai}
                                setValue={setAdjuntoPai}
                                inputValue={searchPai}
                                setInputValue={setSearchPai}
                            />
                        </InputContainer>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium.some(item => item === defaultMedium)} onClick={() => {
                            generateTrinoDevas(dropMedium, showModal, adjuntoPai, ministros);
                            closeModal();
                        }}>Gerar</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
    )
}

export default Reclassificacao