"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
exports.setupContainer = setupContainer;
const awilix_1 = require("awilix");
const database_1 = require("../config/database");
const ably_1 = require("../config/ably");
const task_services_1 = require("../services/task.services");
const task_repository_1 = require("../db/repositories/task.repository");
const task_controller_1 = require("../controllers/task.controller");
const task_job_1 = require("../jobs/task.job");
const logger_1 = require("./logger");
const app_1 = require("../app");
exports.container = (0, awilix_1.createContainer)();
function setupContainer() {
    exports.container.register({
        app: (0, awilix_1.asClass)(app_1.App).singleton(),
        // Config
        db: (0, awilix_1.asClass)(database_1.Database).singleton(),
        logger: (0, awilix_1.asClass)(logger_1.Logger).singleton(),
        ablyService: (0, awilix_1.asClass)(ably_1.AblyService).singleton(),
        // Repositories
        taskRepository: (0, awilix_1.asClass)(task_repository_1.TaskRepository).singleton(),
        // Services
        taskService: (0, awilix_1.asClass)(task_services_1.TaskService).singleton(),
        // Controllers
        taskController: (0, awilix_1.asClass)(task_controller_1.TaskController).singleton(),
        // Jobs
        markOldTasksAsComplete: (0, awilix_1.asFunction)(task_job_1.markOldTasksAsComplete).singleton(),
    });
}
