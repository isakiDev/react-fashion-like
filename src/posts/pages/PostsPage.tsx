import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { CardPost, PostCreatorBox, SkeletonPost } from '../components'
import { usePosts } from '..'
import { useAuth } from '../../auth'

export const PostsPage = () => {
  const { posts, isPostsLoading, onGetPosts } = usePosts()
  const { user } = useAuth()

  const isLogged = !!user

  useEffect(() => {
    onGetPosts()
  }, [])

  return (
    <main className='p-4 w-full max-w-[500px] h-[100vh] overflow-y-auto space-y-4'>
      {isLogged && <PostCreatorBox user={user} />}

      {!isLogged && (
        <div className='flex justify-end'>
          <Link
            className='px-4 py-1 rounded-full text-white font-semibold hover:bg-indigo-500 bg-indigo-600'
            to='/auth/login'
          >
            Login</Link>
        </div>
      )
      }

      {
        (isPostsLoading)
          ? Array(3).fill(null).map((_, index) => <SkeletonPost key={index} />)
          : posts.length <= 0
            ? <h1 className='text-slate-400 font-bold text-xl text-center'>No existing posts found</h1>
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
