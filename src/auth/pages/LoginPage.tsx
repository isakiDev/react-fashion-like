import { Link } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { toast } from 'sonner'

import { ErrorMessageFormik, InputFormik } from '../../ui/components'
import { LOGIN_INITIAL_VALUES } from '../../consts'
import { useAuth } from '..'
import { type LoginRequest } from '../../types'

export const LoginPage = () => {
  const { onLoginUser } = useAuth()

  const handleSubmit = (values: LoginRequest) => {
    toast.promise(onLoginUser(values), {
      loading: 'Loading...',
      success: () => 'Welcome',
      error: () => 'Error'
    })
  }

  return (

    <main className="md:flex items-center justify-center h-screen max-w-[1000px] m-auto">
      <div className='flex flex-col md:flex-row h-[500px] gap-6'>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/45/Gisele_Bundchen2.jpg"
          alt="image"
          className='hidden md:block rounded-md shadow-md'
        />

        <div className='flex flex-col gap-4 mx-4'>
          <Formik
            initialValues={LOGIN_INITIAL_VALUES}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              email: Yup.string().email().required(),
              password: Yup.string().required()
            })}
          >
            {
              ({ isSubmitting }) => (
                <Form className='flex flex-col gap-10 text-center md:border-2 p-7'>
                  <h1 className="text-2xl font-bold">Fashion Like</h1>
                  <div className='flex flex-col gap-1'>
                    <InputFormik name='email' type='text' placeholder='Enter email' />
                    <ErrorMessageFormik component='span' name='email' />

                    <InputFormik name='password' type='password' placeholder='Enter password' />
                    <ErrorMessageFormik component='span' name='password' />

                  </div>

                  <button
                    disabled={isSubmitting}
                    className="p-2 bg-indigo-600 text-white rounded-md"
                    type='submit'
                  >Login</button>
                </Form>
              )
            }
          </Formik>

          <hr />

          <div className='text-center space-x-4 border p-3'>
            <span>You do not have an account?</span>
            <Link
              className='text-blue-500 font-semibold'
              to='/auth/register'>Sign up</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
