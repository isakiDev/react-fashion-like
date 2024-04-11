import { TypeReaction } from '../../types'
import { CommentIcon, DislikeIcon, LikeIcon } from '../../ui'

interface Props {
  typeReaction: TypeReaction | undefined
  changeReaction: (type: TypeReaction) => Promise<void>
  toggleCommentBox: () => void
  likes: number
  dislikes: number
}

export const CardPostFooter = ({
  typeReaction,
  toggleCommentBox,
  changeReaction,
  likes,
  dislikes
}: Props) => {
  const createReaction = async (type: TypeReaction) => {
    await changeReaction(type)
  }

  return (
    <footer className="flex justify-between">
      <div className='flex gap-2'>
        <div className='flex items-center gap-1'>
          <button className={`hover:scale-105 ${typeReaction === TypeReaction.LIKE && 'text-blue-500'}`} onClick={async () => await createReaction(TypeReaction.LIKE)}><LikeIcon/></button>
          <span className='font-semibold text-gray-600'>{likes}</span>
        </div>
        <div className='flex items-center gap-1'>
          <button className={`hover:scale-105 ${typeReaction === TypeReaction.DISLIKE && 'text-red-500'}`} onClick={async () => await createReaction(TypeReaction.DISLIKE)}><DislikeIcon/></button>
          <span className='font-semibold text-gray-600'>{dislikes}</span>
        </div>
      </div>

      <button
        className='hover:scale-105'
        onClick={toggleCommentBox}
      ><CommentIcon /></button>
    </footer>
  )
}
