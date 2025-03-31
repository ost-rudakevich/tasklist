import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

const UserPanel: FC = () => {
  const user = useAuth()

  return (
    <div className='w-1/6 h-full flex items-center justify-start gap-x-4'>
      <Link to='/'>
        <img src='/logo.svg' className='rounded-full w-16 h-16' />
      </Link>
      <span className='text-white'>
        Привіт {user?.name ? user.name : 'Анонім'}!{' '}
      </span>
    </div>
  )
}

export default UserPanel
