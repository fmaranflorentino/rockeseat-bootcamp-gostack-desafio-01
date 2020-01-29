import { Router } from 'express';
import projectsRoutes from './routes/projects';
const routes = new Router();

let requests = 0;

routes.use((req, res, next) => {
  requests++;
  console.log(`Number of request send until now ${requests}`);

  next();
});

routes.use('/projects', projectsRoutes);

export default routes;