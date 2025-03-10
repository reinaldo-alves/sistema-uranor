import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import { ModalMediumContent } from "../styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultMedium } from "src/utilities/default";
import { useContext, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { MediumContext } from "src/contexts/MediumContext";
import { IMedium } from "src/types/types";
import { generateReclass, generateTrinoDevas } from "src/utilities/createDocs";
import { UserContext } from "src/contexts/UserContext";
import { Modal, ModalButton, ModalTitle } from "src/components/Modal/modal";
import MainContainer from "src/components/MainContainer/MainContainer";
import GridButton from "src/components/GridButton/GridButton";
import { NavigateButton } from "src/components/buttons/buttons";
import { InputContainer } from "src/components/cardsContainers/cardsContainers";

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
            return mediuns.filter((item: IMedium) => item.sex === 'Masculino' && Boolean(item.dtElevacao) === true && item.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000');
        } else {
            return []
        }
    }
    
    const closeModal = () => {
        setDropMedium([defaultMedium]);
        setDynamicFields(['id']);
        setSearchMedium([]);
        setAdjuntoPai(defaultMedium);
        setSearchPai('');
        setShowModal('');
    }
    
    const docs = [
        {name: 'Documento para reclassificação', link: () => setShowModal('reclass')},
        {name: 'Autorização para consagrar Devas', link: () => setShowModal('Filho de Devas')},
        {name: 'Autorização para consagrar Trino Solitário', link: () => setShowModal('Trino Solitário')},
        {name: 'Autorização para consagrar Trino Sardyos', link: () => setShowModal('Trino Sardyos')}
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
            <MainContainer title="Documentos - Classificações e Consagrações">
                <GridButton docs={docs} />
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={Boolean(showModal)}>
                <ModalMediumContent vis={showModal === 'reclass'}>
                    <ModalTitle>Documento para reclassificação</ModalTitle>
                    <InputContainer labelWidth="auto">
                        <label>Selecione um médium</label>
                        <AutocompleteInput 
                            label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                            default={defaultMedium}
                            options={mediuns.filter((item: IMedium) => Boolean(item.dtCenturia) === true && item.sex === 'Masculino')}
                            equality={(option, value) => option?.medium_id === value?.medium_id}
                            value={dropMedium[0]}
                            setValue={(newValue: IMedium) => handleDropMedium(0, newValue)}
                            inputValue={searchMedium[0]}
                            setInputValue={(newValue: string) => handleSearchMedium(0, newValue)}
                            onKeyUp={() => {
                                generateReclass(dropMedium[0], adjuntos, ministros, cavaleiros, user);
                                closeModal();
                            }}
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
                    <InputContainer labelWidth="auto" style={{gap: '10px'}}>
                        <label>Selecione médiuns</label>
                        {dynamicFiels.map((fieldId: string, index: number) => (
                            <AutocompleteInput 
                                key={fieldId}
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediumOptions(showModal)}
                                equality={(option, value) => option?.medium_id === value?.medium_id}
                                disabledOptions={(option) => option? dropMedium.some(m => m?.medium_id === option?.medium_id) : false}
                                value={dropMedium[index]}
                                setValue={(newValue: IMedium) => handleDropMedium(index, newValue)}
                                inputValue={searchMedium[index]}
                                setInputValue={(newValue: string) => handleSearchMedium(index, newValue)}
                                onKeyUp={() => {
                                    generateTrinoDevas(dropMedium, showModal, adjuntoPai, ministros);
                                    closeModal();
                                }}
                            />
                        ))} 
                    </InputContainer>
                    <NavigateButton width="230px" style={{minHeight: '35px'}} disabled={dynamicFiels.length > 1 && mediumOptions(showModal).length === dynamicFiels.length} onClick={addDynamicField}>Adicionar outro médium</NavigateButton>
                    {showModal === 'Trino Sardyos' ?
                        <InputContainer labelWidth="auto" style={{gap: '10px'}}>
                            <label>Selecione o adjunto</label>
                            <AutocompleteInput 
                                label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                                default={defaultMedium}
                                options={mediuns.filter((item: IMedium) => item.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000')}
                                equality={(option, value) => option?.medium_id === value?.medium_id}
                                value={adjuntoPai}
                                setValue={setAdjuntoPai}
                                inputValue={searchPai}
                                setInputValue={setSearchPai}
                                onKeyUp={() => {
                                    generateTrinoDevas(dropMedium, showModal, adjuntoPai, ministros);
                                    closeModal();
                                }}
                            />
                        </InputContainer>
                    : ''}
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium.some(item => item === defaultMedium) || adjuntoPai === defaultMedium} onClick={() => {
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