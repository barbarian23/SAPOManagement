export const validatePhonenumber = number => {
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return regex.test(String(number));
}

export const date2dtstr = date =>{
    let year = String(date.getFullYear()).padStart(4, '0');
    let month = String(date.getMonth()).padStart(2, '0');
    let _date = String(date.getDate()).padStart(2, '0');
    let hour = String(date.getHours()).padStart(2, '0');
    let min = String(date.getMinutes()).padStart(2, '0');
    let sec = String(date.getSeconds()).padStart(2, '0');
    return `${_date}/${month}/${year} ${hour}:${min}:${sec}`
}