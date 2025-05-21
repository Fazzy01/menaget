import { Request, Response, NextFunction } from 'express';
import { Logger } from '../config/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const logger: Logger = (req as any).scope.resolve('logger');
  logger.error(err.message, err);

  res.status(500).json({
    message: 'Internal server error',
  });
}