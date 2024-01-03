import { apiSlice } from "../apiSlice";
import { HardwareAPIRes } from "../../../types/common/api";

export const assignmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAvailableHardware: builder.query<HardwareAPIRes, string | undefined>({
            query: (hardwareType) => `/hardware/?is_free=true&type=${hardwareType}`,
        }),
    })
})

export const {
    useGetAvailableHardwareQuery
} = assignmentApiSlice
