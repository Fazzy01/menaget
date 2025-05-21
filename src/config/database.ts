import knex from 'knex';
import knexConfig from '../knexfile';
import { Logger } from './logger';

export class Database {
  private readonly logger: Logger;
  public readonly queryBuilder: knex.Knex;

  constructor({ logger }: { logger: Logger }) {
    this.logger = logger;
    const environment = process.env.NODE_ENV || 'development';
    this.queryBuilder = knex(knexConfig[environment]);

    this.testConnection()
      .then(() => {
        this.logger.info('Database connection established successfully');
      })
      .catch((error) => {
        this.logger.error('Failed to establish database connection', error);
        process.exit(1);
      });
  }

  private async testConnection(): Promise<void> {
    await this.queryBuilder.raw('SELECT 1');
  }

  async runMigrations(): Promise<void> {
    try {
      await this.queryBuilder.migrate.latest();
      this.logger.info('Database migrations run successfully');
    } catch (error) {
      this.logger.error('Failed to run database migrations', error);
      throw error;
    }
  }
// async runMigrations(): Promise<void> {
//     try {
//       if (process.env.NODE_ENV === 'production') {
//         // In production, use the compiled JS migrations
//         await this.queryBuilder.migrate.latest();
//       } else {
//         // In development, use TS migrations directly
//         require('ts-node/register');
//         await this.queryBuilder.migrate.latest();
//       }
//       this.logger.info('Database migrations run successfully');
//     } catch (error) {
//       this.logger.error('Failed to run database migrations', error);
//       throw error;
//     }
//   }

  async seedDatabase(): Promise<void> {
    try {
      await this.queryBuilder.seed.run();
      this.logger.info('Database seeded successfully');
    } catch (error) {
      this.logger.error('Failed to seed database', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.queryBuilder.destroy();
  }
}