import { Link } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { ErrorMessageFormik, InputFormik } from '../../ui/components'

interface IForm {
  name: string
  email: string
  password: string
  confirm_password: string
}

const INITIAL_VALUES: IForm = {
  name: '',
  email: '',
  password: '',
  confirm_password: ''
}

export const RegisterPage = () => {
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
            initialValues={INITIAL_VALUES}
            onSubmit={(val) => { console.log(val) }}
            validationSchema={Yup.object({
              name: Yup.string().required(),
              email: Yup.string().email().required(),
              password: Yup.string().required(),
              confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Password must match').required('Required')
            })}
          >
            {
              ({ isSubmitting }) => (
                <Form className='flex flex-col gap-10 text-center md:border-2 p-7'>
                  <h1 className="text-2xl font-bold">Fashion Like</h1>
                  <div className='flex flex-col gap-1'>
                    <InputFormik name='name' type='text' placeholder='Enter name' />
                    <ErrorMessageFormik component='span' name='name' />

                    <InputFormik name='email' type='text' placeholder='Enter email' />
                    <ErrorMessageFormik component='span' name='email' />

                    <InputFormik name='password' type='password' placeholder='Enter password' />
                    <ErrorMessageFormik component='span' name='password' />

                    <InputFormik name='confirm_password' type='password' placeholder='Enter password' />
                    <ErrorMessageFormik component='span' name='confirm_password' />
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="p-2 bg-indigo-600 text-white rounded-md"
                    type='submit'
                  >Register</button>
                </Form>
              )
            }
          </Formik>

          <hr />

          <div className='text-center space-x-4 border p-3'>
            <span>Do you already an account?</span>
            <Link
              className='text-blue-500 font-semibold'
              to='/auth/login'>Sign In</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
