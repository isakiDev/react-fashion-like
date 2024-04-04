import { CardPostActions } from '.'
import { type PostsResponse } from '../../types'
import { UserImage } from '../../ui/components/Image/UserImage'

interface Props {
  post: PostsResponse
  showActions?: boolean
}

export const CardPostHeader = ({ post, showActions = false }: Props) => {
  const { user, description, createdAt } = post

  const newDate = new Date(createdAt).toDateString()

  return (
    <header className="flex flex-col px-4 py-3 gap-4">
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <UserImage className='h-8 w-8' src={user?.image} />
          <div className="flex flex-col ml-3">
            <h2 className="text-sm font-semibold">{user?.name}</h2>
            <span className='text-xs text-gray-500'>{newDate}</span>
          </div>
        </div>

        {showActions && <CardPostActions post={post} />}

      </div>

      <p className=' whitespace-pre-line break-all'>{description}</p>
    </header>
  )
}
