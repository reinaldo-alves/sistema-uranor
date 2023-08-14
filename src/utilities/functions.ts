export function convertDate(date: Date) {
    const fullDate = new Date(date);
    const day = String(fullDate.getUTCDate()).padStart(2, '0');
    const month = String(fullDate.getUTCMonth() + 1).padStart(2, '0');
    const year = fullDate.getUTCFullYear();

    if(!day || !month || !year) {
        return ''
    }

    return `${day}/${month}/${year}`;
}