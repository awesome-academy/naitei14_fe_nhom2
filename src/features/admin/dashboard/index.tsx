import { useEffect, useState } from "react";
// Import từ local feature folder
import { dashboardApi } from "./api";
import { TopProduct, DashboardOverview } from "./types";

import ChartSales from "./components/ChartSales";
import ProductTopList from "./components/ProductTopList";

export default function AdminDashboard() {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    // Tải dữ liệu song song cho nhanh
    const loadData = async () => {
      const [productsData, overviewData] = await Promise.all([
        dashboardApi.getTopProducts(),
        dashboardApi.getOverview(),
      ]);

      setTopProducts(productsData);
      setOverview(overviewData);
    };

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Dashboard Overview
      </h1>

      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm flex flex-col items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300 text-sm uppercase font-semibold">
              Total Revenue
            </span>
            <span className="text-2xl font-bold text-green-600 mt-2">
              {overview.totalSales.toLocaleString()}₫
            </span>
          </div>

          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm flex flex-col items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300 text-sm uppercase font-semibold">
              Total Orders
            </span>
            <span className="text-2xl font-bold text-blue-600 mt-2">
              {overview.orders}
            </span>
          </div>

          <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm flex flex-col items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300 text-sm uppercase font-semibold">
              Total Users
            </span>
            <span className="text-2xl font-bold text-purple-600 mt-2">
              {overview.users}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSales />
        </div>
        <div>
          <ProductTopList products={topProducts} />
        </div>
      </div>
    </div>
  );
}
