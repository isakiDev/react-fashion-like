import { NavLink } from 'react-router-dom'

import { useAuth } from '../../auth'
import { SIDEBAR_LINKS } from '../../consts'

export const Sidebar = () => {
  const { onLogoutUser, user } = useAuth()

  return (
    <aside className='flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700 sticky top-0'>
      <img className="object-cover w-8 h-8 rounded-full" src={user?.image} alt="User image" />
      {
        SIDEBAR_LINKS.map(({ href, icon }) => {
          const onLogout = href === '/auth/login' ? onLogoutUser : undefined

          return (
            <NavLink
              key={href}
              to={href}
              onClick={onLogout}
              className={({ isActive }) => `${isActive && 'dark:bg-gray-800 bg-gray-100'} p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100`}>
              {icon()}
            </NavLink>
          )
        })
      }
    </aside>
  )
}
