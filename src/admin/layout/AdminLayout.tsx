import { Outlet } from 'react-router-dom'

import { Dashboard } from '..'

export const AdminLayout = () => {
  return (
    <div className='flex gap-4 bg-gray-200'>
      <Dashboard/>
      <Outlet/>
    </div>
  )
}
