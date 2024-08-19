import { useState, useContext, useEffect } from "react";
import { InfoContent, InputContainer, ResultsCard, ResultsTable, SearchButton } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert } from "src/utilities/popups";
import { defaultCalendario } from "src/utilities/default";
import MainContainer from "src/components/MainContainer/MainContainer";
import { ListContext } from "src/contexts/ListContext";

function Calendar() {
    const [edited, setEdited] = useState(defaultCalendario);
    
    const { token } = useContext(UserContext);
    const { calendario, loadCalendario } = useContext(ListContext);

    useEffect(() => {
        loadCalendario(token);
    },[])

    useEffect(() => {
        if (calendario && Object.keys(calendario).length > 0) {
            setEdited(calendario);
        }
    },[calendario])
    
    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Voltar para Manutenção', click: '/manutencao'}
    ]

    const updateProps = (property: string, newValue: any) => {
        setEdited((prevData: any) => ({
        ...prevData,
        [property]: Number(newValue)
        }));
    };

    const sendCalendar = async (token: string) => {
        if (edited !== calendario) {
            const calendarText = JSON.stringify(edited);
            try {
                await api.post('/calendar/update', {text: calendarText}, {headers:{Authorization: token}})
                Alert('Informações do calendário atualizadas com sucesso', 'success');
                await loadCalendario(token);
            } catch (error) {
                console.log('Não foi possível editar o usuário', error);
                Alert('Não foi possível atualizar as informações do calendário', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no calendário', 'info');
        }
    }    

    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Calendário de Atividades Doutrinárias - Manutenção">
                <ResultsCard>
                    <InputContainer>
                        <label>Ano:</label>
                        <input type="number" value={edited.ano} onChange={(e) => updateProps('ano', e.target.value)}/>
                    </InputContainer>
                    <InfoContent>Dias de Lua Cheia</InfoContent>
                    <ResultsTable>
                        <InputContainer>
                            <label>Janeiro:</label>
                            <input type="number" value={edited.janeiro} onChange={(e) => updateProps('janeiro', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Fevereiro:</label>
                            <input type="number" value={edited.fevereiro} onChange={(e) => updateProps('fevereiro', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Março:</label>
                            <input type="number" value={edited.marco} onChange={(e) => updateProps('marco', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Abril:</label>
                            <input type="number" value={edited.abril} onChange={(e) => updateProps('abril', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Maio:</label>
                            <input type="number" value={edited.maio} onChange={(e) => updateProps('maio', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Junho:</label>
                            <input type="number" value={edited.junho} onChange={(e) => updateProps('junho', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Julho:</label>
                            <input type="number" value={edited.julho} onChange={(e) => updateProps('julho', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Agosto:</label>
                            <input type="number" value={edited.agosto} onChange={(e) => updateProps('agosto', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Setembro:</label>
                            <input type="number" value={edited.setembro} onChange={(e) => updateProps('setembro', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Outubro:</label>
                            <input type="number" value={edited.outubro} onChange={(e) => updateProps('outubro', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Novembro:</label>
                            <input type="number" value={edited.novembro} onChange={(e) => updateProps('novembro', e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <label>Dezembro:</label>
                            <input type="number" value={edited.dezembro} onChange={(e) => updateProps('dezembro', e.target.value)}/>
                        </InputContainer>
                    </ResultsTable>
                </ResultsCard>
                <SearchButton onClick={() => sendCalendar(token)}>Salvar</SearchButton>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default Calendar