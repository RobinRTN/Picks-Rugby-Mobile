import { OnboardingNavigator } from '@/src/navigation/OnboardingNavigator';
import { TabsNavigator } from '@/src/navigation/TabsNavigator';
import { useOnboardingStore } from '@/src/stores/onboardingStore';

export function AppNavigator() {
    const hasCompletedOnboarding = useOnboardingStore((state) => state.hasCompletedOnboarding);

    return (
        <>
            {hasCompletedOnboarding ? <TabsNavigator /> : <OnboardingNavigator />}
        </>
    );
}
