import 'reflect-metadata';
import { TaskRepository } from '../db/repositories/task.repository';
import { Task } from '../interfaces/task.interface';
import { AblyService } from '../config/ably';
import { Logger } from '../config/logger';

export class TaskService {
  private readonly taskRepository: TaskRepository;
  private readonly ablyService: AblyService;
  private readonly logger: Logger;

  constructor({
    taskRepository,
    ablyService,
    logger,
  }: {
    taskRepository: TaskRepository;
    ablyService: AblyService;
    logger: Logger;
  }) {
    this.taskRepository = taskRepository;
    this.ablyService = ablyService;
    this.logger = logger;
  }

  async getAllTasks(filters: { status?: string; search?: string }): Promise<Task[]> {
    try {
      return await this.taskRepository.findAll(filters);
    } catch (error) {
      this.logger.error('Failed to get all tasks', error);
      throw error;
    }
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    try {
      return await this.taskRepository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to get task with id ${id}`, error);
      throw error;
    }
  }

  async createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    try {
      const task = await this.taskRepository.create(taskData);
      await this.ablyService.publishTaskEvent('created', task);
      return task;
    } catch (error) {
      this.logger.error('Failed to create task', error);
      throw error;
    }
  }

  async updateTask(id: number, taskData: Partial<Omit<Task, 'id' | 'created_at'>>): Promise<Task | undefined> {
    try {
      const task = await this.taskRepository.update(id, taskData);
      if (task) {
        await this.ablyService.publishTaskEvent('updated', task);
      }
      return task;
    } catch (error) {
      this.logger.error(`Failed to update task with id ${id}`, error);
      throw error;
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      const task = await this.taskRepository.findById(id);
      const deletedCount = await this.taskRepository.delete(id);
      if (deletedCount > 0 && task) {
        await this.ablyService.publishTaskEvent('deleted', task);
      }
    } catch (error) {
      this.logger.error(`Failed to delete task with id ${id}`, error);
      throw error;
    }
  }

  async markOldTasksAsComplete(days: number): Promise<number> {
    try {
      const updatedCount = await this.taskRepository.markOldTasksAsComplete(days);
      this.logger.info(`Marked ${updatedCount} old tasks as completed`);
      return updatedCount;
    } catch (error) {
      this.logger.error('Failed to mark old tasks as complete', error);
      throw error;
    }
  }
}