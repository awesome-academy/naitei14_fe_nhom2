import { Category } from "./types";
import { API_BASE_URL } from "@/constants/common";

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error("Failed to fetch categories");
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  create: async (data: Partial<Category>): Promise<Category> => {
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  },

  update: async (id: number | string, data: Partial<Category>): Promise<Category | null> => {
    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;
    return res.json();
  },

  delete: async (id: number | string): Promise<boolean> => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  },
};