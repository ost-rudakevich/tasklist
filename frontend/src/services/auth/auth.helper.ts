import Cookies from 'js-cookie'
import { IAuthResponse, IToken } from '../../types/auth.types'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken'
}

export enum EnumStorage {
  'USER' = 'user'
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken ? accessToken : null
}

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokensStorage = (data: IToken) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, data.token)
}

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
  localStorage.removeItem('user')
  localStorage.removeItem('persist:root')
}

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data)
  localStorage.setItem('user', JSON.stringify(data.user))
}
