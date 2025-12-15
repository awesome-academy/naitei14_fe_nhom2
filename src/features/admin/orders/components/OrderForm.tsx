import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// SỬA IMPORT: Dùng api cục bộ
import { ordersApi } from "../api";
import { Order } from "../types";

interface Props {
  order: Order | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface OrderFormValues {
  status: string;
}

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "shipping",
  "delivered",
  "cancelled",
  "completed",
];

export default function OrderForm({ order, onSuccess, onCancel }: Props) {
  const { register, handleSubmit, setValue } = useForm<OrderFormValues>();

  useEffect(() => {
    if (order) {
      setValue("status", order.status);
    }
  }, [order, setValue]);

  const onSubmit = async (data: OrderFormValues) => {
    if (!order) return;

    try {
      await ordersApi.updateStatus(order.id, data.status);
      onSuccess();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (!order) return null;

  return (
    <div className="p-4 border rounded mt-4 bg-blue-50 border-blue-200 shadow-sm">
      <h2 className="text-lg font-bold mb-3 text-blue-800 flex items-center gap-2">
        <span className="w-2 h-6 bg-blue-600 rounded-sm"></span>
        Update Status for Order #{order.id}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Change Status To:
          </label>
          <select
            {...register("status", { required: true })}
            className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm"
          >
            {ORDER_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st.charAt(0).toUpperCase() + st.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 font-medium transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition shadow-sm"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
