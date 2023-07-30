import { apiSlice } from "../api/apiSlice";

export const laptopBrandApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBrands: builder.query<any, void>({ // TODO: change this
            query: () => `laptop-brand/`,
        }),
    })
})

export const {
    useGetBrandsQuery
} = laptopBrandApiSlice