import { apiSlice } from "../api/apiSlice";

import { DesignationAPIResponse } from "../../types/common/api";

export const designationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDesignations: builder.query<DesignationAPIResponse, string>({
            query: (deptId) => `designation/?dept_id=${deptId}`,
            providesTags: ['Designation']
        }),
        createDesignation: builder.mutation({
            query: (payload) => ({
                url: 'designation/',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Designation']
        }),
    })
})

export const {
    useGetDesignationsQuery,
    useCreateDesignationMutation
} = designationApiSlice