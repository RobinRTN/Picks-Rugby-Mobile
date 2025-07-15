export class AppError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isNetworkError?: boolean
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = {
  // Check if it's a network error
  isNetworkError: (error: any): boolean => {
    return (
      error?.message?.includes('Network') ||
      error?.message?.includes('fetch') ||
      error?.code === 'NETWORK_ERROR' ||
      !navigator.onLine
    );
  },

  // Get user-friendly error message
  getErrorMessage: (error: any): string => {
    if (errorHandler.isNetworkError(error)) {
      return 'Please check your internet connection and try again';
    }

    if (error?.response?.status === 401) {
      return 'Session expired. Please log in again';
    }

    if (error?.response?.status === 404) {
      return 'Resource not found';
    }

    if (error?.response?.status >= 500) {
      return 'Server error. Please try again later';
    }

    return error?.message || 'Something went wrong. Please try again';
  },

  // Check if error should show toast
  shouldShowToast: (error: any): boolean => {
    // Show toast for network errors and server errors
    return errorHandler.isNetworkError(error) || error?.response?.status >= 500;
  },

  // Check if error should show form error
  shouldShowFormError: (error: any): boolean => {
    // Show form error for client errors (4xx, except 401)
    return error?.response?.status >= 400 && error?.response?.status < 500 && error?.response?.status !== 401;
  },
};
