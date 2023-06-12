import { apiSlice } from "../api/apiSlice";

export const departmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDepartments: builder.query({
            query: () => 'department/'
        })
    })
})

export const {
    useGetDepartmentsQuery
} = departmentApiSlice