"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    const logger = req.scope.resolve('logger');
    logger.error(err.message, err);
    res.status(500).json({
        message: 'Internal server error',
    });
}
