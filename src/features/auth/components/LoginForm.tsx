import React, { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { LoginFormData } from "../types/auth.types";
import { useLogin } from "../hooks/useLogin";
import { validateLoginForm } from "../utils/authValidation";
import { RenderButton } from "@/components/ui/Button";

const customLoginResolver = async (values: LoginFormData) => {
  const errors: FieldErrors<LoginFormData> = {};
  const validationErrors = await validateLoginForm(values);
  Object.entries(validationErrors).forEach(([field, message]) => {
    errors[field as keyof LoginFormData] = { message, type: "manual" };
  });
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

const LoginForm: React.FC = () => {
  const { login, loading, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: customLoginResolver,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    await login({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-green-primary mb-6">
              THÔNG TIN CÁ NHÂN
            </h2>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary-text mb-2"
              >
                Email của bạn
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email của bạn"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary-text mb-2"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-text"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </button>
              </div>
              {errors.password?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-primary-text"
                >
                  Ghi nhớ tài khoản
                </label>
              </div>
              <a
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Bạn quên mật khẩu?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <RenderButton
              type="submit"
              variant="primary-rounded"
              isLoading={loading}
              loadingText="ĐANG ĐĂNG NHẬP..."
            >
              ĐĂNG NHẬP
            </RenderButton>
          </form>
        </div>
      </div>

      {/* Right Section - Info Panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            BẠN CHƯA CÓ TÀI KHOẢN?
          </h2>
          <p className="text-primary-text mb-6 leading-relaxed text-justify">
            Đăng ký tài khoản ngay để có thể mua hàng nhanh chóng và dễ dàng
            hơn! Ngoài ra còn có rất nhiều chính sách và ưu đãi cho các thành
            viên của GreenShop.
          </p>
          <a href="/auth/register">
            <RenderButton
              variant="primary-rounded"
              isLoading={loading}
              loadingText="ĐĂNG KÝ..."
              className="pointer-events-none"
            >
              ĐĂNG KÝ
            </RenderButton>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
