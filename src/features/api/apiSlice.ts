import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../auth/authSlice';
import { RootState } from '../../types/common/RootState';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any ) => { // TODO: change this
        const token = getState().auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

async function baseQueryWithReauth(args: any, api: any, extraOptions: any) { // TODO: change type
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        const argsX = {url: 'token/refresh/', method: 'POST'}
        const refreshResult = await baseQuery(argsX, api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})