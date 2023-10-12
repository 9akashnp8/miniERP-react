import { apiSlice } from "../api/apiSlice";
import { LaptopBrandAPIResponse } from "../../types/common/api";

export const laptopBrandApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBrands: builder.query<LaptopBrandAPIResponse, void>({ // TODO: change this
            query: () => `laptop-brand/`,
            providesTags: [{type: 'LaptopBrand', id: 'List'}]
        }),
        createLaptopBrand: builder.mutation({
            query: (payload) => ({
                url: 'laptop-brand/',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: [{type: 'LaptopBrand', id: 'List'}]
        }),
    })
})

export const {
    useGetBrandsQuery,
    useCreateLaptopBrandMutation
} = laptopBrandApiSlice