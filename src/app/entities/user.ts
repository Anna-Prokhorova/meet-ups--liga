import { IRole } from "./role"

export interface IUser {
    id: number,
    email: string,
    password: string,
    fio: string
    roles: Array<IRole>
  }