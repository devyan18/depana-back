import { EncryptService } from '../../encrypting/encrypt.service'
import { IUser } from '../../users/domain/user'
import { IUserRepository } from '../../users/domain/user.repository'
import { IAuthReponse, IAuthRepository } from '../domain/auth.repository'
import jwt, {} from 'jsonwebtoken'

type AuthPayload = {
  userId: string
}

export class AuthRepository implements IAuthRepository {
  constructor (
    private readonly secret: string,
    private readonly userReposiotry: IUserRepository
  ) {}

  async signIn (email: string, password: string): Promise<IAuthReponse> {
    const user = await this.userReposiotry.findByEmail(email)
    if (!user) {
      console.log('user not found')
      throw new Error('Invalid Credentials')
    }
    const matchPassword = await EncryptService.compare(password, user.password)

    if (!matchPassword) {
      console.log('password not match')
      throw new Error('Invalid Credentials')
    }
    const token = await this.signToken(user.id!)

    return { user, token }
  }

  async signUp (user: IUser): Promise<IAuthReponse> {
    const newUser = await this.userReposiotry.save(user)
    console.log(newUser)
    const token = await this.signToken(newUser.id!.toString())

    return { user: newUser, token }
  }

  async getMe (token: string): Promise<IUser> {
    const id = await this.verifyToken(token)
    if (!id) {
      console.log('invalid token')
      throw new Error('Invalid Token')
    }

    const user = await this.userReposiotry.findById(id)
    if (!user) throw new Error('User not found')

    return user
  }

  async signToken (id: string): Promise<string> {
    try {
      const payload: AuthPayload = { userId: id }
      return jwt.sign(payload, this.secret)
    } catch (error) {
      console.log(error)
      throw new Error('Error signing token')
    }
  }

  async verifyToken (token: string): Promise<string | null> {
    try {
      const payload = jwt.verify(token, this.secret) as AuthPayload

      if (!payload.userId) return null

      return payload.userId
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
