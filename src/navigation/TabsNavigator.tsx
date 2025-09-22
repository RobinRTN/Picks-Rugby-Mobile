import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

type TabsParamList = {
  Leagues: undefined;
  Results: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

function LeaguesScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-green-main">
      <Text className="text-2xl text-beige-light font-bold font-heading">
        Ligues
      </Text>
    </View>
  );
}

function ResultsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-green-main">
      <Text className="text-2xl text-beige-light font-bold font-heading">
        Résultats
      </Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-green-main">
      <Text className="text-2xl text-beige-light font-bold font-heading">
        Profil
      </Text>
    </View>
  );
}

export function TabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Leagues" component={LeaguesScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
