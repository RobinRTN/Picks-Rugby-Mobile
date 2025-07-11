import { StatusBar } from 'expo-status-bar';
import "@/styles/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Text, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LinearGradient } from '@/src/components/ui/linear-gradient';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <View className="flex-1 items-center justify-center bg-green-main">
          <Button className="bg-green-light">
            <ButtonText className="text-typography-0">Join League</ButtonText>
          </Button>
          <Button className="bg-green-lighter">
            <ButtonText className="text-typography-0">Join League</ButtonText>
          </Button>
          <Button className="bg-green-lightest">
            <ButtonText className="text-typography-0">Join League</ButtonText>
          </Button>
          <Button className="bg-blue-light">
            <ButtonText className="text-typography-0">Join League</ButtonText>
          </Button>
          <Button className="bg-blue-lighter">
            <ButtonText className="text-typography-0">Join League</ButtonText>
          </Button>
          <Button className="bg-blue-lightest">
            <ButtonText className="text-typography-0">Join League</ButtonText>
          </Button>
          <Button className="bg-gradient-to-b from-blue-gradStart to-blue-gradEnd">
            <ButtonText className="text-typography-0">Join League</ButtonText>
          </Button>
            <Button className="bg-blue-purple">
              <ButtonText className="text-typography-0">Join League</ButtonText>
            </Button>
            <Button className="bg-red-main">
              <ButtonText className="text-typography-0">Join League</ButtonText>
            </Button>
            <Button className="bg-red-light">
              <ButtonText className="text-typography-0">Join League</ButtonText>
            </Button>
            <Button className="bg-red-lighter">
              <ButtonText className="text-typography-0">Join League</ButtonText>
            </Button>
            <Button className="bg-beige-main">
              <ButtonText className="text-green-dark">Join League</ButtonText>
            </Button>
            <Button className="bg-beige-light">
              <ButtonText className="text-green-dark">Join League</ButtonText>
            </Button>
            <Button className="bg-beige-lighter">
              <ButtonText className="text-green-dark">Join League</ButtonText>
            </Button>
            <Button className="bg-beige-lightest">
              <ButtonText className="text-green-dark">Join League</ButtonText>
            </Button>
          <LinearGradient
            className="w-64 rounded-lg items-center py-3 mb-2"
            colors={['#003DB3', '#00B89E']}
            start={[0, 1]}
            end={[0, 0]}
          >
            <Text className="text-white font-semibold">Vertical Blue Gradient</Text>
          </LinearGradient>

          <Card className="bg-background-600 border border-outline-200"> 
            <Text className="text-typography-100">Player Stats</Text>
          </Card>

          <Badge className="bg-secondary-700">
            <Text className="text-typography-0">New</Text>
          </Badge>
          <Text className="text-xl font-bold text-blue-500">
            Welcome to Native
          </Text>
        </View>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
