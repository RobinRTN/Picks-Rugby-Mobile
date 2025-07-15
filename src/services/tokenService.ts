import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens } from '../types/auth';

const STORAGE_KEY = 'authTokens';

export async function getTokens(): Promise<AuthTokens | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthTokens;
  } catch {
    return null;
  }
}

export async function setTokens(tokens: AuthTokens): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export async function clearTokens(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
} 