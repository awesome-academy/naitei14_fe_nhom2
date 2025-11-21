import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authAPI";
import { LoginError } from "../types/auth.types";
import { useAuth } from "@/contexts/AuthContext";
import { MESSAGE_LOGIN_FAILED } from "@/constants/common";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const login = async (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const user = await loginUser(credentials.email, credentials.password);

      const userForStorage = { ...user } as any;
      delete userForStorage.password;

      // Lưu user vào Context và Storage
      authLogin(userForStorage, credentials.rememberMe);
      navigate("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : MESSAGE_LOGIN_FAILED;
      setError(errorMessage);
      console.error("Registration error occurred", {
        message: errorMessage,
        error: err,
      });
      throw new LoginError(
        errorMessage,
        err instanceof Error ? err : undefined
      );
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    login,
    loading,
    error,
    clearError,
  };
};
