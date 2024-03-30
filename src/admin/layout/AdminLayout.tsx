import { Outlet } from 'react-router-dom'

import { Dashboard } from '..'

export const AdminLayout = () => {
  return (
    <div className='flex w-full h-screen bg-gray-200'>
      <Dashboard/>
      <Outlet/>
    </div>
  )
}
