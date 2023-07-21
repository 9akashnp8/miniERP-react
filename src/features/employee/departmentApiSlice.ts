import { apiSlice } from "../api/apiSlice";

export const departmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDepartments: builder.query<any, void>({ // TODO: change this
            query: () => 'department/'
        })
    })
})

export const {
    useGetDepartmentsQuery
} = departmentApiSlice