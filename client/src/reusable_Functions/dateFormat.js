export const getDate = (date) => {
    let d = new Date(date)
    if(String(d.getDate()).length < 2) {
        return `0${String(d.getDate())}`
    } else {
        return d.getDate();
    }
};
export const getMonthName = (date) => {
    const d = new Date(date);
    const monthName = d.toLocaleString('default', { month: 'long' });
    return monthName;
}
export const getYear = (date) => {
    const d = new Date(date);
    const fullYear = d.getFullYear();
    return fullYear;
}

export const formatDate = (date) => {
    return `${getDate(date)} ${getMonthName(date)} ${getYear(date)}`
}
   