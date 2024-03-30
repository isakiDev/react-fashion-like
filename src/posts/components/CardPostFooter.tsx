import { TypeReaction } from '../../types'
import { DislikeIcon, LikeIcon } from '../../ui'

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
    <footer className="p-4">
      <button className={`hover:scale-110 ${typeReaction === TypeReaction.LIKE && 'text-blue-500'}`} onClick={async () => await createReaction(TypeReaction.LIKE)}><LikeIcon/>{likes}</button>
      <button className={`hover:scale-110 ${typeReaction === TypeReaction.DISLIKE && 'text-red-500'}`} onClick={async () => await createReaction(TypeReaction.DISLIKE)}><DislikeIcon/>{dislikes}</button>
    </footer>
  )
}
