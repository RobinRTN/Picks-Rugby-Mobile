export interface Team {
  id: number;
  name: string;
  short_name: string;
  logo_url: string;
  color1: string;
  color2: string;
}

export interface Prediction {
  matches_by_date: Array<{
    date: string;
    day_name: string;
    matches: Array<{
      id: number;
      championship_id: number;
      championship_name: string;
      match_time: string;
      home_team: Team;
      away_team: Team;
      odds: Record<string, any>;
      status: string;
      user_prediction: {
        predicted_outcome: string;
        points_possible: number;
        submitted_at: string;
      } | null;
      lock_time: string;
      calculated_outcome: string | null;
      final_score: {
        home: number;
        away: number;
        home_tries: number;
        away_tries: number;
        margin: number;
      } | null;
      is_user_league: boolean;
    }>;
  }>;
}

export type PredictionOption = 'big_win_home' | 'small_win_home' | 'draw' | 'small_win_away' | 'big_win_away';
