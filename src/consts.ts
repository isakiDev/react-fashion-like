import { HomeIcon, LogoutIcon, SettingsIcon } from './ui/components'
import { type LoginRequest } from './types'

export enum AUTH_STATUS {
  CHECKING = 'checking',
  NOT_AUTHEN = 'not_authenticated',
  AUTHENTICATED = 'authenticated'
}

export const LOGIN_INITIAL_VALUES: LoginRequest = {
  email: '',
  password: ''
}

export const SIDEBAR_LINKS = [
  { to: '/', icon: HomeIcon },
  { to: '/settings', icon: SettingsIcon },
  { to: '/auth/login', icon: LogoutIcon }
]
