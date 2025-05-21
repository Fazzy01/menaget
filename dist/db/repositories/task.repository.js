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
exports.TaskRepository = void 0;
require("reflect-metadata");
class TaskRepository {
    constructor({ db }) {
        this.knex = db.queryBuilder;
    }
    findAll(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.knex('tasks').select('*');
            if (filters.status) {
                query = query.where('status', filters.status);
            }
            if (filters.search) {
                query = query.where('title', 'ilike', `%${filters.search}%`);
            }
            return query;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knex('tasks').where({ id }).first();
        });
    }
    create(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [task] = yield this.knex('tasks')
                .insert(Object.assign(Object.assign({}, taskData), { created_at: this.knex.fn.now(), updated_at: this.knex.fn.now() }))
                .returning('*');
            return task;
        });
    }
    update(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [task] = yield this.knex('tasks')
                .where({ id })
                .update(Object.assign(Object.assign({}, taskData), { updated_at: this.knex.fn.now() }))
                .returning('*');
            return task;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knex('tasks').where({ id }).del();
        });
    }
    markOldTasksAsComplete(days) {
        return __awaiter(this, void 0, void 0, function* () {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            return this.knex('tasks')
                .where('status', 'pending')
                .andWhere('created_at', '<', cutoffDate)
                .update({
                status: 'completed',
                updated_at: this.knex.fn.now(),
            });
        });
    }
}
exports.TaskRepository = TaskRepository;
