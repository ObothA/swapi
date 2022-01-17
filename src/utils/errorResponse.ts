import { ValidationError } from 'express-validator';

interface ErrorResponse {
  message: string;
  statusCode: number;
  errors?: ValidationError[];
  code?: string;
  meta?: { target: string[] };
}

class ErrorResponse extends Error {
  constructor(message?: string, statusCode?: number, errors?: ValidationError[]) {
    super(message);
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (errors) {
      this.errors = errors;
    }
  }
}

export default ErrorResponse;
