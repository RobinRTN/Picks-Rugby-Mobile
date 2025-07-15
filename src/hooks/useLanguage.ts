import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

// Hook to manage the language of the app (detect the language of the device and save it in the async storage).

const LANGUAGE_KEY = 'userLanguage';

export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage && savedLanguage !== i18n.language) {
          await changeLanguage(savedLanguage);
        } else if (!savedLanguage) {
          const deviceLanguage = Localization.getLocales()[0]?.languageCode;
          if (deviceLanguage && ['en', 'fr'].includes(deviceLanguage)) {
            await changeLanguage(deviceLanguage);
          }
        }
      } catch (error) {
        console.warn('Failed to load saved language:', error);
      }
    };

    loadSavedLanguage();
  }, []);

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return {
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'en',
    isFrench: currentLanguage === 'fr',
  };
} 