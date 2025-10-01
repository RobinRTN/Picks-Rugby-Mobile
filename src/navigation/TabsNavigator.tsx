import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Prediction from '@/src/screens/main/Prediction';
import Score from '@/src/screens/main/Score';
import League from '@/src/screens/main/League';
import Profile from '@/src/screens/main/Profile';
import { useTranslation } from 'react-i18next';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import { FireIcon } from '@/assets/icons/fire';
import { ProfileIcon } from '@/assets/icons/profile';

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
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#049D75',
        borderTopColor: '#00422E',
      },
      tabBarActiveTintColor: '#00D395',
      tabBarInactiveTintColor: '#00422E'
    }}>
      <Tab.Screen name="Predictions" component={Prediction} options={{ title: t('titles.predictions'), tabBarIcon: ({ size, focused }) => <FireIcon color={focused ? '#00D395' : '#00422E'} size={size} /> }} />
      <Tab.Screen name="Scores" component={Score} options={{ title: t('titles.scores'), tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name="rugby" color={focused ? '#00D395' : '#00422E'} size={size} /> }} />
      <Tab.Screen name="Leagues" component={League} options={{ title: t('titles.leagues'), tabBarIcon: ({ size, focused }) => <Ionicons name="people" color={focused ? '#00D395' : '#00422E'} size={size} /> }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: t('titles.profile'), tabBarIcon: ({ size, focused }) => <ProfileIcon color={focused ? '#00D395' : '#00422E'} size={size} /> }} />
    </Tab.Navigator>
  );

}
