import { createContainer, asClass, asFunction, asValue } from 'awilix';
import { Database } from '../config/database';
import { AblyService } from '../config/ably';
import { TaskService } from '../services/task.services';
import { TaskRepository } from '../db/repositories/task.repository';
import { TaskController } from '../controllers/task.controller';
import { markOldTasksAsComplete } from '../jobs/task.job';
import { Logger } from './logger';
import { App } from '../app';

export const container = createContainer();

export function setupContainer() {
  container.register({
    app: asClass(App).singleton(),
    // Config
    db: asClass(Database).singleton(),
    logger: asClass(Logger).singleton(),
    ablyService: asClass(AblyService).singleton(),

    // Repositories
    taskRepository: asClass(TaskRepository).singleton(),

    // Services
    taskService: asClass(TaskService).singleton(),

    // Controllers
    taskController: asClass(TaskController).singleton(),


    // Jobs
    markOldTasksAsComplete: asFunction(markOldTasksAsComplete).singleton(),
  });
}