import { Link } from 'react-router-dom'
import { useAuth } from '../../auth'
import { PostsIcon, UserImage } from '../../ui'

export const Dashboard = () => {
  const { user } = useAuth()

  return (
    <aside className="min-w-[250px] h-screen bg-zinc-900 p-4 py-8 shadow-md space-y-6 text-gray-200">
      <header className='flex flex-col gap-4 items-center justify-center'>
        <UserImage className='size-14' src={user?.image}/>
        <h2>{user?.name}</h2>
      </header>

      <hr className='mx-4'/>

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
