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
  email: string
  image: string
}

// Login
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

// error
export interface ErrorResponse {
  message: string | string[]
  error: string
  statusCode: number
}

// token
export interface CheckAuthResponse {
  user: User
  token: string
}

// posts
export interface PostsResponse {
  id: number
  title: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
  user: User
  comments: Comment[]
  likes: Like[]
}

export interface Comment {
  id: number
  comment: string
  user: User
}

export interface Like {
  id: number
  user: User
}

// commment
export interface CommentResponse {
  id: number
  comment: string
  user: User
}
