import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'sonner'

import { useAuth } from '../../auth'
import { SETTINGS_PERSONAL_INFORMATION, SETTINGS_CHANGE_PASSWORD } from '../../consts'
import { ErrorMessageFormik, InputFormik } from '../../ui'

interface UpdateInputs {
  name: string
}

interface UpdateInputsPassword {
  currentPassword: string
  newPassword: string
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

  const handleSubmitPassword = ({ currentPassword, newPassword }: UpdateInputsPassword) => {
    toast.promise(onUpdateUser({ currentPassword, newPassword }), {
      success: 'Password updated',
      loading: 'Updating password...',
      error: (error) => error.message
    })
  }

  return (
    <section className='flex flex-col gap-8 p-4 bg-white dark:text-white dark:bg-gray-900 w-full max-w-[500px]'>
      <div className='flex gap-8'>
        <img alt="User Image" className='object-cover w-20 h-20 rounded-md' src={user?.image} />
      </div>

      <div>
        <h1 className='pb-3 font-semibold'>Personal Information</h1>

        <Formik
          initialValues={SETTINGS_PERSONAL_INFORMATION}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            name: Yup.string().trim().required()
          })}
        >
          {
            ({ isSubmitting }) => (
              <Form>
                <div className='flex flex-col gap-4'>
                  <InputFormik className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' name='name' placeholder={user?.name} type='text' />
                  <ErrorMessageFormik component='span' name='name' />

                  <input className=' disabled:bg-transparent px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' disabled value={user?.email}/>
                </div>
                <button
                  className='disabled:bg-gray-300 px-4 py-1 my-8 rounded-md bg-slate-600 hover:bg-slate-500'
                  disabled={isSubmitting}
                  type='submit'
                >Save</button>
              </Form>
            )
          }
        </Formik>
      </div>

      <Formik
        initialValues={SETTINGS_CHANGE_PASSWORD}
        onSubmit={handleSubmitPassword}
        validationSchema={Yup.object({
          currentPassword: Yup.string().trim().required('current password is a required field'),
          newPassword: Yup.string().trim().required('new password is a required field')
        })}
      >
        {
          ({ isSubmitting }) => (
            <Form>
              <h1 className='pb-3 font-semibold'>Change password</h1>
              <div className='flex flex-col gap-4'>
                <InputFormik className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' name='currentPassword' placeholder='Enter current password' type='password' />
                <ErrorMessageFormik component='span' name='currentPassword' />
                <InputFormik className='px-2 py-1 rounded-md bg-[#1d2432] border border-[#262e3a]' name='newPassword' placeholder='Enter new password' type='password' />
                <ErrorMessageFormik component='span' name='newPassword' />
              </div>
              <button
                className='px-4 py-1 my-8 rounded-md bg-slate-600 hover:bg-slate-500'
                disabled={isSubmitting}
                type='submit'
              >Save</button>
            </Form>
          )
        }
      </Formik>
    </section>
  )
}
