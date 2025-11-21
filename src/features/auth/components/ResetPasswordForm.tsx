import React, { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { ResetPasswordFormData } from "../types/auth.types";
import { useResetPassword } from "../hooks/useResetPassword";
import { validateResetPasswordForm } from "../utils/authValidation";
import { RenderButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  CLASS_FORM_HEADING,
  CLASS_FORM_LABEL,
  CLASS_FORM_INPUT,
  CLASS_FORM_ERROR,
  CLASS_FORM_SUCCESS_MESSAGE,
  CLASS_FORM_PASSWORD_TOGGLE,
} from "@/constants/common";

const customResetPasswordResolver = async (values: ResetPasswordFormData) => {
  const errors: FieldErrors<ResetPasswordFormData> = {};
  const validationErrors = await validateResetPasswordForm(values);
  Object.entries(validationErrors).forEach(([field, message]) => {
    errors[field as keyof ResetPasswordFormData] = { message, type: "manual" };
  });
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    resetPassword: resetUserPassword,
    loading,
    error,
    success,
  } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: customResetPasswordResolver,
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!userId || !token) {
      setTokenValid(false);
      setTokenError("Liên kết không hợp lệ. Vui lòng thử lại.");
      return;
    }
    setTokenValid(true);
  }, [userId, token]);

  // Navigate to login when reset is successful
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/auth/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetUserPassword({
      userId: userId!,
      token: token!,
      newPassword: data.newPassword,
    });
  };

  if (tokenValid === false) {
    return (
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Liên kết không hợp lệ
          </h2>
          <p className="text-gray-600">{tokenError}</p>
        </div>

        <a href="/auth/forgot-password" className="inline-block">
          <RenderButton variant="primary-rounded">
            Gửi lại liên kết đặt lại mật khẩu
          </RenderButton>
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className={CLASS_FORM_HEADING}>ĐẶT LẠI MẬT KHẨU</h2>
        <p className="text-gray-600">Vui lòng nhập mật khẩu mới của bạn.</p>
        <p className="text-sm text-gray-500 mt-2">
          Mật khẩu nên có ít nhất 8 ký tự và bao gồm chữ cái và số.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* New Password Input */}
        <div className="space-y-1">
          <label htmlFor="newPassword" className={CLASS_FORM_LABEL}>
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword")}
              className={cn(
                CLASS_FORM_INPUT,
                "transition-colors",
                errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300 hover:border-gray-400"
              )}
              placeholder="Mật khẩu mới"
              tabIndex={1}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className={CLASS_FORM_PASSWORD_TOGGLE}
            >
              {showNewPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
            </button>
          </div>
          {errors.newPassword?.message && (
            <p className={CLASS_FORM_ERROR}>{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className={CLASS_FORM_LABEL}>
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={cn(
                CLASS_FORM_INPUT,
                "transition-colors",
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 hover:border-gray-400"
              )}
              placeholder="Xác nhận mật khẩu"
              tabIndex={2}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={CLASS_FORM_PASSWORD_TOGGLE}
            >
              {showConfirmPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
            </button>
          </div>
          {errors.confirmPassword?.message && (
            <p className={CLASS_FORM_ERROR}>{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Success Message */}
        {success && <div className={CLASS_FORM_SUCCESS_MESSAGE}>{success}</div>}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <RenderButton
            type="submit"
            variant="primary-rounded"
            isLoading={loading}
            loadingText="ĐANG ĐẶT LẠI..."
            className="w-full"
          >
            ĐẶT LẠI MẬT KHẨU
          </RenderButton>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
