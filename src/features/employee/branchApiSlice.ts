import { apiSlice } from "../api/apiSlice";

export const branchApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBranches: builder.query<any, void>({ // TODO: change this
            query: () => `location/`
        })
    })
})

export const {
    useGetBranchesQuery
} = branchApiSlice