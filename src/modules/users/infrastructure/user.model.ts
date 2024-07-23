import { Document, model, Schema } from 'mongoose'
import { EncryptService } from '../../encrypting/encrypt.service'
import { IUser } from '../domain/user'

type IUserDocument = IUser & Document

const userSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

userSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await EncryptService.hash(this.password)
  }

  next()
})

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.password
  }
})

export const UserModel = model<IUser>('User', userSchema)
