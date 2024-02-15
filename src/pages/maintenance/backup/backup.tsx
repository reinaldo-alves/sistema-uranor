import Header from "src/components/header/header";
import { CardsContainer, InputContainer, MainContainer, ObsContainer, PageButton } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainTitle from "src/components/MainTitle/MainTitle";
import api from "src/api";
import { useContext, useState } from "react";
import { UserContext } from "src/contexts/UserContext";
import { Alert, Confirm } from "src/utilities/popups";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";

function Backup() {
    const { token, logOut } = useContext(UserContext);

    const [file, setFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);

    const createBackup = async () => {
        try {
            const { data } = await api.get('/backup/create', {headers:{Authorization: token}});
            Alert(data.message, 'success')
        } catch (error) {
            console.error('Erro ao criar backup', error);
            Alert('Erro ao criar backup', 'error');
        }
    }

    const restoreBackup = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('backupFile', file);
            try {
                const { data } = await api.post('/backup/restore', formData, {headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                  }});
                Alert(`${data.message}. Faça login novamente.`, 'success');
                logOut();
            } catch (error) {
                console.error('Erro ao restaurar backup', error);
                Alert('Erro ao restaurar backup', 'error');
            }
        }
    }

    const closeModal = () => {
        setFile(null);
        setShowModal(false);
    }
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const docs = [
        {name: 'Criar Backup', link: () => createBackup()},
        {name: 'Restaurar Backup', link: () => setShowModal(true)}
    ]

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Gerenciar Backups" />
                <CardsContainer>
                    {docs.map((item, index) => (
                        <PageButton key={index} height='3em' onClick={item.link}>{item.name}</PageButton>
                    ))}
                </CardsContainer>
                <ObsContainer>
                    <h2>Observações</h2>
                    <p>Os arquivos de backup ficam armazenados na pasta do Sistema Uranor. Para encontrá-los, acesse /backend/public/backup</p>
                    <p>Ao transferir o backup para outro computador, copie também a pasta de fotos, que fica em /backend/public/upload/medium. Cole no mesmo lugar no computador de destino</p>
                    <p>Antes de restaurar um backup externo, recomenda-se criar um backup da base de dados atual do sistema</p>
                </ObsContainer>
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>Restaurar Backup</ModalTitle>
                    <InputContainer>
                        <label className="custom-file-label">{file ? file.name : 'Selecione um arquivo .sql'}</label>
                        <input type="file" accept=".sql" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}/>
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={!file} onClick={() => {
                            Confirm('Essa ação pode resultar na perda ou sobrescrita de dados existentes. Continuar?', 'warning', 'Cancelar', 'Continuar', () => restoreBackup());
                        }}>Restaurar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Backup