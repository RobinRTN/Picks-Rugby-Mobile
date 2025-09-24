import { securedApi } from "../services/kyClient";
import { OnboardingStep1, OnboardingStep2, OnboardingStep3 } from "../types/onboarding";
import { User } from "../types/auth";

export const onboardingApi = {
  async firstOnboarding(data: OnboardingStep1): Promise<void> {
    return securedApi
    .post('users/onboarding/first-step', {
      json: data,
    })
    .json();
  },

  async secondOnboarding(data: OnboardingStep2): Promise<void> {
    return securedApi
    .post('users/onboarding/second-step', {
      json: data,
    })
    .json();
  },

  async thirdOnboarding(data: OnboardingStep3): Promise<User> {
    return securedApi
    .post('users/onboarding/third-step', {
      json: data,
    })
    .json();
  },

  async getUser(): Promise<User> {
    return securedApi
    .get('users/me')
    .json();
  },
};
