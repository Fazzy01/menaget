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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../knexfile"));
class Database {
    constructor({ logger }) {
        this.logger = logger;
        const environment = process.env.NODE_ENV || 'development';
        this.queryBuilder = (0, knex_1.default)(knexfile_1.default[environment]);
        this.testConnection()
            .then(() => {
            this.logger.info('Database connection established successfully');
        })
            .catch((error) => {
            this.logger.error('Failed to establish database connection', error);
            process.exit(1);
        });
    }
    testConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queryBuilder.raw('SELECT 1');
        });
    }
    runMigrations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.queryBuilder.migrate.latest();
                this.logger.info('Database migrations run successfully');
            }
            catch (error) {
                this.logger.error('Failed to run database migrations', error);
                throw error;
            }
        });
    }
    // async runMigrations(): Promise<void> {
    //     try {
    //       if (process.env.NODE_ENV === 'production') {
    //         // In production, use the compiled JS migrations
    //         await this.queryBuilder.migrate.latest();
    //       } else {
    //         // In development, use TS migrations directly
    //         require('ts-node/register');
    //         await this.queryBuilder.migrate.latest();
    //       }
    //       this.logger.info('Database migrations run successfully');
    //     } catch (error) {
    //       this.logger.error('Failed to run database migrations', error);
    //       throw error;
    //     }
    //   }
    seedDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.queryBuilder.seed.run();
                this.logger.info('Database seeded successfully');
            }
            catch (error) {
                this.logger.error('Failed to seed database', error);
                throw error;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queryBuilder.destroy();
        });
    }
}
exports.Database = Database;
