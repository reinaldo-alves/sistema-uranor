import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import SideMenu from "src/components/SideMenu/SideMenu";
import MainContainer from "src/components/MainContainer/MainContainer";
import { ButtonContainer, CursoSubtitle, DesenvCard, DesenvLegend, ModalMediumContent, Results, ResultsData, ResultsName, ResultsTable } from "./styles";
import { convertDate, handleEnterPress, showTemplo } from "src/utilities/functions";
import { useContext, useEffect, useMemo, useState } from "react";
import { ListContext } from "src/contexts/ListContext";
import { IAluno, IAula, ICurso, IInstrutor, IMedium, IMentor, ITemplo } from "src/types/types";
import { Alert, Confirm } from "src/utilities/popups";
import { MediumContext } from "src/contexts/MediumContext";
import { UserContext } from "src/contexts/UserContext";
import api from "src/api";
import AutocompleteInput from "src/components/AutocompleteInput/AutocompleteInput";
import { defaultCurso, defaultInst, defaultMedium } from "src/utilities/default";
import { useNavigate } from "react-router-dom";
import { Modal, ModalButton, ModalSubTitle, ModalTitle } from "src/components/Modal/modal";
import Loading from "src/utilities/Loading";
import { NavigateButton } from "src/components/buttons/buttons";
import { InputContainer } from "src/components/cardsContainers/cardsContainers";
import { ColumnTitle, ResultsDetails } from "src/components/texts/texts";

