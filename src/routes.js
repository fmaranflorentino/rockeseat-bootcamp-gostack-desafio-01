import { Router } from 'express';

const routes = new Router();

let projects = [];

routes.get('/projects', (req, res) => {
  return res.json({ data: projects });
});

routes.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({ id, title, tasks })

  return res.json(projects);
});

routes.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, tasks } = req.body;
  const edittedProject = { title, tasks };

  projects = projects.map((project) => {
    if (project.id === id) {
      project = { ...edittedProject, id };
    }
    return project;
  })

  return res.json(projects);
});

routes.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  
  const projectIndex = projects.findIndex(project => project.id === id);
  projects.splice(projectIndex, 1)

  return res.send();
});

routes.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);
  projects[projectIndex].tasks.push(title);

  return res.json(projects);
});

export default routes;