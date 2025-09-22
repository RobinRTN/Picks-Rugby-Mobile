import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Pressable } from 'react-native';
import { useOnboardingStore } from '@/src/stores/onboardingStore';

type OnboardingStackParamList = {
  Welcome: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

function WelcomeScreen() {
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);

  return (
    <View className="flex-1 justify-center items-center bg-green-main px-8">
      <Text className="text-3xl text-beige-light font-bold text-center mb-8 font-heading">
        Bienvenue sur Rugby Picks!
      </Text>
      <Pressable
        onPress={completeOnboarding}
        className="bg-beige-main px-8 py-4 rounded-xl"
      >
        <Text className="text-green-dark font-bold font-heading">
          COMMENCER
        </Text>
      </Pressable>
    </View>
  );
}

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
