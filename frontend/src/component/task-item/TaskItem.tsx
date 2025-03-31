import { FC } from 'react'
import { TaskItemProps } from './task-items-props.interface'
import TaskAction from './task-action/TaskAction'

const TaskItem: FC<TaskItemProps> = ({ id, description, status, title }) => {
  return (
    <div className='w-full flex items-center justify-between bg-primary mt-4 px-5 py-2 rounded-md transition-colors'>
      <span className='w-44 text-white flex justify-start items-center overflow-x-auto text-nowrap pb-1'>
        {status}
      </span>
      <span className='w-44 text-white flex justify-start items-center overflow-x-auto text-nowrap pb-1'>
        {title}
      </span>
      <p className='text-white overflow-x-auto w-48 whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'>
        {description ? description : 'Додайте опис'}
      </p>
      <TaskAction id={id} title={title} />
    </div>
  )
}

export default TaskItem
