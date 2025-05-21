import { createController } from 'awilix-express';
import { TaskController } from '../controllers/task.controller';

const taskRoutes = createController(TaskController)
   .prefix('/tasks')

   .get('/', 'getAllTasks')
   .post('/', 'createTask')
   .get('/:id', 'getTaskById')
   .patch('/:id', 'updateTask')
   .delete('/:id', 'deleteTask')


export default taskRoutes;
