import { Formik, Form } from 'formik'
import { toast } from 'sonner'

import { useAuth } from '../../auth'
import { SETTINGS_INITIAL_VALUES } from '../../consts'
import { ErrorMessageFormik, InputFormik } from '../../ui/components'

interface UpdateInputs {
  name: string
}

export const SettingsPage = () => {
  const { user, onUpdateUser } = useAuth()

  const handleSubmit = ({ name }: UpdateInputs) => {
    toast.promise(onUpdateUser({ name }), {
      success: 'Name updated',
      loading: 'Updating name...',
      error: (error) => error.message
    })
  }

  return (
    <section className='flex flex-col gap-8 p-4 bg-white dark:text-white dark:bg-gray-900 w-full max-w-[500px]'>
      <div className='flex gap-8'>
        <img alt="User Image" className='object-cover w-20 h-20 rounded-md' src={user?.image} />
        <div className='space-y-2'>
          <button className='px-2 py-1 font-semibold bg-gray-700 hover:bg-gray-600 rounded-md'>Change Image</button>
          <p className='text-sm text-gray-400'>JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>

      <div>
        <h1 className='pb-3 font-semibold'>Personal Information</h1>

        <Formik
          initialValues={SETTINGS_INITIAL_VALUES}
          onSubmit={handleSubmit}
        >
          {
            () => (
              <Form>
                <div className='flex flex-col gap-4'>
                  <InputFormik className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' name='name' placeholder={user?.name} type='text' />
                  <ErrorMessageFormik component='span' name='name' />
                </div>
                <button className='px-4 py-1 my-8 rounded-md bg-slate-600' type='submit'>Save</button>
              </Form>
            )
          }
        </Formik>
      </div>

      {/* <div>
        <h1 className='pb-3 font-semibold'>Change password</h1>
        <form>
          <div className='flex flex-col gap-4'>
            <input className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' placeholder="Current password" type="password" />
            <input className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' placeholder="New password" type="password" />
            <input className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' placeholder="Confirm password" type="password" />
          </div>
          <button className='px-4 py-1 my-8 rounded-md bg-slate-600'>Save</button>
        </form>
      </div> */}
    </section>
  )
}
