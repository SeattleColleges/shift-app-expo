export type Shift = {
    shift_id: number,
    assigned_user_id: number,
    department_id: number,
    supervisor_id: number,
    shift_name: string,
    slot: string,
    duration: number,
    needs_coverage: false,
    coverage_reason?: string,
    notes?: string,
    created_on: string
}