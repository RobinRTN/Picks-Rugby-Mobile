import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AnimatedText } from '@/src/components/ui/AnimatedText';
import { useOnboardingStore } from '@/src/stores/onboardingStore';
import { top14Clubs } from '@/src/data/top14Clubs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@/src/types/onboarding';
import { useThirdOnboarding } from '@/src/hooks/useOnboarding';

type ClubStepNavigationProp = StackNavigationProp<OnboardingStackParamList, 'ClubStep'>;

export function ClubStep() {
  const { t } = useTranslation();
  const navigation = useNavigation<ClubStepNavigationProp>();
  const { data, updateData } = useOnboardingStore();
  const [selectedClub, setSelectedClub] = useState(data.club);
  const clubMutation = useThirdOnboarding();
  const isLoading = clubMutation.isPending;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFinish = () => {
    clubMutation.mutate({ club: selectedClub },
      {
        onSuccess: () => {
          updateData({ club: selectedClub });
        },
        onError: (err: any) => {
          console.error('Club onboarding error:', err);
        },
      }
    );
  };

  const isFormValid = selectedClub.length > 0;

  return (
    <ScrollView
      className="flex-1 bg-green-main"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Back Button */}
      <View className="absolute top-16 left-6 z-10">
        <Pressable
          onPress={handleBack}
          className="bg-beige-main/90 px-3 py-2 rounded-lg shadow-sm"
        >
          <Text className="text-green-dark font-semibold text-sm font-heading">
            ←
          </Text>
        </Pressable>
      </View>

      <View className="flex-1 justify-center px-8 pt-20">
        {/* Header */}
        <View className="mb-8">
          <AnimatedText
            className="text-3xl text-beige-light font-bold text-center mb-2 font-heading"
            delay={200}
            animationType="modern"
          >
            {t('onboarding.clubStepTitle')}
          </AnimatedText>
          <AnimatedText
            className="text-beige-light/80 text-center font-body"
            delay={400}
            animationType="modern"
          >
            {t('onboarding.clubStepSubtitle')}
          </AnimatedText>
        </View>

        {/* Club Selection */}
        <View className="space-y-3 mb-8">
          {top14Clubs.map((club) => (
            <Pressable
              key={club.id}
              onPress={() => setSelectedClub(club.id)}
              className={`p-3 rounded-xl border-2 mb-2 ${
                selectedClub === club.id
                  ? 'bg-beige-main/20 border-beige-main'
                  : 'bg-beige-main/10 border-beige-main/30'
              }`}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-beige-light font-bold font-heading">
                    {club.name}
                  </Text>
                  <Text className="text-beige-light/70 font-body text-sm">
                    {club.city}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  {/* Club colors indicator */}
                  <View className="mr-3">
                    <View className="w-6 h-6 rounded-full border border-beige-main/30 overflow-hidden">
                      <View className="flex-row h-full">
                        <View
                          className="flex-1 h-full"
                          style={{ backgroundColor: club.colors[0] }}
                        />
                        <View
                          className="flex-1 h-full"
                          style={{ backgroundColor: club.colors[1] }}
                        />
                      </View>
                    </View>
                  </View>
                  {/* Selection indicator */}
                  <View
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedClub === club.id
                        ? 'bg-beige-main border-beige-main'
                        : 'border-beige-main/50'
                    }`}
                  />
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Finish Button */}
        <Pressable className={`w-full rounded-xl py-4 font-semibold items-center justify-center active:scale-98 mt-2 mb-10 ${
                  isFormValid
                      ? 'bg-green-lightest active:bg-green-light'
                      : 'bg-green-lightest/50'
              }`}
              onPress={handleFinish}
              disabled={!isFormValid || isLoading}
          >
              <Text
                  className={`font-bold text-sm font-heading ${
                      isFormValid ? 'text-green-dark' : 'text-beige-light/50'
                  }`}
              >
                  {t('onboarding.finish')}
              </Text>
          </Pressable>
      </View>
    </ScrollView>
  );
}
