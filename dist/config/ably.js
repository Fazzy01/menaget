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
exports.AblyService = void 0;
const ably_1 = __importDefault(require("ably"));
class AblyService {
    constructor({ logger }) {
        if (!process.env.ABLY_API_KEY) {
            throw new Error('ABLY_API_KEY is not defined');
        }
        this.ably = new ably_1.default.Realtime(process.env.ABLY_API_KEY);
        this.logger = logger;
        this.ably.connection.on((stateChange) => {
            this.logger.info(`Ably connection state changed to ${stateChange.current}`);
            if (stateChange.current === 'failed') {
                this.logger.warn(`Ably connection failed: ${stateChange.reason}`);
            }
        });
    }
    publishTaskEvent(action, task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = this.ably.channels.get('task-updates');
                yield channel.publish('task-event', { action, task });
                this.logger.info(`Published task ${action} event for task ${task.id}`);
            }
            catch (error) {
                this.logger.error('Failed to publish task event', error);
            }
        });
    }
}
exports.AblyService = AblyService;
