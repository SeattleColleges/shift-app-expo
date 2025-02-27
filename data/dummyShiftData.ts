export interface ShiftData {
    id: number,
    date: string,
    startTime: string,
    endTime: string,
    role: string,
    building: string,
    roomNumber: string,
}

export const shiftData: ShiftData[] = [
    {
        id: 0,
        date: "2025-02-05",
        startTime: "08:00",
        endTime: "16:00",
        role: "Front Desk",
        building: "Main Office",
        roomNumber: "101"
    },
    {
        id: 1,
        date: "2025-02-05",
        startTime: "13:00",
        endTime: "17:00",
        role: "Security",
        building: "Warehouse",
        roomNumber: "B2"
    },
    {
        id: 2,
        date: "2025-02-06",
        startTime: "09:00",
        endTime: "14:00",
        role: "Maintenance",
        building: "Engineering Block",
        roomNumber: "305"
    },
    {
        id: 3,
        date: "2025-02-07",
        startTime: "07:00",
        endTime: "11:00",
        role: "Customer Support",
        building: "Service Center",
        roomNumber: "A1"
    },
    {
        id: 4,
        date: "2025-02-08",
        startTime: "12:00",
        endTime: "16:00",
        role: "IT Support",
        building: "Tech Hub",
        roomNumber: "202"
    },
    {
        id: 5,
        date: "2025-02-15",
        startTime: "08:00",
        endTime: "16:00",
        role: "Front Desk",
        building: "Main Office",
        roomNumber: "101"
    },
    {
        id: 6,
        date: "2025-02-25",
        startTime: "13:00",
        endTime: "17:00",
        role: "Security",
        building: "Warehouse",
        roomNumber: "B2"
    },
    {
        id: 7,
        date: "2025-03-06",
        startTime: "09:00",
        endTime: "14:00",
        role: "Maintenance",
        building: "Engineering Block",
        roomNumber: "305"
    },
    {
        id: 8,
        date: "2025-03-07",
        startTime: "07:00",
        endTime: "11:00",
        role: "Customer Support",
        building: "Service Center",
        roomNumber: "A1"
    },
    {
        id: 9,
        date: "2025-03-07",
        startTime: "12:00",
        endTime: "16:00",
        role: "IT Support",
        building: "Tech Hub",
        roomNumber: "202"
    }
];