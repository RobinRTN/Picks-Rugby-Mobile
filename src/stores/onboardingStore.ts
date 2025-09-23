import { create } from 'zustand';
import { BaseUserOnboardingData, PartialOnboardingData } from '../types/onboarding';

interface OnboardingStore {
  hasCompletedOnboarding: boolean;
  data: BaseUserOnboardingData;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  updateData: (updates: PartialOnboardingData) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  hasCompletedOnboarding: false,
  data: {
    username: '',
    profilePicture: '',
    club: '',
    country: '',
  },
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  resetOnboarding: () => set({
    hasCompletedOnboarding: false,
    data: { username: '', profilePicture: '', club: '', country: '' }
  }),
  updateData: (updates) => set((state) => ({
    data: { ...state.data, ...updates }
  })),
}));
