import { InMongoUserRepository } from '../application/in-mongo.user.repository'
import { UserModel } from './user.model'

export const userDependencies = {
  userRepository: new InMongoUserRepository(UserModel)
}
