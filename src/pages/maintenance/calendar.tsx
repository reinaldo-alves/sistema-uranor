import { useState, useContext, useEffect } from "react";
import { CalInputContainer, FiveColTable, ResultsCard } from "./styles";
import SideMenu from "src/components/SideMenu/SideMenu";
import Header from "src/components/header/header";
import SubMenu from "src/components/SubMenu/SubMenu";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import { Alert } from "src/utilities/popups";
import MainContainer from "src/components/MainContainer/MainContainer";
import { ListContext } from "src/contexts/ListContext";
import { SearchButton } from "src/components/buttons/buttons";
import { InfoContent } from "src/components/texts/texts";
import { ICalendario } from "src/types/types";
import { meses } from "src/utilities/default";

function Calendar() {
    const [edited, setEdited] = useState({ano: 0, meses: {}} as ICalendario);
    
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

    const updateProps = (property: string, index: number, newValue: string) => {
        setEdited((prevData: any) => {
            const nextData = [...prevData.meses[property]];
            nextData[index] = Number(newValue);
            return {
                ...prevData,
                meses: {
                    ...prevData.meses,
                    [property]: nextData
                }
            };
        });
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
            console.log(calendarText);
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
                        <input type="number" value={edited.ano} onChange={(e) => updateProps('ano', 0, e.target.value)}/>
                    </CalInputContainer>
                    <InfoContent style={{marginTop: '10px', fontSize: '20px'}}>Dias de Lua Cheia</InfoContent>
                    <InfoContent style={{margin: '0', padding: '0'}}>Preencher o primeiro quadro. Caso tenha duas luas cheias no mês, preencher o segundo.</InfoContent>
                    <FiveColTable style={{justifyItems: 'center'}}>
                        {meses.map((item, index) => {
                            const values = edited.meses[item.key] ?? [0, 0];
                            return (
                                <CalInputContainer key={index}>
                                    <label>{item.nome}:</label>
                                    <div>
                                        <input type="number" value={values[0]} onChange={(e) => updateProps(item.key, 0, e.target.value)}/>
                                        <input disabled={!values[0]} style={{background: !values[1] ? '#bbb' : 'white'}} type="number" value={values[1]} onChange={(e) => updateProps(item.key, 1, e.target.value)}/>
                                    </div>
                                </CalInputContainer>
                            )
                        })}
                    </FiveColTable>
                </ResultsCard>
                <SearchButton width="200px" style={{alignSelf: 'center'}} onClick={() => sendCalendar(token)}>Salvar</SearchButton>
            </MainContainer>
            <SideMenu list={listSubMenu} />
        </>
        
    )
}

export default Calendar