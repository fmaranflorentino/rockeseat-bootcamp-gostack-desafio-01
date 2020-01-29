import { Router } from 'express';

const routes = new Router();
let projects = [];

function verifyProjectExists(req, res, next) {
  const { id } = req.params;

  const hasId = projects.find(project => project.id == id);

  if (!hasId) {
    return res.status(400)
    .json({ error: "Project does not exists." });
  }

  next();
}

routes.get('/', (req, res) => {
  return res.json({ data: projects });
});

routes.post('/', (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({ id, title, tasks })

  return res.json(projects);
});

routes.put('/:id', verifyProjectExists, (req, res) => {
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

routes.delete('/:id', verifyProjectExists, (req, res) => {
  const { id } = req.params;
  
  const projectIndex = projects.findIndex(project => project.id === id);
  projects.splice(projectIndex, 1)

  return res.send();
});

routes.post('/:id/tasks', verifyProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);
  projects[projectIndex].tasks.push(title);

  return res.json(projects);
});

export default routes;
