export interface Request {
  id: number | string;
  userName: string;
  email: string;
  message: string;
  createdAt: string;
  replied?: boolean;
  accepted?: boolean | null;
}