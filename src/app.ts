import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { loadControllers, scopePerRequest } from 'awilix-express';
import { container } from './config/container';
import { Logger } from './config/logger';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import { setupSwagger } from './config/swagger';

export class App {
  private readonly app: express.Application;
  private readonly logger: Logger;

  constructor() {
    this.app = express();
    this.logger = container.resolve('logger');

    this.setupMiddlewares();
    setupSwagger(this.app);
    this.setupRoutes();
    this.setupErrorHandlers();
  }

  private setupMiddlewares(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(scopePerRequest(container));
  }


  private setupRoutes(): void {

    this.app.get('/', (req, res) => {
        res.json({mesaage: 'Nothing to see here. This is an endpoint.'});
    });


    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    this.app.use(loadControllers('./routes/*.routes.*', { cwd: __dirname }));

  }

  private setupErrorHandlers(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      this.logger.info(`Server is running on port ${port}`);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}