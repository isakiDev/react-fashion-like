import { Link } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { toast } from 'sonner'

import { CustomButton, ErrorMessageFormik, InputFormik } from '../../ui'
import { LOGIN_INITIAL_VALUES } from '../../consts'
import { useAuth } from '..'

interface LoginInputs {
  email: string
  password: string
}

export const LoginPage = () => {
  const { onLoginUser } = useAuth()

  // TODO: maintain form values
  const handleSubmit = async (data: LoginInputs) => {
    toast.promise(onLoginUser(data), {
      loading: 'Loading...',
      success: () => 'Welcome',
      error: (error) => error.message
    })
  }

  return (

    <main className="md:flex items-center justify-center h-screen max-w-[1000px] m-auto">
      <div className='flex flex-col md:flex-row h-[500px] gap-6'>
        <img
          alt="image"
          className='hidden md:block rounded-md'
          src="https://upload.wikimedia.org/wikipedia/commons/4/45/Gisele_Bundchen2.jpg"
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
                <Form className='flex flex-col gap-10 text-center md:border-2 md:rounded-xl p-7'>
                  <h1 className="text-3xl font-bold text-indigo-600 text-shad">Fashion Like</h1>
                  <div className='flex flex-col gap-2'>
                    <InputFormik name='email' placeholder='Enter email' type='text' />
                    <ErrorMessageFormik component='span' name='email' />

                    <InputFormik name='password' placeholder='Enter password' type='password' />
                    <ErrorMessageFormik component='span' name='password' />

                  </div>
                  <CustomButton className='rounded-full py-1' disabled={isSubmitting} type='submit'>Login</CustomButton>
                </Form>
              )
            }
          </Formik>

          <hr />

          <div className='text-center space-x-4 border rounded-xl p-3'>
            <span>You do not have an account?</span>
            <Link
              className='text-blue-500 font-semibold'
              to='/auth/register'
            >Sign up</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
