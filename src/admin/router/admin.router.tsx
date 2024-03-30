import { type RouteObject, Navigate } from 'react-router-dom'

import { AdminLayout, AdminPostsPage, HomePage } from '..'

export const adminRouter: RouteObject[] = [
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: '/posts',
        element: <AdminPostsPage/>
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/'/>
  }
]
