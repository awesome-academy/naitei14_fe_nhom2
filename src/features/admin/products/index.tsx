import React, { useEffect, useState } from "react";
import { Product } from "./types";
import { productsApi } from "./api"; // Import Local API
import ProductTable from "./components/ProductTable";
import ProductDetail from "./components/ProductDetail";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false); // State để quản lý chế độ sửa

  const load = async () => {
    const data = await productsApi.getAll();
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSelect = (product: Product) => {
    setSelected(product);
    setIsEditing(true); // Khi bấm Edit ở bảng thì bật form Edit
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async (product: Product) => {
    try {
      await productsApi.update(product.id, product);
      await load(); // Load lại dữ liệu từ server
      setIsEditing(false); // Tắt form edit
      setSelected(product); // Vẫn giữ select để xem detail
      alert("Product updated!");
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
    }
  };

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productsApi.delete(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        if (selected?.id === id) {
          setSelected(null);
          setIsEditing(false);
        }
      } catch (error) {
        console.log(error);
        alert("Failed to delete product");
      }
    }
  };

  const handleCreate = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    alert("Product created successfully!");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm border m-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
        Products Management
      </h1>

      {/* Nếu đang edit thì hiện form Update, ngược lại hiện form Create */}
      {isEditing && selected ? (
        <UpdateProduct
          product={selected}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      ) : (
        <CreateProduct onCreate={handleCreate} />
      )}

      <ProductTable
        products={products}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />

      {/* Luôn hiện detail nếu có selected, nhưng đặt bên dưới */}
      <ProductDetail product={selected} />
    </div>
  );
}
