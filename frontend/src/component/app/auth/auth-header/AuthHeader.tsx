import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AuthEnum } from '../auth.interface'
import { IAuthHeaderProps } from './auth-header.interface'

const AuthHeader: FC<IAuthHeaderProps> = ({ type, reset }) => {
  return (
    <header className='w-full flex flex-col items-center gap-y-5'>
      <div className='flex justify-center items-center gap-x-2 text-primary text-5xl font-semibold'>
        <h1>TaskList</h1>
      </div>

      <div className='text-sm text-gray-200 underline underline-offset-2'>
        {type === AuthEnum.LOGIN ? (
          <Link to={AuthEnum.REGISTER} onClick={() => reset()}>
            Створити обліковий запис
          </Link>
        ) : (
          <Link to={AuthEnum.LOGIN} onClick={() => reset()}>
            Уже маєте обліковий запис?
          </Link>
        )}
      </div>
    </header>
  )
}

export default AuthHeader
