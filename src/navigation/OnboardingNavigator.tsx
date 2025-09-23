import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { UsernameStep } from '@/src/screens/onboarding/UsernameStep';
import { CountryStep } from '@/src/screens/onboarding/CountryStep';
import { ClubStep } from '@/src/screens/onboarding/ClubStep';
import { OnboardingStackParamList } from '@/src/types/onboarding';

const Stack = createStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      initialRouteName="UsernameStep"
    >
      <Stack.Screen name="UsernameStep" component={UsernameStep} />
      <Stack.Screen name="CountryStep" component={CountryStep} />
      <Stack.Screen name="ClubStep" component={ClubStep} />
    </Stack.Navigator>
  );
}
