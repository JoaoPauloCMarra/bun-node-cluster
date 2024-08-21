import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { InMemoryUserRepository } from './interfaces/InMemoryUserRepository';
import { UserInteractor } from './usecases/UserInteractor';
import { HttpController } from './interfaces/HttpController';

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const userRepository = new InMemoryUserRepository();
  const userInteractor = new UserInteractor(userRepository);
  const httpController = new HttpController(userInteractor);

  Bun.serve({
    port: 3000,
    fetch: (request) => httpController.handleRequest(request),
  });
}
