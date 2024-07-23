import { Document, model, Schema } from 'mongoose'
import { ITask } from '../domain/task'

export type TaskDocument = ITask & Document

const taskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  workspace: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

taskSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

export const TaskModel = model<ITask>('Task', taskSchema)
