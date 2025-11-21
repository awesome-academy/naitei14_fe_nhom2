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
 * Data structure for the registration API request.
 * Note: website and subscribeEmail are optional fields.
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

export class EmailError extends Error {
  constructor(message: string, public originalError?: Error | unknown) {
    super(message);
    this.name = "EmailError";
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
  emailVerified: boolean;
  activationToken?: string;
  website?: string;
  subscribeEmail?: boolean;
  createdAt: string;
  activatedAt?: string;
}
