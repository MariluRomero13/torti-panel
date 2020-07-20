export interface IEmployee {
  id: number;
  name: string;
  paternal: string;
  maternal: string;
  phone: string;
  address: string;
  is_active: boolean;
  role_id: number;
  user_id?: number;
  username?: string;
  email?: string;
  password?: string;
}
