import { Logger } from '../config/logger';
import { TaskService } from '../services/task.services';

export function markOldTasksAsComplete({
  taskService,
  logger,
}: {
  taskService: TaskService;
  logger: Logger;
}) {
  return async function () {
    try {
      logger.info('Starting job: markOldTasksAsComplete');
      const updatedCount = await taskService.markOldTasksAsComplete(7);
      logger.info(`Job completed: marked ${updatedCount} tasks as complete`);
    } catch (error) {
      logger.error('Job failed: markOldTasksAsComplete', error);
    }
  };
}