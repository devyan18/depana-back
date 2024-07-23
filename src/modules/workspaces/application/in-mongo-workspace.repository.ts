import { Model } from 'mongoose'
import { IWorkspace } from '../domain/workspace'
import { WorkspaceRepository } from '../domain/workspace.repository'

export class InMongoWorkspaceRepository implements WorkspaceRepository {
  constructor (
    private readonly WorkspaceModel: Model<IWorkspace>
  ) {}

  async findById (id: string): Promise<IWorkspace | null> {
    const workspaceFound = await this.WorkspaceModel.findOne({
      _id: id
    }).populate('creator').populate('users').populate('tasks')
    if (!workspaceFound) return null

    const jsonWorkspace = workspaceFound.toJSON()
    return jsonWorkspace
  }

  async findUserWorkspaces (userId: string): Promise<IWorkspace[]> {
    try {
      const workspacesFound = await this.WorkspaceModel.find({
        users: userId
      }).populate('creator').populate('users').populate('tasks')

      const jsonWorkspaces = workspacesFound.map(workspace => workspace.toJSON())
      return jsonWorkspaces
    } catch (error) {
      console.log(error)
      throw new Error('Error finding user workspaces')
    }
  }

  async findByTitle (title: string): Promise<IWorkspace | null> {
    try {
      const workspaceFound = await this.WorkspaceModel.findOne({
        title
      }).populate('creator').populate('users').populate('tasks')
      if (!workspaceFound) return null

      return workspaceFound
    } catch (error) {
      console.log(error)
      throw new Error('Error finding workspace by title')
    }
  }

  async save (workspace: IWorkspace): Promise<IWorkspace> {
    try {
      const newWorkspace = new this.WorkspaceModel(workspace)
      const workspaceData = await newWorkspace.save()
      return workspaceData.toJSON()
    } catch (error) {
      console.log(error)
      throw new Error('Error saving workspace')
    }
  }

  async update (workspace: IWorkspace): Promise<IWorkspace> {
    try {
      const workspaceUpdated = await this.WorkspaceModel.findOneAndUpdate({
        _id: workspace.id
      }, workspace, { new: true })
      if (!workspaceUpdated) throw new Error('Workspace not found')
      return workspaceUpdated.toJSON()
    } catch (error) {
      console.log(error)
      throw new Error('Error updating workspace')
    }
  }

  async delete (id: string, userId: string): Promise<boolean> {
    try {
      const workspaceDeleted = await this.WorkspaceModel.findOneAndDelete({
        _id: id,
        creator: userId
      }, { new: true })
      if (!workspaceDeleted) return false
      return true
    } catch (error) {
      console.log(error)
      throw new Error('Error deleting workspace')
    }
  }

  async addUser (workspaceId: string, userId: string): Promise<IWorkspace> {
    try {
      const workspace = await this.findById(workspaceId)
      if (!workspace) throw new Error('Workspace not found')

      const workspaceUpdated = await this.WorkspaceModel.findOneAndUpdate({
        _id: workspaceId
      }, {
        $push: {
          users: userId
        }
      }, { new: true })

      if (!workspaceUpdated) throw new Error('Error updating workspace')

      return workspaceUpdated.toJSON()
    } catch (error) {
      console.log(error)
      throw new Error('Error adding user to workspace')
    }
  }

  async removeUser (workspaceId: string, userId: string): Promise<IWorkspace> {
    try {
      const workspace = await this.findById(workspaceId)
      if (!workspace) throw new Error('Workspace not found')

      const workspaceUpdated = await this.WorkspaceModel.findOneAndUpdate({
        _id: workspaceId
      }, {
        $pull: {
          users: userId
        }
      }, { new: true })

      if (!workspaceUpdated) throw new Error('Error updating workspace')

      return workspaceUpdated.toJSON()
    } catch (error) {
      console.log(error)
      throw new Error('Error removing user from workspace')
    }
  }

  async addTask (workspaceId: string, taskId: string): Promise<IWorkspace> {
    try {
      const workspace = await this.findById(workspaceId)
      if (!workspace) throw new Error('Workspace not found')

      const workspaceUpdated = await this.WorkspaceModel.findOneAndUpdate({
        _id: workspaceId
      }, {
        $push: {
          tasks: taskId
        }
      }, { new: true })

      if (!workspaceUpdated) throw new Error('Error updating workspace')

      return workspaceUpdated.toJSON()
    } catch (error) {
      console.log(error)
      throw new Error('Error adding task to workspace')
    }
  }

  async removeTask (workspaceId: string, taskId: string): Promise<IWorkspace> {
    try {
      const workspace = await this.findById(workspaceId)
      if (!workspace) throw new Error('Workspace not found')

      const workspaceUpdated = await this.WorkspaceModel.findOneAndUpdate({
        _id: workspaceId
      }, {
        $pull: {
          tasks: taskId
        }
      }, { new: true })

      if (!workspaceUpdated) throw new Error('Error updating workspace')

      return workspaceUpdated.toJSON()
    } catch (error) {
      console.log(error)
      throw new Error('Error removing task from workspace')
    }
  }
}
