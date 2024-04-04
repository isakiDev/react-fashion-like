import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { CardPost, PostCreatorBox, SkeletonPost } from '../components'
import { usePosts } from '..'
import { useAuth } from '../../auth'

export const PostsPage = () => {
  const { posts, onGetPosts } = usePosts()
  const { user } = useAuth()

  const isLogged = !!user

  useEffect(() => {
    onGetPosts()
  }, [])

  return (
    <main className='p-4 w-full max-w-[500px] h-screen overflow-y-auto space-y-2'>
      {isLogged && <PostCreatorBox user={user} />}

      <div className='flex justify-end'>
        { !isLogged && (
          <Link
            className='px-4 py-1 rounded-full text-white font-semibold hover:bg-indigo-500 bg-indigo-600'
            to='/auth/login'
          >
            Login</Link>)
        }
      </div>

      {
        (!posts)
          ? <SkeletonPost />
          : posts?.map((post) => (
            <CardPost
              key={post.id}
              post={post}
            />
          ))
      }

    </main>
  )
}
