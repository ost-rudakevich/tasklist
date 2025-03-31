import { api } from '../api'
import { ILoginDto, IRegisterDto } from './auth.service.interface'
import { IAuthResponse } from '../../types/auth.types'
import { saveToStorage } from './auth.helper'

const transformResponse = (response: IAuthResponse) => {
  saveToStorage(response)

  return response
}

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<IAuthResponse, ILoginDto>({
      query: userData => ({
        url: `/login`,
        method: 'POST',
        credentials: 'include',
        body: userData
      }),
      invalidatesTags: ['Auth', 'Task'],
      transformResponse: transformResponse
    }),
    register: build.mutation<IAuthResponse, IRegisterDto>({
      query: userData => ({
        url: `/register`,
        method: 'POST',
        credentials: 'include',
        body: userData
      }),
      invalidatesTags: ['Auth', 'Task'],
      transformResponse: transformResponse
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/logout`,
        method: 'GET',
        credentials: 'include'
      }),
      invalidatesTags: ['Auth', 'Task']
    })
  })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi
