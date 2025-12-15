import { Order } from "./types";
import { API_BASE_URL } from "@/constants/common";

export const ordersApi = {
  // Lấy tất cả đơn hàng
  getAll: async (): Promise<Order[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`);
      if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error("Failed to fetch orders");
      }
      return await res.json();
    } catch (error) {
      console.error("Get orders error:", error);
      return [];
    }
  },

  // Lấy chi tiết đơn hàng
  getDetail: async (id: number | string): Promise<Order | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error("Get order detail error:", error);
      return null;
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateStatus: async (id: number | string, status: string): Promise<Order | null> => {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) return null;
    return res.json();
  },

  // Xóa đơn hàng
  delete: async (id: number | string): Promise<boolean> => {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  },
};