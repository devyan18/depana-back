import { AuthRepository } from '../application/auth.repository'
import { userDependencies } from '../../users/infrastructure/dependencies'
import { env } from '../../../settings/env'

export const authDependencies = {
  authRepository: new AuthRepository(
    env.SECRET_KEY,
    userDependencies.userRepository
  )
}
