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
        })
    })
})

export const {
    useGetLaptopsQuery
} = laptopApiSlice