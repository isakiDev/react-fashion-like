import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../auth'
import { MenuIcon, PostsIcon, UserImage } from '../../ui'

export const Dashboard = () => {
  const { user } = useAuth()

  const [isDashboardOpen, setIsDashboardOpen] = useState(false)

  return (
    <aside className={`w-[210px] absolute max-w-[250px] duration-300 ${!isDashboardOpen && ''} h-screen bg-zinc-900 p-4 shadow-md space-y-6 text-gray-200`}>

      <div className='flex justify-end'>
        <button
          onClick={() => setIsDashboardOpen(!isDashboardOpen)}
          title='Menu'
          type='button'
        ><MenuIcon /></button>
      </div>

      <header className='flex flex-col gap-4 items-center justify-center'>
        <UserImage className='size-14' src={user?.image}/>
        <h2>{user?.name}</h2>
      </header>

      {/* <div className='w-full border-dashed border-gray-400 border'></div> */}

      {/* <hr className='mx-4'/> */}

      <Link
        className='px-4 py-3 rounded-md w-full text-start hover:bg-zinc-800 inline-flex gap-4 items-center'
        to='/posts'
      >
        <PostsIcon/>
        <strong>Posts</strong>
      </Link>
    </aside>
  )
}
