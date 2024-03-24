import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuth } from '..'

export const ConfirmUserPage = () => {
  const { onVerifyUserEmail } = useAuth()
  const [userVerified, setUserVerified] = useState(false)

  const verifyUser = () => {
    const token = new URLSearchParams(location.search).get('token')
    if (!token) return

    toast.promise(onVerifyUserEmail(token), {
      success: () => {
        setUserVerified(true)
        return 'User verified'
      },
      error: (error) => error.message
    })
  }

  useEffect(() => {
    verifyUser()
  }, [])

  const messages = [
    { title: 'Thanks for signing up for Fashion Like!', msg: 'We are happy you are here. You can now log in with your account.' },
    { title: 'Ups ☹️¡¡ Your account could not be verified', msg: 'Please contact the administrator' }
  ] as const

  const msgUserVerified = userVerified
    ? messages[0]
    : messages[1]

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100">
      <div className="flex flex-col gap-4 p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
        <h3 className="text-2xl">{msgUserVerified.title}</h3>
        <p>{msgUserVerified.msg}</p>

        {userVerified && <Link className='px-2 py-2 text-blue-200 bg-blue-600 rounded' to='/auth/login'>Login</Link>}
      </div>
    </div>
  )
}
