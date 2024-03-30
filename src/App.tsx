import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Toaster } from 'sonner'

import { router } from './router/router'
import { postsRouter } from './posts'
import { AUTH_STATUS } from './consts'
import { useAuth } from './auth'
import { Spinner } from './ui'
import { Roles } from './types'
import { adminRouter } from './admin'

export const App = () => {
  const { userStatus, onCheckAuthToken, user } = useAuth()

  useEffect(() => {
    onCheckAuthToken()
  }, [])

  if (userStatus === AUTH_STATUS.CHECKING) {
    return <Spinner/>
  }

  const checkRouter = userStatus === AUTH_STATUS.AUTHENTICATED
    ? user?.roles.includes(Roles.ADMIN)
      ? createBrowserRouter(adminRouter)
      : createBrowserRouter(postsRouter)
    : createBrowserRouter(router)

  return (
    <>
      <Toaster/>
      <RouterProvider router={checkRouter}/>
    </>
  )
}

export default App
