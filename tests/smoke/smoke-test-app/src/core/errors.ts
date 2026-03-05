import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (err: Error, c: Context) => {
  if (err instanceof AppError) {
    return c.json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
      }
    }, err.statusCode as any);
  }

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  console.error('[Unhandled Error]:', err);
  
  return c.json({
    success: false,
    error: {
      message: 'Internal Server Error',
      code: 'INTERNAL_ERROR',
    }
  }, 500);
};
