import Ably from 'ably';
import { Logger } from './logger';
import { Task } from '../interfaces/task.interface';

export class AblyService {
  private readonly ably: Ably.Realtime;
  private readonly logger: Logger;

  constructor({ logger }: { logger: Logger }) {
    if (!process.env.ABLY_API_KEY) {
      throw new Error('ABLY_API_KEY is not defined');
    }

    this.ably = new Ably.Realtime(process.env.ABLY_API_KEY);

    this.logger = logger;

    this.ably.connection.on((stateChange) => {
      this.logger.info(`Ably connection state changed to ${stateChange.current}`);

      if (stateChange.current === 'failed') {
        this.logger.warn(`Ably connection failed: ${stateChange.reason}`);
      }
    });
  }

  async publishTaskEvent(action: 'created' | 'updated' | 'deleted', task: Task): Promise<void> {
    try {
      const channel = this.ably.channels.get('task-updates');
      await channel.publish('task-event', { action, task });
      this.logger.info(`Published task ${action} event for task ${task.id}`);
    } catch (error) {
      this.logger.error('Failed to publish task event', error);
    }
  }
}