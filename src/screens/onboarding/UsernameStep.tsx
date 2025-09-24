import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnimatedText } from '@/src/components/ui/AnimatedText';
import { useOnboardingStore } from '@/src/stores/onboardingStore';
import { profilePictures } from '@/src/data/profilePictures';
import { OnboardingStackParamList } from '@/src/types/onboarding';
import { useFirstOnboarding } from '@/src/hooks/useOnboarding';
import { useErrorHandler } from '@/src/hooks/useErrorHandler';


type UsernameStepNavigationProp = StackNavigationProp<OnboardingStackParamList, 'UsernameStep'>;

export function UsernameStep() {
  const { t } = useTranslation();
  const navigation = useNavigation<UsernameStepNavigationProp>();
  const { data, updateData } = useOnboardingStore();
  const [username, setUsername] = useState(data.username);
  const [selectedAvatar, setSelectedAvatar] = useState(data.profilePicture);
  const usernameMutation = useFirstOnboarding();
  const isLoading = usernameMutation.isPending;
  const { getErrorMessage, shouldShowFormError } = useErrorHandler();

  const handleNext = () => {
    usernameMutation.mutate({ username, profilePicture: selectedAvatar },
      {
        onSuccess: () => {
          navigation.navigate('CountryStep');
        },
        onError: (err: any) => {
          console.error('Username onboarding error:', err);

        },
      }
    );
  };

  const isFormValid = username.length >= 3 && selectedAvatar.length > 0;

  const formError =
    usernameMutation.error && shouldShowFormError(usernameMutation.error)
      ? getErrorMessage(usernameMutation.error, 'onboarding')
      : null;

  return (
    <ScrollView
      className="flex-1 bg-green-main"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 justify-center px-8 pt-20">
        {/* Header */}
        <View className="mb-12">
          <AnimatedText
            className="text-3xl text-beige-light font-bold text-center mb-2 font-heading"
            delay={200}
            animationType="modern"
          >
            {t('onboarding.createProfile')}
          </AnimatedText>
          <AnimatedText
            className="text-beige-light/80 text-center font-body"
            delay={400}
            animationType="modern"
          >
            {t('onboarding.usernameStepSubtitle')}
          </AnimatedText>
        </View>

        <View className="space-y-6">
          {/* Username Input */}
          <View className="mb-6">
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="sebastien_chabal"
              placeholderTextColor="#F9EED2"
              autoCapitalize="none"
              autoCorrect={false}
              className="bg-beige-main/20 border border-beige-main/30 rounded-xl px-4 py-4 text-beige-light font-body"
              style={{ fontSize: 16 }}
            />
            {/* Form Error */}
            {formError && (
              <Text className="text-red-500 text-sm font-body mt-2">{formError}</Text>
            )}
          </View>

          {/* Avatar Selection */}
          <View>
            <View className="flex-row flex-wrap justify-between">
              {profilePictures.map((avatar) => (
                <Pressable
                  key={avatar.id}
                  onPress={() => setSelectedAvatar(avatar.id)}
                  className={`w-28 h-28 me-2 mb-2 border-2 rounded-md overflow-hidden ${
                    selectedAvatar === avatar.id
                      ? 'border-beige-main'
                      : 'border-beige-main/30'
                  }`}
                >
                  <Image
                    source={avatar.image}
                    className="w-full h-full"
                    style={{ resizeMode: 'cover' }}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Next Button */}
          <Pressable className={`w-full rounded-xl py-4 font-semibold items-center justify-center active:scale-98 mt-6 ${
                  isFormValid
                      ? 'bg-green-lightest active:bg-green-light'
                      : 'bg-green-lightest/50'
              }`}
              onPress={handleNext}
              disabled={!isFormValid || isLoading}
          >
            <Text
                className={`font-bold text-sm font-heading ${
                    isFormValid ? 'text-green-dark' : 'text-beige-light/50'
                }`}
            >
                {isLoading
                    ? t('common.loading')
                    : t('onboarding.continue')}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
