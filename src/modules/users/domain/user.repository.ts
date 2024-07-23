import { IUser } from './user'

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser>;
}
