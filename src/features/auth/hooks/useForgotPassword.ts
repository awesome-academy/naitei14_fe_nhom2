import { useState } from "react";
import { forgotPassword as forgotPasswordAPI } from "../services/authAPI";
import { ForgotPasswordFormData } from "../types/auth.types";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const forgotPassword = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await forgotPasswordAPI(data.email);
      setSuccess("Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định";
      setError(errorMessage);

      console.error("Forgot password error occurred", {
        message: errorMessage,
        error: err,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    forgotPassword,
    loading,
    error,
    success,
    clearError,
  };
};
