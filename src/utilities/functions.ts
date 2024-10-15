import api from "src/api";
import { ICavaleiro, IConsagracao, IEvento, IFrequencia, IMedium, IMenor, IMentor, ITemplo, ITurno } from "src/types/types";
import { IEventoAPI } from "src/types/typesAPI";
import { eventTypes } from "./default";

export function convertDate(date: string) {
    const dateParts = date.split('-');
    const day = parseInt(dateParts[2]).toString().padStart(2, '0');
    const month = dateParts[1];
    const year = dateParts[0];
    if(!day || !month || !year) {
        return ''
    }
    return `${day}/${month}/${year}`; 
}

export function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const date = `${day}/${month}/${year}`;
    return date
}

export function formatPhoneNumber(value: string) {
    if (!value) return ""
    value = value.replace(/\D/g,'');
    value = value.replace(/(\d{2})(\d)/,"($1) $2");
    value = value.replace(/(\d)(\d{4})$/,"$1-$2");
    return value
}

export function formatCpf(value: string) {
    if (!value) return ""
    value = value.replace(/\D/g,'');
    value = value.replace(/(\d{3})(\d)/,"$1.$2");
    value = value.replace(/(\d{3})(\d)/,"$1.$2");
    value = value.replace(/(\d{3})(\d)/,"$1-$2");
    return value
}

export function formatCep(value: string) {
    if (!value) return ""
    value = value.replace(/\D/g,'');
    value = value.replace(/(\d{5})(\d)/,"$1-$2");
    return value
}

export function setSituation(medium: IMedium) {
    if (medium.dtSetimo) {return 'Centurião 7º Raio'}
    else if (medium.dtCenturia) {return 'Centurião'}
    else if (medium.dtElevacao) {return 'Elevado'}
    else if (medium.dtIniciacao) {return 'Iniciado'}
    else if (medium.dtEmplac) {return 'Liberado'}
    else if (medium.dtIngresso) {return 'Em desenvolvimento'}
    else {return ''}
}

//Função que retorna o turno (legião ou trabalho) correspondente do sexo oposto
export function oppositeTurno(obj: ITurno, turno: string) {
    if(obj.jaguar.includes(turno)) {
        const index = obj.jaguar.indexOf(turno);
        return obj.ninfa[index] || ''
    } else if(obj.ninfa.includes(turno)) {
        const index = obj.ninfa.indexOf(turno);
        return obj.jaguar[index] || ''
    } else {
        return ''
    }
}

//Cria texto para número de médiuns em consagrações
export function countMedium(array: Array<any>) {
    if (array.length === 0) {
        return 'Nenhum médium';
    } else if (array.length === 1) {
        return '1 médium'
    } else {
        return `${array.length} médiuns`
    }
}

//Converte uma imagem para base64
export async function imageToBase64 (url: string) {
    if (!url) {return ''}
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(console.error('Erro ao converter imagem para base64'))
                }
            };
            reader.onerror = () => {
                reject(console.error('Erro ao ler arquivo de imagem'))
            };
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Erro ao carregar imagem', error)
    }
}

//Escreve a classificação e falange de mestrado de forma reduzida, para relatório de centúria
export function reduceClassFalMest(medium: IConsagracao, falMest: {completo: Array<string>, abrev: Array<string>}) {
    const splitClass = medium.classMest.split(' ');
    const falMestIndex = falMest.completo.findIndex((item: string) => item === medium.falMest)
    const reducedClass = splitClass.length >= 2 ? `${splitClass[0]} ${splitClass[1]}` : '';
    const reduced = falMestIndex !== -1 && reducedClass !== '' ? `${reducedClass} ${falMest.abrev[falMestIndex]}`.toUpperCase() : '';
    return reduced
}

//Coloca um array em ordem alfabética pela propriedade nome dos seus elementos
export function alphabeticOrder(array: Array<any>) {
    array.sort((minA: any, minB: any) => {
        const nomeA = minA.nome.toLowerCase();
        const nomeB = minB.nome.toLowerCase();
        return nomeA.localeCompare(nomeB, 'pt-BR');
    }); 
    return array
}

//Executa uma função ao pressionar enter com input focado
export function handleEnterPress(e: React.KeyboardEvent, func: () => void) {
    if (e.key === 'Enter') {
        func();
    } 
}

