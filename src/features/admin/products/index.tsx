import { useEffect, useState } from "react";
import { Product } from "./types";
import { productsApi } from "./api"; // Import Local API
import ProductTable from "./components/ProductTable";
import ProductDetail from "./components/ProductDetail";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const load = async () => {
    const data = await productsApi.getAll();
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (product: Product) => {
    setSelected(product);
    setIsEditing(true); // Bật chế độ sửa
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleView = (product: Product) => {
    setSelected(product);
    setIsEditing(false); // Tắt chế độ sửa, chỉ xem
  };

  const handleSave = async (product: Product) => {
    try {
      await productsApi.update(product.id, product);
      await load();
      setIsEditing(false);
      setSelected(product);
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
    setSelected(null);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-sm border dark:border-gray-700 m-4 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b dark:border-gray-700 pb-4">
        Products Management
      </h1>

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
        onSelect={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />

      {selected && !isEditing && <ProductDetail product={selected} />}
    </div>
  );
}
