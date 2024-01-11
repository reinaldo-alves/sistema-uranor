import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../../components/header/header";
import { ButtonReclassDoc, CardsContainer, InputContainer, MainContainer, Modal, ModalButton, ModalMediumContent, ModalTitle } from "../styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultMedium } from "src/utilities/default";
import { useContext, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { MediumContext } from "src/contexts/MediumContext";
import { IMedium } from "src/types/types";
import { generateReclass } from "src/utilities/createDocs";
import { alphabeticOrder } from "src/utilities/functions";
import { UserContext } from "src/contexts/UserContext";

function Reclassificacao() {
    const { adjuntos, ministros, cavaleiros } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);
    const { user } = useContext(UserContext);

    const [showModal, setShowModal] = useState(false);
    const [dropMedium, setDropMedium] = useState(defaultMedium);
    const [searchMedium, setSearchMedium] = useState('');

    const closeModal = () => {
        setDropMedium(defaultMedium);
        setSearchMedium('');
        setShowModal(false);
    }
    
    const docs = [
        {name: 'Documento para reclassificação', link: () => setShowModal(true)},
        {name: 'Autorização para consagrar Devas', link: () => {}},
        {name: 'Autorização para consagrar Trino Solitário', link: () => {}},
        {name: 'Autorização para consagrar Trino Sardyos', link: () => {}}
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
                        <ButtonReclassDoc key={index} onClick={item.link}>{item.name}</ButtonReclassDoc>
                    ))}
                </CardsContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={showModal}>
                <ModalMediumContent vis={showModal}>
                    <ModalTitle>Documento para reclassificação</ModalTitle>
                    <InputContainer>
                        <label>Selecione um médium</label>
                        <AutocompleteInput 
                            default={defaultMedium}
                            options={alphabeticOrder(mediuns.filter((item: IMedium) => Boolean(item.dtCenturia) === true && item.sex === 'Masculino'))}
                            equality={(option, value) => option.medium_id === value.medium_id}
                            value={dropMedium}
                            setValue={setDropMedium}
                            inputValue={searchMedium}
                            setInputValue={setSearchMedium}
                        />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium === defaultMedium} onClick={() => {
                            generateReclass(dropMedium, adjuntos, ministros, cavaleiros, user);
                            closeModal();
                        }}>Gerar</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
    )
}

export default Reclassificacao