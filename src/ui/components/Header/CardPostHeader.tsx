import { UserImage } from '../..'

interface Props {
  url: string
  name: string
}

export const CardPostHeader = ({ url, name }: Props) => {
  return (
    <header className="flex items-center px-4 py-3">
      <UserImage className='h-8 w-8' src={url} />
      <div className="ml-3 ">
        <span className="text-sm font-semibold antialiased block leading-tight">{name}</span>
      </div>
    </header>
  )
}
