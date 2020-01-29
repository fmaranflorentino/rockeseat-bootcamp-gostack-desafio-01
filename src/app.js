import express from 'express';
import routes from './routes';

class App {
  requests = 0;
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }
  
  middlewares() {
    this.server.use(express.json());

    this.server.use((req, res, next) => {
      this.requests++;
      console.log(`Number of request send until now ${this.requests}`);

      next();
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
