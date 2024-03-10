import { useBoundStore } from '../../store/bound.store'
import { getAllPosts, addCommentPost, toggleLikePost } from '../services/post.service'
import { useAuth } from '../../auth'

export const usePosts = () => {
  const { user } = useAuth()
  const onLogout = useBoundStore(state => state.onLogout)

  const posts = useBoundStore(state => state.posts)
  const addPosts = useBoundStore(state => state.addPosts)
  const addComment = useBoundStore(state => state.addComment)
  const toggleLike = useBoundStore(state => state.toggleLike)

  const onGetPosts = async () => {
    try {
      const posts = await getAllPosts()
      addPosts(posts)
    } catch (error) {
      onLogout(null)
      throw error
    }
  }

  const onAddComment = async (postId: number, comment: string) => {
    const token = window.localStorage.getItem('TOKEN')
    if (!token) return onLogout(null)

    try {
      const { id, comment: newComment, user: commentedUser } = await addCommentPost(postId, comment, token)

      addComment(commentedUser, postId, id, newComment)
    } catch (error) {
      throw error
    }
  }

  const onToggleLike = async (postId: number) => {
    const token = window.localStorage.getItem('TOKEN')
    if (!token) return onLogout(null)

    try {
      if (!user) throw new Error('User not found')

      const { id } = await toggleLikePost(postId, token) as { id: number | undefined }
      toggleLike(user, postId, id)
    } catch (error) {
      throw error
    }
  }

  return {
    posts,

    onGetPosts,
    onAddComment,
    onToggleLike
  }
}
