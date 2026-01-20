import { Role } from '../types/roles';

export interface User {
  username: string;
  role: Role;
  password: string;
}

// Pre-hashed passwords (plain text: admin123, john123, jane123)
export const users: User[] = [
  {
    username: 'admin',
    role: Role.ADMIN,
    password: '$2b$10$Jzifm7N1DFIKkQvnlAUtCOk3NgczCSew8VBoIpxfSnmajIBr.SfOG'
  },
  {
    username: 'john',
    role: Role.USER,
    password: '$2b$10$zE.qFf8wqsuES5yWjA8jketN2VEduveegDttxDfEIEjNZJEUE8ldS'
  },
  {
    username: 'jane',
    role: Role.USER,
    password: '$2b$10$k/8ApQ/TTgy1wkQWTIgwF.PPHko0nZRv.iY91kSNsLprBi1eFBzf.'
  }
];
