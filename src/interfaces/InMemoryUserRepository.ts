import type { User } from '../entities/User';
import type { UserRepository } from '../usecases/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  constructor() {
    this.generateMockUsers(20);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateMockUsers(count: number): void {
    const firstNames = [
      'John',
      'Jane',
      'Mike',
      'Emily',
      'David',
      'Sarah',
      'Chris',
      'Laura',
      'Tom',
      'Emma',
    ];
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
      'Rodriguez',
      'Martinez',
    ];
    const domains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'example.com',
    ];

    for (let i = 0; i < count; i++) {
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const id = this.generateId();
      const user: User = {
        id,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      };
      this.users.set(id, user);
    }
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }

  create(user: Omit<User, 'id'>): User {
    const id = this.generateId();
    const newUser = { id, ...user };
    this.users.set(id, newUser);
    return newUser;
  }

  update(id: string, user: Omit<User, 'id'>): User | undefined {
    if (this.users.has(id)) {
      const updatedUser = { id, ...user };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  delete(id: string): boolean {
    return this.users.delete(id);
  }
}
