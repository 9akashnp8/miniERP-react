import { apiSlice } from "../api/apiSlice";

export const laptopApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLaptops: builder.query({
            query: (args) => {
                const {page, laptopSearch, filterQuery} = args
                return {
                    url: `laptop/?page=${page}&search=${laptopSearch}&${filterQuery}`
                }
            },
            providesTags: ['Laptop']
        }),
        getLaptopDetail: builder.query({
            query: (args) => {
                const { id } = args
                return {
                    url: `laptop/${id}/`
                }
            }
        }),
        getLaptopHistory: builder.query({
            query: (args) => {
                const { id } = args
                return {
                    url: `laptop/${id}/history/`
                }
            }
        }),
        returnLaptop: builder.mutation({
            query: (payload) => ({
                url: `laptop/${payload.laptop_id}/return/`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: (result, error, args) => [{ type: 'Employee', id: args.employee_id}, 'Laptop']
        }),
        assignLaptop: builder.mutation({
            query: (payload) => ({
                url: `laptop/${payload.laptop_id}/assign/`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: (result, error, args) => [{ type: 'Employee', id: args.employee_id}, 'Laptop']
        }),
    })
})

export const {
    useGetLaptopsQuery,
    useGetLaptopDetailQuery,
    useGetLaptopHistoryQuery,
    useReturnLaptopMutation,
    useAssignLaptopMutation
} = laptopApiSlice