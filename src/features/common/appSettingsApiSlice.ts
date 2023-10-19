import { apiSlice } from "../api/apiSlice";

export const appSettingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployeeAppSettings: builder.query<any, void>({
            query: () => 'employee-app-settings/',
            providesTags: [{ type: 'Employee', id: 'AppSettings'}]
        }),
        updateEmployeeSettings: builder.mutation({
            query: (payload) => ({
                url: 'employee-app-settings/',
                method: 'PATCH',
                body: payload
            }),
            invalidatesTags: [{ type: 'Employee', id: 'AppSettings'}]
        }),
        getHardwareAppSettings: builder.query<any, void>({
            query: () => 'hardware-app-settings/',
            providesTags: [{ type: 'Laptop', id: 'AppSettings'}]
        }),
        updateHardwareSettings: builder.mutation({
            query: (payload) => ({
                url: 'hardware-app-settings/',
                method: 'PATCH',
                body: payload
            }),
            invalidatesTags: [{ type: 'Laptop', id: 'AppSettings'}]
        })
    })
});

export const {
    useGetEmployeeAppSettingsQuery,
    useUpdateEmployeeSettingsMutation,
    useGetHardwareAppSettingsQuery,
    useUpdateHardwareSettingsMutation,
} = appSettingApiSlice