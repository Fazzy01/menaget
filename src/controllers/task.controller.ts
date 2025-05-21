import { Request, Response } from 'express';
import { Logger } from '../config/logger';
import { TaskService } from '../services/task.services';
import { createTaskSchema, updateTaskSchema } from '../validations/task.validation';


export class TaskController {
  private readonly taskService: TaskService;
  private readonly logger: Logger;

  constructor({ taskService, logger }: { taskService: TaskService; logger: Logger }) {
    this.taskService = taskService;
    this.logger = logger;
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const { status, search } = req.query;
      const tasks = await this.taskService.getAllTasks({
        status: status as string | undefined,
        search: search as string | undefined,
      });
      res.json({message: "Success", "results": tasks});
    } catch (error) {
      this.logger.error('Error in getAllTasks', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.id, 10);
      const task = await this.taskService.getTaskById(taskId);

      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.json({message: "Success", "result": task});
    } catch (error) {
      this.logger.error('Error in getTaskById', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = createTaskSchema.parse(req.body);
      const newTask = await this.taskService.createTask(validatedData);
      res.status(201).json({message: "Success", "results": newTask});
    } catch (error) {
      this.logger.error('Error in createTask', error);
      res.status(400).json({ message: error instanceof Error ? error.message : 'Validation failed' });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.id, 10);
      const validatedData = updateTaskSchema.parse(req.body);
      const updatedTask = await this.taskService.updateTask(taskId, validatedData);

      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.json({message: "Success", "results": updatedTask});
    } catch (error) {
      this.logger.error('Error in updateTask', error);
      res.status(400).json({ message: error instanceof Error ? error.message : 'Validation failed' });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.id, 10);
      await this.taskService.deleteTask(taskId);
      res.status(204).send();
    } catch (error) {
      this.logger.error('Error in deleteTask', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}