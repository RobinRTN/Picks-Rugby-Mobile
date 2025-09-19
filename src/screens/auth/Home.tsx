import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnimatedText } from '@/src/components/ui/AnimatedText';
import { useLanguage } from '@/src/hooks/useLanguage';
import runningPlayer from '@/assets/images/running_player_small.png';
import logo from '@/assets/images/brand_logo_rectangle.webp';

type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Unconfirmed: undefined;
};

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Home'>;

export default function Home() {
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp>();
    const { currentLanguage, changeLanguage, isEnglish } = useLanguage();

    const toggleLanguage = () => {
        const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
        changeLanguage(newLanguage);
    };

    return (
        <View className="flex-1 bg-green-main">
            <View className="absolute top-16 right-6 z-10">
                <Pressable
                    onPress={toggleLanguage}
                    className="px-2 py-2 rounded-lg shadow-sm border border-beige-main"
                >
                    <Text className="text-beige-main font-semibold text-xs font-heading">
                        {isEnglish ? 'EN' : 'FR'}
                    </Text>
                </Pressable>
            </View>

            <View className="flex-1 justify-evenly items-center px-8">
                <View className='flex-1 justify-center items-center'>
                    <Image
                        source={logo}
                        className='h-20 w-auto mt-8'
                        resizeMode="contain"
                    />
                </View>
                <View className="flex-1 justify-center items-center mb-24">
                    <Image
                        source={runningPlayer}
                        className='h-124 w-auto mt-8'
                        resizeMode="contain"
                    />
                </View>
            </View>

            <View className="px-8 pb-12">
                <AnimatedText
                    className="text-lg text-beige-light text-center mb-6 mt-4 font-body px-4"
                    delay={600}
                    animationType="fade"
                >
                    {t('home.catchy_text', 'Rugby dans le sang, flair dans les pronos !')}
                </AnimatedText>
                <Pressable
                    className="bg-beige-main mb-3 w-full rounded-xl py-4 font-semibold items-center justify-center active:scale-98 active:bg-beige-light"
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text className="text-green-dark font-bold text-sm font-heading">
                        {t('auth.login', 'Se connecter')}
                    </Text>
                </Pressable>

                <Pressable
                    className="bg-green-lightest w-full rounded-xl py-4 font-semibold items-center justify-center active:scale-98 mb-5 active:bg-green-light"
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text className="text-green-darkest font-bold text-sm font-heading">
                        {t('auth.signup', 'S\'inscrire')}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
