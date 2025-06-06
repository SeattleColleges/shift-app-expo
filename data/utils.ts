export const dateTimeFormatter= (date:Date) => {
    return new Date(date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
}

export const extractUTC = (str:string) => {
    const match = str.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+\d{2})/);
    return match ? match[1] : null;
};

export const convertToLocalDate = (slot:string,timeZone: string='America/Los_Angeles') => {
    const cleanSlot = extractUTC(slot)
    if(cleanSlot === null) return console.error("Failed to extract UTC from time slot");
    const dateUTC = new Date(cleanSlot.replace(' ', 'T').replace('+00', 'Z'));
    const convertToLocal =  (dateUTC.toLocaleString("sv-SE", {
        timeZone: timeZone
    }))
    return new Date(convertToLocal.replace(' ', 'T'))
}

export const durationFormat = (duration:number) => {
    const calcDuration = Number.parseFloat(String(duration / 60)).toFixed(1)
    const [hour, remainder] = calcDuration.split('.');
    const zero  = '0'
    if (remainder === zero ) {
        return hour
    }
    return calcDuration
}