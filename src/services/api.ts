/**
 * QuantumGrid API Client
 * Base fetch wrapper with error handling, interceptors, and retry logic
 */

import { APIError, NetworkError, AuthenticationError, AuthorizationError } from '@/lib/errors';
import type { APIResponse } from '@/types';

// Configuration
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
const DEFAULT_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

type RequestInterceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

// Interceptor storage
const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

/**
 * Add a request interceptor
 */
export function addRequestInterceptor(interceptor: RequestInterceptor): () => void {
  requestInterceptors.push(interceptor);
  return () => {
    const index = requestInterceptors.indexOf(interceptor);
    if (index > -1) requestInterceptors.splice(index, 1);
  };
}

/**
 * Add a response interceptor
 */
export function addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
  responseInterceptors.push(interceptor);
  return () => {
    const index = responseInterceptors.indexOf(interceptor);
    if (index > -1) responseInterceptors.splice(index, 1);
  };
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create a fetch with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Apply request interceptors
 */
async function applyRequestInterceptors(config: RequestInit): Promise<RequestInit> {
  let result = config;
  for (const interceptor of requestInterceptors) {
    result = await interceptor(result);
  }
  return result;
}

/**
 * Apply response interceptors
 */
async function applyResponseInterceptors(response: Response): Promise<Response> {
  let result = response;
  for (const interceptor of responseInterceptors) {
    result = await interceptor(result);
  }
  return result;
}

/**
 * Determine if an error is retryable
 */
function isRetryable(error: unknown, status?: number): boolean {
  // Network errors are retryable
  if (error instanceof NetworkError) return true;

  // 5xx errors are retryable
  if (status && status >= 500) return true;

  // 429 Too Many Requests is retryable
  if (status === 429) return true;

  return false;
}

/**
 * Request configuration options
 */
export interface RequestOptions extends Omit<RequestInit, 'body'> {
  timeout?: number;
  retries?: number;
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

/**
 * Make an API request
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<APIResponse<T>> {
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = MAX_RETRIES,
    params,
    body,
    ...fetchOptions
  } = options;

  // Build URL with query params
  let url = `${API_BASE}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Prepare request config
  let config: RequestInit = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  };

  // Add body if present
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  // Apply request interceptors
  config = await applyRequestInterceptors(config);

  // Retry loop
  let lastError: Error | null = null;
  let lastStatus: number | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Wait before retry (except first attempt)
      if (attempt > 0) {
        await sleep(RETRY_DELAY * attempt);
      }

      // Make the request
      let response: Response;
      try {
        response = await fetchWithTimeout(url, config, timeout);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw new NetworkError('La solicitud excedió el tiempo de espera.');
        }
        throw new NetworkError('Error de conexión. Verifica tu conexión a internet.', error instanceof Error ? error : undefined);
      }

      // Apply response interceptors
      response = await applyResponseInterceptors(response);
      lastStatus = response.status;

      // Handle different status codes
      if (response.status === 401) {
        throw new AuthenticationError();
      }

      if (response.status === 403) {
        throw new AuthorizationError();
      }

      if (!response.ok) {
        let errorData: { message?: string; code?: string; details?: Record<string, string> } | undefined;
        try {
          errorData = await response.json();
        } catch {
          // Response is not JSON
        }
        throw APIError.fromResponse(response, errorData);
      }

      // Parse successful response
      const data = await response.json() as APIResponse<T>;
      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry non-retryable errors
      if (!isRetryable(error, lastStatus)) {
        throw error;
      }

      // Don't retry if this was the last attempt
      if (attempt === retries) {
        throw error;
      }

      // Log retry in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Retrying request to ${endpoint} (attempt ${attempt + 1}/${retries})`);
      }
    }
  }

  // This shouldn't happen, but just in case
  throw lastError || new NetworkError('Error desconocido al realizar la solicitud.');
}

/**
 * API client methods
 */
export const api = {
  /**
   * GET request
   */
  get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<APIResponse<T>> {
    return request<T>(endpoint, { ...options, method: 'GET' });
  },

  /**
   * POST request
   */
  post<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<APIResponse<T>> {
    return request<T>(endpoint, { ...options, method: 'POST', body });
  },

  /**
   * PUT request
   */
  put<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<APIResponse<T>> {
    return request<T>(endpoint, { ...options, method: 'PUT', body });
  },

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<APIResponse<T>> {
    return request<T>(endpoint, { ...options, method: 'PATCH', body });
  },

  /**
   * DELETE request
   */
  delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>): Promise<APIResponse<T>> {
    return request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};

export default api;
