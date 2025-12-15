import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// Import từ file api.ts nằm cùng thư mục cha (features/admin/categories/api.ts)
import { categoriesApi } from "../api";
import { Category } from "../types";

interface Props {
  category?: Category | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CategoryForm({ category, onSuccess, onCancel }: Props) {
  const { register, handleSubmit, reset, setValue } =
    useForm<Partial<Category>>();

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
    } else {
      reset({ name: "", description: "" });
    }
  }, [category, reset, setValue]);

  const onSubmit = async (data: Partial<Category>) => {
    try {
      if (category) {
        await categoriesApi.update(category.id, data);
      } else {
        await categoriesApi.create(data);
      }
      reset();
      onSuccess();
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border mt-4 bg-gray-50 rounded shadow-sm"
    >
      <h3 className="font-bold text-lg text-gray-800">
        {category ? `Edit Category` : "Create New Category"}
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          {...register("name", { required: true })}
          className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Category name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Description"
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
          type="submit"
        >
          {category ? "Update" : "Create"}
        </button>

        <button
          type="button"
          onClick={() => {
            reset({ name: "", description: "" });
            onCancel();
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
