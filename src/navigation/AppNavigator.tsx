import { OnboardingNavigator } from '@/src/navigation/OnboardingNavigator';
import { TabsNavigator } from '@/src/navigation/TabsNavigator';
import { useAuthStore } from '@/src/stores/authStore';

export function AppNavigator() {
    const user = useAuthStore((state) => state.user);

    const hasCompletedOnboarding = user?.hasCompletedOnboarding ?? false;

    return (
        <>
            {hasCompletedOnboarding ? <TabsNavigator /> : <OnboardingNavigator />}
        </>
    );
}
