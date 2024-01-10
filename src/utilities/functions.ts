import { IConsagracao, IMedium, ITurno } from "src/types/types";

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
    if (!medium.dtEmplac) {return 'Em desenvolvimento'}
    else if (!medium.dtIniciacao) {return 'Liberado'}
    else if (!medium.dtElevacao) {return 'Iniciado'}
    else if (!medium.dtCenturia) {return 'Elevado'}
    else if (!medium.dtSetimo) {return 'Centurião'}
    else if (medium.dtSetimo) {return 'Centurião 7° Raio'}
    else {return ''}
}

//Função que retorna o turno (legião ou trabalho) correspondente do sexo oposto
export const oppositeTurno = (obj: ITurno, turno: string) => {
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
export const reduceClassFalMest = (medium: IConsagracao, falMest: {completo: Array<string>, abrev: Array<string>}) => {
    const splitClass = medium.classMest.split(' ');
    const falMestIndex = falMest.completo.findIndex((item: string) => item === medium.falMest)
    const reducedClass = splitClass.length >= 2 ? `${splitClass[0]} ${splitClass[1]}` : '';
    const reduced = falMestIndex !== -1 && reducedClass !== '' ? `${reducedClass} ${falMest.abrev[falMestIndex]}`.toUpperCase() : '';
    return reduced
}