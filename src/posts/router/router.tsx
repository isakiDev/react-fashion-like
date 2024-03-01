import { type RouteObject, Navigate } from 'react-router-dom'

import { PostsPage } from '..'

export const postsRouter: RouteObject[] = [
  {
    path: '/',
    element: <PostsPage/>
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]
