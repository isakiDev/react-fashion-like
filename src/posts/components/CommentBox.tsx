import { useRef } from 'react'

import { toast } from 'sonner'

import { usePosts } from '..'
import { useAuth } from '../../auth'
import { type PostsResponse } from '../../types'
import { CommentList } from '.'

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

    if (!commentValue || commentValue.trim().length < 5) return toast.error('Invalid comment')

    toast.promise(onAddComment(postId, commentValue), {
      success: () => {
        if (commentRef.current) commentRef.current.value = ''
        return 'Comment added'
      },
      error: (error) => error.message
    })
  }

  return (
    <section className='flex flex-col p-4 gap-5'>
      <div className='flex gap-2 items-center'>
        <img className="object-cover h-9 w-9 rounded-full" src={user?.image} alt='User image' />
        <form onSubmit={handleSubmitComment} className='flex-1'>
          <input
            ref={commentRef}
            className="px-2 py-1 border w-full rounded-2xl resize-none overflow-hidden"
            placeholder="Add new comment"
            name='comment'
            maxLength={25}
          />
        </form>
      </div>

      <CommentList comments={comments}/>
    </section>
  )
}
