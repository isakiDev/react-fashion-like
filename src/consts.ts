import { HomeIcon, LogoutIcon, SettingsIcon } from './ui'

export enum AUTH_STATUS {
  CHECKING = 'checking',
  NOT_AUTHEN = 'not_authenticated',
  AUTHENTICATED = 'authenticated'
}

export const LOGIN_INITIAL_VALUES = {
  email: 'ledoh31398@eryod.com',
  password: 'qqqqq'
}

export const REGISTER_INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const SETTINGS_PERSONAL_INFORMATION = {
  name: ''
}
export const SETTINGS_CHANGE_PASSWORD = {
  currentPassword: '',
  newPassword: ''
}

export const SIDEBAR_LINKS = [
  { href: '/', icon: HomeIcon },
  { href: '/settings', icon: SettingsIcon },
  { href: '/auth/login', icon: LogoutIcon }
]
