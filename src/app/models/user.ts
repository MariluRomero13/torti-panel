export class IUser {
  id?: number;
  name?: string;
  username: string;
  email: string;
  password?: string;
}

export interface IPassword {
  user: number;
  password: string;
  newPassword: string;
}
