import { useQuery, useQueryClient } from "@tanstack/react-query";
import { predictionApi } from "../api/prediction";
import { useErrorHandler } from "./useErrorHandler";
import { Prediction } from "../types/prediction";

export function usePrediction() {
  return useQuery({
    queryKey: ['predictions'],
    queryFn: predictionApi.getPredictions,
  });
}
