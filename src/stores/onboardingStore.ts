import { create } from 'zustand';

interface OnboardingData {
  username: string;
  profilePicture: string;
  favoriteClub: string;
}

interface OnboardingStore {
  hasCompletedOnboarding: boolean;
  currentStep: number;
  data: OnboardingData;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  nextStep: () => void;
  previousStep: () => void;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  hasCompletedOnboarding: false,
  currentStep: 1,
  data: {
    username: '',
    profilePicture: '',
    favoriteClub: '',
  },
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  resetOnboarding: () => set({
    hasCompletedOnboarding: false,
    currentStep: 1,
    data: { username: '', profilePicture: '', favoriteClub: '' }
  }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 2) })),
  previousStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  updateData: (updates) => set((state) => ({
    data: { ...state.data, ...updates }
  })),
}));
