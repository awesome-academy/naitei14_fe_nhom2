/**
 * Data structure for the user object.
 */
export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  password?: string;
  emailVerified: boolean;
  activationToken?: string;
  resetToken?: string;
  resetTokenExpiry?: string;
  website?: string;
  subscribeEmail?: boolean;
  role: string;
  createdAt: string;
  activatedAt?: string;
  passwordResetAt?: string;
  active?: boolean;
}
