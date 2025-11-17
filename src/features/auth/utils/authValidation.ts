import { RegisterFormData, LoginFormData } from "../types/auth.types";
import { API_BASE_URL } from "@/constants/common";
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

  // Full name: required
  if (!formData.fullName.trim()) {
    errors.fullName = VALIDATION_FULL_NAME_REQUIRED;
  }

  // Phone: required, basic phone validation
  if (!formData.phone.trim()) {
    errors.phone = VALIDATION_PHONE_REQUIRED;
  } else if (!/^\d{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
    errors.phone = VALIDATION_PHONE_INVALID;
  }

  // Email: required, valid email, unique
  if (!formData.email.trim()) {
    errors.email = VALIDATION_EMAIL_REQUIRED;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = VALIDATION_EMAIL_INVALID;
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const users = await response.json();
      if (
        Array.isArray(users) &&
        users.some((user: any) => user.email === formData.email)
      ) {
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
