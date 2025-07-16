import "@/styles/global.css";
import '@/src/services/i18n';
import Toast from 'react-native-toast-message';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/services/queryClient';
import { RootNavigator } from '@/src/navigation/RootNavigator';


export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        <Toast />
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
