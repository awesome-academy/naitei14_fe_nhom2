import { useEffect, useState } from "react";
// SỬA IMPORT: Dùng api cục bộ
import { ordersApi } from "./api";
import { Order } from "./types";
import OrderForm from "./components/OrderForm";
import OrderTable from "./components/OrderTable";
import OrderDetail from "./components/OrderDetail";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const load = () => {
    ordersApi.getAll().then((data) => setOrders(data || []));
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setViewOrder(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSuccess = () => {
    setEditingOrder(null);
    load();
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
  };

  const handleView = (order: Order) => {
    setViewOrder(order);
    setEditingOrder(null); // Tắt form edit khi xem detail
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm border m-4">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <button
          onClick={load}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition text-sm font-medium"
        >
          Refresh Orders
        </button>
      </div>

      {editingOrder && (
        <OrderForm
          order={editingOrder}
          onSuccess={handleSuccess}
          onCancel={handleCancelEdit}
        />
      )}

      <OrderTable
        orders={orders}
        onRefresh={load}
        onEdit={handleEdit}
        onView={handleView}
      />

      <div className="mt-6">
        <OrderDetail order={viewOrder} />
      </div>
    </div>
  );
}
