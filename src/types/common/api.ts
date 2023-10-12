import { Department, Designation, Location } from "../employee"

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