import { ITaskEdit, TaskType } from '../../types/task.type'
import { api } from '../api'
import { EnumTaskEndpoints } from './task.service.interface'

export const taskApi = api.injectEndpoints({
  endpoints: build => ({
    getAllTasks: build.query<TaskType[], void>({
      query: () => ({
        url: EnumTaskEndpoints.TASKS,
        method: 'GET',
        credentials: 'include'
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Task' as const, id })),
              { type: 'Task', id: 'LIST' }
            ]
          : [{ type: 'Task', id: 'LIST' }]
    }),

    getTaskById: build.query<TaskType, number>({
      query: id => ({
        url: `${EnumTaskEndpoints.TASKS}/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'Task', id }]
    }),

    createTask: build.mutation<TaskType, ITaskEdit>({
      query: taskData => ({
        url: EnumTaskEndpoints.TASKS,
        method: 'POST',
        body: taskData
      }),
      invalidatesTags: ['Task']
    }),

    updateTask: build.mutation<TaskType, { id: number; updateData: ITaskEdit }>(
      {
        query: ({ id, updateData }) => ({
          url: `${EnumTaskEndpoints.TASKS}/${id}`,
          method: 'PUT',
          body: updateData
        }),
        invalidatesTags: (result, error, arg) => [
          { type: 'Task', id: arg.id },
          { type: 'Task', id: 'LIST' }
        ]
      }
    ),

    deleteTask: build.mutation<void, number>({
      query: id => ({
        url: `${EnumTaskEndpoints.TASKS}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Task', id },
        { type: 'Task', id: 'LIST' }
      ]
    })
  })
})

export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} = taskApi
