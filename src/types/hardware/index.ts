
export interface HardwareAssignment {
    id: number;
    assignment_id: string;
    assignment_date: string | null;
    returned_date: string | null;
    created_date: string;
    modified_date: string | null;
    hardware: {
        uuid: string;
        hardware_id: string;
        serial_no: string;
        type: string;
    };
    employee: {
        emp_id: string;
        lk_emp_id: string
    }
}
