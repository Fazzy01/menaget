"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_express_1 = require("awilix-express");
const task_controller_1 = require("../controllers/task.controller");
const taskRoutes = (0, awilix_express_1.createController)(task_controller_1.TaskController)
    .prefix('/tasks')
    .get('/', 'getAllTasks')
    .post('/', 'createTask')
    .get('/:id', 'getTaskById')
    .patch('/:id', 'updateTask')
    .delete('/:id', 'deleteTask');
exports.default = taskRoutes;
