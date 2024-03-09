import { login, checkAuthStatus } from '..'
import { useBoundStore } from '../../store/bound.store'
import { type LoginRequest } from '../../types'

export const useAuth = () => {
  const userStatus = useBoundStore(state => state.status)
  const onChecking = useBoundStore(state => state.onChecking)
  const onLogin = useBoundStore(state => state.onLogin)
  const onLogout = useBoundStore(state => state.onLogout)
  const user = useBoundStore(state => state.user)

  const onLoginUser = async (data: LoginRequest): Promise<void> => {
    onChecking()

    try {
      const { token, user } = await login(data)

      window.localStorage.setItem('TOKEN', token)
      onLogin(user)
    } catch (error) {
      onLogout(null)
      throw error
    }
  }

  const onLogoutUser = () => {
    window.localStorage.removeItem('TOKEN')
    onLogout(null)
  }

  const onCheckAuthToken = async () => {
    const token = window.localStorage.getItem('TOKEN')
    if (!token) return onLogout(null)

    try {
      const data = await checkAuthStatus(token)

      window.localStorage.setItem('TOKEN', data.token)
      onLogin(data.user)
    } catch (error) {
      onLogout(null)
    }
  }

  return {
    user,
    userStatus,

    onLoginUser,
    onLogoutUser,
    onCheckAuthToken
  }
}
