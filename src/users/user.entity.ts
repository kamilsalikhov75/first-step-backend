import { Role } from './user.schema';

export class User {
  name: string;
  email: string;
  password: string;
  role: Role;
}
