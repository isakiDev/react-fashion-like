import { useEffect, useState } from 'react'

import { useAuth } from '../../auth'
import { AUTH_STATUS } from '../../consts'
import { TypeReaction, type PostsResponse } from '../../types'
import { usePosts } from '..'
import { CardPostFooter, CardPostHeader, CommentBox } from '.'

interface Props {
  post: PostsResponse
}

export const CardPost = ({ post }: Props) => {
  const { userStatus, user } = useAuth()
  const { onReactionPost, posts } = usePosts()

  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false)
  const [typeReaction, setTypeReaction] = useState<TypeReaction | undefined>()

  const { reactions, user: userPost, image } = post

  const isLoggedIn = userStatus === AUTH_STATUS.AUTHENTICATED
  const likes = reactions?.filter(like => like.type === TypeReaction.LIKE).length ?? 0
  const dislikes = reactions?.filter(dislike => dislike.type === TypeReaction.DISLIKE).length ?? 0

  useEffect(() => {
    if (isLoggedIn) {
      const foundReaction = reactions?.find(reaction => reaction?.user?.id === user?.id)
      setTypeReaction(foundReaction?.type)
    }
  }, [posts])

  const toggleCommentBox = async () => {
    if (!isLoggedIn) return alert('User not logged in')
    setIsCommentBoxOpen(true)
  }

  const changeReactionPost = async (type: TypeReaction) => {
    if (!isLoggedIn) return alert('User not logged in')
    await onReactionPost(post.id, type)
  }

  return (
    <article className="flex flex-col gap-4 bg-gray-50 border rounded-md p-4">
      <CardPostHeader
        post={post}
        showActions={user?.id === userPost.id}
      />

      <p className='whitespace-pre-line break-all'>{post?.description}</p>
      <img alt='Post image' className='max-h-[400px] object-contain' src={image} />

      <hr />

      <CardPostFooter
        changeReaction={changeReactionPost}
        dislikes={dislikes}
        likes={likes}
        toggleCommentBox={toggleCommentBox}
        typeReaction={typeReaction}
      />

      { isCommentBoxOpen && <CommentBox comments={post?.comments} postId={post.id}/> }

    </article>
  )
}
