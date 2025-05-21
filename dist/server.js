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
require("dotenv/config");
const node_cron_1 = __importDefault(require("node-cron"));
const container_1 = require("./config/container");
const logger_1 = require("./config/logger");
const awilix_1 = require("awilix");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // First create the logger instance manually
        const logger = new logger_1.Logger();
        try {
            // setup the container with the logger
            container_1.container.register({
                logger: (0, awilix_1.asValue)(logger)
            });
            // setup the rest of the container
            (0, container_1.setupContainer)();
            // Resolve dependencies after setup
            const db = container_1.container.resolve('db');
            yield db.runMigrations();
            yield db.seedDatabase();
            // Start the app
            const app = container_1.container.resolve('app');
            const port = parseInt(process.env.PORT || '3000', 10);
            app.start(port);
            // Schedule jobs
            const markOldTasksAsComplete = container_1.container.resolve('markOldTasksAsComplete');
            node_cron_1.default.schedule('0 0 * * *', markOldTasksAsComplete, {
                timezone: 'Africa/Lagos', // Explicitly set timezone
            });
            process.on('SIGTERM', () => __awaiter(this, void 0, void 0, function* () {
                logger.info('SIGTERM received. Shutting down gracefully...');
                yield db.close();
                process.exit(0);
            }));
            process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
                logger.info('SIGINT received. Shutting down gracefully...');
                yield db.close();
                process.exit(0);
            }));
        }
        catch (error) {
            logger.error('Failed to start application', error);
            process.exit(1);
        }
    });
}
bootstrap();
