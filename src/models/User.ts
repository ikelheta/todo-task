export interface IUser {
  name: string
  email: string
  password: string
  verified: boolean
}

export class User implements IUser {
  name: string
  email: string
  password: string
  verified = false

  constructor(o: any) {
    o = o ? o : {};
    this.name = o.name
    this.email = o.email
    this.password = o.password
  }
}