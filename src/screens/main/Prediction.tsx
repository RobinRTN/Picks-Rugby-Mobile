import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useTranslation } from 'react-i18next';
import { AnimatedText } from '@/src/components/ui/AnimatedText';
import { usePrediction } from "@/src/hooks/usePrediction";
import { predictionApi } from "@/src/api/prediction";
import { PredictionOption } from "@/src/types/prediction";
import { formatDate, formatTime, getTeamImage } from "@/src/services/utlis";

const PREDICTION_OPTIONS = [
  { key: 'prediction.bigWinHome' as PredictionOption, label: 'Big Win Home', color: 'bg-green-lightest/70', size: 'big', icon: '++' },
  { key: 'prediction.smallWinHome' as PredictionOption, label: 'Small Win Home', color: 'bg-green-lightest/30', size: 'medium', icon: '+' },
  { key: 'prediction.draw' as PredictionOption, label: 'Draw', color: 'bg-beige-main/10', size: 'small', icon: '=' },
  { key: 'prediction.smallWinAway' as PredictionOption, label: 'Small Win Away', color: 'bg-green-lightest/30', size: 'medium', icon: '+' },
  { key: 'prediction.bigWinAway' as PredictionOption, label: 'Big Win Away', color: 'bg-green-lightest/70', size: 'big', icon: '++' },
];

