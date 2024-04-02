import { useBoundStore } from '../../store/bound.store'
import { getAllPosts, addCommentPost, handlePostReaction, createPost, deletePost } from '../services/post.service'
import { useAuth } from '../../auth'
import { type TypeReaction } from '../../types'

export const usePosts = () => {
  const { user } = useAuth()
  const onLogout = useBoundStore(state => state.onLogout)

  const posts = useBoundStore(state => state.posts)
  const addPosts = useBoundStore(state => state.addPosts)
  const addPost = useBoundStore(state => state.addPost)
  const addComment = useBoundStore(state => state.addComment)
  const setReaction = useBoundStore(state => state.setReaction)
  const deletePostStore = useBoundStore(state => state.deletePost)

  const onGetPosts = async () => {
    try {
      const posts = await getAllPosts()
      addPosts(posts)
    } catch (error) {
      onLogout(null)
      throw error
    }
  }

  const onCreatePost = async (payload: FormData) => {
    const token = window.localStorage.getItem('TOKEN')
    if (!token) return onLogout(null)

    try {
      const post = await createPost(token, payload)

      post.reactions = []
      post.comments = []

      addPost(post)
    } catch (error) {
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

  const onReactionPost = async (postId: number, type: TypeReaction) => {
    const token = window.localStorage.getItem('TOKEN')
    if (!token) return onLogout(null)

    try {
      if (!user) throw new Error('User not found')

      const reaction = await handlePostReaction(postId, token, type)

      setReaction(user, postId, reaction)
    } catch (error) {
      throw error
    }
  }

  const onDeletePost = async (postId: number) => {
    const token = window.localStorage.getItem('TOKEN')
    if (!token) return onLogout(null)

    try {
      await deletePost(token, postId)
      deletePostStore(postId)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return {
    posts,

    onGetPosts,
    onCreatePost,
    onAddComment,
    onReactionPost,
    onDeletePost
  }
}
