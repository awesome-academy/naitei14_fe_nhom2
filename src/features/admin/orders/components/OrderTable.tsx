import { ordersApi } from "../api";
import { Order } from "../types";

interface Props {
  orders?: Order[] | null;
  onRefresh: () => void;
  onEdit: (order: Order) => void;
  onView: (order: Order) => void;
}

export default function OrderTable({
  orders = [],
  onRefresh,
  onView,
  onEdit,
}: Props) {
  const safeOrders = Array.isArray(orders) ? orders : [];

  const remove = async (id: number | string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await ordersApi.delete(id);
      onRefresh();
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  if (safeOrders.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 border mt-4 bg-gray-50 rounded">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border mt-4 text-sm text-left shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
          <tr>
            <th className="border p-3">Order ID</th>
            <th className="border p-3">User ID</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Date</th>
            <th className="border p-3">Items Summary</th>
            <th className="border p-3 text-right">Total</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {safeOrders.map((o) => (
            <tr
              key={o.id}
              className="hover:bg-gray-50 transition-colors border-b"
            >
              <td className="border p-3 font-mono text-gray-600">{o.id}</td>
              <td
                className="border p-3 font-mono text-xs text-gray-500 max-w-[100px] truncate"
                title={String(o.userId)}
              >
                {o.userId}
              </td>
              <td className="border p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                    o.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : o.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : o.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {o.status}
                </span>
              </td>
              <td className="border p-3 text-gray-600">
                {new Date(o.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-3">
                <ul className="list-disc pl-4 space-y-1 text-xs text-gray-700">
                  {o.items.slice(0, 3).map((it, idx) => (
                    <li key={idx}>
                      {/* Xử lý hiển thị tên: ưu tiên productName, fallback sang name */}
                      <strong>{it.productName || it.name}</strong> —{" "}
                      {it.quantity} x {it.price.toLocaleString()}₫
                    </li>
                  ))}
                  {o.items.length > 3 && (
                    <li>...and {o.items.length - 3} more</li>
                  )}
                </ul>
              </td>
              <td className="border p-3 font-bold text-right text-gray-800">
                {/* Sửa total thành totalAmount */}
                {o.totalAmount?.toLocaleString()}₫
              </td>
              <td className="border p-3 space-x-2 whitespace-nowrap text-center">
                <button
                  className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                  onClick={() => onView(o)}
                >
                  View
                </button>

                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                  onClick={() => onEdit(o)}
                >
                  Status
                </button>

                <button
                  className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                  onClick={() => remove(o.id)}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
