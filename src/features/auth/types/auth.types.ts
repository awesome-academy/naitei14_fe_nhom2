/**
 * Data structure for the registration form inputs.
 */
export interface RegisterFormData {
  fullName: string;
  phone: string;
  email: string;
  website: string;
  password: string;
  confirmPassword: string;
  subscribeEmail: boolean;
}

/**
 * Data structure for the login form inputs.
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Data structure for the forgot password form inputs.
 */
export interface ForgotPasswordFormData {
  email: string;
}

/**
 * Data structure for the reset password form inputs.
 */
export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

/**
 * Data structure for the Register request.
 */
export interface RegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  website?: string;
  subscribeEmail?: boolean;
}

export class RegistrationError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "RegistrationError";
  }
}

export class ActivationError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "ActivationError";
  }
}

export class LoginError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "LoginError";
  }
}

export class EmailError extends Error {
  constructor(message: string, public originalError?: Error | unknown) {
    super(message);
    this.name = "EmailError";
  }
}
/**
 * Data structure for the user object.
 */

export class ForgotPasswordError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "ForgotPasswordError";
  }
}

export class ResetPasswordError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "ResetPasswordError";
  }
}

/**
 * Data structure for the user object.
 */
export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  emailVerified: boolean;
  activationToken?: string;
  resetToken?: string;
  resetTokenExpiry?: string;
  website?: string;
  subscribeEmail?: boolean;
  createdAt: string;
  activatedAt?: string;
  passwordResetAt?: string;
}