//Cria o texto da seção Cargos e Funções do médium
export function positionsAndFunctions(medium: IMedium) {
    const array = [];
    if (medium.comando === 'Comandante'){array.push('Comandante')}
    else if (medium.comando === 'Janatã'){array.push('Comandante Janatã')}
    else if (medium.comando === 'Lança'){array.push('Comandante, Lança Vermelha')}
    else if (medium.comando === 'JanatãLança'){array.push('Comandante Janatã, Lança Vermelha')};
    if (medium.presidente === 'Presidente'){array.push('Presidente')}
    else if (medium.presidente === 'Vice'){array.push('Vice-presidente')};
    if (medium.recepcao){array.push('Recepcionista')};
    if (medium.devas){array.push(medium.sex === 'Feminino'? 'Filha de Devas' : 'Filho de Devas')};
    if (medium.regente){array.push('Regente')};
    if (medium.janda){array.push('Janda')};
    if (medium.trinoSol){array.push(`Trino Solitário ${medium.trinoSol}`)};
    if (medium.trinoSar){array.push('Trino Sardyos')};
    return array.join(', ')
}

//Retorna um array com todos os eventos associados ao médium selecionado
export async function generateListEventos(medium: IMedium, token: string, ministros: Array<IMentor>, cavaleiros: Array<ICavaleiro>, guias: Array<IMentor>) {
    try {
        const { data } = await api.get(`/evento/get?medium=${medium?.medium_id}`, {headers:{Authorization: token}})
        const evento = data.evento.map((item: IEventoAPI) => ({
            ...item,
            data: item.data === null ? '' : item.data.toString().split('T')[0],
        }));
        if(medium?.dtIngresso && !evento.some((item: IEvento) => item.tipo === 'Ingresso')) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtIngresso, mensagem: 'Ingresso na doutrina', observ: '', tipo: 'Ingresso'})
        }
        if(medium?.dtTest && !evento.some((item: IEvento) => item.tipo === `Teste ${medium?.med}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtTest, mensagem: `Teste mediúnico - ${medium?.med}`, observ: '', tipo: `Teste ${medium?.med}`})
        }
        if(medium?.dtEmplac && !evento.some((item: IEvento) => item.tipo === `Emplacamento ${medium?.med}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtEmplac, mensagem: `Emplacamento como ${medium?.med}`, observ: '', tipo: `Emplacamento ${medium?.med}`})
        }
        if(medium?.dtIniciacao  && !evento.some((item: IEvento) => item.tipo === `Iniciação ${medium?.med}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtIniciacao, mensagem: `Iniciação como ${medium?.med}`, observ: '', tipo: `Iniciação ${medium?.med}`})
        }
        if(medium?.dtElevacao && !evento.some((item: IEvento) => item.tipo === `Elevação ${medium?.med}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtElevacao, mensagem: `Elevação como ${medium?.med}`, observ: '', tipo: `Elevação ${medium?.med}`})
        }
        if(medium?.dtCenturia && !evento.some((item: IEvento) => item.tipo === 'Centúria')) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtCenturia, mensagem: 'Centúria', observ: '', tipo: 'Centúria'})
        }
        if(medium?.dtSetimo && !evento.some((item: IEvento) => item.tipo === 'Curso de Sétimo')) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtSetimo, mensagem: 'Curso de 7º Raio concluído', observ: '', tipo: 'Curso de Sétimo'})
        }
        if(medium?.oldDtTest && !evento.some((item: IEvento) => item.tipo === `Teste ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtTest, mensagem: `Teste mediúnico - ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Teste ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
        }
        if(medium?.oldDtEmplac && !evento.some((item: IEvento) => item.tipo === `Emplacamento ${medium.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtEmplac, mensagem: `Emplacamento como ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Emplacamento ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
        }
        if(medium?.oldDtIniciacao && !evento.some((item: IEvento) => item.tipo === `Iniciação ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtIniciacao, mensagem: `Iniciação como ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Iniciação ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
        }
        if(medium?.oldDtElevacao && !evento.some((item: IEvento) => item.tipo === `Elevação ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtElevacao, mensagem: `Elevação como ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`, observ: '', tipo: `Elevação ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
        }
        if(medium?.dtMentor && !evento.some((item: IEvento) => item.tipo === `Mentores ${medium?.med}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtMentor, mensagem: medium?.sex === 'Masculino' ? `Recebeu ministro ${ministros.find((m: IMentor) => m.id === medium?.ministro)?.nome} e cavaleiro ${cavaleiros.find((c: ICavaleiro) => c.id === medium?.cavaleiro)?.nome} ${medium?.cor}` : medium?.sex === 'Feminino' ? `Recebeu guia missionária ${guias.find((g: IMentor) => g.id === medium?.guia)?.nome} ${medium?.cor}` : '', observ: '', tipo: `Mentores ${medium?.med}`})
        }
        if(medium?.dtClassif && !evento.some((item: IEvento) => item.tipo === 'Classificações' && item.mensagem.split('de ')[1] === medium?.classif)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.dtClassif, mensagem: `Classificação de ${medium?.classif}`, observ: '', tipo: 'Classificações'})
        }
        if(medium?.oldDtMentor && !evento.some((item: IEvento) => item.tipo === `Mentores ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtMentor, mensagem: medium?.sex === 'Masculino' ? `Recebeu ministro ${ministros.find((m: IMentor) => m.id === medium?.ministro)?.nome} e cavaleiro ${cavaleiros.find((c: ICavaleiro) => c.id === medium?.oldCavaleiro)?.nome} ${medium?.oldCor}` : '', observ: '', tipo: `Mentores ${medium?.med === 'Apará' ? 'Doutrinador' : medium?.med === 'Doutrinador' ? 'Apará' : ''}`})
        }
        if(medium?.oldDtClassif && !evento.some((item: IEvento) => item.tipo === 'Classificações' && item.mensagem.split('de ')[1] === medium?.oldClassif)) {
            evento.push({evento_id: 0, medium: medium?.medium_id, data: medium?.oldDtClassif, mensagem: `Classificação de ${medium?.oldClassif}`, observ: '', tipo: 'Classificações'})
        }
        evento.sort((a: IEvento, b: IEvento) => {
            const dateA = new Date(a.data).getTime();
            const dateB = new Date(b.data).getTime();
            const priorA = eventTypes.find(item => item.event === a.tipo)?.prior || 6
            const priorB = eventTypes.find(item => item.event === b.tipo)?.prior || 6
            if (dateA !== dateB) {
                return dateB - dateA;
            } else {
                return priorB - priorA;
            }
        })
        return evento;
    } catch (error) {
        console.error('Erro ao criar a lista de eventos da linha do tempo do médium', error);
    }
}

//Formata os textos inseridos nos inputs para que cada palavra fique com a inicial maiúscula
export function formatInputText(inputText: string) {
    const exceptWords = ['e', 'de', 'da', 'do', 'dos', 'das']
    const text = inputText.toLowerCase();
    const words = text.split(" ");
    let result = words.map(word => {
        if (!exceptWords.includes(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            return word;
        }
    }).join(" ");
    return result;
}

//Remove acentuação dos textos para compará-los nas pesquisas
export function removeDiacritics(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

//Manipuladores de eventos para inputs de senhas exibirem mensagens de Caps Lock ativo
export function handleCapsLock(state: React.Dispatch<React.SetStateAction<boolean>>, ref: React.RefObject<HTMLInputElement>) {
    function keyDown(e: KeyboardEvent) {
        if (e.getModifierState('CapsLock')) {
            state(true);
        } else {
            state(false);
        }
    };
    function keyUp(e: KeyboardEvent) {
        if (!e.getModifierState('CapsLock')) {
            state(false);
        }
    };
    return {
        focus: () => {
            ref.current?.addEventListener('keydown', keyDown);
            ref.current?.addEventListener('keyup', keyUp);
        },
        blur: () => {
            ref.current?.removeEventListener('keydown', keyDown);
            ref.current?.removeEventListener('keyup', keyUp);
            state(false);
        }
    }
}

//Exibe o nome do templo do médium, no formato Cidade - UF
export function showTemplo(medium: IMedium | IMenor, templos: Array<ITemplo>) {
    const cidade = templos.find((item: ITemplo) => item.templo_id === medium.templo)?.cidade;
    const uf = templos.find((item: ITemplo) => item.templo_id === medium.templo)?.estado.abrev;
    return `${cidade} - ${uf}`
}

//Exibe os detalhes do médium (templo e telefones) nas tabelas de consagrações
export function consagracaoDetails(item: IConsagracao, mediuns: Array<IMedium>, templos: Array<ITemplo>) {
    const cidade = templos.find((temp: ITemplo) => temp.templo_id === item.templo)?.cidade;
    const uf = templos.find((temp: ITemplo) => temp.templo_id === item.templo)?.estado.abrev;
    const telefone1 = mediuns.find((m: IMedium) => m.medium_id === item.medium)?.telefone1;
    const telefone2 = mediuns.find((m: IMedium) => m.medium_id === item.medium)?.telefone2;
    const divider = telefone1 && telefone2 ? ' / ' : '';   
    return `Templo: ${cidade} - ${uf} - Telefone: ${telefone1}${divider}${telefone2}`
}

//Formata um objeto Date em uma string com mês por extenso e ano com 4 dígitos
export const formatMonthYear = new Intl.DateTimeFormat('pt-BR', {month: 'long', year: 'numeric'});

//Mostra a mediunidade correspondente a um registro de frequência de um médium no desenvolvimento
export const showMedDesenv = (frequencia: IFrequencia, mediuns: Array<IMedium>) => {
    const currentMed = mediuns.find((m: IMedium) => m.medium_id === frequencia.medium)?.med;
    const result = frequencia?.med === 'A' ? 'Apará' : frequencia?.med === 'D' ? 'Doutrinador' : currentMed;
    return result;
}