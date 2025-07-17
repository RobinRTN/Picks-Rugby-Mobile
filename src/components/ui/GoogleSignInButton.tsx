import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/images/google_logo.webp';

interface GoogleSignInButtonProps {
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export function GoogleSignInButton({ onPress, disabled = false, loading = false }: GoogleSignInButtonProps) {
    const { t, i18n } = useTranslation();

    const buttonText = i18n.language === 'fr' 
        ? t('auth.continueWithGoogle', 'Continuer avec Google')
        : t('auth.continueWithGoogle', 'Continue with Google');

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            className="w-full rounded-xl py-3 px-4 flex-row items-center justify-center active:scale-98 bg-white border border-gray-300 shadow-sm"
        >
            {/* Google Logo */}
            <View className="mr-3">
                <Image
                    source={logo}
                    className="w-[18px] h-[18px]"
                    resizeMode="contain"
                />
            </View>

            {/* Button Text */}
            <Text 
                className="font-medium text-base font-body text-gray-700"
            >
                {loading 
                    ? (i18n.language === 'fr' ? 'Connexion...' : 'Signing in...')
                    : buttonText
                }
            </Text>
        </Pressable>
    );
} 