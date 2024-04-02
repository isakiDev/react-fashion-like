import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'sonner'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useAuth } from '..'
import { CustomButton, ErrorMessageFormik, InputFormik } from '../../ui'
import { REGISTER_INITIAL_VALUES } from '../../consts'

interface RegisterInputs {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterPage = () => {
  const { onRegisterUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmitRegisterUser = async ({ confirmPassword, ...data }: RegisterInputs) => {
    // TODO: fix navigate
    onRegisterUser(data)
      .then(() => { navigate('/auth/login') })
      .catch(error => toast.error((error.message as string)))
  }

  return (
    <main className="flex items-center justify-center h-screen max-w-[1000px] m-auto">
      <div className='flex flex-col gap-4'>
        <Formik
          initialValues={REGISTER_INITIAL_VALUES}
          onSubmit={handleSubmitRegisterUser}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(5).required(),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password must match').required('Confirm password is required')
          })}
        >
          {
            ({ isSubmitting }) => (
              <Form className='flex flex-col gap-10 text-center md:border-2 md:rounded-xl p-7'>
                <h1 className="text-3xl font-bold text-indigo-600 text-shad">Register</h1>
                <div className='flex flex-col gap-2'>
                  <InputFormik name='name' placeholder='Enter name' type='text' />
                  <ErrorMessageFormik component='span' name='name' />

                  <InputFormik name='email' placeholder='Enter email' type='text' />
                  <ErrorMessageFormik component='span' name='email' />

                  <InputFormik name='password' placeholder='Enter password' type='password' />
                  <ErrorMessageFormik component='span' name='password' />

                  <InputFormik name='confirmPassword' placeholder='Enter password' type='password' />
                  <ErrorMessageFormik component='span' name='confirmPassword' />
                </div>

                <CustomButton className='rounded-full py-1' disabled={isSubmitting} type='submit'>Register</CustomButton>
              </Form>
            )
          }
        </Formik>

        <hr />

        <div className='text-center space-x-4 border rounded-xl p-3'>
          <span>Do you already an account?</span>
          <Link
            className='text-blue-500 font-semibold'
            to='/auth/login'
          >Sign In</Link>
        </div>
      </div>
    </main>
  )
}
