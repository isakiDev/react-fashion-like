import { usePosts } from '../../posts'

export const AdminPostsPage = () => {
  const { posts } = usePosts()

  return (
    <section className="w-full">
      <header>Posts</header>

    </section>
  )
}
