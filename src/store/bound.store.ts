import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createAuthSlice, type AuthSlice } from './auth/auth.store'
import { createPostSlice, type PostsSlice } from './posts/posts.store'

// export const useBoundStore = create<AuthSlice>()((...a) => ({
//   ...createAuthSlice(...a)
// }))

export const useBoundStore = create<AuthSlice & PostsSlice>()(
  devtools(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createPostSlice(...a)
    })
  )
)
