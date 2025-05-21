"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex('tasks').del();
        // Inserts seed entries
        yield knex('tasks').insert([
            {
                title: 'Complete project setup',
                description: 'Initialize the project with all required dependencies',
                status: 'completed',
            },
            {
                title: 'Implement database migrations',
                description: 'Create tasks table with proper schema',
                status: 'completed',
            },
            {
                title: 'Set up dependency injection',
                description: 'Configure Awilix for DI',
                status: 'pending',
            },
            {
                title: 'Create task controller',
                description: 'Implement CRUD operations for tasks',
                status: 'pending',
            },
            {
                title: 'Add validation middleware',
                description: 'Validate request payloads',
                status: 'pending',
            },
            {
                title: 'Implement real-time updates',
                description: 'Integrate Ably for real-time notifications',
                status: 'pending',
            },
            {
                title: 'Set up job scheduling',
                description: 'Automatically mark old tasks as completed',
                status: 'pending',
            },
            {
                title: 'Create API documentation',
                description: 'Generate Swagger docs for all endpoints',
                status: 'pending',
            },
            {
                title: 'Write tests',
                description: 'Add unit and integration tests',
                status: 'pending',
            },
            {
                title: 'Deploy to production',
                description: 'Set up CI/CD pipeline',
                status: 'pending',
            },
        ]);
    });
}
