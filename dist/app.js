"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const awilix_express_1 = require("awilix-express");
const container_1 = require("./config/container");
const error_middleware_1 = require("./middlewares/error.middleware");
const not_found_middleware_1 = require("./middlewares/not-found.middleware");
const swagger_1 = require("./config/swagger");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.logger = container_1.container.resolve('logger');
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandlers();
        (0, swagger_1.setupSwagger)(this.app);
    }
    setupMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, awilix_express_1.scopePerRequest)(container_1.container));
    }
    setupRoutes() {
        this.app.get('/', (req, res) => {
            res.json({ mesaage: 'Nothing to see here. This is an endpoint.' });
        });
        this.app.get('/health', (req, res) => {
            res.json({ status: 'ok' });
        });
        this.app.use((0, awilix_express_1.loadControllers)('./routes/*.routes.*', { cwd: __dirname }));
    }
    setupErrorHandlers() {
        this.app.use(not_found_middleware_1.notFoundHandler);
        this.app.use(error_middleware_1.errorHandler);
    }
    start(port) {
        this.app.listen(port, () => {
            this.logger.info(`Server is running on port ${port}`);
        });
    }
    getApp() {
        return this.app;
    }
}
exports.App = App;
