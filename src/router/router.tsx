import { createBrowserRouter } from 'react-router-dom'

import { authRouter } from '../auth'
import { postsRouter } from '../posts'
import { Layout } from '../posts/layout/Layout'

export const router = createBrowserRouter([
  {
    path: 'auth/*',
    children: authRouter
  },
  {
    element: <Layout/>,
    path: '/',
    children: postsRouter
  }
])
