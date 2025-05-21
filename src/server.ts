import 'dotenv/config';
import cron from 'node-cron';
import { container, setupContainer } from './config/container';
import { App } from './app';
import { Database } from './config/database';
import { Logger } from './config/logger';
import { asValue } from 'awilix';

async function bootstrap() {
  // create the logger instance manually
  const logger = new Logger();

  try {
    // setup the container with the logger
    container.register({
      logger: asValue(logger)
    });

    // setup the rest of the container
    setupContainer();

    // Resolve dependencies after setup
    const db = container.resolve<Database>('db');
    await db.runMigrations();
    await db.seedDatabase();

    // Start the app
    const app = container.resolve<App>('app');
    const port = parseInt(process.env.PORT || '3000', 10);
    app.start(port);

    // Schedule jobs
    const markOldTasksAsComplete = container.resolve('markOldTasksAsComplete');
    cron.schedule('0 0 * * *', markOldTasksAsComplete, {
      timezone: 'Africa/Lagos', // Explicitly set timezone
    });

    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received. Shutting down gracefully...');
      await db.close();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received. Shutting down gracefully...');
      await db.close();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start application', error);
    process.exit(1);
  }
}

bootstrap();