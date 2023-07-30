import { apiSlice } from "../api/apiSlice";

export const buildingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBuildings: builder.query<any, void>({
            query: () => `building/`
        }),
    })
})

export const {
    useGetBuildingsQuery
} = buildingApiSlice