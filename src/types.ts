// export interface User {
//   id: string
//   name: string
//   email: string
//   emailVerified: boolean
//   isActive: boolean
//   roles: string[]
//   image: string
//   createdAt: string
//   updatedAt: string
// }

export interface User {
  id: string
  name: string
}

// Login
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  id: string
  name: string
  email: string
  emailVerified: boolean
  isActive: boolean
  token: string
}

// error
// TODO: implement error
export interface ErrorResponse {
  message: string
  error: string | string[]
  statusCode: number
}

// token
export interface CheckAuthResponse {
  user: User
  token: string
}
