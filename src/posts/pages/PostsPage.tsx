import { CardPost } from '../components'

export const PostsPage = () => {
  return (
    <section>
      {/* {
        post.map(({ post, user }) => (
          <CardPost
            key={post.id}
            userImage='https://fer-uig.glitch.me/?uuid=1%22%20alt=%22user-icon'
            postImage={post.image ?? 'dadwa'}
            username={user.name}/>
        ))
      } */}

      <CardPost
        key={1}
        userImage='https://fer-uig.glitch.me/?uuid=1%22%20alt=%22user-icon'
        postImage={'dawda'}
        username={'Gabriel'} />
    </section>
  )
}
