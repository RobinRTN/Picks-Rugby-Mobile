import { securedApi } from "../services/kyClient";
import { OnboardingStep1, OnboardingStep2 } from "../types/onboarding";

export const onboardingApi = {
  async userOnboarding(data: OnboardingStep1): Promise<void> {
    return securedApi
    .post('users/user-onboarding', {
      json: data,
    })
    .json();
  },

  async clubOnboarding(data: OnboardingStep2): Promise<void> {
    return securedApi
    .post('clubs/club-onboarding', {
      json: data,
    })
    .json();
  },
};
