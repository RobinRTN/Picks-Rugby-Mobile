import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from '@/src/navigation/AuthNavigator';
import { AppNavigator } from '@/src/navigation/AppNavigator';
import { useAuthStore } from '@/src/stores/authStore';

export function RootNavigator() {
    const user = useAuthStore((state) => state.user);

    return (
        <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}