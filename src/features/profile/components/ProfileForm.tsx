import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileFormData } from "../types";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { validateProfileForm } from "../utils/profileValidation";
import { RenderButton, StatusAlert } from "@/components/ui";
import {
  CLASS_GRID_TWO_COL,
  CLASS_INPUT_BASE,
  CLASS_ERROR,
} from "@/constants/common";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  MdPerson,
  MdPhone,
  MdEmail,
  MdLanguage,
  MdVerified,
} from "react-icons/md";
import { maskEmail } from "../utils/maskEmail";
const ProfileForm: React.FC = () => {
  const { user } = useAuth();
  const { updateUserProfile, loading, error } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      website: user?.website || "",
      subscribeEmail: user?.subscribeEmail || false,
    },
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: ProfileFormData) => {
    // Validation
    const validationErrors = await validateProfileForm(data);
    const hasErrors = Object.keys(validationErrors).length > 0;
    if (hasErrors) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        setError(field as keyof ProfileFormData, { message });
      });
      return;
    }

    try {
      await updateUserProfile(data);
      setSuccessMessage("Cập nhật hồ sơ thành công!");
    } catch (err) {
      console.error("Profile update failed", {
        error: err,
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  const handleReset = () => {
    setValue("fullName", user?.fullName || "");
    setValue("phone", user?.phone || "");
    setValue("website", user?.website || "");
    setValue("subscribeEmail", user?.subscribeEmail || false);
    setSuccessMessage(null);
    clearErrors();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-6">
            <MdPerson className="w-6 h-6 text-green-primary mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">
              THÔNG TIN CÁ NHÂN
            </h2>
          </div>

          <div className={CLASS_GRID_TWO_COL}>
            <div className="relative">
              <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                <MdPerson className="w-4 h-4 mr-2 text-gray-500" />
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("fullName")}
                className={cn(
                  CLASS_INPUT_BASE,
                  "pl-4",
                  errors.fullName && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.fullName?.message && (
                <div className={CLASS_ERROR}>{errors.fullName.message}</div>
              )}
            </div>

            <div className="relative">
              <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                <MdPhone className="w-4 h-4 mr-2 text-gray-500" />
                Số ĐT <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("phone")}
                className={cn(
                  CLASS_INPUT_BASE,
                  "pl-4",
                  errors.phone && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.phone?.message && (
                <div className={CLASS_ERROR}>{errors.phone.message}</div>
              )}
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MdEmail className="w-4 h-4 mr-2 text-gray-500" />
                Địa chỉ email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={maskEmail(user?.email || "")}
                  readOnly
                  className={cn(
                    CLASS_INPUT_BASE,
                    "pl-4 pr-12 bg-gray-100 text-gray-700",
                  )}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
                  {user?.emailVerified && (
                    <MdVerified
                      className="text-green-primary w-5 h-5"
                      title="Verified"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MdLanguage className="w-4 h-4 mr-2 text-gray-500" />
                Website của bạn
              </label>
              <input
                type="text"
                {...register("website")}
                className={cn(
                  CLASS_INPUT_BASE,
                  "pl-4",
                  errors.website && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.website?.message && (
                <div className={CLASS_ERROR}>{errors.website.message}</div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("subscribeEmail")}
                className="w-5 h-5 text-green-primary border-gray-300 rounded focus:ring-green-dark"
              />
              <span className="ml-3 text-sm text-gray-700 font-medium">
                Đăng ký nhận thông tin qua email
              </span>
            </label>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6">
            <StatusAlert type="error" message={error} />
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="mb-6">
            <StatusAlert type="success" message={successMessage} />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <RenderButton
            type="button"
            variant="outline"
            size="md"
            onClick={handleReset}
            className="rounded-full px-8 py-3"
          >
            HỦY
          </RenderButton>
          <RenderButton
            type="submit"
            variant="primary-rounded"
            size="md"
            isLoading={loading}
            loadingText="ĐANG CẬP NHẬT..."
          >
            CẬP NHẬT
          </RenderButton>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
