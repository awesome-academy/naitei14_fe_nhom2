export interface User {
  id: number | string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  active?: boolean;
}