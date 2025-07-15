import ky from 'ky';
import { AuthTokens, RefreshResponse } from '../types/auth';
import { getTokens, setTokens, clearTokens } from './tokenService';
import { useAuthStore } from '../stores/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

export const openApi = ky.create({
  prefixUrl: API_URL,
});

// Shared promise so that only ONE refresh runs even if several requests 401 simultaneously.
let refreshing: Promise<AuthTokens | null> | null = null;

function isRefreshTokenExpired(tokens: AuthTokens): boolean {
  return tokens.refreshTokenExpiresAt < Date.now();
}

function isTokenExpiredOrExpiringSoon(tokens: AuthTokens): boolean {
  const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000);
  return tokens.accessTokenExpiresAt < fiveMinutesFromNow;
}

export const securedApi = ky.create({
  prefixUrl: API_URL,
  hooks: {

    beforeRequest: [
      async request => {
        const tokens = await getTokens();

        if (!tokens) return;

        if (isRefreshTokenExpired(tokens)) {
          await clearTokens();
          useAuthStore.getState().logout();
          return;
        }

        if (isTokenExpiredOrExpiringSoon(tokens)) {
          if (!refreshing) {
            refreshing = refreshTokens();
          }
          const newTokens = await refreshing;
          refreshing = null;
          
          if (newTokens) {
            request.headers.set('Authorization', `Bearer ${newTokens.accessToken}`);
            return;
          } else {
            useAuthStore.getState().logout();
            return;
          }
        }

        request.headers.set('Authorization', `Bearer ${tokens.accessToken}`);
      
      },
    ],

    afterResponse: [
      async (request, _options, response) => {
        if (response.status !== 401) {
          return response;
        }

        const wasRetried = request.headers.get('x-refresh-retry');
        if (wasRetried) return response;

        if (!refreshing) {
          refreshing = refreshTokens();
        }
        const newTokens = await refreshing;
        refreshing = null;

        if (!newTokens) {
          useAuthStore.getState().logout();
          return response;
        }

        request.headers.set('Authorization', `Bearer ${newTokens.accessToken}`);
        request.headers.set('x-refresh-retry', 'true');

        return ky(request);
      },
    ],
  },
});


async function refreshTokens(): Promise<AuthTokens | null> {
  const current = await getTokens();
  if (!current?.refreshToken) {
    await clearTokens();
    return null;
  }

  if (isRefreshTokenExpired(current)) {
    await clearTokens();
    return null;
  }

  try {
    const data: RefreshResponse = await openApi
      .post('users/refresh-token', {
        json: { refreshToken: current.refreshToken },
      })
      .json();

    const updated: AuthTokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      accessTokenExpiresAt: data.accessTokenExpiresAt,
      refreshTokenExpiresAt: data.refreshTokenExpiresAt,
    };

    await setTokens(updated);
    return updated;
  } catch {
    await clearTokens();
    return null;
  }
}
