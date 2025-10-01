import { create } from "zustand";
import { championships } from "../data/championships";
import { persist } from "zustand/middleware";

interface PreferencesStore {
  selectedChampionships: string[];
  setSelectedChampionships: (championships: string[]) => void;
  toggleChampionship: (championship: string) => void;
  resetToAllChampionships: () => void;
  getSelectedChampionships: () => string[];
}

const allChampionships = championships.map((championship) => championship.name);

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set, get) => ({
      selectedChampionships: allChampionships,
      setSelectedChampionships: (championships: string[]) => set({ selectedChampionships: championships }),
      toggleChampionship: (championship: string) => set((state) => ({
        selectedChampionships: state.selectedChampionships.includes(championship)
          ? state.selectedChampionships.filter((c) => c !== championship)
          : [...state.selectedChampionships, championship]
      })),
      resetToAllChampionships: () => set({ selectedChampionships: allChampionships }),
      getSelectedChampionships: () => get().selectedChampionships,
    }),
    {
      name: 'championships-preferences',
      partialize: (state) => ({ selectedChampionships: state.selectedChampionships }),
    }
  )
);
