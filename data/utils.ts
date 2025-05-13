export const dateTimeFormatter= (date:Date) => {
    return new Date(date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
}

export const extractUTC = (str:string) => {
    const match = str.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+\d{2})/);
    return match ? match[1] : null;
};