export const setAMOrPM = (time: number) => time >= 12 ? "pm" : 'am';
export const to12Hours = (time: number) =>  time > 12 ? time - 12 : time;