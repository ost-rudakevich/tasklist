export type TaskType = {
  id: number
  title: string
  description: string
  status: TaskStatus
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed'
}

export interface ITaskEdit extends Omit<TaskType, 'id'> {}
