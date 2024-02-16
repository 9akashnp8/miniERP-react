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
            },
            providesTags: (result, error, args) => [{ type: 'LaptopDetail', id: args.id}]
        }),
        createNewLaptop: builder.mutation({
            query: (payload) => ({
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json; version=2'
                },
                url: 'laptop/',
                method: 'POST',
                body: payload
            })
        }),
        updateLaptop: builder.mutation({
            query: (args) => ({
                url: `laptop/${args.id}/`,
                method: 'PATCH',
                body: args.payload
            }),
            invalidatesTags: (result, error, args) => ['Laptop', { type: 'LaptopDetail', id: args.id}]
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
            invalidatesTags: (result, error, args) => [{ type: 'Employee', id: args.employee_id}, 'Employee', 'Laptop']
        }),
        assignLaptop: builder.mutation({
            query: (payload) => ({
                url: `laptop/${payload.laptop_id}/assign/`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: (result, error, args) => [{ type: 'Employee', id: args.employee_id}, 'Employee',  'Laptop']
        }),
        getLaptopScreenTypes: builder.query<any, void>({
            query: () => `laptop-screen-types/`
        }),
        getLaptopOwnerTypes: builder.query<any, void>({
            query: () => `laptop-owner-types/`
        }),
        getLaptopStatuses: builder.query<any, void>({
            query: () => `laptop-statuses/`
        }),
        getLaptopScreenSizes: builder.query<any, void>({
            query: () => `laptop-screen-sizes/`
        }),
    })
})

export const {
    useGetLaptopsQuery,
    useGetLaptopDetailQuery,
    useCreateNewLaptopMutation,
    useUpdateLaptopMutation,
    useGetLaptopHistoryQuery,
    useReturnLaptopMutation,
    useAssignLaptopMutation,
    useGetLaptopScreenTypesQuery,
    useGetLaptopOwnerTypesQuery,
    useGetLaptopStatusesQuery,
    useGetLaptopScreenSizesQuery,
} = laptopApiSlice