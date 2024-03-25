import { useEffect, useState } from 'react'

import { useAuth } from '../../auth'
import { AUTH_STATUS } from '../../consts'
import { type PostsResponse } from '../../types'
import { usePosts } from '..'
import { HeartIcon, HeartIconLiked } from '../../ui'
import { CardPostFooter, CardPostHeader, CommentBox } from '.'

interface Props {
  post: PostsResponse
}

export const CardPost = ({ post }: Props) => {
  const { userStatus, user } = useAuth()
  const { onToggleLike, posts } = usePosts()

  const [commentBoxOpen, setCommentBoxOpen] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  const { likes, user: userPost, image } = post

  const isLoggedIn = userStatus === AUTH_STATUS.AUTHENTICATED
  const hasLikedIcon = hasLiked ? <HeartIconLiked /> : <HeartIcon />

  useEffect(() => {
    if (isLoggedIn) {
      const like = likes?.some(like => like?.user?.id === user?.id)
      setHasLiked(like)
    }
  }, [posts])

  const handleClickOpenCommentBox = async () => {
    if (!isLoggedIn) return alert('User not logged in')

    setCommentBoxOpen(true)
  }

  const handleClickToggleLike = async () => {
    if (!isLoggedIn) return alert('User not logged in')

    await onToggleLike(post.id)
  }

  return (
    <article className="flex flex-col bg-gray-50 border rounded-sm">
      <CardPostHeader name={userPost?.name} url={userPost?.image}/>

      <img className='px-4 object-cover max-w-[500px] w-full' src={image} />

      <CardPostFooter
        hasLikedIcon={hasLikedIcon}
        openCommentBox={handleClickOpenCommentBox}
        toggleLike={handleClickToggleLike}
      />

      <div className="font-semibold text-sm mx-4 mt-2 mb-4">{likes?.length ?? 0}</div>

      { commentBoxOpen && <CommentBox comments={post?.comments} postId={post.id}/> }

    </article>
  )
}
