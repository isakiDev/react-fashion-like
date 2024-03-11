import { type RouteObject, Navigate } from 'react-router-dom'

import { ConfirmUserPage, LoginPage, RegisterPage } from '..'

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
    path: 'confirm',
    element: <ConfirmUserPage/>
  },
  {
    path: '*',
    element: <Navigate to='/auth/login'/>
  }
]
