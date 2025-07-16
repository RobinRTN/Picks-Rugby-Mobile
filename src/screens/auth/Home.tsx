import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, ButtonText } from '@/components/ui/button';
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
            <View className="flex-1 justify-center items-center px-8">
                <View className='flex-1 justify-center items-center'>
                    <Image
                        source={{ 
                            uri: 'https://assets.picks-rugby.com/brand/logo_rectangle.webp',
                            width: 150,
                            height: 75
                        }}
                    />
                </View>
                <View className="flex-1 justify-center items-center">
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

                {/* Catchy Text */}
                <View className="flex-1 justify-center items-center mb-8">
                    <Text className="text-xl font-semibold text-beige-light text-center mb-3 mt-4 font-heading">
                        {t('home.catchy_text', 'Rugby dans le sang, flair dans les pronos !')}
                    </Text>
                </View>
            </View>

            {/* Bottom Action Buttons */}
            <View className="px-8 pb-12">
                {/* Primary Button - Sign In */}
                <Button 
                    className="bg-white border-2 border-white mb-4 w-full rounded-xl py-4 font-semibold"
                    onPress={() => navigation.navigate('Login')}
                >
                    <ButtonText className="text-green-main font-semibold text-lg">
                        {t('auth.login', 'Se connecter')}
                    </ButtonText>
                </Button>

                {/* Secondary Button - Sign Up */}
                <Button 
                    className="bg-transparent border-2 border-white w-full rounded-xl py-4 font-semibold"
                    onPress={() => navigation.navigate('Signup')}
                >
                    <ButtonText className="text-white font-semibold text-lg">
                        {t('auth.signup', 'S\'inscrire')}
                    </ButtonText>
                </Button>
            </View>
        </View>
    );
}