import Toast from 'react-native-toast-message';

export const toastService = {
  showSuccess: (title: string, message?: string) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },

  showError: (title: string, message?: string) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 4000,
    });
  },

  showNetworkError: () => {
    Toast.show({
      type: 'error',
      text1: 'Connection Error',
      text2: 'Please check your internet connection',
      position: 'top',
      visibilityTime: 4000,
    });
  },

  showServerError: () => {
    Toast.show({
      type: 'error',
      text1: 'Server Error',
      text2: 'Please try again later',
      position: 'top',
      visibilityTime: 4000,
    });
  },
}; 