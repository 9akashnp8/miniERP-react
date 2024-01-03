
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
        type: {
            id: number;
            name: string;
        };
    };
    employee: {
        emp_id: string;
        lk_emp_id: string
    }
}

export interface Hardware {
    uuid: string;
    hardware_id: string;
    serial_no: string;
    purchased_date: string;
    sold_date: string | null;
    created_date: string;
    modified_date: string;
    type: {
        id: number;
        name: string;
    };
    owner: {
        id: number;
        name: string;
    };
    condition: {
        id: number;
        condition: string;
    };
    location: {
        location_id: number;
        location: string;
    };
    building: {
        id: number;
        building: string;
        location: number
    }

}
