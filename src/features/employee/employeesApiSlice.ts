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
        getEmployeeDetail: builder.query({ // TODO: get employee laptops from separate api
            query: (args) => {
                const { id } = args
                return {
                    url: `employee/${id}/`
                }
            },
            providesTags: (result, error, args) =>
                result
                    ? [{type: 'Employee', id: result.emp_id}]
                    : ['Employee'] // TODO: provide tag based on id.
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
            invalidatesTags: (result, error, args) => [{ type: 'Employee', id: args.id}]
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