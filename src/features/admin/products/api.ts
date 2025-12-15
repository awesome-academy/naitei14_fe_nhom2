import { Product } from "./types";
import { API_BASE_URL } from "@/constants/common";

export const productsApi = {
  // Lấy tất cả sản phẩm
  getAll: async (): Promise<Product[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error("Failed to fetch products");
      }
      return await res.json();
    } catch (error) {
      console.error("Get products error:", error);
      return [];
    }
  },

  // Tạo sản phẩm mới
  create: async (data: Partial<Product>): Promise<Product> => {
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Mặc định các trường chưa có trong form
      rating: 5, 
      isNew: true
    };

    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
  },

  // Cập nhật sản phẩm
  update: async (id: number | string, data: Partial<Product>): Promise<Product | null> => {
    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;
    return res.json();
  },

  // Xóa sản phẩm
  delete: async (id: number | string): Promise<boolean> => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  },
};