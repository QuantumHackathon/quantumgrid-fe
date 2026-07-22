/**
 * Upload Service
 * API calls for file upload and data import
 */

import { api } from './api';
import type { UploadFile, ValidationResult, PaginatedResponse } from '@/types';

export interface UploadResult {
  file: UploadFile;
  validation?: ValidationResult;
}

export const uploadService = {
  /**
   * Upload a file
   * Note: Uses FormData for file upload
   */
  async upload(file: File, onProgress?: (progress: number) => void): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response.data);
          } catch {
            reject(new Error('Error al procesar la respuesta'));
          }
        } else {
          reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Error de conexión al subir archivo'));
      });

      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    });
  },

  /**
   * Validate an uploaded file
   */
  async validate(fileId: string): Promise<ValidationResult> {
    const response = await api.post<ValidationResult>(`/upload/${fileId}/validate`);
    return response.data;
  },

  /**
   * Process a validated file
   */
  async process(fileId: string): Promise<UploadFile> {
    const response = await api.post<UploadFile>(`/upload/${fileId}/process`);
    return response.data;
  },

  /**
   * Get upload history
   */
  async getHistory(page: number = 1, limit: number = 10): Promise<PaginatedResponse<UploadFile>> {
    const response = await api.get<PaginatedResponse<UploadFile>>('/upload/history', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Get a specific upload by ID
   */
  async getById(fileId: string): Promise<UploadFile> {
    const response = await api.get<UploadFile>(`/upload/${fileId}`);
    return response.data;
  },

  /**
   * Delete an upload
   */
  async delete(fileId: string): Promise<void> {
    await api.delete(`/upload/${fileId}`);
  },

  /**
   * Download a template file
   */
  async downloadTemplate(templateType: 'consumption' | 'generation' | 'infrastructure'): Promise<Blob> {
    const response = await fetch(`/api/upload/template/${templateType}`);
    if (!response.ok) {
      throw new Error('Error al descargar plantilla');
    }
    return response.blob();
  },
};
