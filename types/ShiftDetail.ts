export type ShiftDetail = {
  id: number,
  assignedUser: number,
  departmentId: number,
  supervisorId: number,
  title: string,
  date: string,
  startTime: string,
  endTime: string,
  duration: number,
  needsCoverage: boolean,
  role: string,
  coverageReason?: string,
  notes?: string,
  createdOn: string,
  building?: string,
  roomNumber?: string
}