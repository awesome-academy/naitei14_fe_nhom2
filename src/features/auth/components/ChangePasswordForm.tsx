import React, { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { ChangePasswordFormData } from "../types/auth.types";
import { useChangePassword } from "../hooks/useChangePassword";
import { validateChangePasswordForm } from "../utils/authValidation";
import { useAuth } from "@/contexts/AuthContext";
import { RenderButton, Alert, StatusAlert } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  CLASS_FORM_HEADING,
  CLASS_FORM_LABEL,
  CLASS_FORM_INPUT,
  CLASS_FORM_ERROR,
  CLASS_FORM_PASSWORD_TOGGLE,
} from "@/constants/common";

const customChangePasswordResolver = async (values: ChangePasswordFormData) => {
  const errors: FieldErrors<ChangePasswordFormData> = {};
  const validationErrors = await validateChangePasswordForm(values);
  Object.entries(validationErrors).forEach(([field, message]) => {
    errors[field as keyof ChangePasswordFormData] = { message, type: "manual" };
  });
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

const ChangePasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    changePassword: changeUserPassword,
    loading,
    error,
    success,
  } = useChangePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: customChangePasswordResolver,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Logout when password change is successful
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        logout();
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, logout, navigate]);

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!user?.id) return;

    await changeUserPassword({
      userId: user.id,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <>
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className={CLASS_FORM_HEADING}>ĐỔI MẬT KHẨU</h2>
        <p className="text-gray-600">
          Vui lòng nhập mật khẩu hiện tại và mật khẩu mới của bạn.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Mật khẩu nên có ít nhất 8 ký tự và bao gồm chữ cái và số.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Current Password Input */}
        <div className="space-y-1">
          <label htmlFor="currentPassword" className={CLASS_FORM_LABEL}>
            Mật khẩu hiện tại
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              {...register("currentPassword")}
              className={cn(
                CLASS_FORM_INPUT,
                "transition-colors",
                errors.currentPassword
                  ? "border-red-500"
                  : "border-gray-300 hover:border-gray-400"
              )}
              placeholder="Mật khẩu hiện tại"
              tabIndex={1}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className={CLASS_FORM_PASSWORD_TOGGLE}
            >
              {showCurrentPassword ? (
                <LuEyeOff size={18} />
              ) : (
                <LuEye size={18} />
              )}
            </button>
          </div>
          {errors.currentPassword?.message && (
            <p className={CLASS_FORM_ERROR}>{errors.currentPassword.message}</p>
          )}
        </div>

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
              tabIndex={2}
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
              tabIndex={3}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={CLASS_FORM_PASSWORD_TOGGLE}
            >
              {showConfirmPassword ? (
                <LuEyeOff size={18} />
              ) : (
                <LuEye size={18} />
              )}
            </button>
          </div>
          {errors.confirmPassword?.message && (
            <p className={CLASS_FORM_ERROR}>{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Success Message */}
        {success && <StatusAlert type="success" message={success} />}

        {/* Error Message */}
        {error && <Alert type="error" message={error} />}

        {/* Submit Button */}
        <div className="pt-2">
          <RenderButton
            type="submit"
            variant="primary-rounded"
            isLoading={loading}
            loadingText="ĐANG ĐỔI MẬT KHẨU..."
            className="w-full"
          >
            ĐỔI MẬT KHẨU
          </RenderButton>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
