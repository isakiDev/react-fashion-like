export interface PostResponse {
  post: Post
  user: User
}

export interface Post {
  title: string
  description: string
  id?: number
  image?: string
  createdAt?: string
  updatedAt?: string
}

export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  isActive: boolean
  roles: string[]
  image: string
  createdAt: string
  updatedAt: string
}
