import {
  RegisterFormData,
  LoginFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ChangePasswordFormData,
} from "../types/auth.types";
import { checkEmailExists } from "../services/authAPI";

export interface ValidationErrors {
  [key: string]: string;
}

export const validateForm = async (
  formData: RegisterFormData
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Full name: required, no numbers or special characters
  if (!formData.fullName.trim()) {
    errors.fullName = "validation.fullNameRequired";
  } else if (!/^[a-zA-ZÀ-ỹ\s'-]+$/.test(formData.fullName.trim())) {
    errors.fullName = "Họ tên không được chứa số hoặc ký tự đặc biệt";
  }

  // Phone: required, Vietnamese phone validation (starts with 0, 10 digits)
  if (!formData.phone.trim()) {
    errors.phone = "validation.phoneRequired";
  } else if (!/^0\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
    errors.phone = "validation.phoneInvalid";
  }

  // Email: required, valid email, unique
  if (!formData.email.trim()) {
    errors.email = "validation.emailRequired";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "validation.emailInvalid";
  } else {
    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        errors.email = "validation.emailExists";
      }
    } catch (err) {
      console.warn("Email uniqueness check failed:", err);
    }
  }

  // Website: optional, but if provided, valid URL
  if (formData.website.trim() && !/^https?:\/\/.+\..+/.test(formData.website)) {
    errors.website = "validation.websiteInvalid";
  }

  // Password: required, min 8 chars, at least one letter and one number
  if (!formData.password) {
    errors.password = "validation.passwordRequired";
  } else if (formData.password.length < 8) {
    errors.password = "validation.passwordMinLength";
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = "validation.passwordStrength";
  }

  // Confirm password: required and matches password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "validation.confirmPasswordRequired";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "validation.passwordMismatch";
  }

  return errors;
};

export const validateLoginForm = async (
  formData: LoginFormData
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Email: required, valid email
  if (!formData.email.trim()) {
    errors.email = "validation.emailRequired";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "validation.emailInvalid";
  }

  // Password: required
  if (!formData.password) {
    errors.password = "validation.passwordRequired";
  }

  return errors;
};

export const validateForgotPasswordForm = async (
  formData: ForgotPasswordFormData
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Email: required, valid email, check if user exists
  if (!formData.email.trim()) {
    errors.email = "validation.emailRequired";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "validation.emailInvalid";
  } else {
    try {
      const emailExists = await checkEmailExists(formData.email);
      if (!emailExists) {
        errors.email = "Email không tồn tại trong hệ thống.";
      }
    } catch (err) {
      console.warn("Email existence check failed:", err);
    }
  }

  return errors;
};

export const validateResetPasswordForm = async (
  formData: ResetPasswordFormData
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // New password: required, min 8 chars, at least one letter and one number
  if (!formData.newPassword) {
    errors.newPassword = "validation.passwordRequired";
  } else if (formData.newPassword.length < 8) {
    errors.newPassword = "validation.passwordMinLength";
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.newPassword)) {
    errors.newPassword = "validation.passwordStrength";
  }

  // Confirm password: required and matches new password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "validation.confirmPasswordRequired";
  } else if (formData.newPassword !== formData.confirmPassword) {
    errors.confirmPassword = "validation.passwordMismatch";
  }

  return errors;
};

export const validateChangePasswordForm = async (
  formData: ChangePasswordFormData
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Current password: required
  if (!formData.currentPassword) {
    errors.currentPassword = "validation.passwordRequired";
  }

  // New password: required, min 8 chars, at least one letter and one number
  if (!formData.newPassword) {
    errors.newPassword = "validation.passwordRequired";
  } else if (formData.newPassword.length < 8) {
    errors.newPassword = "validation.passwordMinLength";
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.newPassword)) {
    errors.newPassword = "validation.passwordStrength";
  }

  // Confirm password: required and matches new password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "validation.confirmPasswordRequired";
  } else if (formData.newPassword !== formData.confirmPassword) {
    errors.confirmPassword = "validation.passwordMismatch";
  }

  return errors;
};
