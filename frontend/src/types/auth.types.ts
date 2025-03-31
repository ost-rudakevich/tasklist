import { IUser } from './user.types'

export interface IAuthData {
  email: string
  password: string
  name?: string
}

export interface IToken {
  token: string
}

export interface IAuthResponse extends IToken {
  user: IUser
}
