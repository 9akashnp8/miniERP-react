import { apiSlice } from "../api/apiSlice";

export const laptopApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLaptops: builder.query({
            query: () => 'laptop/',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetLaptopsQuery
} = laptopApiSlice