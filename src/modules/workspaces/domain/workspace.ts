import { ITask } from '../../tasks/domain/task'
import { IUser } from '../../users/domain/user'

export interface IWorkspace {
  id: string;
  title: string;
  description: string;
  tasks: ITask[];
  creator: IUser;
  users: IUser[]
}
