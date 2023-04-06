import { apiSlice } from "../api/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: (page = 1) => `employee/?page=${page}`,
        })
    })
})

export const {
    useGetEmployeesQuery
} = employeeApiSlice