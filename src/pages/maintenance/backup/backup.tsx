import Header from "src/components/header/header";
import { InputContainer, ObsContainer } from "./styles";
import SubMenu from "src/components/SubMenu/SubMenu";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import api from "src/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/UserContext";
import { Alert, Confirm } from "src/utilities/popups";
import { Modal, ModalButton, ModalContent, ModalTitle } from "src/components/Modal/modal";
import GridButton from "src/components/GridButton/GridButton";

function Backup() {
    const { token, logOut } = useContext(UserContext);

    const [file, setFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [wait, setWait] = useState(false);

    const createBackup = async () => {
        setWait(true);
        try {
            const { data } = await api.get('/backup/create', {headers:{Authorization: token}});
            setWait(false);
            Alert(data.message, 'success')
        } catch (error) {
            console.error('Erro ao criar backup', error);
            setWait(false);
            Alert('Erro ao criar backup', 'error');
        }
    }

    const restoreBackup = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('backupFile', file);
            setWait(true);
            try {
                const { data } = await api.post('/backup/restore', formData, {headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }});
                setWait(false);
                Alert(`${data.message}. Faça login novamente.`, 'success');
                logOut();
            } catch (error) {
                console.error('Erro ao restaurar backup', error);
                setWait(false);
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

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Gerenciar Backups" >
                <GridButton docs={docs} />
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
            <Modal vis={wait}>
                <ModalContent>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='60' height='60'><linearGradient id='a11'><stop offset='0' stop-color='#002776' stop-opacity='0'></stop><stop offset='1' stop-color='#002776'></stop></linearGradient><circle fill='none' stroke='url(#a11)' stroke-width='30' stroke-linecap='round' stroke-dasharray='0 44 0 44 0 44 0 44 0 360' cx='100' cy='100' r='70' transform-origin='center'><animateTransform type='rotate' attributeName='transform' calcMode='discrete' dur='2' values='360;324;288;252;216;180;144;108;72;36' repeatCount='indefinite'></animateTransform></circle></svg>
                    <ModalTitle>Aguarde...</ModalTitle>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Backup