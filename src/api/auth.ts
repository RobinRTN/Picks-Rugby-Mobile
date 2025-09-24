import { openApi, securedApi } from '../services/kyClient';
import { LoginRequest, LoginResponse, RefreshResponse, SignupRequest, SignupResponse } from '../types/auth';
import { getTokens } from '../services/tokenService';

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return openApi
      .post('users/login', {
        json: credentials,
      })
      .json();
  },

  async signup(credentials: SignupRequest): Promise<SignupResponse> {
    return openApi
      .post('users/signup', {
        json: credentials,
      })
      .json();
  },

  async logout(): Promise<void> {
    const tokens = await getTokens();
    if (tokens?.refreshToken) {
      return securedApi
        .post('users/logout', {
          json: { refreshToken: tokens.refreshToken },
        })
        .json();
    }
  },

  async refreshToken(refreshToken: string): Promise<RefreshResponse> {
    return openApi
      .post('users/refresh-token', {
        json: { refreshToken },
      })
      .json();
  },

  async forgotPassword(email: string): Promise<void> {
    return openApi
      .post('users/forgot-password', {
        json: { email },
      })
      .json();
  },

  async resendVerificationEmail(email: string): Promise<void> {
    return openApi
      .post('users/resend-verification-email', {
        json: { email },
      })
      .json();
  },
}
