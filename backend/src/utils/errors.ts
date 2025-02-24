// src/utils/errors.ts

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(403, message);
  }
}

export class DatabaseError extends AppError {
  constructor(
    message: string,
    public query?: string,
    public params?: any[]
  ) {
    super(500, message);
    this.name = 'DatabaseError';
  }
}

export class DatabaseTimeoutError extends DatabaseError {
  constructor(operation: string) {
    super(`Database operation timed out: ${operation}`);
    this.name = 'DatabaseTimeoutError';
  }
}

export class DatabaseConnectionError extends DatabaseError {
  constructor(details?: string) {
    super(`Database connection failed${details ? `: ${details}` : ''}`);
    this.name = 'DatabaseConnectionError';
  }
}