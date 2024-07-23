import { IWorkspace } from './workspace'

export interface WorkspaceRepository {
  save(workspace: IWorkspace): Promise<IWorkspace>;
  update(workspace: IWorkspace): Promise<IWorkspace>;
  delete(id: string, userId: string): Promise<boolean>;
  addUser(workspaceId: string, userId: string): Promise<IWorkspace>;
  removeUser(workspaceId: string, userId: string): Promise<IWorkspace>;
  addTask(workspaceId: string, taskId: string): Promise<IWorkspace>;
  removeTask(workspaceId: string, taskId: string): Promise<IWorkspace>;
  findUserWorkspaces(userId: string): Promise<IWorkspace[]>;
  findById(id: string): Promise<IWorkspace | null>;
  findByTitle(title: string): Promise<IWorkspace | null>;
}
