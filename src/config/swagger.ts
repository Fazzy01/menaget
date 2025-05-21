import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { version } from '../../package.json';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API for Menaget',
      version,
      description: 'API for managing tasks with real-time updates',
    },
    servers: [
      {
        url: 'http://localhost:3100',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            title: {
              type: 'string',
              example: 'Complete project setup',
            },
            description: {
              type: 'string',
              example: 'Initialize the project with all required dependencies',
            },
            status: {
              type: 'string',
              enum: ['pending', 'completed'],
              example: 'pending',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2023-10-01T12:00:00Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2023-10-01T12:00:00Z',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.routes.ts', './src/validations/*.validation.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

// export function setupSwagger(app: Express): void {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// }
export function setupSwagger(app: any): void {
    console.log('Setting up Swagger UI...')
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger UI setup complete.');

}
