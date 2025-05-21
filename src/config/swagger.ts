// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { version } from '../../package.json';

// Define the configuration type explicitly
interface SwaggerConfig {
  definition: {
    openapi: string;
    info: {
      title: string;
      version: string;
      description: string;
    };
    servers: Array<{
      url: string;
      description: string;
    }>;
    components: {
      schemas: {
        Task: {
          type: string;
          properties: {
            id: { type: string; example: number };
            title: { type: string; example: string };
            description: { type: string; example: string };
            status: { type: string; enum: string[]; example: string };
            created_at: { type: string; format: string; example: string };
            updated_at: { type: string; format: string; example: string };
          };
        };
        Error: {
          type: string;
          properties: {
            message: { type: string; example: string };
          };
        };
      };
    };
  };
  apis: string[];
}

const options: SwaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API for Menaget',
      version,
      description: 'API for managing tasks with real-time updates',
    },
    servers: [
      {
        url: 'https://menaget.onrender.com',
        description: 'Production server',
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

export function setupSwagger(app: any): void {
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger UI setup complete.');
}