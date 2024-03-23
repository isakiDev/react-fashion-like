import { type StateCreator } from 'zustand'

import { AUTH_STATUS } from '../../consts'
import { type User } from '../../types'

export interface AuthSlice {
  status: AUTH_STATUS
  user: User | null
  errorMessage: string | null

  onChecking: () => void
  onLogin: (user: User) => void
  onLogout: (error: AuthSlice['errorMessage']) => void
  onUpdate: (user: User) => void

  // ?
  // clearErrorMessage: () => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  status: AUTH_STATUS.CHECKING,
  user: null,
  errorMessage: null,

  onChecking: () => {
    set({
      status: AUTH_STATUS.CHECKING,
      user: null,
      errorMessage: null
    })
  },

  onLogin: (user) => {
    set({
      status: AUTH_STATUS.AUTHENTICATED,
      user,
      errorMessage: null
    })
  },

  onLogout: (error: AuthSlice['errorMessage']) => {
    set({
      status: AUTH_STATUS.NOT_AUTHEN,
      user: null,
      errorMessage: error
    })
  },

  onUpdate: (user) => {
    set({
      user
    })
  }
})
