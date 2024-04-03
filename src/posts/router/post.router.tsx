import { type RouteObject, Navigate } from 'react-router-dom'

import { PostsPage, SettingsPage } from '..'
import { Layout } from '../layout/Layout'

export const postsRouterAutenticated: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PostsPage />
      },
      {
        path: '/settings',
        element: <SettingsPage/>
      },
      {
        path: '*',
        element: <Navigate to='/' />
      }
    ]
  }
]

export const postsRouter: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PostsPage />
      },
      {
        path: '*',
        element: <Navigate to='/' />
      }
    ]
  }
]
