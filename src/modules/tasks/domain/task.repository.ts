import { ITask } from './task'

export interface TaskRepository {
  save(task: ITask, workspaceId: string): Promise<ITask>;
  findById(id: string): Promise<ITask | null>;
  toggleCompleted(id: string, userId: string): Promise<ITask | null>;
}
