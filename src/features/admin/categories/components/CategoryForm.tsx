import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

  // Style chung cho input/textarea
  const inputClass =
    "border p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none " +
    "bg-white border-gray-300 text-gray-900 " + // Light mode
    "dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 " + // Dark mode
    "transition-colors duration-200";

  const labelClass =
    "block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border mt-4 rounded shadow-sm transition-colors duration-300 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <h3 className="font-bold text-lg text-gray-800 dark:text-white">
        {category ? `Edit Category` : "Create New Category"}
      </h3>

      <div>
        <label className={labelClass}>Name</label>
        <input
          {...register("name", { required: true })}
          className={inputClass}
          placeholder="Category name"
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          {...register("description")}
          className={inputClass}
          placeholder="Description"
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium dark:bg-green-600 dark:hover:bg-green-500 shadow-sm"
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
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-medium dark:bg-gray-600 dark:hover:bg-gray-500 shadow-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
