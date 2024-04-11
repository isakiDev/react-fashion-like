import { type PostsResponse } from '../../types'
import { UserImage } from '../../ui'

interface Props {
  comments: PostsResponse['comments']
}

export const CommentList = ({ comments }: Props) => {
  return (
    <section className='flex flex-col gap-2 pb-4'>
      { comments?.map(({ id, comment, user }) => (
        <div className='flex gap-2' key={id}>
          <UserImage alt='User image' className='h-9 w-9' src={user?.image} />
          <div className='p-2 bg-[#f2f2f2] rounded-md flex-1'>
            <h1 className='text-sm font-semibold'>{user?.name}</h1>
            <p>{comment}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
