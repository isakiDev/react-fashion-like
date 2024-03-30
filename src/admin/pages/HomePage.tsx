import { useAuth } from '../../auth'

export const HomePage = () => {
  const { user } = useAuth()

  return (
    <section className="flex flex-col w-full justify-center items-center gap-2">
      <h1 className='text-2xl lg:text-4xl font-bold text-gray-700'>👋🏻 WELCOME! {user?.name}</h1>
      <span className='text-gray-500 font-bold'>⚙️ Now you can manage all user posts </span>
    </section>
  )
}
