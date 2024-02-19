export const formatPhone = (phone:string | undefined) => {
    if(!phone) return;
    const country = phone.slice(0, 4);
    const areaCode = phone.slice(4, 6);
    const prefix = phone.slice(6, 7);
    const number = `${phone.slice(7, 10)} ${phone.slice(10, 14)}`;
    const fullNumber =`${country} ${areaCode} ${prefix} ${number}`;
    return fullNumber;
}