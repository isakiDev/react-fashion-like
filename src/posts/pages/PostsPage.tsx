import { useEffect } from 'react'
import { CardPost, SkeletonPost } from '../components'
import { usePosts } from '..'

export const PostsPage = () => {
  const { posts, onGetPosts } = usePosts()

  useEffect(() => {
    onGetPosts()
  }, [])

  return (
    <section className='p-4 w-full max-w-[500px] space-y-2'>
      {
        (!posts)
          ? (< SkeletonPost />)
          : posts.map((post) => (
            <CardPost
              key={post.id}
              post={post}
            />
          ))
      }
    </section>
  )
}
