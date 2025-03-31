import { FC } from 'react'
import AuthForm from './auth-form/AuthForm'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthEnum } from './auth.interface'
import { useAuth } from '../../../hooks/useAuth'

const Auth: FC = () => {
  const { pathname } = useLocation()
  const auth = useAuth()

  if (auth) {
    return <Navigate to='/' />
  }

  return (
    <section className='h-full w-full flex bg-main-gray justify-between'>
      <AuthForm type={pathname as AuthEnum.LOGIN | AuthEnum.REGISTER} />
      <img src='/logo.svg' alt='' className='w-[40%] h-[50%] mr-24' />
    </section>
  )
}

export default Auth
