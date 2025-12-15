import { User } from "./types";
import { API_BASE_URL } from "@/constants/common";

export const usersApi = {
  // Lấy danh sách users
  getAll: async (): Promise<User[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error("Failed to fetch users");
      }
      return await res.json();
    } catch (error) {
      console.error("Get users error:", error);
      return [];
    }
  },

  // Cập nhật trạng thái active
  updateActive: async (id: number | string, active: boolean): Promise<boolean> => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });
    return res.ok;
  },
};