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
        })
    })
})

export const {
    useGetLaptopsQuery,
    useGetLaptopDetailQuery,
    useGetLaptopHistoryQuery,
} = laptopApiSlice