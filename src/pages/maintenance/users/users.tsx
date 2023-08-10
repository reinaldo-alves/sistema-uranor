import { useState, useContext } from "react";
import { InfoCard, InputContainer, MainContainer, InfoContent, Results, ResultsCard, ResultsDetails, ResultsTable, ResultsTitle, SearchButton, SearchCard, SearchContainer, Modal, ModalContent, ModalTitle, ModalButton } from "./styles";
import { ListContext } from "src/contexts/ListContext";
import { useNavigate } from "react-router-dom";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { IUser } from "src/types/types";
import MainTitle from "src/components/MainTitle/MainTitle";
import { MediumContext } from "src/contexts/MediumContext";

function Users() {
    
    const navigate = useNavigate();
    
    const [id, setId] = useState(0);
    const [ministro, setMinistro] = useState(0);
    const [adjunto, setAdjunto] = useState('');
    const [classif, setClassif] = useState('');
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState({} as IUser);
    const [showModal, setShowModal] = useState(false);
    
    const { users } = useContext(ListContext);
    const { medium } = useContext(MediumContext);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const levels = ['Administrador', 'Devas', 'Devas Aspirante']

    const modalButtonFunction = () => {
        setShowModal(false);
        setSelected({} as IUser);
    }

    const newUser = () => {
        setShowModal(true);
        setEdit(false);
    }

    const editUser = () => {
        setShowModal(true);
        setEdit(true);
    }
    
    users.sort((userA: IUser, userB: IUser) => {
        if (userA.name < userB.name) {
          return -1;
        }
        if (userA.name > userB.name) {
          return 1;
        }
        return 0;
      });      

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer>
                <MainTitle content="Usuários - Manutenção" />
                <SearchCard>
                    <SearchContainer>
                        <InputContainer>
                            <label>Nome</label>
                            <input />
                        </InputContainer>
                        <InputContainer>
                            <label>Nível</label>
                            <select>
                                <option value=''></option>
                                {levels.map((item: string, index: number) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </InputContainer>
                        <SearchButton onClick={() => newUser()}>Adicionar novo</SearchButton>
                    </SearchContainer>
                    <InfoCard>
                        <InfoContent>Clique sobre um usuário para EDITAR</InfoContent>
                        <InfoContent>Resultados encontrados: {users.length}</InfoContent>
                    </InfoCard>
                </SearchCard>
                <ResultsCard>
                    <ResultsTable>
                        {users.map((item: IUser, index: number) => (
                            <Results key={index} onClick={() => editUser()}>
                                <ResultsTitle>{item.name}</ResultsTitle>
                                <ResultsDetails>Nível: {item.level}</ResultsDetails>
                            </Results>
                        ))}
                    </ResultsTable>
                </ResultsCard>
            </MainContainer>
            <SideMenu list={listSubMenu} />
            <Modal vis={showModal}>
                <ModalContent>
                    <ModalTitle>{edit? 'Editar Usuário' : 'Novo Usuário'}</ModalTitle>
                    <InputContainer>
                        <label>Nome do Usuário</label>
                        <input type="text" value={adjunto} onChange={(e) => setAdjunto(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <label>Médium</label>
                        <select>
                            <option value=''></option>
                            {medium.map((item: any, index: number) => (
                                <option key={index} value={item.id}>{item.nome}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <InputContainer>
                        <label>Nível</label>
                        <select>
                            <option value=''></option>
                            {levels.map((item: string, index: number) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </InputContainer>
                    {edit? 
                        <ModalButton 
                            color="green"
                            style={{alignSelf: 'center'}}
                            onClick={() => modalButtonFunction()
                        }>Alterar Senha</ModalButton>
                    : 
                        <>         
                            <InputContainer>
                                <label>Senha</label>
                                <input type="password" />
                            </InputContainer>
                            <InputContainer>
                                <label>Confirmar Senha</label>
                                <input type="password" />
                            </InputContainer>
                        </>
                    }
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => modalButtonFunction()}>Cancelar</ModalButton>
                        <ModalButton color='green' onClick={() => modalButtonFunction()}>Salvar</ModalButton>
                    </div>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default Users