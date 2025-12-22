import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { dashboardApi } from "../api";
import { SalesRecord } from "../types";
// 1. Import hook useTheme để lấy trạng thái giao diện
import { useTheme } from "@/contexts/ThemeContext";

export default function ChartSales() {
  const [data, setData] = useState<SalesRecord[]>([]);
  // 2. Lấy theme hiện tại
  const { theme } = useTheme();

  useEffect(() => {
    // Gọi API thật, không tự cộng thêm dữ liệu giả nữa
    dashboardApi.getSales().then((res) => {
      setData(res);
    });
  }, []);

  // 3. Định nghĩa màu sắc dựa trên theme
  // Nếu dark mode -> màu chữ trục là trắng xám (#E5E7EB), ngược lại là xám đậm (#374151)
  const axisColor = theme === "dark" ? "#E5E7EB" : "#374151";
  const gridColor = theme === "dark" ? "#374151" : "#E5E7EB";

  return (
    <div className="p-4 border rounded mt-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">
        Sales Chart
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            {/* Chỉnh màu lưới mờ hơn trong dark mode */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={gridColor}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              // Chỉnh màu chữ trục X
              tick={{ fill: axisColor, fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              // Chỉnh màu chữ trục Y
              tick={{ fill: axisColor, fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                // Giữ nền trắng cho tooltip để dễ nhìn (hoặc đổi dark:bg-gray-700 nếu muốn)
                backgroundColor: "#fff",
              }}
              // Chỉnh màu chữ "Wed", "Tue"... (label) thành màu đen đậm
              labelStyle={{
                color: "#111827", // Màu đen đậm (gray-900)
                fontWeight: "bold",
                marginBottom: "0.25rem",
              }}
              // Chỉnh màu chữ giá trị (total: 350)
              itemStyle={{
                color: "#4B5563", // Màu xám (gray-600)
              }}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10B981" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
