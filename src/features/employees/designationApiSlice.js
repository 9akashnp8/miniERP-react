import { apiSlice } from "../api/apiSlice";

export const designationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDesignations: builder.query({
            query: ({deptId}) => `designation/?dept_id=${deptId}`
        })
    })
})

export const {
    useGetDesignationsQuery
} = designationApiSlice