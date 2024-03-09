import type { PostsResponse, ErrorResponse, CommentResponse } from '../../types'

const API_URL = import.meta.env.VITE_API_URL

export const getAllPosts = async () => {
  const resp = await fetch(`${API_URL}/post`, {
    headers: { 'Content-Type': 'application/json' }
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  const data = await resp.json() as PostsResponse[]

  return data
}

// comments
export const addCommentPost = async (postId: number, comment: string, token: string) => {
  const resp = await fetch(`${API_URL}/comment/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ comment })
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  const data = await resp.json() as CommentResponse

  return data
}

export const toggleLikePost = async (postId: number, token: string) => {
  const resp = await fetch(`${API_URL}/like/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  return await resp.json()
}

const handleErrorExepcion = (error: ErrorResponse) => {
  const errorMessages = error.message ?? 'Error in fetch'

  const errors = Array.isArray(errorMessages)
    ? errorMessages.map(error => error).join('')
    : errorMessages

  throw new Error(errors)
}