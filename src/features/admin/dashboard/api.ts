import { API_BASE_URL } from "@/constants/common";
import { DashboardData, DashboardOverview, SalesRecord, TopProduct } from "./types";

export const dashboardApi = {
  // Lấy toàn bộ dữ liệu dashboard
  getData: async (): Promise<DashboardData | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard`);
      if (!res.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      return await res.json();
    } catch (error) {
      console.error("Dashboard API Error:", error);
      return null;
    }
  },

  // Helper để lấy riêng Sales (cho Chart)
  getSales: async (): Promise<SalesRecord[]> => {
    const data = await dashboardApi.getData();
    return data?.sales || [];
  },

  // Helper để lấy riêng Top Products
  getTopProducts: async (): Promise<TopProduct[]> => {
    const data = await dashboardApi.getData();
    return data?.topProducts || [];
  },

  // Helper để lấy Overview
  getOverview: async (): Promise<DashboardOverview | null> => {
    const data = await dashboardApi.getData();
    return data?.overview || null;
  },
};