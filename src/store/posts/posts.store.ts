import { type StateCreator } from 'zustand'

import type { User, PostsResponse } from '../../types'

export interface PostsSlice {
  posts: PostsResponse[]

  addPosts: (posts: PostsResponse[]) => void
  addComment: (user: User, postId: number, commentId: number, comment: string) => void
  toggleLike: (user: User, postId: number, likeId?: number | undefined) => void
}

export const createPostSlice: StateCreator<PostsSlice> = (set) => ({
  posts: [],

  addPosts: (posts: PostsResponse[]) => {
    set({ posts })
  },

  // TODO: think about separate in another slices
  addComment: (user: User, postId: number, commentId: number, comment: string) => {
    const newComment = { id: commentId, comment, user }

    set(state => ({
      ...state,
      posts: state.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          }
        }
        return post
      })
    }))
  },

  toggleLike: (user: User, postId: number, likeId?: number | undefined) => {
    set(state => ({
      ...state,
      posts: state.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: !likeId ? post.likes.filter(like => like.user.id !== user.id) : [...post.likes, { id: likeId, user }]
          }
        }
        return post
      })
    }))
  }
})
