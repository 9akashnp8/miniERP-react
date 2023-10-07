import { apiSlice } from "../api/apiSlice";
import { DepartmentAPIResponse } from "../../types/employee";

export const departmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDepartments: builder.query<DepartmentAPIResponse, void>({ // TODO: change this
            query: () => 'department/',
        }),
        createDepartment: builder.mutation({
            query: (payload) => ({
                url: 'department/',
                method: 'POST',
                body: payload
            })
        }),
    })
})

export const {
    useGetDepartmentsQuery,
    useCreateDepartmentMutation,
} = departmentApiSlice