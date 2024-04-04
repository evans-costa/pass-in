class BaseError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class BadRequest extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFound extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}
