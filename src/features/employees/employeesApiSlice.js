import { apiSlice } from "../api/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => 'employee/',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetEmployeesQuery
} = employeeApiSlice