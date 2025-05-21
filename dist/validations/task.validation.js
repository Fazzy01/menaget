"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().nullable().optional().transform(val => val !== null && val !== void 0 ? val : null),
    status: zod_1.z.enum(['pending', 'completed']).optional().default('pending'),
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(['pending', 'completed']).optional(),
});
