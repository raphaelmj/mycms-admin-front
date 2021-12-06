import {UserRole} from './enums/user-role.enum';

export interface AuthUser {
  id: number;
  email: string;
  token: string;
}

export interface User {
  id?: number;
  email: string;
  password: string;
  role: UserRole;
  updatedAt?: Date;
  createdAt?: Date;
}
