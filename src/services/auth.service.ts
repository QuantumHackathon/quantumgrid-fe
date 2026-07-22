/**
 * Auth Service
 * Authentication API calls (placeholder for future integration)
 */

import { api } from './api';
import type { User, AuthSession } from '@/types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  department?: string;
}

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const response = await api.post<AuthSession>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Logout current session
   */
  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  /**
   * Get current session
   */
  async getSession(): Promise<AuthSession | null> {
    try {
      const response = await api.get<AuthSession>('/auth/session');
      return response.data;
    } catch {
      return null;
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch {
      return null;
    }
  },

  /**
   * Register a new user (admin only)
   */
  async register(data: RegisterData): Promise<User> {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, newPassword });
  },

  /**
   * Change current user's password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', { currentPassword, newPassword });
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthSession> {
    const response = await api.post<AuthSession>('/auth/refresh');
    return response.data;
  },
};
