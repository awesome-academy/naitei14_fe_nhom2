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
import { Alert, StatusAlert, RenderButton } from "@/components/ui";
import { useTranslation } from "@/hooks/useTranslation";

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();

  const customResolver = async (values: RegisterFormData) => {
    const errors: FieldErrors<RegisterFormData> = {};
    const validationErrors = await validateForm(values);
    Object.entries(validationErrors).forEach(([field, message]) => {
      errors[field as keyof RegisterFormData] = { message: t(message as any), type: "manual" };
    });
    return {
      values: Object.keys(errors).length === 0 ? values : {},
      errors,
    };
  };
  const {
    createUser,
    loading,
    error,
    successMessage,
    clearError,
    clearSuccessMessage,
  } = useRegister();

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

  const onSubmit = async (data: RegisterFormData) => {
    await createUser({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      password: data.password,
      website: data.website,
      subscribeEmail: data.subscribeEmail,
    });
  };

  const handleReset = () => {
    reset();
    clearError();
    clearSuccessMessage();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* THÔNG TIN CÁ NHÂN */}
        <div className="mb-8">
          <h2 className={CLASS_SECTION_HEADING}>{t("profile.personalInformation")}</h2>

          <div className={CLASS_GRID_TWO_COL}>
            <div>
              <label className={CLASS_LABEL}>
                {t("common.fullName")} <span className="text-red-500">*</span>
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
                {t("common.phone")} <span className="text-red-500">*</span>
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
                {t("common.email")} <span className="text-red-500">*</span>
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
              <label className={CLASS_LABEL}>{t("common.website")}</label>
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
                {t("profile.subscribeEmail")}
              </span>
            </label>
          </div>
        </div>

        {/* THÔNG TIN TÀI KHOẢN */}
        <div className="mb-8 mt-12">
          <h2 className={CLASS_SECTION_HEADING}>{t("auth.register.accountInfo")}</h2>

          <div className={CLASS_GRID_TWO_COL}>
            <div>
              <label className={CLASS_LABEL}>
                {t("common.password")} <span className="text-red-500">*</span>
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
                  aria-label={showPassword ? t("common.hide") : t("common.show")}
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
                {t("common.confirmPassword")} <span className="text-red-500">*</span>
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
                      ? t("common.hide")
                      : t("common.show")
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
        {error && <Alert type="error" message={error} className="mb-4" />}

        {/* Success message */}
        {successMessage && (
          <StatusAlert
            type="success"
            message={successMessage}
            className="mb-4"
          />
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <RenderButton
            type="button"
            onClick={handleReset}
            variant="outline"
            className="rounded-full"
          >
            {t("common.reset")}
          </RenderButton>
          <RenderButton
            type="submit"
            variant="primary-rounded"
            isLoading={loading}
            loadingText={t("auth.register.registerButton") + "..."}
          >
            {t("auth.register.registerButton")}
          </RenderButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
