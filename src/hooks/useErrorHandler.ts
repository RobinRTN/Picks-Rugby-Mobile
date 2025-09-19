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

    if (error?.response?.status === 409) {
      return t('errors.emailUsed');
    }

    if (error?.response?.status === 429) {
      return t('errors.tooManyRequests');
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
    const status = error?.response?.status;
    return isNetworkError(error) || status >= 500  || status === 429;
  };

  const shouldShowFormError = (error: any): boolean => {
    console.log(error);
    const status = error?.response?.status;
    return status >= 400 && status < 500 && status && status !== 429;
  };

  const handleError = useCallback((error: any) => {
    const status = error?.response?.status;
    if (shouldShowToast(error)) {
      if (isNetworkError(error)) {
        toast.showNetworkError();
      } else if (status === 429) {
        toast.showLimitError();
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
