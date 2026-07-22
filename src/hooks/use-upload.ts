/**
 * Upload Hooks
 * React Query hooks for file uploads
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadService, type UploadResult } from '@/services';
import type { UploadFile, ValidationResult, PaginatedResponse } from '@/types';
import { useState } from 'react';

// Query keys
export const uploadKeys = {
  all: ['upload'] as const,
  history: (page?: number, limit?: number) => [...uploadKeys.all, 'history', page, limit] as const,
  detail: (id: string) => [...uploadKeys.all, 'detail', id] as const,
};

/**
 * Hook to fetch upload history
 */
export function useUploadHistory(page: number = 1, limit: number = 10) {
  return useQuery<PaginatedResponse<UploadFile>>({
    queryKey: uploadKeys.history(page, limit),
    queryFn: () => uploadService.getHistory(page, limit),
  });
}

/**
 * Hook to fetch a specific upload
 */
export function useUpload(fileId: string) {
  return useQuery<UploadFile>({
    queryKey: uploadKeys.detail(fileId),
    queryFn: () => uploadService.getById(fileId),
    enabled: !!fileId,
  });
}

/**
 * Hook to upload a file with progress tracking
 */
export function useUploadFile() {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);

  const mutation = useMutation<UploadResult, Error, File>({
    mutationFn: (file) => uploadService.upload(file, setProgress),
    onSuccess: () => {
      // Reset progress
      setProgress(0);
      // Invalidate history to refetch
      queryClient.invalidateQueries({ queryKey: uploadKeys.history() });
    },
    onError: () => {
      setProgress(0);
    },
  });

  return {
    ...mutation,
    progress,
  };
}

/**
 * Hook to validate an uploaded file
 */
export function useValidateFile() {
  const queryClient = useQueryClient();

  return useMutation<ValidationResult, Error, string>({
    mutationFn: uploadService.validate,
    onSuccess: (_, fileId) => {
      // Invalidate the specific upload to refetch
      queryClient.invalidateQueries({ queryKey: uploadKeys.detail(fileId) });
    },
  });
}

/**
 * Hook to process a validated file
 */
export function useProcessFile() {
  const queryClient = useQueryClient();

  return useMutation<UploadFile, Error, string>({
    mutationFn: uploadService.process,
    onSuccess: (updatedFile) => {
      queryClient.setQueryData(uploadKeys.detail(updatedFile.id), updatedFile);
      queryClient.invalidateQueries({ queryKey: uploadKeys.history() });
    },
  });
}

/**
 * Hook to delete an upload
 */
export function useDeleteUpload() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: uploadService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: uploadKeys.history() });
    },
  });
}

/**
 * Hook to download a template
 */
export function useDownloadTemplate() {
  return useMutation<Blob, Error, 'consumption' | 'generation' | 'infrastructure'>({
    mutationFn: uploadService.downloadTemplate,
    onSuccess: (blob, templateType) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `plantilla-${templateType}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  });
}
