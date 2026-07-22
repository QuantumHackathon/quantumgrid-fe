/**
 * Auth Hooks
 * React Query hooks for authentication
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, type LoginCredentials } from '@/services';
import type { User, AuthSession } from '@/types';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

/**
 * Hook to get current session
 */
export function useSession() {
  return useQuery<AuthSession | null>({
    queryKey: authKeys.session(),
    queryFn: authService.getSession,
    staleTime: Infinity, // Session doesn't become stale
    retry: false,
  });
}

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useQuery<User | null>({
    queryKey: authKeys.user(),
    queryFn: authService.getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });
}

/**
 * Hook to login
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<AuthSession, Error, LoginCredentials>({
    mutationFn: authService.login,
    onSuccess: (session) => {
      // Update session in cache
      queryClient.setQueryData(authKeys.session(), session);
      queryClient.setQueryData(authKeys.user(), session.user);
    },
  });
}

/**
 * Hook to logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.setQueryData(authKeys.session(), null);
      queryClient.setQueryData(authKeys.user(), null);
      // Optionally clear all cache
      queryClient.clear();
    },
  });
}

/**
 * Hook to request password reset
 */
export function useRequestPasswordReset() {
  return useMutation<void, Error, string>({
    mutationFn: authService.requestPasswordReset,
  });
}

/**
 * Hook to reset password
 */
export function useResetPassword() {
  return useMutation<void, Error, { token: string; newPassword: string }>({
    mutationFn: ({ token, newPassword }) => authService.resetPassword(token, newPassword),
  });
}

/**
 * Hook to change password
 */
export function useChangePassword() {
  return useMutation<void, Error, { currentPassword: string; newPassword: string }>({
    mutationFn: ({ currentPassword, newPassword }) =>
      authService.changePassword(currentPassword, newPassword),
  });
}
