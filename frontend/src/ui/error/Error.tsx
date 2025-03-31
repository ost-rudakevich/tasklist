import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IErrorProps } from './error.interface'
import Button from '../button/Button'

const Error: FC<IErrorProps> = ({ error }) => {
  const navigate = useNavigate()

  if (error === 'clientError') {
    return (
      <div className='w-full h-full'>
        <div className='flex flex-col justify-start items-center pt-24 gap-y-10'>
          <div className='flex items-center gap-x-3'>
            <span className='text-9xl text-white'>4</span>
            <span className='text-9xl text-white'>0</span>
            <span className='text-9xl text-white'>4</span>
          </div>

          <p className='text-xl text-white font-medium tracking-widest pl-10'>
            The page you were looking for doesn't exist.
          </p>

          <div className='flex gap-x-10'>
            <Button variant='primary' onClick={() => navigate('/')}>
              <span>Go to Home</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col justify-start items-center pt-24 gap-y-10'>
        <div className='flex items-center gap-x-3'>
          <span className='text-9xl text-white'>5</span>
          <span className='text-9xl text-white'>0</span>
          <span className='text-9xl text-white'>5</span>
        </div>

        <p className='text-xl text-white font-medium tracking-widest pl-10'>
          Server not responding, please try again later
        </p>

        <div className='flex gap-x-10'>
          <Button variant='primary' onClick={() => window.location.reload()}>
            <span className='tracking-normal'>Try again</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Error
