import Cookies from 'js-cookie'
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_SERVER_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const token = Cookies.get('accessToken')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    headers.set('Accept', 'application/json')

    return headers
  }
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 })

export const api = createApi({
  reducerPath: 'splitApi',
  tagTypes: ['Auth', 'Task'],
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: false,
  keepUnusedDataFor: 300,
  endpoints: () => ({})
})
