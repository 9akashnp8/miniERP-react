// TODO: check optional fields in BE Laptop Model
export interface Brand {
    id: number;
    brand_name: string;
}

interface Branch {
    location_id: number;
    location: string
}

export interface Building {
    id: number;
    building: string;
    location: Branch;
}

export interface Laptop {
    id: number;
    hardware_id: string;
    laptop_sr_no: string;
    processor: string;
    ram_capacity: string;
    storage_capacity: string;
    screen_size: string;
    screen_type: string;
    laptop_owner_type: string;
    laptop_rental_vendor: string;
    laptop_status: string;
    laptop_date_purchased: string;
    laptop_date_sold: string;
    laptop_date_created: string;
    laptop_date_returned: string;
    laptop_return_remarks: string;
    emp_id?: number;
    brand: Brand;
    laptop_branch: Branch;
    laptop_building: Building;
}
