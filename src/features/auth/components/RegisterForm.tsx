import React, { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { RegisterFormData } from "../types/auth.types";
import { useRegister } from "../hooks/useRegister";
import { validateForm } from "../utils/authValidation";
import {
  CLASS_SECTION_HEADING,
  CLASS_GRID_TWO_COL,
  CLASS_LABEL,
  CLASS_INPUT_BASE,
  CLASS_PASSWORD_INPUT,
  CLASS_TOGGLE_BUTTON,
  CLASS_ERROR,
} from "@/constants/common";
import { cn } from "@/lib/utils";

const customResolver = async (values: RegisterFormData) => {
  const errors: FieldErrors<RegisterFormData> = {};
  const validationErrors = await validateForm(values);
  Object.entries(validationErrors).forEach(([field, message]) => {
    errors[field as keyof RegisterFormData] = { message, type: "manual" };
  });
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

const RegisterForm: React.FC = () => {
  const { register: registerUser, loading, error, clearError } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: customResolver,
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      website: "",
      password: "",
      confirmPassword: "",
      subscribeEmail: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        website: data.website,
        subscribeEmail: data.subscribeEmail,
      });

      setSuccessMessage("Đăng ký thành công!");
    } catch (err) {
      console.error("Registration failed", {
        error: err,
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  const handleReset = () => {
    reset();
    setSuccessMessage(null);
    clearError();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* THÔNG TIN CÁ NHÂN */}
        <div className="mb-8">
          <h2 className={CLASS_SECTION_HEADING}>THÔNG TIN CÁ NHÂN</h2>

          <div className={CLASS_GRID_TWO_COL}>
            <div>
              <label className={CLASS_LABEL}>
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("fullName")}
                className={cn(
                  CLASS_INPUT_BASE,
                  errors.fullName && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.fullName?.message && (
                <div className={CLASS_ERROR}>{errors.fullName.message}</div>
              )}
            </div>

            <div>
              <label className={CLASS_LABEL}>
                Số ĐT <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("phone")}
                className={cn(
                  CLASS_INPUT_BASE,
                  errors.phone && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.phone?.message && (
                <div className={CLASS_ERROR}>{errors.phone.message}</div>
              )}
            </div>

            <div>
              <label className={CLASS_LABEL}>
                Địa chỉ email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email")}
                className={cn(
                  CLASS_INPUT_BASE,
                  errors.email && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.email?.message && (
                <div className={CLASS_ERROR}>{errors.email.message}</div>
              )}
            </div>

            <div>
              <label className={CLASS_LABEL}>Website của bạn</label>
              <input
                type="text"
                {...register("website")}
                className={cn(
                  CLASS_INPUT_BASE,
                  errors.website && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.website?.message && (
                <div className={CLASS_ERROR}>{errors.website.message}</div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("subscribeEmail")}
                className="w-4 h-4 text-green-primary border-gray-300 rounded focus:ring-green-dark"
              />
              <span className="ml-2 text-sm text-gray-700">
                Đăng ký nhận thông tin qua email
              </span>
            </label>
          </div>
        </div>

        {/* THÔNG TIN TÀI KHOẢN */}
        <div className="mb-8 mt-12">
          <h2 className={CLASS_SECTION_HEADING}>THÔNG TIN TÀI KHOẢN</h2>

          <div className={CLASS_GRID_TWO_COL}>
            <div>
              <label className={CLASS_LABEL}>
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={cn(
                    CLASS_PASSWORD_INPUT,
                    errors.password && "border-red-500 focus:border-red-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={CLASS_TOGGLE_BUTTON}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </button>
              </div>
              {errors.password?.message && (
                <div className={CLASS_ERROR}>{errors.password.message}</div>
              )}
            </div>

            <div>
              <label className={CLASS_LABEL}>
                Nhập lại mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={cn(
                    CLASS_PASSWORD_INPUT,
                    errors.confirmPassword &&
                      "border-red-500 focus:border-red-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={CLASS_TOGGLE_BUTTON}
                  aria-label={
                    showConfirmPassword
                      ? "Ẩn mật khẩu xác nhận"
                      : "Hiện mật khẩu xác nhận"
                  }
                >
                  {showConfirmPassword ? (
                    <LuEyeOff size={20} />
                  ) : (
                    <LuEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword?.message && (
                <div className={CLASS_ERROR}>
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 border-2 border-green-primary text-green-primary rounded-full hover:bg-green-50 transition-colors"
          >
            ĐẶT LẠI
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-green-primary text-white rounded-full hover:bg-green-dark transition-colors disabled:opacity-50"
          >
            {loading ? "ĐANG ĐĂNG KÝ..." : "ĐĂNG KÝ"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
