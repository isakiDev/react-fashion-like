import type { ErrorResponse, CheckAuthResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../types'

const API_URL = import.meta.env.VITE_API_URL

export const login = async (values: LoginRequest): Promise<LoginResponse> => {
  const resp = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  const data = await resp.json() as LoginResponse

  return data
}

export const register = async (values: RegisterRequest): Promise<RegisterResponse> => {
  const resp = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  const data = await resp.json() as RegisterResponse

  return data
}

export const checkAuthStatus = async (token: string): Promise<CheckAuthResponse> => {
  const resp = await fetch(`${API_URL}/auth/check-auth-status`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  const data = await resp.json() as CheckAuthResponse

  return data
}

export const verifyUserEmail = async (token: string) => {
  const resp = await fetch(`${API_URL}/auth/confirm?token=${token}`, {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${token}`,
    }
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  return true
}

const handleErrorExepcion = (error: ErrorResponse) => {
  const errorMessages = error.message ?? 'Error in fetch'

  const errors = Array.isArray(errorMessages)
    ? errorMessages.map(error => error).join('')
    : errorMessages

  throw new Error(errors)
}
