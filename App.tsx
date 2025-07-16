import "@/styles/global.css";
import '@/src/services/i18n';
import Toast from 'react-native-toast-message';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/services/queryClient';
import { RootNavigator } from '@/src/navigation/RootNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/src/services/i18n';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'Outfit-SemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'Outfit-ExtraBold': require('./assets/fonts/Outfit-ExtraBold.ttf'),
    'Outfit-Black': require('./assets/fonts/Outfit-Black.ttf'),
    'Outfit-Light': require('./assets/fonts/Outfit-Light.ttf'),
    'Outfit-ExtraLight': require('./assets/fonts/Outfit-ExtraLight.ttf'),
    'Outfit-Thin': require('./assets/fonts/Outfit-Thin.ttf'),
    'Manrope': require('./assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('./assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('./assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('./assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('./assets/fonts/Manrope-ExtraBold.ttf'),
    'Manrope-Light': require('./assets/fonts/Manrope-Light.ttf'),
    'Manrope-ExtraLight': require('./assets/fonts/Manrope-ExtraLight.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // Shows splash screen
  }

  return (
    <I18nextProvider i18n={i18n}>
      <GluestackUIProvider mode="light">
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
          <Toast />
        </QueryClientProvider>
      </GluestackUIProvider>
    </I18nextProvider>
  );
}
