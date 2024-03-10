import { type PostsResponse } from '../../types'

interface Props {
  comments: PostsResponse['comments']
}

export const CommentList = ({ comments }: Props) => {
  return (
    <section className='flex flex-col gap-2'>
      { comments?.map(({ id, comment, user }) => (
        <div key={id} className='flex gap-2'>
          <img className=" object-cover h-9 w-9 rounded-full" src={user?.image} alt='User image' />
          <div className='p-2 bg-gray-200 rounded-md flex-1'>
            <h1 className='text-sm font-semibold'>{user?.name}</h1>
            <p>{comment}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
