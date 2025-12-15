import React from "react";
import { Product } from "../types";

interface Props {
  products?: Product[] | null;
  onSelect: (p: Product) => void;
  onDelete: (id: number | string) => void;
}

export default function ProductTable({ products, onSelect, onDelete }: Props) {
  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 border mt-3 bg-gray-50 rounded">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border mt-3 bg-white shadow-sm rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Image</th>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Price</th>
            <th className="p-3 border-b">Stock</th>
            <th className="p-3 border-b">Category</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {safeProducts.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-gray-50 transition-colors border-b last:border-0"
            >
              <td className="p-3 font-mono text-gray-500">{p.id}</td>
              <td className="p-3">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded border"
                    onError={(e) =>
                      (e.currentTarget.src = "https://placehold.co/40")
                    }
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs">
                    No Img
                  </div>
                )}
              </td>
              <td className="p-3 font-medium text-gray-800">{p.name}</td>
              <td className="p-3 font-bold text-green-600">
                ${p.price.toLocaleString()}
              </td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3 text-blue-600">{p.category}</td>
              <td className="p-3 text-center space-x-2 whitespace-nowrap">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition shadow-sm"
                  onClick={() => onSelect(p)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition shadow-sm"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
