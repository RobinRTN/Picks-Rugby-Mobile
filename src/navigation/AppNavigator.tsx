import { OnboardingNavigator } from '@/src/navigation/OnboardingNavigator';
import { TabsNavigator } from '@/src/navigation/TabsNavigator';
import { useAuthStore } from '@/src/stores/authStore';

export function AppNavigator() {
    const user = useAuthStore((state) => state.user);

    // Check backend data instead of local state
    const hasCompletedOnboarding = user?.hasCompletedOnboarding ?? false;

    console.log('user', user);

    console.log('hasCompletedOnboarding', hasCompletedOnboarding);

    return (
        <>
            {hasCompletedOnboarding ? <TabsNavigator /> : <OnboardingNavigator />}
        </>
    );
}
