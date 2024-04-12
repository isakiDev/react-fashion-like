import { useRef, useState } from 'react'

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
  const [isSubmitted, setIsSubmitted] = useState(false)

  const commentRef = useRef<HTMLInputElement | null>(null)

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const commentValue = commentRef.current?.value

    if (!commentValue || commentValue.trim().length <= 0) return toast.error('Invalid comment')

    setIsSubmitted(true)

    toast.promise(onAddComment(postId, commentValue), {
      success: () => {
        if (commentRef.current) commentRef.current.value = ''
        return 'Comment added'
      },
      loading: 'Loading...',
      error: (error) => error.message,
      finally: () => { setIsSubmitted(false) }
    })
  }

  return (
    <section className='flex flex-col gap-5'>
      <div className='flex gap-2 items-center'>
        <UserImage alt='User image' className='h-9 w-9' src={user?.image}/>
        <form className='flex-1' onSubmit={handleSubmitComment}>
          <input
            className="disabled:bg-gray-300 px-3 py-1 border w-full rounded-2xl resize-none overflow-hidden"
            disabled={isSubmitted}
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
