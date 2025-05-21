import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tasks').del();

  // Inserts seed entries
  await knex('tasks').insert([
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
}