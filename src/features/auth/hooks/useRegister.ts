import { useState } from "react";
import { registerUser } from "../services/authAPI";
import { RegisterRequest, RegistrationError } from "../types/auth.types";
import { MESSAGE_REGISTER_FAILED } from "@/constants/common";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);

    try {
      const registeredUser = await registerUser(data);
      return registeredUser;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : MESSAGE_REGISTER_FAILED;
      setError(errorMessage);
      console.error("Registration error occurred", {
        message: errorMessage,
        error: err,
      });
      throw new RegistrationError(
        errorMessage,
        err instanceof Error ? err : undefined
      );
    } finally {
      setLoading(false);
    }
  };
  const clearError = () => setError(null);

  return { createUser, loading, error, clearError };
};
