export const mockCurrentUser = {
    id: 1,
    positionId: 1,
    departmentId: 1
}

export const setMockCurrentUser = (id: number, posId: number, deptId: number)=> {
    mockCurrentUser.id = id;
    mockCurrentUser.positionId = posId;
    mockCurrentUser.departmentId = deptId;
}