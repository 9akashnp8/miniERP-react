import { apiSlice } from "../api/apiSlice";

export const laptopApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLaptops: builder.query({
            query: (page = 1) => `laptop/?page=${page}`,
        })
    })
})

export const {
    useGetLaptopsQuery
} = laptopApiSlice