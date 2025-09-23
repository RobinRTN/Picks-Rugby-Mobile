import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useOnboardingStore } from '@/src/stores/onboardingStore';
import { UsernameStep } from '@/src/screens/onboarding/UsernameStep';
import { ClubStep } from '@/src/screens/onboarding/ClubStep';

type OnboardingStackParamList = {
  UsernameStep: undefined;
  ClubStep: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentStep === 1 ? (
        <Stack.Screen name="UsernameStep" component={UsernameStep} />
      ) : (
        <Stack.Screen name="ClubStep" component={ClubStep} />
      )}
    </Stack.Navigator>
  );
}
