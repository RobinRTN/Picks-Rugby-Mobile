import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Prediction from '@/src/screens/main/Prediction';
import Score from '@/src/screens/main/Score';
import League from '@/src/screens/main/League';
import Profile from '@/src/screens/main/Profile';
import { useTranslation } from 'react-i18next';

type TabsParamList = {
  Predictions: undefined;
  Scores: undefined;
  Leagues: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export function TabsNavigator() {

  const { t } = useTranslation();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Predictions" component={Prediction} options={{ title: t('titles.predictions') }} />
      <Tab.Screen name="Scores" component={Score} options={{ title: t('titles.scores') }} />
      <Tab.Screen name="Leagues" component={League} options={{ title: t('titles.leagues') }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: t('titles.profile') }} />
    </Tab.Navigator>
  );
}
