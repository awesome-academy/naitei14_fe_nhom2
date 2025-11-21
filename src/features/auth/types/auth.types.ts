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

/**
 * Data structure representing a registered user.
 */
export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
}
