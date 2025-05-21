"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, printf, colorize, errors } = winston_1.default.format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});
class Logger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            format: combine(errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
            transports: [
                new winston_1.default.transports.Console({
                    format: combine(colorize(), logFormat),
                }),
                new winston_daily_rotate_file_1.default({
                    filename: 'logs/application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        });
    }
    info(message, meta) {
        this.logger.info(message, meta);
    }
    error(message, meta) {
        this.logger.error(message, meta);
    }
    warn(message, meta) {
        this.logger.warn(message, meta);
    }
    debug(message, meta) {
        this.logger.debug(message, meta);
    }
}
exports.Logger = Logger;
