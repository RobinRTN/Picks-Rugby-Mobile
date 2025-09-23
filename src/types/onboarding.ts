interface BaseUserOnboardingData {
  username: string;
  profilePicture: string;
  country: string;
  club: string;
}

// Step 1: only username + profilePic
interface OnboardingStep1 extends Pick<BaseUserOnboardingData, 'username' | 'profilePicture'> {}

// Step 2: only country
interface OnboardingStep2 extends Pick<BaseUserOnboardingData, 'country'> {}

// Step 3: only club
interface OnboardingStep3 extends Pick<BaseUserOnboardingData, 'club'> {}

// For partial updates
export type PartialOnboardingData = Partial<BaseUserOnboardingData>;

// Navigation types - Updated order: Username -> Country -> Club
export type OnboardingStackParamList = {
  UsernameStep: undefined;
  CountryStep: undefined;
  ClubStep: undefined;
};

// Export the interfaces
export type { BaseUserOnboardingData, OnboardingStep1, OnboardingStep2, OnboardingStep3 };
