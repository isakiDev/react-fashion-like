import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Toaster } from 'sonner'

import { router } from './router/router'
import { postsRouterAutenticated } from './posts'
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
    ? user?.roles?.includes(Roles.ADMIN)
      ? adminRouter
      : postsRouterAutenticated
    : router

  return (
    <>
      <Toaster
        closeButton
        position='top-right'
      />
      <RouterProvider router={createBrowserRouter(checkRouter)}/>
    </>
  )
}

export default App
