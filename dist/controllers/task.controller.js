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
exports.TaskController = void 0;
const task_validation_1 = require("../validations/task.validation");
class TaskController {
    constructor({ taskService, logger }) {
        this.taskService = taskService;
        this.logger = logger;
    }
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, search } = req.query;
                const tasks = yield this.taskService.getAllTasks({
                    status: status,
                    search: search,
                });
                res.json({ message: "Success", "results": tasks });
            }
            catch (error) {
                this.logger.error('Error in getAllTasks', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    getTaskById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = parseInt(req.params.id, 10);
                const task = yield this.taskService.getTaskById(taskId);
                if (!task) {
                    res.status(404).json({ message: 'Task not found' });
                    return;
                }
                res.json({ message: "Success", "result": task });
            }
            catch (error) {
                this.logger.error('Error in getTaskById', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = task_validation_1.createTaskSchema.parse(req.body);
                const newTask = yield this.taskService.createTask(validatedData);
                res.status(201).json({ message: "Success", "results": newTask });
            }
            catch (error) {
                this.logger.error('Error in createTask', error);
                res.status(400).json({ message: error instanceof Error ? error.message : 'Validation failed' });
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = parseInt(req.params.id, 10);
                const validatedData = task_validation_1.updateTaskSchema.parse(req.body);
                const updatedTask = yield this.taskService.updateTask(taskId, validatedData);
                if (!updatedTask) {
                    res.status(404).json({ message: 'Task not found' });
                    return;
                }
                res.json({ message: "Success", "results": updatedTask });
            }
            catch (error) {
                this.logger.error('Error in updateTask', error);
                res.status(400).json({ message: error instanceof Error ? error.message : 'Validation failed' });
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = parseInt(req.params.id, 10);
                yield this.taskService.deleteTask(taskId);
                res.status(204).send();
            }
            catch (error) {
                this.logger.error('Error in deleteTask', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.TaskController = TaskController;
