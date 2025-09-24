import { create } from 'zustand';
import { BaseUserOnboardingData, PartialOnboardingData } from '../types/onboarding';

interface OnboardingStore {
  data: BaseUserOnboardingData;
  resetOnboarding: () => void;
  updateData: (updates: PartialOnboardingData) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  data: {
    username: '',
    profilePicture: '',
    club: '',
    country: '',
  },
  resetOnboarding: () => set({
    data: { username: '', profilePicture: '', club: '', country: '' }
  }),
  updateData: (updates) => set((state) => ({
    data: { ...state.data, ...updates }
  })),
}));
