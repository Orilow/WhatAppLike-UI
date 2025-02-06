import { useState } from "react";
import { TAuthData } from "../../types/auth.types";
import { useAuth } from "../../hooks/useAuth";

type TProps = {
    setAuth: (x: TAuthData) => void;
}

const Login = ({setAuth}: TProps) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const { login, error, isLoading } = useAuth();

  const handleLogin = async () => {
    const authData = await login(idInstance, apiTokenInstance);
    if (authData) {
      setAuth(authData);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f2f5] p-4 ">
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] border border-gray-300 mx-auto">
      <h1 className="text-xl font-semibold text-center text-[#128C7E] mb-6">WhatsApp Login</h1>
      <p className="text-gray-600 text-center mb-4">Введите свои учетные данные для входа</p>
      <input
        type="text"
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        className="border border-gray-300 p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-gray-50"
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        className="border border-gray-300 p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-gray-50"
      />
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full bg-[#25D366] text-white py-3 rounded hover:bg-[#1ebe5c] transition font-semibold"
        style={{ backgroundColor: "#25D366", color: "white" }}
      >
        {isLoading ? "Загрузка..." : "Войти"}
      </button>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    </div>
  </div>
  );
};

export default Login;
