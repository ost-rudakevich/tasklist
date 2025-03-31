import { FC } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { useDeleteTaskMutation } from '../../../services/task/task.service'
import useCustomToast from '../../../hooks/useCustomToast'
import { hasErrorField } from '../../../utils/has-error-field'
import Button from '../../../ui/button/Button'
import { ITaskActionProps } from './task-action.props'

const TaskAction: FC<ITaskActionProps> = ({ id, title }) => {
  const [deleteTask] = useDeleteTaskMutation()
  const showToast = useCustomToast()

  const deleteTaskHandler = async () => {
    try {
      await deleteTask(id).unwrap()
      showToast({
        title: 'Увага!',
        description: `Ви удалили завдання ${title}`,
        status: 'info'
      })
    } catch (err) {
      const error = hasErrorField(err) ? err.data.message : 'Server not Found'
      showToast({
        title: 'Не вдалось видалити завдання.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }
  return (
    <div className='h-full flex gap-x-5'>
      <Link to={`/tasks/${id}`}>
        <Button variant='white' className='h-full'>
          <FaExternalLinkAlt />
        </Button>
      </Link>
      <Link to={`tasks/edit/${id}`}>
        <Button variant='white' className='h-full'>
          <FaPencilAlt />
        </Button>
      </Link>
      <Button variant='white' onClick={deleteTaskHandler}>
        <FaTrashAlt />
      </Button>
    </div>
  )
}
export default TaskAction
