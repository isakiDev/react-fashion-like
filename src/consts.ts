import { HomeIcon, LogoutIcon, SettingsIcon } from './ui/components'
// import { type LoginRequest } from './types'

export enum AUTH_STATUS {
  CHECKING = 'checking',
  NOT_AUTHEN = 'not_authenticated',
  AUTHENTICATED = 'authenticated'
}

export const LOGIN_INITIAL_VALUES = {
  email: '',
  password: ''
}

export const REGISTER_INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const SETTINGS_INITIAL_VALUES = {
  name: '',
  password: ''
}

export const SIDEBAR_LINKS = [
  { href: '/', icon: HomeIcon },
  { href: '/settings', icon: SettingsIcon },
  { href: '/auth/login', icon: LogoutIcon }
]
