import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnimatedText } from '@/src/components/ui/AnimatedText';
import { useResendVerificationEmail } from '@/src/hooks/useAuth';
import { useErrorHandler } from '@/src/hooks/useErrorHandler';
import { useToast } from '@/src/hooks/useToast';

type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Unconfirmed: undefined;
};

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Unconfirmed'>;

export default function Unconfirmed() {
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp>();
    const [email, setEmail] = useState('');
    const resendVerificationEmailMutation = useResendVerificationEmail();
    const isLoading = resendVerificationEmailMutation.isPending;
    const toast = useToast();
    const { getErrorMessage, shouldShowFormError } = useErrorHandler();

    const handleResendEmail = async () => {
        if (!email) return;
          resendVerificationEmailMutation.mutate(email, {
              onSuccess: () => {
                  toast.showSuccess('auth.verifyEmail', true, 'auth.verifyEmailSubtitle');
              },
              onError: (err: any) => {
                  console.error('Resend email error:', err);
              }
          });
    };

    const isFormValid = email.length > 3;

    const formError =
    resendVerificationEmailMutation.error && shouldShowFormError(resendVerificationEmailMutation.error)
      ? getErrorMessage(resendVerificationEmailMutation.error)
      : null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-green-main"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="absolute top-16 left-6 z-10">
                    <Pressable
                        onPress={() => navigation.goBack()}
                        className="bg-beige-main/90 px-3 py-2 rounded-lg shadow-sm"
                    >
                        <Text className="text-green-dark font-semibold text-sm font-heading">
                            ←
                        </Text>
                    </Pressable>
                </View>

                <View className="flex-1 justify-center px-8 pt-20">
                    {/* Header */}
                    <View className="mb-12">
                        <AnimatedText
                            className="text-3xl text-beige-light font-bold text-center mb-2 font-heading"
                            delay={200}
                            animationType="modern"
                        >
                            Vérifie ton email
                        </AnimatedText>
                        <AnimatedText
                            className="text-beige-light/80 text-center font-body"
                            delay={400}
                            animationType="modern"
                        >
                            {t('auth.verificationEmailSent')}
                        </AnimatedText>
                    </View>

                    <View className="space-y-4">
                        {/* Email Input */}
                        <View>
                            <Text
                                className="text-beige-light font-medium mb-2 font-body"
                            >
                                {t('auth.email')}
                            </Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder={t('auth.emailPlaceholder')}
                                placeholderTextColor="#F9EED2"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                className="bg-beige-main/20 border border-beige-main/30 rounded-xl px-4 py-4 text-beige-light font-body"
                                style={{ fontSize: 16 }}
                            />
                        </View>

                        {formError && (
                          <Text className="text-red-400 mt-2 font-body">
                            {formError}
                          </Text>
                        )}

                        <Pressable
                            className={`w-full rounded-xl py-4 font-semibold items-center justify-center active:scale-98 mt-6 ${
                                isFormValid
                                    ? 'bg-beige-main active:bg-beige-light'
                                    : 'bg-beige-main/50'
                            }`}
                            onPress={handleResendEmail}
                            disabled={!isFormValid || isLoading}
                        >
                            <Text
                                className={`font-bold text-sm font-heading ${
                                    isFormValid ? 'text-green-dark' : 'text-beige-light/50'
                                }`}
                            >
                                {isLoading
                                    ? t('auth.resending')
                                    : t('auth.resendCode')
                                }
                            </Text>
                        </Pressable>

                        <View className="flex-row items-center my-6">
                            <View className="flex-1 h-px bg-beige-light/30" />
                            <Text className="mx-4 text-beige-light/60 font-body">
                                {t('auth.or')}
                            </Text>
                            <View className="flex-1 h-px bg-beige-light/30" />
                        </View>

                        {/* Navigation Links */}
                        <View className="space-y-4">
                            <View className="flex-row justify-center">
                                <Pressable onPress={() => navigation.navigate('Login')}>
                                    <Text className="text-beige-light font-semibold font-body underline">
                                        {t('auth.signIn')}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
