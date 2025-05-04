export const dateTimeFormatter= (date:Date) => {
    return new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
        hour12: true
    }).format(date);
}

export const extractUTC = (str:string) => {
    const match = str.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+\d{2})/);
    return match ? match[1] : null;
};