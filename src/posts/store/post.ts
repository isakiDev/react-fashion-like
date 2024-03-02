import { create } from 'zustand'

import { type Post, type PostResponse } from '../types'

interface State {
  posts: PostResponse[]
  fetchPosts: () => Promise<void>
  createPost: (post: Post) => Promise<void>
}

export const usePostStore = create<State>((set) => {
  return {
    posts: [],

    fetchPosts: async () => {
      const resp = await fetch('http://localhost:4001/api/post', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await resp.json()

      set({ posts: data })
    },

    createPost: async (post: Post) => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0YzY1ZjdjLWY0ZDYtNDJlNC1hYWI1LWRkMzRlZjViMTNiZCIsImlhdCI6MTcwOTM3MDI0NywiZXhwIjoxNzA5MzczODQ3fQ.wF9dNeN2Vzi6qx2yh32iN0g9yZi2qCHKz_27Q0lzHdg'

      const resp = await fetch('http://localhost:4001/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(post)
      })

      const data = await resp.json()

      set({ posts: data })
    }
  }
})
