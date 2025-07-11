import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/global.css';
// import { GluestackUIProvider } from '@gluestack-ui/themed';
// import { config } from '@gluestack-ui/config';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View className="flex-1 items-center justify-center bg-red-500">
        <Text className="text-xl font-bold text-blue-500">
          Welcome to Nativewind!
        </Text>
      </View>
    </QueryClientProvider>
  );
}
