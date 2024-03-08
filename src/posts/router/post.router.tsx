import { type RouteObject, Navigate } from 'react-router-dom'

import { PostsPage } from '..'
import { Layout } from '../layout/Layout'

export const postsRouter: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PostsPage />
      },
      {
        path: '*',
        element: <Navigate to='/' />
      }
    ]
  }

]
