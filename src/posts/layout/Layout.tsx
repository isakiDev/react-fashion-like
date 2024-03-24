import { Outlet } from 'react-router-dom'

import { Sidebar } from '../../ui'
import { AUTH_STATUS } from '../../consts'
import { useAuth } from '../../auth'

export const Layout = () => {
  const { userStatus } = useAuth()

  const isAuthenticated = userStatus === AUTH_STATUS.AUTHENTICATED

  return (
    <div className='flex justify-center'>
      { isAuthenticated && <Sidebar/> }
      <Outlet/>
    </div>
  )
}
