import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import * as Haptics from 'expo-haptics';

export function useToast() {
  const { t } = useTranslation();

  return {
    // Generic toast messages on Success
    showSuccess: (titleKey: string, vibration: boolean, messageKey?: string) => {
      if (vibration) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      Toast.show({
        type: 'success',
        text1: t(titleKey),
        text2: messageKey ? t(messageKey) : undefined,
        position: 'top',
        visibilityTime: 3000,
      });
    },

    // Generic toast messages on Error
    showError: (titleKey: string, vibration: boolean, messageKey?: string) => {
      if (vibration) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      Toast.show({
        type: 'error',
        text1: t(titleKey),
        text2: messageKey ? t(messageKey) : undefined,
        position: 'top',
        visibilityTime: 4000,
      });
    },

    // Network error toast
    showNetworkError: () => {
      Toast.show({
        type: 'error',
        text1: t('errors.connectionError'),
        text2: t('errors.connectionMessage'),
        position: 'top',
        visibilityTime: 4000,
      });
    },

    // Server error toast
    showServerError: () => {
      Toast.show({
        type: 'error',
        text1: t('errors.serverError'),
        text2: t('errors.serverErrorMessage'),
        position: 'top',
        visibilityTime: 4000,
      });
    },

    showLimitError: () => {
      Toast.show({
        type: 'error',
        text1: t('errors.tooManyRequests'),
        text2: t('errors.tooManyRequestsMessage'),
        position: 'top',
        visibilityTime: 4000,
      });
    },
  };
}
