import { RegisterRequest, User } from "../types/auth.types";
import { API_BASE_URL } from "@/constants/common";

export const registerUser = async (data: RegisterRequest): Promise<User> => {
  const userData = {
    id: crypto.randomUUID(),
    ...data,
  };

  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Đăng ký thất bại");
  }

  return response.json();
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await fetch(
    `${API_BASE_URL}/users?email=${encodeURIComponent(email)}&_limit=1`
  );

  if (!response.ok) {
    throw new Error("Email check failed");
  }

  const users = await response.json();
  return users.length > 0;
};
