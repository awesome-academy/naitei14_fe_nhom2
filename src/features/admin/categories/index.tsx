import { useEffect, useState } from "react";
// Import API từ file cục bộ
import { categoriesApi } from "./api";
import { Category } from "./types";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const load = async () => {
    const data = await categoriesApi.getAll();
    setCategories(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSuccess = () => {
    setEditingCategory(null);
    load();
  };

  const handleCancel = () => {
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      {" "}
      {/* Thêm padding cho mobile nếu cần */}
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 dark:text-white dark:border-gray-700">
        Categories Management
      </h1>
      {/* Form luôn hiển thị. Nếu editingCategory=null thì là Create mode */}
      <CategoryForm
        category={editingCategory}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      <CategoryTable
        categories={categories}
        onRefresh={load}
        onEdit={handleEdit}
      />
    </div>
  );
}
