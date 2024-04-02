import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../auth'

export const AdminLayout = () => {
  const { onLogoutUser } = useAuth()

  return (
    <div className='flex w-full h-screen bg-gray-200'>
      <section className='fixed bottom-5 text-white font-bold w-full'>
        <nav className='flex gap-4 justify-center items-center max-w-[140px] mx-auto py-1 bg-indigo-400/80 rounded-full shadow-md'>
          <NavLink className='hover:text-amber-400' to='/posts'>Post</NavLink>
          <button className='hover:text-amber-400' onClick={onLogoutUser}>Exit</button>
        </nav>
      </section>

      <Outlet/>
    </div>
  )
}
