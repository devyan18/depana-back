import { IWorkspace } from '../../workspaces/domain/workspace'

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  workspace: IWorkspace;
}
