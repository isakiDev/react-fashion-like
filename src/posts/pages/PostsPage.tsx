import { useEffect } from 'react'
import { CardPost } from '../components'
import { usePostStore } from '../store/post'

export const PostsPage = () => {
  const getPost = usePostStore(state => state.fetchPosts)
  const post = usePostStore(state => state.posts)

  useEffect(() => {
    getPost()
  }, [])

  return (
    <section>
      {
        post.map(({ post, user }) => (
          <CardPost
            key={post.id}
            userImage='https://fer-uig.glitch.me/?uuid=1%22%20alt=%22user-icon'
            postImage={post.image ?? 'dadwa'}
            username={user.name}/>
        ))
      }
    </section>
  )
}
