import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from './useToast';

export function useErrorHandler() {
  const { t } = useTranslation();
  const toast = useToast();

  const isNetworkError = (error: any): boolean => {
    return (
      error?.message?.includes('Network') ||
      error?.message?.includes('fetch') ||
      error?.code === 'NETWORK_ERROR'
    );
  };

  const getErrorMessage = (error: any): string => {
    if (isNetworkError(error)) {
      return t('errors.networkError');
    }

    if (error?.response?.status === 400) {
      return t('errors.invalidPassword');
    }

    if (error?.response?.status === 401) {
      return t('errors.invalidCredentials');
    }

    if (error?.response?.status === 404) {
      return t('errors.serverError');
    }

    if (error?.response?.status >= 500) {
      return t('errors.serverError');
    }

    return error?.message || t('errors.serverError');
  };

  const shouldShowToast = (error: any): boolean => {
    return isNetworkError(error) || error?.response?.status >= 500;
  };

  const shouldShowFormError = (error: any): boolean => {
    console.log(error);
    const status = error?.response?.status;
    return status >= 400 && status < 500;
  };

  const handleError = useCallback((error: any) => {
    if (shouldShowToast(error)) {
      if (isNetworkError(error)) {
        toast.showNetworkError();
      } else {
        toast.showServerError();
      }
    }
  }, [toast]);

  return {
    handleError,
    getErrorMessage,
    shouldShowToast,
    shouldShowFormError,
    isNetworkError,
  };
}
