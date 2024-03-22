import { useEffect, useState } from 'react'

import { useAuth } from '../../auth'
import { AUTH_STATUS } from '../../consts'

import { type PostsResponse } from '../../types'
import { usePosts } from '..'

import { CommentIcon, HeartIcon, HeartIconLiked } from '../../ui/components'
import { CommentBox } from '.'

interface Props {
  post: PostsResponse
}

export const CardPost = ({ post }: Props) => {
  const { userStatus, user } = useAuth()
  const { onToggleLike, posts } = usePosts()

  const [commentBoxOpen, setCommentBoxOpen] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  const { likes, user: userPost, title, image } = post

  const isLoggedIn = userStatus === AUTH_STATUS.AUTHENTICATED

  useEffect(() => {
    if (isLoggedIn) {
      const like = likes?.some(like => like?.user?.id === user?.id)
      setHasLiked(like)
    }
  }, [posts])

  const handleClickOpenBoxComment = async () => {
    if (!isLoggedIn) return alert('User not logged in')

    setCommentBoxOpen(true)
  }

  const handleClickToggleLike = async () => {
    if (!isLoggedIn) return alert('User not logged in')

    await onToggleLike(post.id)
  }

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="bg-white border rounded-sm">
        <div className="flex items-center px-4 py-3">
          <img className="object-cover h-8 w-8 rounded-full" src={userPost?.image} />
          <div className="ml-3 ">
            <span className="text-sm font-semibold antialiased block leading-tight">{userPost?.name}</span>
            <span className="text-gray-600 text-xs block">{title}</span>
          </div>
        </div>

        <img className='object-cover max-w-[500px] w-full' src={image} />

        <div className="flex items-center justify-between mx-4 mt-3 mb-2">
          <div className="flex gap-5">
            <button
              className='transition-transform transform hover:scale-110 duration-150 ease-in-out'
              onClick={handleClickToggleLike}
            >
              { hasLiked ? <HeartIconLiked /> : <HeartIcon /> }
            </button>

            <button
              className='transition-transform transform hover:scale-110 duration-150 ease-in-out'
              onClick={handleClickOpenBoxComment}
            >
              <CommentIcon/>
            </button>
          </div>
        </div>

        <div className="font-semibold text-sm mx-4 mt-2 mb-4">{likes?.length ?? 0}</div>

        { commentBoxOpen && <CommentBox comments={post?.comments} postId={post.id}/> }

      </div>
    </div>
  )
}
