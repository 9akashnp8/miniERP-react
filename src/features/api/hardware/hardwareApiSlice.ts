import { apiSlice } from "../apiSlice";
import type { Hardware } from "../../../types/hardware";
import type {
    HardwareListAPIRes,
    HardwareTypeAPIRes,
    HardwareOwnerAPIRes,
    HardwareConditionAPIRes
} from "../../../types/common/api";

export const assignmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAvailableHardware: builder.query<HardwareListAPIRes, { type: string | null, page: number, search: string}>({
            query: (args) => {
                const { type, page, search } = args; 
                if (type) {
                    return `/hardware/?page=${page}&search=${search}&is_free=true&type=${type}`
                }
                return `/hardware/?page=${page}&search=${search}`
            },
            providesTags: ['Hardware'],
        }),
        getHardware: builder.query<Hardware, { hardwareUuid: string }>({
            query: (args) => {
                const { hardwareUuid } = args; 
                return `/hardware/${hardwareUuid}/`
            },
            providesTags: (_result, _error, args) => [{ type: 'LaptopDetail', id: args.hardwareUuid}],
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
    useGetHardwareQuery,
    useGetHardwareTypesQuery,
    useGetHardwareOwnersQuery,
    useGetHardwareConditionsQuery
} = assignmentApiSlice
