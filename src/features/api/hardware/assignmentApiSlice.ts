import { apiSlice } from "../apiSlice";
import { HardwareAssignment } from "../../../types/hardware";
import { HardwareAssignmentAPIRes } from "../../../types/common/api";

export const assignmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHardwaresAssigned: builder.query<HardwareAssignmentAPIRes, string | undefined>({
            query: (employeeId) => `hardware-assignment/?employee=${employeeId}&is_assigned=True`,
            providesTags: [{type: 'HardwareAssignment', id: 'List'}]
        }),
        getEmployeesAssigned: builder.query<HardwareAssignment, string | undefined>({
            query: (hardwareUuid) => `hardware-assignment/?hardware=${hardwareUuid}`,
            providesTags: [{type: 'HardwareAssignment', id: 'List'}],
            transformResponse: (response: any) => {
                const currentlyAssignedEmployee = response.results.filter((item: any) => item.returned_date === null)
                return currentlyAssignedEmployee[0] ?? {}
            }
        }),
        assignHardware: builder.mutation<any, any>({
            query: (payload) => ({
                url: 'hardware-assignment/',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: [{type: 'HardwareAssignment', id: 'List'}, 'Hardware']
        }),
        returnHardware: builder.mutation<any, any>({
            query: (args) => ({
                url: `hardware-assignment/${args.id}/`,
                method: 'PATCH',
                body: args.payload,
            }),
            invalidatesTags: [{type: 'HardwareAssignment', id: 'List'}, 'Hardware']
        }),
    })
})

export const {
    useGetHardwaresAssignedQuery,
    useGetEmployeesAssignedQuery,
    useAssignHardwareMutation,
    useReturnHardwareMutation
} = assignmentApiSlice
