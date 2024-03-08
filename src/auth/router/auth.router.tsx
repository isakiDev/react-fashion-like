import { type RouteObject, Navigate } from 'react-router-dom'

import { LoginPage, RegisterPage } from '..'

export const authRouter: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage/>
  },
  {
    path: 'register',
    element: <RegisterPage/>
  },
  {
    path: '*',
    element: <Navigate to='/auth/login'/>
  }
]
