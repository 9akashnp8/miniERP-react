import { apiSlice } from "../api/apiSlice";

export const branchApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBranches: builder.query({
            query: () => `location/`
        })
    })
})

export const {
    useGetBranchesQuery
} = branchApiSlice