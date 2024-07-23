import { Model } from 'mongoose'
import { IUser } from '../domain/user'
import { IUserRepository } from '../domain/user.repository'

export class InMongoUserRepository implements IUserRepository {
  constructor (
    private readonly UserModel: Model<IUser>
  ) {}

  async findById (id: string): Promise<IUser | null> {
    const userFound = await this.UserModel.findOne({
      _id: id
    })
    if (!userFound) return null

    const jsonUser = userFound.toJSON()
    console.log(jsonUser)
    return jsonUser
  }

  async findByEmail (email: string): Promise<IUser | null> {
    const userFound = this.UserModel.findOne({
      email
    })

    if (!userFound) return null

    return userFound
  }

  async save (user: IUser): Promise<IUser> {
    const newUser = new this.UserModel(user)
    const userData = await newUser.save()
    return userData.toJSON()
  }
}
