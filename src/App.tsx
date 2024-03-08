import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Toaster } from 'sonner'
import { router } from './router/router'

import { AUTH_STATUS } from './consts'

import { postsRouter } from './posts'
import { useAuth } from './auth'
import { useEffect } from 'react'
import { Spinner } from './ui/components'
// import { authRouter } from './auth'

export const App = () => {
  const { userStatus, checkAuthToken } = useAuth()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (userStatus === AUTH_STATUS.CHECKING) {
    return <Spinner/>
  }

  const checkRouter = userStatus === AUTH_STATUS.AUTHENTICATED
    ? createBrowserRouter(postsRouter)
    : router

  return (
    <>
      <Toaster/>
      <RouterProvider router={checkRouter}/>
    </>
  )
}

export default App
