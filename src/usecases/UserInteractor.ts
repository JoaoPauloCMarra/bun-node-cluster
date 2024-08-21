import type { User } from '../entities/User';
import type { UserRepository } from './UserRepository';

export class UserInteractor {
  constructor(private repository: UserRepository) {}

  getAllUsers(): User[] {
    return this.repository.findAll();
  }

  getUserById(id: string): User | undefined {
    return this.repository.findById(id);
  }

  createUser(user: Omit<User, 'id'>): User {
    return this.repository.create(user);
  }

  updateUser(id: string, user: Omit<User, 'id'>): User | undefined {
    return this.repository.update(id, user);
  }

  deleteUser(id: string): boolean {
    return this.repository.delete(id);
  }
}
