import { useMutation } from "@tanstack/react-query";
import { onboardingApi } from "@/src/api/onboarding";
import { queryClient } from "@/src/services/queryClient";
import { useErrorHandler } from "@/src/hooks/useErrorHandler";
import { useOnboardingStore } from "@/src/stores/onboardingStore";

export function useUserOnboarding() {
  const { handleError } = useErrorHandler();
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);


  return useMutation({
    mutationFn: onboardingApi.userOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      completeOnboarding();
    },
    onError: handleError,
  });
}

export function useClubOnboarding() {
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: onboardingApi.clubOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['club'] });
    },
    onError: handleError,
  });
}
