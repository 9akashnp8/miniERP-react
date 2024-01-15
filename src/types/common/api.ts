import { Department, Designation, Location, User } from "../employee"
import { Brand, Building } from "../laptop"
import { HardwareAssignment, Hardware } from "../hardware"

export interface BaseAPIResponse {
    count: number,
    next: string,
    previous: string,
}

export interface DepartmentAPIResponse extends BaseAPIResponse {
    results: Department[]
}

export interface DesignationAPIResponse extends BaseAPIResponse {
    results: Designation[]
}

export interface LocationAPIResponse extends BaseAPIResponse {
    results: Location[]
}

export interface LaptopBrandAPIResponse extends BaseAPIResponse {
    results: Brand[]
}

export interface UserAPIResponse extends BaseAPIResponse {
    results: User[]
}

export interface BuildingAPIResponse extends BaseAPIResponse {
    results: Building[]
}

export interface HardwareAssignmentAPIRes extends BaseAPIResponse {
    results: HardwareAssignment[]
}

export interface HardwareAPIRes extends BaseAPIResponse {
    results: Hardware[]
}
