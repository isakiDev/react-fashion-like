import { create } from 'zustand'

import { createAuthSlice, type AuthSlice } from './auth/auth.store'
import { devtools } from 'zustand/middleware'

// export const useBoundStore = create<AuthSlice>()((...a) => ({
//   ...createAuthSlice(...a)
// }))

export const useBoundStore = create<AuthSlice>()(
  devtools(
    (...a) => ({
      ...createAuthSlice(...a)
    })
  )
)
