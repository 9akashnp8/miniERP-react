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
        })
    })
})

export const {
    useGetLaptopsQuery,
    useGetLaptopDetailQuery,
} = laptopApiSlice