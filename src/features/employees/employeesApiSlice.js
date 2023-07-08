import { apiSlice } from "../api/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: (args) => {
                const {page, employeeSearch} = args
                return {
                    url: `employee/?page=${page}&emp_name=${employeeSearch}`
                }
            },
        }),
        getEmployeeDetail: builder.query({
            query: (args) => {
                const { id } = args
                return {
                    url: `employee/${id}/`
                }
            }
        }),
        createNewEmployee: builder.mutation({
            query: (payload) => ({
                url: 'employee/',
                method: 'POST',
                body: payload
            })
        }),
        getEmployeeHistory: builder.query({
            query: (args) => {
                const { id } = args
                return {
                    url: `employee/${id}/history/`
                }
            }
        }),
    })
})

export const {
    useGetEmployeesQuery,
    useGetEmployeeDetailQuery,
    useCreateNewEmployeeMutation,
    useGetEmployeeHistoryQuery,
} = employeeApiSlice