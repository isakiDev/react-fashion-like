import { type StateCreator } from 'zustand'

import type { User, PostsResponse, ReactionResponse } from '../../types'

export interface PostsSlice {
  posts: PostsResponse[]

  addPosts: (posts: PostsResponse[]) => void
  addPost: (post: PostsResponse) => void

  addComment: (user: User, postId: number, commentId: number, comment: string) => void
  setReaction: (user: User, postId: number, reaction?: ReactionResponse) => void
}

export const createPostSlice: StateCreator<PostsSlice> = (set, get) => ({
  posts: [],

  addPosts: (posts: PostsResponse[]) => {
    set({ posts })
  },

  addPost: (post: PostsResponse) => {
    set(state => ({
      ...state,
      posts: [...state.posts, { ...post }]
    }))
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

  setReaction: (user: User, postId: number, reaction?: ReactionResponse) => {
    set(state => ({
      ...state,
      posts: state.posts.map(post => {
        if (post.id === postId) {
          const existingReactionIndex = post.reactions.findIndex(react => react.user.id === user.id)

          if (!reaction) {
            // Si la reacción es undefined, eliminamos la reacción del usuario
            if (existingReactionIndex !== -1) {
              post.reactions.splice(existingReactionIndex, 1)
            }
          } else {
            if (existingReactionIndex === -1) {
              // Si no hay una reacción existente para este usuario, agregamos la nueva
              post.reactions.push({
                id: reaction.id,
                type: reaction.type,
                user
              })
            } else if (post.reactions[existingReactionIndex].type !== reaction.type) {
              // Si la reacción es diferente a la actual, actualizamos su tipo
              post.reactions[existingReactionIndex].type = reaction.type
            }
          }
        }
        return post
      })
    }))
  }
})
