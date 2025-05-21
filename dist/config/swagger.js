"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
// src/config/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const package_json_1 = require("../../package.json");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management API for Menaget',
            version: package_json_1.version,
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
function setupSwagger(app) {
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    console.log('Setting up Swagger UI...');
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log('Swagger UI setup complete.');
}
