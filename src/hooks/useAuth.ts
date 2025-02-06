import { useState } from "react";
import { authService } from "../services/auth.service";
import { TAuthData } from "../types/auth.types";

export const useAuth = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (idInstance: string, apiTokenInstance: string): Promise<TAuthData | null> => {
        if (!idInstance || !apiTokenInstance) {
            setError('Заполните поля для входа');
            return null;
        }
        setIsLoading(true);
        setError(null);

        try {
            const isAuthorized = await authService.checkAuth(idInstance, apiTokenInstance);
            if (isAuthorized) {
                const authData = { idInstance, apiTokenInstance };
                localStorage.setItem("idInstance", idInstance);
                localStorage.setItem("apiTokenInstance", apiTokenInstance);
                return authData;
            } else {
                setError("Неверные учетные данные");
                return null;
            }
        } catch (error) {
            setError("Ошибка при авторизации");
            console.error(error);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
    };

    return { login, logout, error, isLoading };
};