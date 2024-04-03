import { type RouteObject } from 'react-router-dom'

import { authRouter } from '../auth'
import { postsRouter } from '../posts'

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
