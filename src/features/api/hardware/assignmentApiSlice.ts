import { apiSlice } from "../apiSlice";
import { HardwareAssignmentAPIRes } from "../../../types/common/api";

export const assignmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHardwaresAssigned: builder.query<HardwareAssignmentAPIRes, string | undefined>({
            query: (employeeId) => `hardware-assignment/?employee=${employeeId}&is_assigned=True`,
            providesTags: [{type: 'HardwareAssignment', id: 'List'}]
        }),
        returnHardware: builder.mutation<any, any>({
            query: (args) => ({
                url: `hardware-assignment/${args.id}/`,
                method: 'PATCH',
                body: args.payload,
            }),
            invalidatesTags: [{type: 'HardwareAssignment', id: 'List'}]
        }),
    })
})

export const {
    useGetHardwaresAssignedQuery,
    useReturnHardwareMutation
} = assignmentApiSlice
