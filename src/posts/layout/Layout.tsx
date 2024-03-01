import { Outlet } from 'react-router-dom'

import { Sidebar } from '../../ui/components'

export const Layout = () => {
  return (
    <div className='flex justify-center'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}
