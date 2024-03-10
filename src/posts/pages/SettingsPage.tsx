import { useAuth } from '../../auth'

export const SettingsPage = () => {
  const { user } = useAuth()

  return (
    <section className='flex flex-col gap-8 p-4 bg-white dark:text-white dark:bg-gray-900 w-full max-w-[500px]'>
      <div className='flex gap-8'>
        <img className='object-cover w-20 h-20 rounded-md' src={user?.image} alt="User Image" />
        <div className='space-y-2'>
          <button className='px-2 py-1 font-semibold bg-gray-700 hover:bg-gray-600 rounded-md'>Change Image</button>
          <p className='text-sm text-gray-400'>JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>

      <div>
        <h1 className='pb-3 font-semibold'>Personal Information</h1>

        <form>
          <div className='flex flex-col gap-4'>
            <input
              className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]'
              type="text"
              placeholder="Enter name"
              value={user?.name}
              onChange={() => {}}
            />
            <input
              className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]'
              type="email"
              placeholder="Enter email"
              value={user?.email}
              onChange={() => {}}
            />
          </div>
          <button className='px-4 py-1 my-8 rounded-md bg-slate-600'>Save</button>
        </form>
      </div>

      <div>
        <h1 className='pb-3 font-semibold'>Change password</h1>
        <form>
          <div className='flex flex-col gap-4'>
            <input className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' type="password" placeholder="Current password" />
            <input className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' type="password" placeholder="New password" />
            <input className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' type="password" placeholder="Confirm password" />
          </div>
          <button className='px-4 py-1 my-8 rounded-md bg-slate-600'>Save</button>
        </form>
      </div>
    </section>
  )
}
