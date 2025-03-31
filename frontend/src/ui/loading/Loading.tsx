import { FC } from 'react'
import { Spinner } from '@chakra-ui/react'
import { ILoadingProps } from './loading.interface'

const Loading: FC<ILoadingProps> = ({ size = 'xl' }) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner thickness='4px' speed='0.65s' color='red' size={size} />
    </div>
  )
}

export default Loading
