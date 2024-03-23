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

// Register
export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  user: User
  token: string
}

// Update
export interface UpdateRequest {
  name?: string
  currentPassword?: string
  newPassword?: string
}

export interface UpdateResponse extends User {}

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

// export interface PostRequest {
//   description: string
//   file: File
// }

// comments
export interface Comment {
  id: number
  comment: string
  user: User
}

export interface CommentResponse {
  id: number
  comment: string
  user: User
}

// likes
export interface Like {
  id: number
  user: User
}
