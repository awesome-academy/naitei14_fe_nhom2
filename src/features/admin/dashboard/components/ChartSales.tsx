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
// Import từ file api và types cục bộ
import { dashboardApi } from "../api";
import { SalesRecord } from "../types";

export default function ChartSales() {
  const [data, setData] = useState<SalesRecord[]>([]);

  useEffect(() => {
    // Gọi API thật, không tự cộng thêm dữ liệu giả nữa
    dashboardApi.getSales().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="p-4 border rounded mt-4 bg-white shadow-sm">
      <h2 className="font-bold mb-4 text-gray-800">Sales Chart</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#10B981" // Màu xanh lá cho hợp theme cây cảnh
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
