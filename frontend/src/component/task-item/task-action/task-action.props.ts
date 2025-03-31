import { TaskType } from '../../../types/task.type'

export interface ITaskActionProps
  extends Omit<TaskType, 'description' | 'status'> {}
