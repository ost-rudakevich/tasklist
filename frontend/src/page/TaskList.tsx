import { useGetAllTasksQuery } from '../services/task/task.service'
import { FC } from 'react'
import TaskItem from '../component/task-item/TaskItem'
import Loading from '../ui/loading/Loading'
import Error from '../ui/error/Error'
import Button from '../ui/button/Button'
import { Link } from 'react-router-dom'

const TaskList: FC = () => {
  const { data, isLoading, error } = useGetAllTasksQuery()

  if (isLoading) {
    return (
      <div className='flex flex-col items-center w-[60%] h-screen gap-y-3 mt-10'>
        <Loading />
      </div>
    )
  }

  if (error || !data) {
    return <Error error='serverError' />
  }

  return (
    <div className='flex flex-col items-center w-[80%] gap-y-3 mt-10 h-[250px]'>
      <h1 className='text-white text-7xl'>Список завдань:</h1>
      <div className='w-full flex justify-start'>
        <Link to='/tasks/create'>
          <Button variant='primary'>Додати+</Button>
        </Link>
      </div>
      <div className='overflow-y-auto h-full w-full'>
        {data.map(task => {
          return (
            <TaskItem
              key={task.id}
              id={task.id}
              description={task.description}
              title={task.title}
              status={task.status}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TaskList
