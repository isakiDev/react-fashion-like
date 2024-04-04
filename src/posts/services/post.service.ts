import type { PostsResponse, ErrorResponse, CommentResponse, TypeReaction, ReactionResponse, UpdatePostResponse } from '../../types'

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

export const createPost = async (token: string, payload: FormData) => {
  const resp = await fetch(`${API_URL}/post`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: payload
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  const data = await resp.json() as PostsResponse

  return data
}

export const deletePost = async (token: string, postId: number) => {
  const resp = await fetch(`${API_URL}/post/${postId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  return true
}

export const updatePost = async (token: string, postId: number, description: string) => {
  const resp = await fetch(`${API_URL}/post/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ description })
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  const data = await resp.json() as UpdatePostResponse

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

// reactions
export const handlePostReaction = async (postId: number, token: string, type: TypeReaction) => {
  const resp = await fetch(`${API_URL}/reaction/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ type })
  })

  if (!resp.ok) {
    const data = await resp.json() as ErrorResponse
    handleErrorExepcion(data)
  }

  return await resp.json() as ReactionResponse | undefined
}

const handleErrorExepcion = (error: ErrorResponse) => {
  const errorMessages = error.message ?? 'Error in fetch'

  const errors = Array.isArray(errorMessages)
    ? errorMessages.map(error => error).join('')
    : errorMessages

  throw new Error(errors)
}
