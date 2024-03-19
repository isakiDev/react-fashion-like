import { useEffect, useState } from 'react'

import { useAuth } from '..'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

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

  return (
    <section >
      <h1>User</h1>
      { userVerified && <Link to='/auth/login'>Login</Link>}
    </section>
  )
}
