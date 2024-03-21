import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createAuthSlice, type AuthSlice } from './auth/auth.store'
import { createPostSlice, type PostsSlice } from './posts/posts.store'
import { createUiSlice, type UiSlice } from './ui/ui.store'

// export const useBoundStore = create<AuthSlice>()((...a) => ({
//   ...createAuthSlice(...a)
// }))

type Slices = AuthSlice & PostsSlice & UiSlice

export const useBoundStore = create<Slices>()(
  devtools(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createPostSlice(...a),
      ...createUiSlice(...a)
    })
  )
)
