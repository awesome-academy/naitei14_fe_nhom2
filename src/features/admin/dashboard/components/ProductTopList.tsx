import React from "react";
// Import Type từ file types cục bộ
import { TopProduct } from "../types";

interface Props {
  products?: TopProduct[];
}

export default function ProductTopList({ products = [] }: Props) {
  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return (
      <div className="p-4 border rounded-lg shadow-lg mt-4 bg-white text-gray-500 text-center">
        No top products data available.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-lg mt-4 bg-gradient-to-r from-green-50 to-white">
      <h2 className="font-bold text-xl mb-4 text-green-800">Top Products</h2>
      <ul className="space-y-2">
        {safeProducts.map((p, index) => (
          <li
            key={p.id}
            className={`flex justify-between items-center p-3 rounded transition-all ${
              index === 0
                ? "bg-yellow-100 font-bold text-yellow-800 border border-yellow-200 shadow-sm"
                : "bg-white hover:bg-green-50 border border-gray-100 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                  index === 0 ? "bg-yellow-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </span>
              <span>{p.name}</span>
            </div>
            <span className="font-semibold">{p.sales} sales</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
