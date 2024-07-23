import { IUser } from '../../users/domain/user'

export type IAuthReponse = {
  user: IUser
  token: string
}

export interface IAuthRepository {
  signIn(email: string, password: string): Promise<IAuthReponse>
  signUp(user: Partial<IUser>): Promise<IAuthReponse>
  getMe(token: string): Promise<IUser>
  signToken(id: string): Promise<string>
  verifyToken(token: string): Promise<string | null>
}
