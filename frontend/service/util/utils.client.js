export const validatePhonenumber = number => {
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return regex.test(String(number));
}

export const date2datetimestr = date => {
    let year = String(date.getFullYear()).padStart(4, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let _date = String(date.getDate()).padStart(2, '0');
    let hour = String(date.getHours()).padStart(2, '0');
    let min = String(date.getMinutes()).padStart(2, '0');
    let sec = String(date.getSeconds()).padStart(2, '0');
    return `${_date}/${month}/${year} ${hour}:${min}:${sec}`
}

export const date2datestr = date => {
    let year = String(date.getFullYear()).padStart(4, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let _date = String(date.getDate()).padStart(2, '0');
    return `${_date}/${month}/${year}`
}

export const ts2daystr = timestamp => {
    let ts = Math.floor(timestamp / 1000);
    let day = Math.floor(ts / (24 * 3600));
    let hour = (Math.floor(ts / 3600)) % 24;
    let min = Math.floor(ts / 60) % 60;
    let sec = ts % 60;
    if (day) {
        return `${day} ngày ${hour} giờ ${min} phút`;
    } else if (hour) {
        return `${hour} giờ ${min} phút`;
    } else if (min) {
        return `${min} phút`;
    } else if (sec) {
        return `${sec} giây`;
    }
}

export const int2money = (num) => {
    let str = '';
    while (num > 0) {
        if (num > 1000) {
            let m = num % 1000;
            if(m == 0){
                str = `,000${str}`;
            }else if(m < 10){
                str = `,00${m}${str}`;
            }else if(m<100){
                str = `,0${m}${str}`;
            }else{
                str = `,${m}${str}`;
            }
        } else {
            str = `${num}${str}`;
        }
        num = Math.floor(num / 1000);
    }
    return str;
}