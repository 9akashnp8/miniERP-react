import { apiSlice } from "../api/apiSlice";
import { LocationAPIResponse } from "../../types/common/api";


export const branchApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBranches: builder.query<LocationAPIResponse, void>({ // TODO: change this
            query: () => `location/`,
            providesTags: [{type: 'Branch', id: 'List'}]
        }),
        createBranch: builder.mutation({
            query: (payload) => ({
                url: 'location/',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: [{type: 'Branch', id: 'List'}]
        }),
    })
})

export const {
    useGetBranchesQuery,
    useCreateBranchMutation
} = branchApiSlice