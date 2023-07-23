import { apiSlice } from "../api/apiSlice";

export const laptopApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLaptops: builder.query({
            query: (args) => {
                const {page, laptopSearch} = args
                return {
                    url: `laptop/?page=${page}&search=${laptopSearch}`
                }
            },
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
            invalidatesTags: (result, error, args) => [{ type: 'Employee', id: args.employee_id}]
        }),
        assignLaptop: builder.mutation({
            query: (payload) => ({
                url: `laptop/${payload.laptop_id}/assign/`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: (result, error, args) => [{ type: 'Employee', id: args.employee_id}]
        }),
    })
})

export const {
    useGetLaptopsQuery,
    useGetLaptopDetailQuery,
    useGetLaptopHistoryQuery,
    useReturnLaptopMutation,
} = laptopApiSlice