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