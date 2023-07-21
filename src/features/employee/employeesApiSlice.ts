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
            providesTags: ['Employee']
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
        updateEmployee: builder.mutation({
            query: (args) => ({
                url: `employee/${args.id}/`,
                method: 'PATCH',
                body: args.payload
            }),
            invalidatesTags: ['Employee']
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employee/${id}/`,
                method: 'DELETE',
            }),
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
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    useGetEmployeeHistoryQuery,
} = employeeApiSlice