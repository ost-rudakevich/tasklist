import { getAccessToken, removeFromStorage } from '../services/auth/auth.helper'
import { useAppSelector } from './state-hooks'

export const useAuth = () => {
  const accessToken = getAccessToken()
  const user = useAppSelector(state => state.userSlice.user)

  if (accessToken !== null && user) {
    return user
  }

  removeFromStorage()
  return null
}
