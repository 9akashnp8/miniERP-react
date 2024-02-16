import { apiSlice } from "../apiSlice";
import {
    HardwareAPIRes,
    HardwareTypeAPIRes,
    HardwareOwnerAPIRes,
    HardwareConditionAPIRes
} from "../../../types/common/api";

export const assignmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAvailableHardware: builder.query<HardwareAPIRes, { type: string | null, page: number, search: string}>({
            query: (args) => {
                const { type, page, search } = args; 
                if (type) {
                    return `/hardware/?page=${page}&search=${search}&is_free=true&type=${args}`
                }
                return `/hardware/?page=${page}&search=${search}`
            },
            providesTags: ['Hardware'],
        }),
        getHardwareTypes: builder.query<HardwareTypeAPIRes, void>({
            query: () => '/hardware-type/',
        }),
        getHardwareOwners: builder.query<HardwareOwnerAPIRes, void>({
            query: () => '/hardware-owner/',
        }),
        getHardwareConditions: builder.query<HardwareConditionAPIRes, void>({
            query: () => '/hardware-condition/',
        }),
    })
})

export const {
    useGetAvailableHardwareQuery,
    useGetHardwareTypesQuery,
    useGetHardwareOwnersQuery,
    useGetHardwareConditionsQuery
} = assignmentApiSlice
