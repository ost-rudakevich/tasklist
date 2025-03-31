import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation
} from '../services/task/task.service'
import useCustomToast from '../hooks/useCustomToast'
import { ITaskEdit, TaskStatus } from '../types/task.type'
import Loading from '../ui/loading/Loading'
import Error from '../ui/error/Error'
import { hasErrorField } from '../utils/has-error-field'
import Field from '../ui/field/Field'
import Button from '../ui/button/Button'
import SelectComponent from '../ui/select-component/Select'

const UpdateTask: FC = () => {
  const { taskId = '' } = useParams()
  const { data, isLoading, isError } = useGetTaskByIdQuery(Number(taskId), {
    skip: !taskId || isNaN(Number(taskId))
  })
  const [updateTask] = useUpdateTaskMutation()
  const showToast = useCustomToast()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const statusData: { id: number; status: TaskStatus }[] = [
    {
      id: 1,
      status: TaskStatus.PENDING
    },
    {
      id: 2,
      status: TaskStatus.IN_PROGRESS
    },
    {
      id: 3,
      status: TaskStatus.COMPLETED
    }
  ]

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty }
  } = useForm<ITaskEdit>({
    mode: 'onChange',
    values: {
      title: data?.title || '',
      description: data?.description || '',
      status: data?.status! || ''
    }
  })

  if (isLoading) {
    return (
      <div className='h-full flex flex-col gap-y-10'>
        <Loading />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='h-full flex flex-col gap-y-10'>
        <Error error='serverError' />
      </div>
    )
  }

  const handleUpdateTask = async (taskData: ITaskEdit) => {
    try {
      if (isDirty) {
        const updatedTaskData = await updateTask({
          id: data.id,
          updateData: taskData
        }).unwrap()
        navigate(pathname.replace(taskId, updatedTaskData.id.toString()))
        showToast({
          title: 'Успіх!',
          description: `Ви успішно оновили завдання!`,
          status: 'success'
        })
      } else {
        showToast({
          title: 'Упс!',
          description: `Оновіть дані, інакше ви не зможете застосувати зміни.`,
          status: 'warning'
        })
      }
    } catch (e) {
      const error = hasErrorField(e) ? e.data.message : 'Server not found'
      showToast({
        title: 'Не вдалось оновити завдання.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  return (
    <div className='h-full flex flex-col text-white gap-y-10'>
      <h1 className='text-2xl'>Обновлення завдання</h1>
      <form
        onSubmit={handleSubmit(handleUpdateTask)}
        className='h-auto mt-7 pb-10'
      >
        <div className='flex gap-y-5 items-center justify-between flex-wrap pr-5'>
          <Field
            {...register('title', {
              required: 'Це обовязкове поле',
              minLength: {
                value: 1,
                message: 'Введіть більше 1 символа'
              }
            })}
            placeholder='Введіть назву завдання'
            error={errors.title?.message}
            style={{ height: '80px' }}
          />

          <div
            className='flex flex-col justify-end gap-y-2'
            style={{ marginBottom: '23px' }}
          >
            <Field
              {...register('description', {
                minLength: {
                  value: 1,
                  message: 'Введіть більше 1 символа'
                }
              })}
              placeholder='Введіть опис'
              error={errors.description?.message}
              style={{ height: '80px' }}
            />
          </div>

          <Controller
            name='status'
            control={control}
            defaultValue={data.status}
            rules={{
              required: 'Введіть статус завдання'
            }}
            render={({ field, fieldState: { error } }) => (
              <SelectComponent
                error={error?.message}
                field={field}
                value={data.status}
                placeholder='Список статусів'
                options={statusData.map(status => {
                  return { label: status.status, value: status.status }
                })}
              />
            )}
          />
        </div>

        <Button variant='primary'>Застосувати зміни</Button>
      </form>
    </div>
  )
}

export default UpdateTask
