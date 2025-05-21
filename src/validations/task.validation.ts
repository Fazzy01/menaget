import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().nullable().optional().transform(val => val ?? null),
  status: z.enum(['pending', 'completed']).optional().default('pending'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;