export default function Prediction() {
  const { t } = useTranslation();
  const { data, isLoading, error } = usePrediction();
  const [selectedPredictions, setSelectedPredictions] = useState<Record<number, PredictionOption>>({});
  const [submitting, setSubmitting] = useState<Record<number, boolean>>({});

  const handlePredictionSelect = async (matchId: number, prediction: PredictionOption) => {
    setSelectedPredictions(prev => ({ ...prev, [matchId]: prediction }));
  };

  if (isLoading) return (
    <View className="flex-1 justify-center items-center bg-green-main">
      <AnimatedText
        className="text-2xl text-beige-light font-bold font-heading"
        delay={200}
        animationType="modern"
      >
        {t('common.loading', 'Loading...')}
      </AnimatedText>
    </View>
  );

  if (error) return (
    <View className="flex-1 justify-center items-center bg-green-main px-8">
      <AnimatedText
        className="text-2xl text-beige-light font-bold font-heading text-center"
        delay={200}
        animationType="modern"
      >
        {t('common.error', 'Error')}: {error.message}
      </AnimatedText>
    </View>
  );

  if (!data) return (
    <View className="flex-1 justify-center items-center bg-green-main px-8">
      <AnimatedText
        className="text-2xl text-beige-light font-bold font-heading text-center"
        delay={200}
        animationType="modern"
      >
        {t('common.noData', 'No data available')}
      </AnimatedText>
    </View>
  );

  return (
    <ScrollView
      className="flex-1 bg-green-main"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-8 pt-20">
        {/* Header */}
        <View className="mb-8">
          <AnimatedText
            className="text-3xl text-beige-light font-bold text-center mb-2 font-heading"
            delay={200}
            animationType="modern"
          >
            {t('prediction.title', 'Predictions')}
          </AnimatedText>
          <AnimatedText
            className="text-beige-light/80 text-center font-body"
            delay={400}
            animationType="modern"
          >
            {t('prediction.subtitle', 'Make your predictions and climb the leaderboard')}
          </AnimatedText>
        </View>

        {/* Matches by Date */}
        {data.matches_by_date.map((dateGroup) => (
          <View key={dateGroup.date} className="mb-8">
            {/* Date Header */}
            <Text className="text-sm font-bold text-beige-main text-center font-heading my-2">
              {formatDate(dateGroup.date)}
            </Text>
            {/* Matches for this date */}
            <View className="space-y-4">
              {dateGroup.matches.map((match) => (
                <View key={match.id} className="bg-beige-main/10 border border-beige-main/30 rounded-xl p-4 my-2">
                  {/* Championship */}
                  <View className="flex-row items-center justify-center">
                  <Text className="text-sm text-beige-light/70 text-center font-body font-semibold me-2">
                    {match.championship_name}
                  </Text>

                  {/* Match Time */}
                  <Text className="text-center text-beige-light/70 font-body font-semibold ms-2">
                    {/* {match.match_time} */}
                    {formatTime(match.match_time)}
                  </Text>

                  </View>

                  {/* Teams */}
                  <View className="flex-row items-center justify-between mb-6">
                    {/* Home Team */}
                    <View className="flex-1 items-center">
                      <Image
                        source={getTeamImage(match.home_team.name, match.home_team.logo_url)}
                        className="w-12 h-12 mb-2"
                        resizeMode="contain"
                      />
                      <Text className="text-center font-bold text-beige-light font-heading" numberOfLines={2}>
                        {match.home_team.name}
                      </Text>
                    </View>

                    {/* VS */}
                    <View className="mx-4">
                      <Text className="text-2xl font-bold text-beige-light/60 font-heading">VS</Text>
                    </View>

                    {/* Away Team */}
                    <View className="flex-1 items-center">
                      <Image
                        source={getTeamImage(match.away_team.name, match.away_team.logo_url)}
                        className="w-12 h-12 mb-2"
                        resizeMode="contain"
                      />
                      <Text className="text-center font-bold text-beige-light font-heading" numberOfLines={2}>
                        {match.away_team.name}
                      </Text>
                    </View>
                  </View>

                  {/* Prediction Options */}
                  <View className="space-y-3">
                    <View className="space-y-2 flex-row justify-center gap-2 items-center">
                      {PREDICTION_OPTIONS.map((option) => {
                        const isSelected = selectedPredictions[match.id] === option.key;
                        const isSubmitting = submitting[match.id];

                        // Size classes
                        const sizeClass = option.size === 'big' ? 'w-16 h-16' :
                                        option.size === 'medium' ? 'w-14 h-14' :
                                        'w-12 h-12';

                        return (
                          <Pressable
                            key={option.key}
                            onPress={() => handlePredictionSelect(match.id, option.key)}
                            disabled={false}
                            className={`p-3 rounded-xl ${sizeClass} ${
                              isSelected
                                ? `${option.color} border-beige-main border-2`
                                : `${option.color} border-beige-main/30`
                            }`}
                          >
                            <Text className={`text-center font-bold text-beige-light ${
                              option.size === 'big' ? 'text-lg' :
                              option.size === 'medium' ? 'text-base' :
                              'text-sm'
                            }`}>
                              
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                    <Text className="text-center text-beige-light/70 font-body mt-1 text-sm">
                      {selectedPredictions[match.id] ?
                        (() => {
                          const prediction = selectedPredictions[match.id];
                          if (prediction === 'prediction.draw' as PredictionOption) {
                            return t(prediction);
                          }
                          const isHome = prediction.includes('Home');
                          const teamName = isHome ? match.home_team.short_name : match.away_team.short_name;
                          const points = prediction.includes('big') ? '+10 pts' : '-10 pts';
                          return `${t(prediction)} ${teamName} (${points})`;
                        })()
                        : t('prediction.selectPrediction')
                      }
                    </Text>
                  </View>

                  {/* Current Prediction Status */}
                  {match.user_prediction && (
                    <View className="mt-4 p-3 bg-green-lightest/20 border border-green-lightest/30 rounded-lg">
                      <Text className="text-center text-green-lightest font-medium font-body">
                        ✓ {t('prediction.submitted', 'Prediction submitted')}: {PREDICTION_OPTIONS.find(opt => opt.key === match.user_prediction?.predicted_outcome)?.label}
                      </Text>
                      <Text className="text-center text-green-lightest/80 text-sm mt-1 font-body">
                        {t('prediction.pointsPossible', 'Points possible')}: {match.user_prediction.points_possible}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
