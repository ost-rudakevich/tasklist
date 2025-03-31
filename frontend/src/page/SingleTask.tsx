import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useGetTaskByIdQuery } from '../services/task/task.service'
import Loading from '../ui/loading/Loading'
import Error from '../ui/error/Error'

const SingleTask: FC = () => {
  const { taskId = '' } = useParams()
  console.log(taskId)
  const { data, isError, isLoading } = useGetTaskByIdQuery(Number(taskId))

  if (isLoading) {
    return <Loading />
  }

  if (isError || !data) {
    return <Error error='serverError' />
  }

  return (
    <div className='flex flex-col gap-y-5'>
      <span className='text-white'>ID: {data.id}</span>
      <span className='text-white'>STATUS: {data.status}</span>
      <span className='text-white'>TITLE: {data.title}</span>
      <span className='text-white'>DESCRIPTION: {data.description}</span>
    </div>
  )
}

export default SingleTask
