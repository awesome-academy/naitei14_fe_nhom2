import React, { useState, useEffect } from "react";
import { Product } from "./types";

interface Props {
  product: Product;
  onSave: (p: Product) => void;
  onCancel: () => void; // Thêm nút cancel cho tiện
}

export default function UpdateProduct({ product, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Product>(product);

  useEffect(() => {
    setForm(product);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="p-4 border rounded bg-blue-50 border-blue-100 shadow-sm mt-4 mb-4">
      <h2 className="text-xl font-bold mb-4 text-blue-800">
        Update Product #{product.id}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Price
          </label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Stock
          </label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Category
          </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Image URL
          </label>
          <input
            name="image"
            value={form.image || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            rows={3}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
