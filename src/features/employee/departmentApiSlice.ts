import { apiSlice } from "../api/apiSlice";

import { DepartmentAPIResponse } from "../../types/common/api";

export const departmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDepartments: builder.query<DepartmentAPIResponse, void>({ // TODO: change this
            query: () => 'department/',
            providesTags: ['Department']
        }),
        createDepartment: builder.mutation({
            query: (payload) => ({
                url: 'department/',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Department']
        }),
    })
})

export const {
    useGetDepartmentsQuery,
    useCreateDepartmentMutation,
} = departmentApiSlice