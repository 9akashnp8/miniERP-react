import { apiSlice } from "../api/apiSlice";
import { BuildingAPIResponse } from "../../types/common/api";

export const buildingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBuildings: builder.query<BuildingAPIResponse, void>({
            query: () => `building/`,
            providesTags: [{ type: 'Building', id: 'List' }]
        }),
        createBuilding: builder.mutation({
            query: (payload) => ({
                url: 'building/',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: [{ type: 'Building', id: 'List' }]
        }),
    })
})

export const {
    useGetBuildingsQuery,
    useCreateBuildingMutation,
} = buildingApiSlice