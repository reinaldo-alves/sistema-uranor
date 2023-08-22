import { IMedium } from "src/types/types";

export function convertDate(date: string) {
    const dateParts = date.split('-');
    const day = parseInt(dateParts[2]);
    const month = dateParts[1];
    const year = dateParts[0];
    if(!day || !month || !year) {
        return ''
    }
    return `${day}/${month}/${year}`; 
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