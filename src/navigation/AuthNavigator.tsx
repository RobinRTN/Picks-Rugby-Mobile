import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/src/screens/auth/Home';
import Login from '@/src/screens/auth/Login';
import Signup from '@/src/screens/auth/Signup';
import ForgotPassword from '@/src/screens/auth/ForgotPassword';
import Unconfirmed from '@/src/screens/auth/Unconfirmed';

const Stack = createStackNavigator();

export function AuthNavigator() {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                cardStyleInterpolator: ({ current, layouts }) => {
                    return {
                        cardStyle: {
                            transform: [
                                {
                                    translateX: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [layouts.screen.width, 0],
                                    }),
                                },
                            ],
                            opacity: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                            }),
                        },
                        overlayStyle: {
                            opacity: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.5],
                            }),
                        },
                    };
                },
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            
            <Stack.Screen 
                name="Login" 
                component={Login}
                options={{ 
                    presentation: 'card',
                }}
            />
            <Stack.Screen 
                name="Signup" 
                component={Signup}
                options={{ 
                    presentation: 'card',
                }}
            />
            
            <Stack.Screen 
                name="ForgotPassword" 
                component={ForgotPassword}
                options={{ 
                    presentation: 'card',
                }}
            />
            <Stack.Screen 
                name="Unconfirmed" 
                component={Unconfirmed}
                options={{ 
                    presentation: 'card',
                }}
            />
        </Stack.Navigator>
    );
}