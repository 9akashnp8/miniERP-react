import { Department, Designation, Location, User } from "../employee"
import { Brand } from "../laptop"

export interface BaseAPIResponse {
    count: string,
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