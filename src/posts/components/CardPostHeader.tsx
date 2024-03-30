import { UserImage } from '../../ui/components/Image/UserImage'

interface Props {
  url: string
  name: string
  description: string
  date: string
}

export const CardPostHeader = ({ url, name, description, date }: Props) => {
  const newDate = new Date(date).toDateString()

  return (
    <header className="flex flex-col px-4 py-3 gap-4">
      <div className='flex'>
        <UserImage className='h-8 w-8' src={url} />
        <div className="flex flex-col ml-3">
          <h2 className="text-sm font-semibold">{name}</h2>
          <span className='text-xs text-gray-500'>{newDate}</span>
        </div>
      </div>

      <p>{description}</p>
    </header>
  )
}
