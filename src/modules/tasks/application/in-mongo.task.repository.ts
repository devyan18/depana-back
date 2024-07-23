import { Model } from 'mongoose'
import { ITask } from '../domain/task'
import { TaskRepository } from '../domain/task.repository'
import { WorkspaceRepository } from '../../workspaces/domain/workspace.repository'

export class InMongoTaskRepository implements TaskRepository {
  constructor (
    private readonly TaskModel: Model<ITask>,
    private readonly workspaceRepository: WorkspaceRepository
  ) {}

  async save (task: ITask, workspaceId: string): Promise<ITask> {
    try {
      const newTask = new this.TaskModel(task)
      const taskData = await newTask.save()

      if (!taskData) throw new Error('Error saving task')

      await this.workspaceRepository.addTask(workspaceId, taskData.id!)

      return taskData.toJSON()
    } catch (error) {
      console.log(error)
      throw new Error('Error saving task')
    }
  }

  async findById (id: string): Promise<ITask | null> {
    try {
      const taskFound = await this.TaskModel.findOne({
        _id: id
      }).populate('workspace')

      if (!taskFound) return null

      const jsonTask = taskFound.toJSON()
      return jsonTask
    } catch (error) {
      console.log(error)
      throw new Error('Error finding task')
    }
  }

  async toggleCompleted (id: string, userId: string): Promise<ITask | null> {
    try {
      const taskFound = await this.TaskModel.findOne({
        _id: id
      }).populate('workspace')

      if (!taskFound) return null

      const workspace = await this.workspaceRepository.findById(taskFound.workspace.id)

      if (!workspace) throw new Error('Workspace not found')

      const isUserInWorkspace = await this.workspaceRepository.findUserWorkspaces(userId)

      const isUserInWorkspaceFound = isUserInWorkspace.find(workspace => workspace.id === taskFound.workspace.id)

      if (!isUserInWorkspaceFound) throw new Error('User not in workspace')

      taskFound.completed = !taskFound.completed

      const taskData = await taskFound.save()

      return taskData.toJSON()
    } catch (error) {
      console.log(error)
      throw new Error('Error toggling task completed')
    }
  }
}
