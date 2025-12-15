import { Request } from "./types";
import { API_BASE_URL } from "@/constants/common";

export const requestApi = {
  // Lấy danh sách yêu cầu
  getAll: async (): Promise<Request[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/requests`);
      if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error("Failed to fetch requests");
      }
      return await res.json();
    } catch (error) {
      console.error("Get requests error:", error);
      return [];
    }
  },

  // Cập nhật trạng thái Duyệt hoặc Từ chối
  updateStatus: async (
    id: number | string,
    accepted: boolean
  ): Promise<boolean> => {
    const res = await fetch(`${API_BASE_URL}/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accepted: accepted,
        replied: true,
      }),
    });

    return res.ok;
  },

  // Đặt lại trạng thái ban đầu (Reset)
  reset: async (id: number | string): Promise<boolean> => {
    const res = await fetch(`${API_BASE_URL}/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accepted: null, // Hoặc dùng undefined nếu server hỗ trợ, nhưng null chuẩn JSON hơn
        replied: false,
      }),
    });

    return res.ok;
  },
};