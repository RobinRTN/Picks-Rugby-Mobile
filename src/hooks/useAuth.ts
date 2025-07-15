import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { setTokens, clearTokens } from "../services/tokenService";
import { useAuthStore } from "@/src/stores/authStore";

export function useLogin() {
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            setTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                accessTokenExpiresAt: data.accessTokenExpiresAt,
                refreshTokenExpiresAt: data.refreshTokenExpiresAt,
            });
            setUser(data.user);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}

export function useSignup() {
    return useMutation({
        mutationFn: authApi.signup,
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const logout = useAuthStore((state) => state.logout);

    return useMutation({
        mutationFn: async () => {
            await authApi.logout();
            logout();
            await clearTokens();
            queryClient.clear();
        },
    });
}

export function useRefreshToken() {
    return useMutation({
        mutationFn: authApi.refreshToken,
        onSuccess: (data) => {
            setTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                accessTokenExpiresAt: data.accessTokenExpiresAt,
                refreshTokenExpiresAt: data.refreshTokenExpiresAt,
            });
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: authApi.forgotPassword,
    });
}

export function useResendVerificationEmail() {
    return useMutation({
        mutationFn: authApi.resendVerificationEmail,
    });
}
