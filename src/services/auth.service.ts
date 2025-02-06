
const GreenApiUrl = import.meta.env.VITE_GREEN_API_URL;

class AuthService {

    async checkAuth(idInstance: string, apiTokenInstance: string): Promise<boolean> {
        try {
            const response = await fetch(
                `${GreenApiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
            );
            const data = await response.json();
            return data.stateInstance === "authorized";
        } catch (error) {
            console.error("Ошибка проверки учетных данных:", error);
            return false;
        }
    }

    logout(): void {
        localStorage.removeItem("idInstance");
        localStorage.removeItem("apiTokenInstance");
    }

}

export const authService = new AuthService();
