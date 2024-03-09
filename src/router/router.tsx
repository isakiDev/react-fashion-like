import { type RouteObject } from 'react-router-dom'

import { authRouter } from '../auth'
import { postsRouter } from '../posts'
// import { Layout } from '../posts/layout/Layout'

export const router: RouteObject[] = [
  {
    path: 'auth/*',
    children: authRouter
  },
  {
    path: '/',
    children: postsRouter
  }
]
