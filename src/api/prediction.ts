import { securedApi } from "../services/kyClient";
import { Prediction } from "../types/prediction";

export const predictionApi = {
  async getPredictions(championshipNames: string[]): Promise<Prediction> {
    return securedApi.get('fantasy/predictions', {
      searchParams: {
        championshipNames: championshipNames.join(','),
      },
    }).json();
  },
};
