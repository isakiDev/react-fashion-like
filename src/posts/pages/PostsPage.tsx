import { useEffect } from 'react'
import { CardPost, PostCreatorBox, SkeletonPost } from '../components'
import { usePosts } from '..'
import { useAuth } from '../../auth'

export const PostsPage = () => {
  const { posts, onGetPosts } = usePosts()
  const { user } = useAuth()

  useEffect(() => {
    onGetPosts()
  }, [])

  return (
    <section className='p-4 w-full max-w-[500px] space-y-2'>

      {user && <PostCreatorBox user={user} />}

      {
        (!posts)
          ? (< SkeletonPost />)
          : posts?.map((post) => (
            <CardPost
              key={post.id}
              post={post}
            />
          ))
      }
    </section>
  )
}
