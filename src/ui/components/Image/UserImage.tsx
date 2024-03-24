type Props = React.ImgHTMLAttributes<HTMLImageElement>

export const UserImage = ({ className, ...options }: Props) => {
  return <img className={`object-cover ${className} rounded-full`}{...options}/>
}
