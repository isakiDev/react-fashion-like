import { CommentIcon, SocialIconButton } from '../..'

interface Props {
  hasLikedIcon: JSX.Element
  toggleLike: () => void
  openCommentBox: () => void
}

export const CardPostFooter = ({ hasLikedIcon, openCommentBox, toggleLike }: Props) => {
  return (
    <footer className="flex items-center px-4 gap-4">
      <SocialIconButton onClick={toggleLike}>{hasLikedIcon}</SocialIconButton>
      <SocialIconButton onClick={openCommentBox}>{<CommentIcon />}</SocialIconButton>
    </footer>
  )
}
