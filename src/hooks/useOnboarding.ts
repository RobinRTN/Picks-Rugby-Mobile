import { useMutation } from "@tanstack/react-query";
import { onboardingApi } from "@/src/api/onboarding";
import { useErrorHandler } from "@/src/hooks/useErrorHandler";
import { useOnboardingStore } from "@/src/stores/onboardingStore";
import { useAuthStore } from "@/src/stores/authStore";

export function useFirstOnboarding() {
  const { handleError } = useErrorHandler();
  const updateData = useOnboardingStore((state) => state.updateData);

  return useMutation({
    mutationFn: onboardingApi.firstOnboarding,
    onSuccess: (_, data) => {
      updateData({ username: data.username, profilePicture: data.profilePicture });
    },
    onError: handleError,
  });
}

export function useSecondOnboarding() {
  const { handleError } = useErrorHandler();
  const updateData = useOnboardingStore((state) => state.updateData);

  return useMutation({
    mutationFn: onboardingApi.secondOnboarding,
    onSuccess: (_, data) => {
      updateData({ country: data.country });
    },
    onError: handleError,
  });
}

export function useThirdOnboarding() {
  const { handleError } = useErrorHandler();
  const updateData = useOnboardingStore((state) => state.updateData);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: onboardingApi.thirdOnboarding,
    onSuccess: (updatedUser, data) => {
      updateData({ club: data.club });
      setUser(updatedUser);
    },
    onError: handleError,
  });
}
