import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnimatedText } from '@/src/components/ui/AnimatedText';
import { useOnboardingStore } from '@/src/stores/onboardingStore';
import { countries } from '@/src/data/countries';
import { OnboardingStackParamList } from '@/src/types/onboarding';

type CountryStepNavigationProp = StackNavigationProp<OnboardingStackParamList, 'CountryStep'>;

export function CountryStep() {
  const { t } = useTranslation();
  const navigation = useNavigation<CountryStepNavigationProp>();
  const { data, updateData } = useOnboardingStore();
  const [selectedCountry, setSelectedCountry] = useState(data.country);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    updateData({ country: selectedCountry });
    navigation.navigate('ClubStep');
  };

  const isFormValid = selectedCountry.length > 0;

  // Group countries by competition
  const sixNations = countries.filter(c => c.competition === 'Six Nations');
  const rugbyChampionship = countries.filter(c => c.competition === 'Rugby Championship');
  const autres = countries.filter(c => c.competition === 'Autres');

  const renderCountryGroup = (title: string, countryList: typeof countries) => (
    <View className="mb-6">
      <Text className="text-beige-light/80 font-semibold mb-3 font-heading text-sm">
        {title}
      </Text>
      {countryList.map((country) => (
        <Pressable
          key={country.id}
          onPress={() => setSelectedCountry(country.id)}
          className={`p-3 rounded-xl border-2 mb-2 ${
            selectedCountry === country.id
              ? 'bg-beige-main/20 border-beige-main'
              : 'bg-beige-main/10 border-beige-main/30'
          }`}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1">
              <Text className="text-2xl mr-3">{country.flag}</Text>
              <Text className="text-beige-light font-bold font-heading">
                {country.name}
              </Text>
            </View>
            {/* Selection indicator */}
            <View
              className={`w-6 h-6 rounded-full border-2 ${
                selectedCountry === country.id
                  ? 'bg-beige-main border-beige-main'
                  : 'border-beige-main/50'
              }`}
            />
          </View>
        </Pressable>
      ))}
    </View>
  );

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
            {t('onboarding.countryStepTitle')}
          </AnimatedText>
          <AnimatedText
            className="text-beige-light/80 text-center font-body"
            delay={400}
            animationType="modern"
          >
            {t('onboarding.countryStepSubtitle')}
          </AnimatedText>
        </View>

        {/* Country Selection by Groups */}
        <View className="mb-8">
          {renderCountryGroup(t('onboarding.sixNations'), sixNations)}
          {renderCountryGroup(t('onboarding.rugbyChampionship'), rugbyChampionship)}
          {renderCountryGroup(t('onboarding.autres'), autres)}
        </View>

        {/* Next Button */}
        <Pressable
          className={`w-full rounded-xl py-4 font-semibold items-center justify-center active:scale-98 mb-10 ${
            isFormValid
              ? 'bg-green-lightest active:bg-green-light'
              : 'bg-green-lightest/50'
          }`}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text
            className={`font-bold text-sm font-heading ${
              isFormValid ? 'text-green-dark' : 'text-beige-light/50'
            }`}
          >
            {t('onboarding.continue')}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
