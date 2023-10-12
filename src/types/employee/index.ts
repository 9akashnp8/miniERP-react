import { Laptop } from "../laptop";

export interface Department {
    department_id: number;
    dept_name: string;
}

export interface Designation {
    designation_id: number;
    designation: string;
    dept_id: Department
}

export interface Location {
    location_id: number;
    location: string;
}

export interface Employee {
    emp_id: string;
    laptops: Laptop[];
    lk_emp_id: string;
    emp_name: string;
    emp_email: string;
    emp_phone: string;
    emp_status: string;
    emp_date_joined: string;
    emp_date_exited: string;
    emp_date_created: string;
    is_assigned: boolean;
    dept_id: Department;
    desig_id: Designation;
    loc_id: Location;
}

export interface User {
    first_name: string,
    last_name: string,
    username: string,
    email: string
}
