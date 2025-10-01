import { useQuery, useQueryClient } from "@tanstack/react-query";
import { predictionApi } from "../api/prediction";
import { usePreferencesStore } from "../stores/preferencesStore";

export function usePrediction() {
  const selectedChampionships = usePreferencesStore((state) => state.selectedChampionships);
  return useQuery({
    queryKey: ['predictions', selectedChampionships],
    queryFn: () => predictionApi.getPredictions(selectedChampionships),
    enabled: selectedChampionships.length > 0,
  });
}
