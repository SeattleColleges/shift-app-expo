export type Coworker = {
    id: number,
    name: string,
    role?: string | undefined
    profileImageUrl?: string | undefined | null,
    position_id?: number | undefined,
    department_id?: number | undefined,
}