import { login, checkAuthStatus } from '..'
import { useBoundStore } from '../../store/bound.store'
import { type LoginRequest } from '../../types'

export const useAuth = () => {
  const userStatus = useBoundStore(state => state.status)
  const onChecking = useBoundStore(state => state.onChecking)
  const onLogin = useBoundStore(state => state.onLogin)
  const onLogout = useBoundStore(state => state.onLogout)
  // const onLogout = useBoundStore(state => state.onLogout)

  const onLoginUser = async (data: LoginRequest): Promise<void> => {
    onChecking()

    try {
      const { token, ...user } = await login(data)

      window.localStorage.setItem('TOKEN', token)
      onLogin({ id: user.id, name: user.name })
    } catch (error) {
      onLogout(null)
    }
  }

  const checkAuthToken = async () => {
    const token = window.localStorage.getItem('TOKEN') ?? ''

    try {
      if (!token) return onLogout(null)

      const data = await checkAuthStatus(token)
      const { id, name } = data.user

      window.localStorage.setItem('TOKEN', data.token)
      onLogin({ id, name })
    } catch (error) {
      onLogout(null)
    }
  }

  return {
    userStatus,

    onLoginUser,
    checkAuthToken
  }
}
