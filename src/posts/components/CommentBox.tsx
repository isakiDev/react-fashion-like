import { useRef } from 'react'

import { toast } from 'sonner'

import { usePosts } from '..'
import { useAuth } from '../../auth'
import { type PostsResponse } from '../../types'
import { CommentList } from '.'
import { UserImage } from '../../ui'

interface Props {
  postId: PostsResponse['id']
  comments: PostsResponse['comments']
}

export const CommentBox = ({ postId, comments }: Props) => {
  const { user } = useAuth()
  const { onAddComment } = usePosts()

  const commentRef = useRef<HTMLInputElement | null>(null)

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const commentValue = commentRef.current?.value

    if (!commentValue || commentValue.trim().length <= 0) return toast.error('Invalid comment')

    toast.promise(onAddComment(postId, commentValue), {
      success: () => {
        if (commentRef.current) commentRef.current.value = ''
        return 'Comment added'
      },
      error: (error) => error.message
    })
  }

  return (
    <section className='flex flex-col px-4 gap-5'>
      <div className='flex gap-2 items-center'>
        <UserImage alt='User image' className='h-9 w-9' src={user?.image}/>
        <form className='flex-1' onSubmit={handleSubmitComment}>
          <input
            className="px-3 py-1 border w-full rounded-2xl resize-none overflow-hidden"
            maxLength={25}
            name='comment'
            placeholder="Add new comment"
            ref={commentRef}
          />
        </form>
      </div>

      <CommentList comments={comments}/>
    </section>
  )
}
