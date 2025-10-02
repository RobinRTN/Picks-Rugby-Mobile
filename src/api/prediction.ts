import { securedApi } from "../services/kyClient";
import { Prediction, PredictionOption } from "../types/prediction";

export const predictionApi = {
  async getPredictions(championshipNames: string[]): Promise<Prediction> {
    return securedApi.get('fantasy/predictions', {
      searchParams: {
        championshipNames: championshipNames.join(','),
      },
    }).json();
  },

  async submitPrediction(matchId: number, prediction: PredictionOption): Promise<unknown> {
    return securedApi.post(`fantasy/predictions/${matchId}`, {
      json: { prediction },
    }).json();
  },
};
