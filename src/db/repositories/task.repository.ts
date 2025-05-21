import 'reflect-metadata'
import { Knex } from 'knex';
import { Task } from '../../interfaces/task.interface';


export class TaskRepository {
  private readonly knex: Knex;

  constructor({ db }: { db: any }) {
    this.knex = db.queryBuilder;
  }

  async findAll(filters: { status?: string; search?: string }): Promise<Task[]> {
    let query = this.knex('tasks').select('*');

    if (filters.status) {
      query = query.where('status', filters.status);
    }

    if (filters.search) {
      query = query.where('title', 'ilike', `%${filters.search}%`);
    }

    return query;
  }

  async findById(id: number): Promise<Task | undefined> {
    return this.knex('tasks').where({ id }).first();
  }

  async create(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    const [task] = await this.knex('tasks')
      .insert({
        ...taskData,
        created_at: this.knex.fn.now(),
        updated_at: this.knex.fn.now(),
      })
      .returning('*');
    return task;
  }

  async update(id: number, taskData: Partial<Omit<Task, 'id' | 'created_at'>>): Promise<Task | undefined> {
    const [task] = await this.knex('tasks')
      .where({ id })
      .update({
        ...taskData,
        updated_at: this.knex.fn.now(),
      })
      .returning('*');
    return task;
  }

  async delete(id: number): Promise<number> {
    return this.knex('tasks').where({ id }).del();
  }

  async markOldTasksAsComplete(days: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.knex('tasks')
      .where('status', 'pending')
      .andWhere('created_at', '<', cutoffDate)
      .update({
        status: 'completed',
        updated_at: this.knex.fn.now(),
      });
  }
}