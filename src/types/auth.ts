export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
}

export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
}

export interface User {
    id: string;
    email: string;
    username?: string;
    profilePicture?: string;
    country?: string;
    club?: string;
    hasCompletedOnboarding: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    user: User;
}

export interface SignupResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    user: User;
}

export type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Unconfirmed: undefined;
};
