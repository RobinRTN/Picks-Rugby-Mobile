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
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    message: string;
    user: User;
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