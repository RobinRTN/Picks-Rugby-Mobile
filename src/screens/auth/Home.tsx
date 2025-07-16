import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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

    return (
        <View className="flex-1 bg-green-main">
            {/* Main Content */}
            <View className="flex-1 justify-evenly items-center px-8">
                <View className='flex-1 justify-center items-center'>
                    <Image
                        source={{ 
                            uri: 'https://assets.picks-rugby.com/brand/logo_rectangle.webp',
                            width: 150,
                            height: 75
                        }}
                    />
                </View>
                <View className="flex-1 justify-center items-center mb-24">
                    <Image
                        source={{ 
                            uri: 'https://assets.picks-rugby.com/brand/running_player_bigger.png',
                            width: 400,
                            height: 400
                        }}
                        className='h-124 w-124 mt-8'
                        resizeMode="contain" 
                    />                   
                </View>
            </View>

            {/* Bottom Action Buttons */}
            <View className="px-8 pb-12">
                <Text className="text-lg text-beige-light text-center mb-6 mt-4 font-body px-4">
                    {t('home.catchy_text', 'Rugby dans le sang, flair dans les pronos !')}
                </Text>
                {/* Primary Button - Sign In */}
                <Pressable 
                    className="bg-beige-main mb-4 w-full rounded-xl py-6 font-semibold items-center justify-center"
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text className="text-green-dark font-bold text-lg font-heading">
                        {t('auth.login', 'Se connecter')}
                    </Text>
                </Pressable>

                {/* Secondary Button - Sign Up */}
                <Pressable 
                    className="bg-green-lightest w-full rounded-xl py-6 font-semibold items-center justify-center"
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text className="text-green-darkest font-bold text-lg font-heading">
                        {t('auth.signup', 'S\'inscrire')}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}