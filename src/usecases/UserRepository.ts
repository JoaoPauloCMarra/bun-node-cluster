import type { User } from '../entities/User';

export interface UserRepository {
  findAll(): User[];
  findById(id: string): User | undefined;
  create(user: Omit<User, 'id'>): User;
  update(id: string, user: Omit<User, 'id'>): User | undefined;
  delete(id: string): boolean;
}
