import { apiSlice } from "../api/apiSlice";
import { UserAPIResponse } from "../../types/common/api";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<UserAPIResponse, void>({
            query: () => 'user/',
            providesTags: [{type: 'User', id: 'List'}]
        }),
        createUser: builder.mutation({
            query: (payload) => ({
                url: 'user/',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: [{type: 'User', id: 'List'}]
        }),
    })
})

export const {
    useGetUsersQuery,
    useCreateUserMutation
} = userApiSlice
