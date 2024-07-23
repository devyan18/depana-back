import { Document, model, Schema } from 'mongoose'

import { IWorkspace } from '../domain/workspace'

export type IWorkspaceDocument = IWorkspace & Document

const workspaceSchema = new Schema<IWorkspaceDocument>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
  versionKey: false
})

workspaceSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

export const WorkspaceModel = model<IWorkspaceDocument>('Workspace', workspaceSchema)