function SetimoCurso() {
    const { instrutores, ministros, cursos, alunos, loadCurso, loadAluno, templos, convertCursoToSend } = useContext(ListContext);
    const { mediuns } = useContext(MediumContext);
    const { user, token } = useContext(UserContext);

    const defaultSetimo = useMemo(() => ({...defaultCurso, tipo: 4}), []);
    const maxF = 2;

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectModal, setSelectModal] = useState('')
    const [selectedMedium, setSelectedMedium] = useState(defaultMedium);
    const [dropMedium, setDropMedium] = useState(defaultMedium);
    const [searchMedium, setSearchMedium] = useState('');
    const [dropInst, setDropInst] = useState(defaultInst);
    const [searchInst, setSearchInst] = useState('');
    const [newCurso, setNewCurso] = useState(defaultSetimo);
    const [curso, setCurso] = useState(defaultSetimo);
  
    const navigate = useNavigate();

    const now = new Date();
    const stringNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const handleClickMedium = (medium_id: number) => {
        const medium : IMedium = mediuns.find((item: IMedium) => item.medium_id === medium_id)
        setShowModal(true);
        setSelectModal('medium');
        setSelectedMedium(medium);
    }

    const closeModal = () => {
        setShowModal(false);
        setSelectModal('');
        setSelectedMedium(defaultMedium);
        setDropMedium(defaultMedium);
        setSearchMedium('');
        setDropInst(defaultInst);
        setSearchInst('');
        setNewCurso(defaultSetimo);
    }

    const addMediumInCurso = async (medium: IMedium, token: string) => {
        const mediumObj = {
            medium: medium.medium_id,
            med: medium.med,
            curso: curso.curso_id,
            freq: JSON.stringify({aula1: '-', aula2: '-', aula3: '-', aula4: '-', aula5: '-', aula6: '-', aula7: '-', aula8: '-', aula9: '-', aula10: '-'})
        }
        try {
            await api.post('/aluno/add', mediumObj, {headers:{Authorization: token}})
            await loadAluno(token);
            Alert('Médium adicionado com sucesso', 'success');
            closeModal();
        } catch (error) {
            console.log('Não foi possível adicionar o médium ao curso', error);
            Alert('Não foi possível adicionar o médium ao curso', 'error');
        }
    };

    const updateFrequencia = async (aluno_id: number, aula: number, valor: '-' | 'P' | 'F') => {
        const aluno = alunos.find((item: IAluno) => item.aluno_id === aluno_id);
        if (aluno) {
            aluno.freq[`aula${aula}`] = valor;
            try {
                await api.put('/aluno/update-freq', {aluno_id, freq: JSON.stringify(aluno.freq)}, {headers:{Authorization: token}});
                await loadAluno(token);
            } catch (error) {
                console.log('Não foi possível atualizar a frequencia do aluno', error);
            }
        }
    };

    const changeMedFrequencia = async (medium: number) => {
        const aluno = alunos.find((item: IAluno) => item.curso === curso.curso_id && item.medium === medium);
        const newMed = aluno?.med === 'Apará' ? 'Doutrinador' : aluno?.med === 'Doutrinador' ? 'Apará' : mediuns.find((m: IMedium) => m.medium_id === medium)?.med === 'Apará' ? 'Doutrinador' : mediuns.find((m: IMedium) => m.medium_id === medium)?.med === 'Doutrinador' ? 'Apará' : '';
        if (aluno) {
            try {
                await api.put('/aluno/update-med', {aluno_id: aluno.aluno_id, med: newMed}, {headers:{Authorization: token}});
                await loadAluno(token);
                Alert(`Mediunidade alterada para ${newMed ?? '?'}`, 'success');
                closeModal();
            } catch (error) {
                console.log('Não foi possível alterar a mediunidade do aluno', error);
                Alert('Não foi possível alterar a mediunidade do aluno', 'error');
            }
        }
    };

    const removeMediumInCurso = async (medium: IMedium) => {
        const aluno = alunos.find((item: IAluno) => item.curso === curso.curso_id && item.medium === medium.medium_id);
        if (aluno) {
            try {
                await Confirm('Tem certeza que quer remover este médium do curso', 'question', 'Cancelar', 'Confirmar', async () => {
                    await api.delete(`/aluno/delete/?aluno_id=${aluno.aluno_id}`, {headers:{Authorization: token}});
                    await loadAluno(token);
                    Alert('Médium removido com sucesso', 'success');
                    closeModal();
                })
            } catch (error) {
                console.log('Não foi possível excluir médium do curso', error);
                Alert('Não foi possível excluir médium do curso', 'error');
            }
        } else {
            console.log('Aluno não encontrado');
            Alert('Aluno não encontrado', 'error');
        }
    }

    const updatePropsCurso = (property: keyof ICurso, value: unknown) => {
        setNewCurso(prev => ({...prev, [property]: value}));
    }

    const updateDatasCurso = (index: number, value: string) => {
        setNewCurso(prev => {
            const newDatas = [...prev.datas];
            newDatas[index] = value;
            return {...prev, datas: newDatas};
        })
    }

    const addCurso = async (token: string) => {
        const convNewCurso = convertCursoToSend(newCurso);        
        const {curso_id, ...newCursoObj} = convNewCurso;
        if (!newCurso.instrutor || !newCurso.templo || !newCurso.datas.every(item => item)) {
            Alert('Preencha os dados corretamente', 'warning');
        } else {
            try {
                await api.post('/curso/create', newCursoObj, {headers:{Authorization: token}})
                Alert('Curso adicionado com sucesso', 'success');
                await loadCurso(token);
                closeModal();
            } catch (error) {
                console.log('Não foi possível adicionar o curso', error);
                Alert('Não foi possível adicionar o curso', 'error');
            }
        }
    }

    const editCurso = async (newCurso: ICurso, oldCurso: ICurso, token: string) => {
        const changedFields = {} as any;
        const newCursoObj = convertCursoToSend(newCurso);
        const oldCursoObj = convertCursoToSend(oldCurso);
        for (const key in newCursoObj){
            if (newCursoObj[key as keyof ICurso] !== oldCursoObj[key as keyof ICurso]){
                changedFields[key as keyof ICurso] = newCursoObj[key as keyof ICurso]
            }
        }
        if (Object.keys(changedFields).length > 0) {
            try {
                await api.put('/curso/update', {curso_id: oldCursoObj.curso_id, ...changedFields}, {headers:{Authorization: token}})
                Alert('Curso editado com sucesso', 'success');
                await loadCurso(token);
                closeModal();
            } catch (error) {
                console.log('Não foi possível editar o curso', error);
                Alert('Não foi possível editar o curso', 'error');
            }
        } else {
            Alert('Não foi feita nenhuma alteração no curso', 'info');
        }
    }

    const deleteCurso = async (curso_id: number) => {
        await Confirm('ATENÇÃO! Todos os dados do curso serão excluídos e não poderão ser restaurados. Continuar?', 'warning', 'Cancelar', 'Excluir', async () => {
            try {
                alunos.forEach(async (item: IAluno) => {
                    if (item.curso === curso_id) {
                        await api.delete(`/aluno/delete?aluno_id=${item.aluno_id}`, {headers:{Authorization: token}})
                    }
                })
                await api.delete(`/curso/delete?curso_id=${curso_id}`, {headers:{Authorization: token}})
                Alert('Curso excluído com sucesso', 'success');
                await loadCurso(token);
                closeModal();
            } catch (error) {
                console.log('Erro ao excluir curso', error);
                Alert('Erro ao excluir curso', 'error');
            }
        });
    }

    const endCurso = async (id: number, token: string) => {
        await Confirm('ATENÇÃO! Esta ação vai adicionar a data de 7° Raio no cadastro de todos os médiuns que finalizaram o curso. Continuar?', 'warning', 'Cancelar', 'Concluir', async () => {
            try {
                alunos.filter((item: IAluno) => item.curso === id).forEach(async (item: IAluno) => {
                    if (countF(item) <= maxF) {
                        await api.put('/medium/update', {medium_id: item.medium, dtSetimo: medSexAluno(item) === 'DoutrinadorMasculino' || medSexAluno(item) === 'AparáFeminino' ? curso.datas[9] : curso.datas[19]}, {headers:{Authorization: token}})
                    }
                })
                await api.put('/curso/update', {curso_id: id, concluido: 1}, {headers:{Authorization: token}})
                Alert('Curso marcado como concluído', 'success');
                await loadCurso(token);
            } catch (error) {
                console.log('Não foi possível marcar o curso como concluído', error);
                Alert('Não foi possível marcar o curso como concluído', 'error');
            }
        })
        // FALTA REMOVER MÉDIUNS DESISTENTES DAS CONSAGRAÇÕES
    }

    const cursoStatus = (curso: ICurso) => {
        if (curso.concluido) {
            return 'Concluído';
        } else if (now < new Date(curso.datas[0])) {
            return 'Autorizado';
        } else if (now >= new Date(curso.datas[0]) && now <= new Date(curso.datas[19])) {
            return 'Em andamento';
        } else {
            return 'Expirado'; 
        }
    }

    const countF = (aluno: IAluno) => {
        let count = 0;
        for (let i = 0; i < 10; i++) {
            if (aluno.freq[`aula${i + 1}` as keyof IAula] === 'F') {
                count++;
            }
        }
        return count;
    }

    function medSexAluno(aluno: IAluno) {
        const sex = mediuns.find((m: IMedium) => m.medium_id === aluno.medium)?.sex
        return aluno.med + sex;
    }
    
    useEffect(() => {
        loadCurso(token);
        loadAluno(token);
    }, [loadCurso, loadAluno, token]);
    
    useEffect(() => {
        if(cursos && alunos) {
            setLoading(false);
        }
    }, [cursos, alunos])

    useEffect(() => {
        if (cursos.length > 0) {
            const cursoAtual = cursos.find((item: ICurso) => item.curso_id === curso.curso_id);
            if (curso.curso_id && cursoAtual) {
                setCurso(cursoAtual);
            } else {
                setCurso(cursos[0]);
            }
        }
        console.log(cursos);
    }, [cursos, curso.curso_id]);

    useEffect(() => {
        if(dropInst) {
            updatePropsCurso('instrutor', dropInst.instrutor_id);
        } else {
            updatePropsCurso('instrutor', 0);
        }
    }, [dropInst, selectModal]);

    useEffect(() => {
        if(selectModal === 'editar') {
            setNewCurso(curso);
        } else {
            setNewCurso(defaultSetimo);
        }
    }, [selectModal, curso, defaultSetimo]);

    const listSubMenu = [
        {title: 'Página Inicial', click: '/'},
        {title: 'Painel', click: '/cursos'},
        {title: 'Iniciação', click: '/cursos/iniciacao'},
        {title: 'Elevação', click: '/cursos/elevacao'},
        {title: 'Centúria', click: '/cursos/centuria'},
        {title: 'Sétimo Raio', click: '/cursos/setimo'}
    ]

    if(loading) {
        return <Loading />
    }

    function cursoTable(title: string, offset: number, medSex: Array<string>) {
        if (alunos.filter((item: IAluno) => item.curso === curso.curso_id && medSex.includes(medSexAluno(item))).length === 0) return;
        return (
            <>
                <h3>{title}</h3>
                <ResultsTable>
                    <Results columns={10}>
                        <ColumnTitle align="left">Médium</ColumnTitle>
                        {curso.datas.slice(0 + offset, 10 + offset).map((item: string, index: number) => (
                            <div key={index}>
                                <ColumnTitle>{index + 1}ª Aula</ColumnTitle>
                                <ColumnTitle style={{fontSize: '18px'}}>{convertDate(item)}</ColumnTitle>
                            </div>
                        ))}
                    </Results>
                    {alunos.filter((item: IAluno) => item.curso === curso.curso_id && medSex.includes(medSexAluno(item)))
                        .sort((a: IAluno, b: IAluno) => {
                            const nomeA = mediuns.find((m: IMedium) => m.medium_id === a.medium)?.nome?.toLowerCase() || '';
                            const nomeB = mediuns.find((m: IMedium) => m.medium_id === b.medium)?.nome?.toLowerCase() || '';
                            return nomeA.localeCompare(nomeB, 'pt-BR');
                        })
                        .map((item: IAluno, index: number) => (
                            <Results columns={10} key={index}>
                                <ResultsName style={{opacity: countF(item) > maxF ? '0.5' : '1'}} onClick={() => handleClickMedium(item.medium)}>
                                    {mediuns.find((m: IMedium) => m.medium_id === item.medium)?.nome}
                                    <ResultsDetails resize>{item.med} - {showTemplo(mediuns.find((m: IMedium) => m.medium_id === item.medium), templos)}{countF(item) > maxF ? ' (DESISTENTE)' : ''}</ResultsDetails>
                                </ResultsName>
                                {curso.datas.slice(0 + offset, 10 + offset).map((_, index: number) => (
                                    <ResultsData key={index}>
                                        <select value={item.freq[`aula${index + 1}` as keyof IAula]} onChange={(e) => updateFrequencia(item.aluno_id, index + 1, e.target.value as '-' | 'P' | 'F')}>
                                            <option value='-'>-</option>
                                            <option value='P'>P</option>
                                            <option value='F'>F</option>
                                        </select>
                                    </ResultsData>
                                ))}
                            </Results>
                        ))
                    }
                </ResultsTable>
                <DesenvLegend>Legenda: P = Presente, F = Falta</DesenvLegend>
            </>
        )
    }

    function otherCursoSection(title: string, concluido: boolean) {
        return (
            <>
                {cursos && cursos.filter((item: ICurso) => item.tipo === 4 && item.curso_id !== curso.curso_id && item.concluido === concluido).length > 0 &&
                    <>
                        <CursoSubtitle>
                            <h2>{title}</h2>
                        </CursoSubtitle>
                        <DesenvCard>
                            <ResultsTable>
                                {cursos.filter((item: ICurso) => item.tipo === 4 && item.curso_id !== curso.curso_id && item.concluido === concluido).map((item: ICurso, index: number) => (
                                    <Results columns={1} key={index}>
                                        <ResultsName>
                                            {convertDate(item.datas[0])} a {convertDate(item.datas[19])} - {templos.find((t: ITemplo) => t.templo_id === item.templo)?.cidade}-{templos.find((t: ITemplo) => t.templo_id === item.templo)?.estado.abrev} - Nenhum médium
                                            <ResultsDetails resize>Adj. {ministros.find((min: IMentor) => min.id === instrutores.find((inst: IInstrutor) => inst.instrutor_id === item.instrutor)?.ministro)?.nome} {} - Mestre {instrutores.find((inst: IInstrutor) => inst.instrutor_id === item.instrutor)?.nome}</ResultsDetails>
                                        </ResultsName>
                                        <NavigateButton width="80px" style={{justifySelf: 'flex-end', marginRight: '3px'}} onClick={() => setCurso(item)}>Ver</NavigateButton>
                                    </Results>
                                ))}
                            </ResultsTable>
                        </DesenvCard>
                    </>
                }
            </>
        )
    }
    
    return (
        <>
            <Header />
            <SubMenu list={listSubMenu}/>
            <MainContainer title="Curso de Sétimo Raio">
                {cursos && cursos.filter((item: ICurso) => item.tipo === 4).length > 0 ?
                    <CursoSubtitle>
                        <h2>
                            {convertDate(curso.datas[0])} a {convertDate(curso.datas[19])} - {templos.find((t: ITemplo) => t.templo_id === curso.templo)?.cidade}-{templos.find((t: ITemplo) => t.templo_id === curso.templo)?.estado.abrev}
                        </h2>
                        <h3>
                            Instrutor: Adj. {ministros.find((min: IMentor) => min.id === instrutores.find((inst: IInstrutor) => inst.instrutor_id === curso.instrutor)?.ministro)?.nome} {} - Mestre {instrutores.find((inst: IInstrutor) => inst.instrutor_id === curso.instrutor)?.nome}
                        </h3>
                        <h3>
                            Situação: {cursoStatus(curso)}
                        </h3>
                    </CursoSubtitle>    
                :
                    <CursoSubtitle><h2>Nenhum Curso</h2></CursoSubtitle>
                }        
                {cursos && cursos.filter((item: ICurso) => item.tipo === 4).length > 0 &&<DesenvCard>
                    {alunos && alunos.filter((item: IAluno) => item.curso === curso.curso_id).length > 0 ?
                        <>
                            {cursoTable('Mestre Sol e Ninfa Lua', 0, ['DoutrinadorMasculino', 'AparáFeminino'])}
                            {cursoTable('Mestre Lua e Ninfa Sol', 10, ['DoutrinadorFeminino', 'AparáMasculino'])}
                        </>
                    : 
                        <ColumnTitle>Nenhum Médium</ColumnTitle>
                    }
                    {curso.observ && <>
                        <h3>Observações</h3>
                        <p>{curso.observ}</p>
                    </>}
                    <ButtonContainer hide={user.level !== 'Administrador' && curso.concluido}>
                        <NavigateButton width="250px" onClick={() => {
                            setSelectModal('novomedium');
                            setShowModal(true);
                        }}>Adicionar Médium</NavigateButton>
                        <NavigateButton width="250px" onClick={() => {
                            setSelectModal('editar');
                            setDropInst(instrutores.find((inst: IInstrutor) => inst.instrutor_id === curso.instrutor));
                            setShowModal(true);
                        }}>Editar Curso</NavigateButton>
                        <NavigateButton width="250px" color="red" style={{display: user.level === 'Administrador' ? 'block' : 'none'}} onClick={async () => await deleteCurso(curso.curso_id)}>Excluir Curso</NavigateButton>
                        <NavigateButton width="250px" color="red" disabled={curso.concluido} onClick={async () => await endCurso(curso.curso_id, token)}>Concluir Curso</NavigateButton>
                    </ButtonContainer>
                </DesenvCard>}
                <ButtonContainer style={{margin: '40px 0'}}>
                    <NavigateButton width="250px" onClick={() => {
                        setSelectModal('novocurso');
                        setShowModal(true);
                    }}>Novo Curso</NavigateButton>
                </ButtonContainer>
                {otherCursoSection(`${curso.concluido ? '' : 'Outros '}Cursos Abertos`, false)}
                {otherCursoSection('Cursos Concluídos', true)}
            </MainContainer>
            <SideMenu list={listSubMenu}/>
            <Modal vis={showModal}>
                <ModalMediumContent vis={selectModal === 'medium'}>
                    <ModalTitle>{selectedMedium.nome}</ModalTitle>
                    <NavigateButton style={{marginBottom: '20px'}} width="230px" onClick={() => navigate(`/mediuns/consulta/${selectedMedium.medium_id}`)}>Ver ficha</NavigateButton>
                    <NavigateButton width="230px" style={{display: `${user.level === 'Administrador' ? 'block' : 'none'}`}} onClick={() => changeMedFrequencia(selectedMedium.medium_id)}>Mudar Med. Frequência</NavigateButton>
                    <NavigateButton width="230px" color="red" onClick={() => removeMediumInCurso(selectedMedium)}>Remover</NavigateButton>
                    <NavigateButton style={{marginTop: '20px'}} width="230px" color="red" onClick={() => closeModal()}>Fechar</NavigateButton>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'novomedium'}>
                    <ModalTitle>Adicionar Médium no Curso</ModalTitle>
                    <InputContainer labelWidth="auto">
                        <label>Nome do Médium</label>
                        <AutocompleteInput 
                            label={(option) => option.medium_id ? `${option.nome} (${option.medium_id.toString().padStart(5, '0')})` : ''}
                            default={defaultMedium}
                            options={mediuns.filter((item: IMedium) => item.condicao === 'Ativo' && item.dtCenturia && !item.dtSetimo)}
                            disabledOptions={(option) => alunos.filter((a: IAluno) => a.curso === curso.curso_id).some((item: IAluno) => item?.medium === option?.medium_id)}
                            equality={(option, value) => option.medium_id === value.medium_id}
                            value={dropMedium}
                            setValue={setDropMedium}
                            inputValue={searchMedium}
                            setInputValue={setSearchMedium}
                        />
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={dropMedium === defaultMedium} onClick={async () => await addMediumInCurso(dropMedium, token)}>Salvar</ModalButton>
                    </div>
                </ModalMediumContent>
                <ModalMediumContent vis={selectModal === 'novocurso' || selectModal === 'editar'}>
                    <ModalTitle>{selectModal === 'novocurso' ? 'Novo' : 'Editar'} Curso de 7° Raio</ModalTitle>
                    <InputContainer labelWidth="auto">
                        <label>Instrutor</label>
                        <AutocompleteInput 
                            label={(option) => option.instrutor_id ? `Adj. ${ministros.find((min: IMentor) => min.id === option.ministro)?.nome} - Mestre ${option.nome}` : ''}
                            default={defaultInst}
                            options={instrutores.filter((item: IInstrutor) => item.setimo)}
                            equality={(option, value) => option.instrutor_id === value.instrutor_id}
                            value={dropInst}
                            setValue={setDropInst}
                            inputValue={searchInst}
                            setInputValue={setSearchInst}
                        />
                    </InputContainer>
                    <InputContainer labelWidth="auto">
                        <label>Templo</label>
                        <select value={newCurso.templo} onChange={(e) => updatePropsCurso('templo', Number(e.target.value))}>
                            <option value={0}></option>
                            {templos.map((item: ITemplo, index: number) => (
                                <option key={index} value={item.templo_id}>{item.cidade} - {item.estado.abrev}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <ModalSubTitle>Datas das Aulas</ModalSubTitle>
                    <div style={{width: '100%', display: "flex", gap: '8px'}}>
                        <div style={{width: '100%', display: "flex", flexDirection: 'column', gap: '8px'}}>
                            {Array(10).fill(0).map((_, index) => ( 
                                <InputContainer key={index} labelWidth="auto">
                                    <label>{index + 1}ª M. Sol/N. Lua</label>
                                    <input type="date" max={stringNow} value={newCurso.datas[index]} onKeyUp={(e) => handleEnterPress(e, selectModal === 'novocurso' ? async () => await addCurso(token) : async () => await editCurso(newCurso, curso, token))} onChange={(e) => updateDatasCurso(index, e.target.value)} />
                                </InputContainer>
                            ))}
                        </div>
                        <div style={{width: '100%', display: "flex", flexDirection: 'column', gap: '8px'}}>
                            {Array(10).fill(0).map((_, index) => (
                                <InputContainer key={index + 10} labelWidth="auto">
                                    <label>{index + 1}ª M. Lua/N. Sol</label>
                                    <input type="date" max={stringNow} value={newCurso.datas[index + 10]} onKeyUp={(e) => handleEnterPress(e, selectModal === 'novocurso' ? async () => await addCurso(token) : async () => await editCurso(newCurso, curso, token))} onChange={(e) => updateDatasCurso(index + 10, e.target.value)} />
                                </InputContainer>
                            ))}
                        </div>
                    </div>
                    <InputContainer labelWidth="auto">
                        <label>Observações</label>
                        <textarea value={newCurso.observ} onKeyUp={(e) => handleEnterPress(e, selectModal === 'novocurso' ? async () => await addCurso(token) : async () => await editCurso(newCurso, curso, token))} onChange={(e) => updatePropsCurso('observ', e.target.value)}></textarea>
                    </InputContainer>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <ModalButton color="red" onClick={() => closeModal()}>Cancelar</ModalButton>
                        <ModalButton color='green' disabled={!newCurso.instrutor || !newCurso.templo || !newCurso.datas.every(item => item)} onClick={selectModal === 'novocurso' ? async () => await addCurso(token) : async () => await editCurso(newCurso, curso, token)}>OK</ModalButton>
                    </div>
                </ModalMediumContent>
            </Modal>
        </>
    )
}

export default SetimoCurso