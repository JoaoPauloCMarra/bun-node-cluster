import type { User } from '../entities/User';
import { UserInteractor } from '../usecases/UserInteractor';

export class HttpController {
  constructor(private userInteractor: UserInteractor) {}

  async handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === '/users') {
      if (method === 'GET') {
        const users = this.userInteractor.getAllUsers();
        return new Response(JSON.stringify(users), {
          headers: { 'Content-Type': 'application/json' },
        });
      } else if (method === 'POST') {
        const user: Omit<User, 'id'> = await request.json();
        const newUser = this.userInteractor.createUser(user);
        return new Response(JSON.stringify(newUser), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else if (path.startsWith('/users/')) {
      const id = path.split('/')[2];
      if (method === 'GET') {
        const user = this.userInteractor.getUserById(id);
        if (user) {
          return new Response(JSON.stringify(user), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } else if (method === 'PUT') {
        const updatedUserData: Omit<User, 'id'> = await request.json();
        const updatedUser = this.userInteractor.updateUser(id, updatedUserData);
        if (updatedUser) {
          return new Response(JSON.stringify(updatedUser), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } else if (method === 'DELETE') {
        const deleted = this.userInteractor.deleteUser(id);
        if (deleted) {
          return new Response(null, { status: 204 });
        }
      }
    }

    return new Response('Not Found', { status: 404 });
  }
}
