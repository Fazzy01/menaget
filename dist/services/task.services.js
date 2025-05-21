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
exports.TaskService = void 0;
require("reflect-metadata");
class TaskService {
    constructor({ taskRepository, ablyService, logger, }) {
        this.taskRepository = taskRepository;
        this.ablyService = ablyService;
        this.logger = logger;
    }
    getAllTasks(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.taskRepository.findAll(filters);
            }
            catch (error) {
                this.logger.error('Failed to get all tasks', error);
                throw error;
            }
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.taskRepository.findById(id);
            }
            catch (error) {
                this.logger.error(`Failed to get task with id ${id}`, error);
                throw error;
            }
        });
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskRepository.create(taskData);
                yield this.ablyService.publishTaskEvent('created', task);
                return task;
            }
            catch (error) {
                this.logger.error('Failed to create task', error);
                throw error;
            }
        });
    }
    updateTask(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskRepository.update(id, taskData);
                if (task) {
                    yield this.ablyService.publishTaskEvent('updated', task);
                }
                return task;
            }
            catch (error) {
                this.logger.error(`Failed to update task with id ${id}`, error);
                throw error;
            }
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskRepository.findById(id);
                const deletedCount = yield this.taskRepository.delete(id);
                if (deletedCount > 0 && task) {
                    yield this.ablyService.publishTaskEvent('deleted', task);
                }
            }
            catch (error) {
                this.logger.error(`Failed to delete task with id ${id}`, error);
                throw error;
            }
        });
    }
    markOldTasksAsComplete(days) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCount = yield this.taskRepository.markOldTasksAsComplete(days);
                this.logger.info(`Marked ${updatedCount} old tasks as completed`);
                return updatedCount;
            }
            catch (error) {
                this.logger.error('Failed to mark old tasks as complete', error);
                throw error;
            }
        });
    }
}
exports.TaskService = TaskService;
