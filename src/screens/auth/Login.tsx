import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnimatedText } from '@/src/components/ui/AnimatedText';
import { GoogleSignInButton } from '@/src/components/ui/GoogleSignInButton';
import { useLogin } from '@/src/hooks/useAuth';
import { useErrorHandler } from '@/src/hooks/useErrorHandler'
import { AuthStackParamList } from '@/src/types/auth';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export default function Login() {
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp>();
    const loginMutation = useLogin();
    const isLoading = loginMutation.isPending;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const {getErrorMessage, shouldShowFormError } = useErrorHandler();

    const handleGoogleSignIn = async () => {
        try {
            setIsGoogleLoading(true);
            // TODO: Call your backend API here
            console.log('Google OAuth pressed - will call backend');

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            console.error('Google Sign-In Error:', error);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) return;

        loginMutation.mutate(
          { email, password },
          {
            onSuccess: () => {
              // Navigate after successful login
              navigation.navigate('Home');
            },
            onError: (err: any) => {
              // console.error('Login failed:', err);
            },
          }
        );
    };

    const isFormValid = email.length > 0 && password.length > 7;

    const formError =
      loginMutation.error && shouldShowFormError(loginMutation.error)
        ? getErrorMessage(loginMutation.error)
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
                            {t('auth.welcomeBack', 'Bienvenue')}
                        </AnimatedText>
                        <AnimatedText
                            className="text-beige-light/80 text-center font-body"
                            delay={400}
                            animationType="modern"
                        >
                            {t('auth.loginSubtitle', 'Connecte-toi pour continuer à dominer la ligue')}
                        </AnimatedText>
                    </View>

                    <View className="space-y-4">
                        {/* Email Input */}
                        <View>
                            <Text
                                className="text-beige-light font-medium mb-2 font-body"
                            >
                                {t('auth.email', 'Email')}
                            </Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder={t('auth.emailPlaceholder', 'sebastien@chabal.com')}
                                placeholderTextColor="#F9EED2"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                className="bg-beige-main/20 border border-beige-main/30 rounded-xl px-4 py-4 text-beige-light font-body"
                                style={{ fontSize: 16 }}
                            />
                        </View>

                        {/* Password Input */}
                        <View className='mt-4'>
                            <Text
                                className="text-beige-light font-medium mb-2 font-body"
                            >
                                {t('auth.password', 'Password')}
                            </Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder={t('auth.passwordPlaceholder', '••••••••')}
                                placeholderTextColor="#E6C78A"
                                secureTextEntry
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
                            onPress={() => navigation.navigate('ForgotPassword')}
                            className="self-end mt-2"
                        >
                            <Text
                                className="text-beige-light/80 font-body underline"
                            >
                                {t('auth.forgotPassword', 'Mot de passe oublié ?')}
                            </Text>
                        </Pressable>

                        <Pressable
                            className={`w-full rounded-xl py-4 font-semibold items-center justify-center active:scale-98 mt-6 ${
                                isFormValid
                                    ? 'bg-beige-main active:bg-beige-light'
                                    : 'bg-beige-main/50'
                            }`}
                            onPress={handleLogin}
                            disabled={!isFormValid || isLoading}
                        >
                            <Text
                                className={`font-bold text-sm font-heading ${
                                    isFormValid ? 'text-green-dark' : 'text-beige-light/50'
                                }`}
                            >
                                {isLoading
                                    ? t('auth.signingIn', 'Connexion...')
                                    : t('auth.login', 'SE CONNECTER')
                                }
                            </Text>
                        </Pressable>

                        <View className="flex-row items-center my-6">
                            <View className="flex-1 h-px bg-beige-light/30" />
                            <Text className="mx-4 text-beige-light/60 font-body">
                                {t('auth.or', 'ou')}
                            </Text>
                            <View className="flex-1 h-px bg-beige-light/30" />
                        </View>

                        {/* Google OAuth Button */}
                        <View className="mb-4">
                            <GoogleSignInButton
                                onPress={handleGoogleSignIn}
                                disabled={isGoogleLoading}
                                loading={isGoogleLoading}
                            />
                        </View>

                        <View className="flex-row justify-center">
                            <Pressable onPress={() => navigation.navigate('Unconfirmed')}>
                                <Text className="text-beige-light font-semibold ml-1 font-body underline">
                                    {t('auth.noVerificationEmail', 'Je n\'ai pas reçu l\'email de vérification')}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
