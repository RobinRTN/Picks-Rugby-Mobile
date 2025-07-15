import { useCallback } from 'react';
import { toastService } from '../services/toastService';
import { errorHandler } from '../utils/errorHandler';

export function useErrorHandler() {
  const handleError = useCallback((error: any) => {
    if (errorHandler.shouldShowToast(error)) {
      if (errorHandler.isNetworkError(error)) {
        toastService.showNetworkError();
      } else {
        toastService.showServerError();
      }
    }
  }, []);

  return { handleError };
} 