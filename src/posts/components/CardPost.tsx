import { useEffect, useState } from 'react'

import { useAuth } from '../../auth'
import { AUTH_STATUS } from '../../consts'
import { type TypeReaction, type PostsResponse } from '../../types'
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
    <article className="flex flex-col bg-gray-50 border rounded-sm">
      <CardPostHeader name={userPost?.name} url={userPost?.image}/>

      <img className='px-4 object-cover max-w-[500px] w-full' src={image} />

      <CardPostFooter
        changeReaction={changeReactionPost}
        toggleCommentBox={toggleCommentBox}
        typeReaction={typeReaction}
      />

      {/* <div className="font-semibold text-sm mx-4 mt-2 mb-4">{reactions?.length ?? 0}</div> */}

      { isCommentBoxOpen && <CommentBox comments={post?.comments} postId={post.id}/> }

    </article>
  )
}
