import { type CheckAuthResponse, type LoginRequest, type LoginResponse } from '../../types'

const API_URL = import.meta.env.VITE_API_URL

export const login = async (values: LoginRequest): Promise<LoginResponse> => {
  const resp = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })

  if (!resp.ok) throw new Error('Error in Login')

  const data = await resp.json() as LoginResponse

  return data
}

export const checkAuthStatus = async (token: string): Promise<CheckAuthResponse> => {
  const resp = await fetch(`${API_URL}/auth/check-auth-status`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (!resp.ok) throw new Error('Error in check token')

  const data = await resp.json() as CheckAuthResponse

  return data
}
