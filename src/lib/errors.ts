/**
 * SIENA-CR Error Handling
 * Custom error classes for API and application errors
 */

export class APIError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly details?: Record<string, string>;

  constructor(
    message: string,
    code: string = 'API_ERROR',
    status: number = 500,
    details?: Record<string, string>
  ) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.status = status;
    this.details = details;
  }

  static fromResponse(response: Response, data?: { message?: string; code?: string; details?: Record<string, string> }): APIError {
    return new APIError(
      data?.message || `Error ${response.status}: ${response.statusText}`,
      data?.code || `HTTP_${response.status}`,
      response.status,
      data?.details
    );
  }
}

export class NetworkError extends Error {
  public readonly originalError?: Error;

  constructor(message: string = 'Error de conexión. Verifica tu conexión a internet.', originalError?: Error) {
    super(message);
    this.name = 'NetworkError';
    this.originalError = originalError;
  }
}

export class ValidationError extends Error {
  public readonly field: string;
  public readonly details?: string[];

  constructor(message: string, field: string, details?: string[]) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.details = details;
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'No autorizado. Por favor, inicia sesión nuevamente.') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = 'No tienes permisos para realizar esta acción.') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

/**
 * Type guard to check if error is an APIError
 */
export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}

/**
 * Type guard to check if error is a NetworkError
 */
export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message;
  }
  if (error instanceof NetworkError) {
    return error.message;
  }
  if (error instanceof ValidationError) {
    return error.message;
  }
  if (error instanceof AuthenticationError) {
    return error.message;
  }
  if (error instanceof AuthorizationError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Ha ocurrido un error inesperado.';
}
