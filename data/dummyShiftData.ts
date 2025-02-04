export interface ShiftData {
    date: string,
    shifts: {startTime: string, endTime: string, role:string, building: string, roomNumber:string}[],
}
export const shiftData: ShiftData[] = [
    {
        date: "2025-02-05",
        shifts: [
            { startTime: "08:00", endTime: "12:00", role: "Front Desk", building: "Main Office", roomNumber: "101" },
            { startTime: "13:00", endTime: "17:00", role: "Security", building: "Warehouse", roomNumber: "B2" }
        ]
    },
    {
        date: "2025-02-06",
        shifts: [
            { startTime: "09:00", endTime: "14:00", role: "Maintenance", building: "Engineering Block", roomNumber: "305" }
        ]
    },
    {
        date: "2025-02-07",
        shifts: [
            { startTime: "07:00", endTime: "11:00", role: "Customer Support", building: "Service Center", roomNumber: "A1" },
            { startTime: "12:00", endTime: "16:00", role: "IT Support", building: "Tech Hub", roomNumber: "202" }
        ]
    }
];