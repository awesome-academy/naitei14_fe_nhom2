import React, { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { LoginFormData } from "../types/auth.types";
import { useLogin } from "../hooks/useLogin";
import { validateLoginForm } from "../utils/authValidation";
import {
  RenderButton,
  Alert,
  StatusAlert,
  AlertWithAction,
} from "@/components/ui";
import { resendActivationEmail } from "../services/authAPI";
import { cn } from "@/lib/utils";
import SocialLoginButtons from "./SocialLoginButtons";
import { useThirdPartyLogin } from "../hooks/useThirdPartyLogin";
import { useTranslation } from "@/hooks/useTranslation";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();

  const customLoginResolver = async (values: LoginFormData) => {
    const errors: FieldErrors<LoginFormData> = {};
    const validationErrors = await validateLoginForm(values);
    Object.entries(validationErrors).forEach(([field, message]) => {
      errors[field as keyof LoginFormData] = { message: t(message as any), type: "manual" };
    });
    return {
      values: Object.keys(errors).length === 0 ? values : {},
      errors,
    };
  };
  const { login, loading, error } = useLogin();
  const {
    handleGoogleLogin,
    handleFacebookLogin,
    handleGithubLogin,
    loading: thirdPartyLoading,
    error: thirdPartyError,
  } = useThirdPartyLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: customLoginResolver,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");

  const watchedEmail = watch("email");

  const onSubmit = async (data: LoginFormData) => {
    await login({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });
  };

  const handleResendEmail = async () => {
    if (!watchedEmail) return;

    setResendLoading(true);
    setResendSuccess("");

    try {
      await resendActivationEmail(watchedEmail);
      setResendSuccess(
        "Email kích hoạt đã được gửi lại. Vui lòng kiểm tra hộp thư!"
      );
    } catch (error) {
      console.error("Resend activation error", error);
      setResendSuccess("Không thể gửi email kích hoạt. Vui lòng thử lại sau.");
    } finally {
      setResendLoading(false);
    }
  };

  const isEmailVerificationError =
    error === "Vui lòng xác thực email trước khi đăng nhập";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-green-primary mb-6">
              {t("auth.login.title")}
            </h2>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary-text dark:text-dark-text mb-2"
              >
                {t("auth.login.email")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={cn(
                  "w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
                  errors.email ? "border-red-500" : "border-gray-300"
                )}
                placeholder={t("auth.login.email")}
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
                className="block text-sm font-medium text-primary-text dark:text-dark-text mb-2"
              >
                {t("auth.login.password")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={cn(
                    "w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
                    errors.password ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder={t("auth.login.password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-text"
                  aria-label={showPassword ? t("common.hide") : t("common.show")}
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
                  className="ml-2 text-sm text-primary-text dark:text-dark-text"
                >
                  {t("auth.login.rememberMe")}
                </label>
              </div>
              <a
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                {t("auth.login.forgotPassword")}
              </a>
            </div>

            {/* Error Message */}
            {error && !isEmailVerificationError && (
              <Alert type="error" message={error} />
            )}

            {/* Email Verification Warning */}
            {isEmailVerificationError && (
              <>
                <AlertWithAction
                  type="warning"
                  title={t("auth.activate.title")}
                  message={t("auth.activate.description")}
                  action={{
                    label: t("auth.activate.resendEmail"),
                    onClick: handleResendEmail,
                    isLoading: resendLoading,
                    loadingText: t("common.sending"),
                    disabled: !watchedEmail || resendLoading,
                  }}
                />

                {/* Success/Error Message */}
                {resendSuccess && (
                  <StatusAlert
                    type={
                      resendSuccess.includes("đã được gửi")
                        ? "success"
                        : "error"
                    }
                    message={resendSuccess}
                  />
                )}
              </>
            )}

            {/* Submit Button */}
            <RenderButton
              type="submit"
              variant="primary-rounded"
              isLoading={loading}
              loadingText={t("auth.login.loginButton") + "..."}
            >
              {t("auth.login.loginButton")}
            </RenderButton>

            {/* Third Party Error */}
            {thirdPartyError && <Alert type="error" message={thirdPartyError} />}

            {/* Social Login Buttons */}
            <div className="mt-6">
              <p className="text-center text-sm text-gray-500 mb-4">{t("auth.login.orLoginWith")}</p>
              <SocialLoginButtons
                onGoogleLogin={handleGoogleLogin}
                onFacebookLogin={handleFacebookLogin}
                onGithubLogin={handleGithubLogin}
                isLoading={thirdPartyLoading}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Info Panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            {t("auth.login.noAccount")}
          </h2>
          <p className="text-primary-text mb-6 leading-relaxed text-justify">
            {t("auth.login.registerPrompt")}
          </p>
          <a href="/auth/register">
            <RenderButton
              variant="primary-rounded"
              isLoading={loading}
              loadingText={t("auth.register.registerButton") + "..."}
            >
              {t("auth.register.registerButton")}
            </RenderButton>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
