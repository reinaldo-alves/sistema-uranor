import { useState, useContext, useEffect } from "react";
import { CalInputContainer, FiveColTable, ResultsCard } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert } from "src/utilities/popups";
import { defaultCalendario } from "src/utilities/default";
import MainContainer from "src/components/MainContainer/MainContainer";
import { ListContext } from "src/contexts/ListContext";
import { SearchButton } from "src/components/buttons/buttons";
import { InfoContent } from "src/components/texts/texts";

function Calendar() {
    const [edited, setEdited] = useState(defaultCalendario);
    
    const { token } = useContext(UserContext);
    const { calendario, loadCalendario } = useContext(ListContext);

    useEffect(() => {
        loadCalendario(token);
    },[loadCalendario, token])

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])

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
                    <CalInputContainer>
                        <label>Ano:</label>
                        <input type="number" value={edited.ano} onChange={(e) => updateProps('ano', e.target.value)}/>
                    </CalInputContainer>
                    <InfoContent style={{marginTop: '10px', fontSize: '20px'}}>Dias de Lua Cheia</InfoContent>
                    <FiveColTable style={{justifyItems: 'center'}}>
                        <CalInputContainer>
                            <label>Janeiro:</label>
                            <input type="number" value={edited.janeiro} onChange={(e) => updateProps('janeiro', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Fevereiro:</label>
                            <input type="number" value={edited.fevereiro} onChange={(e) => updateProps('fevereiro', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Março:</label>
                            <input type="number" value={edited.marco} onChange={(e) => updateProps('marco', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Abril:</label>
                            <input type="number" value={edited.abril} onChange={(e) => updateProps('abril', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Maio:</label>
                            <input type="number" value={edited.maio} onChange={(e) => updateProps('maio', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Junho:</label>
                            <input type="number" value={edited.junho} onChange={(e) => updateProps('junho', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Julho:</label>
                            <input type="number" value={edited.julho} onChange={(e) => updateProps('julho', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Agosto:</label>
                            <input type="number" value={edited.agosto} onChange={(e) => updateProps('agosto', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Setembro:</label>
                            <input type="number" value={edited.setembro} onChange={(e) => updateProps('setembro', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Outubro:</label>
                            <input type="number" value={edited.outubro} onChange={(e) => updateProps('outubro', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Novembro:</label>
                            <input type="number" value={edited.novembro} onChange={(e) => updateProps('novembro', e.target.value)}/>
                        </CalInputContainer>
                        <CalInputContainer>
                            <label>Dezembro:</label>
                            <input type="number" value={edited.dezembro} onChange={(e) => updateProps('dezembro', e.target.value)}/>
                        </CalInputContainer>
                    </FiveColTable>
                </ResultsCard>
                <SearchButton width="200px" style={{alignSelf: 'center'}} onClick={() => sendCalendar(token)}>Salvar</SearchButton>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default Calendar