import { useState } from "react";
import { resetPassword as resetPasswordAPI } from "../services/authAPI";

interface ResetPasswordParams {
  userId: string;
  token: string;
  newPassword: string;
}

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetPassword = async ({
    userId,
    token,
    newPassword,
  }: ResetPasswordParams) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await resetPasswordAPI(userId, token, newPassword);
      setSuccess(
        "Mật khẩu đã được đặt lại thành công! Đang chuyển hướng về trang đăng nhập..."
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định";
      setError(errorMessage);

      console.error("Reset password error occurred", {
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
    resetPassword,
    loading,
    error,
    success,
    clearError,
  };
};
