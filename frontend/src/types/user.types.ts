export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface IUser {
  id: number
  name: string
  email: string
  role: UserRole
  createdAt: string
}

export interface IUserEditInput
  extends Pick<IUser, 'name' | 'email' | 'role'> {}
