import { securedApi } from "../services/kyClient";
import { Prediction } from "../types/prediction";

export const predictionApi = {
  async getPredictions(): Promise<Prediction> {
    return securedApi.get('/fantasy/predictions').json();
  },
};
