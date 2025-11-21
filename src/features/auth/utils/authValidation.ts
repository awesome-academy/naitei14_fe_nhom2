import { RegisterFormData, LoginFormData } from "../types/auth.types";
import { checkEmailExists } from "../services/authAPI";

import {
  VALIDATION_FULL_NAME_REQUIRED,
  VALIDATION_PHONE_REQUIRED,
  VALIDATION_PHONE_INVALID,
  VALIDATION_EMAIL_REQUIRED,
  VALIDATION_EMAIL_INVALID,
  VALIDATION_EMAIL_EXISTS,
  VALIDATION_WEBSITE_INVALID,
  VALIDATION_PASSWORD_REQUIRED,
  VALIDATION_PASSWORD_MIN_LENGTH,
  VALIDATION_PASSWORD_STRENGTH,
  VALIDATION_CONFIRM_PASSWORD_REQUIRED,
  VALIDATION_PASSWORD_MISMATCH,
} from "@/constants/common";

export interface ValidationErrors {
  [key: string]: string;
}

export const validateForm = async (
  formData: RegisterFormData
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Full name: required, no numbers or special characters
  if (!formData.fullName.trim()) {
    errors.fullName = VALIDATION_FULL_NAME_REQUIRED;
  } else if (!/^[a-zA-ZÀ-ỹ\s'-]+$/.test(formData.fullName.trim())) {
    errors.fullName = "Họ tên không được chứa số hoặc ký tự đặc biệt";
  }

  // Phone: required, Vietnamese phone validation (starts with 0, 10 digits)
  if (!formData.phone.trim()) {
    errors.phone = VALIDATION_PHONE_REQUIRED;
  } else if (!/^0\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
    errors.phone = VALIDATION_PHONE_INVALID;
  }

  // Email: required, valid email, unique
  if (!formData.email.trim()) {
    errors.email = VALIDATION_EMAIL_REQUIRED;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = VALIDATION_EMAIL_INVALID;
  } else {
    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        errors.email = VALIDATION_EMAIL_EXISTS;
      }
    } catch (err) {
      console.warn("Email uniqueness check failed:", err);
    }
  }

  // Website: optional, but if provided, valid URL
  if (formData.website.trim() && !/^https?:\/\/.+\..+/.test(formData.website)) {
    errors.website = VALIDATION_WEBSITE_INVALID;
  }

  // Password: required, min 8 chars, at least one letter and one number
  if (!formData.password) {
    errors.password = VALIDATION_PASSWORD_REQUIRED;
  } else if (formData.password.length < 8) {
    errors.password = VALIDATION_PASSWORD_MIN_LENGTH;
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = VALIDATION_PASSWORD_STRENGTH;
  }

  // Confirm password: required and matches password
  if (!formData.confirmPassword) {
    errors.confirmPassword = VALIDATION_CONFIRM_PASSWORD_REQUIRED;
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = VALIDATION_PASSWORD_MISMATCH;
  }

  return errors;
};

export const validateLoginForm = async (
  formData: LoginFormData
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Email: required, valid email
  if (!formData.email.trim()) {
    errors.email = VALIDATION_EMAIL_REQUIRED;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = VALIDATION_EMAIL_INVALID;
  }

  // Password: required
  if (!formData.password) {
    errors.password = VALIDATION_PASSWORD_REQUIRED;
  }

  return errors;
};
