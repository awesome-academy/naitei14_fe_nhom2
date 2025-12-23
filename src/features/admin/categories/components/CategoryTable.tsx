import { categoriesApi } from "../api";
import { Category } from "../types";

interface Props {
  categories?: Category[] | null;
  onRefresh: () => void;
  onEdit: (category: Category) => void;
}

export default function CategoryTable({
  categories = [],
  onRefresh,
  onEdit,
}: Props) {
  const safeCategories = Array.isArray(categories) ? categories : [];

  const remove = async (id: number | string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await categoriesApi.delete(id as number);
      onRefresh();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  if (safeCategories.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 border mt-4 bg-gray-50 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 transition-colors">
        No categories found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border text-sm text-left shadow-sm rounded-lg overflow-hidden dark:border-gray-700">
        <thead className="bg-gray-100 text-gray-700 uppercase font-semibold dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="border p-3 dark:border-gray-600">ID</th>
            <th className="border p-3 dark:border-gray-600">Name</th>
            <th className="border p-3 dark:border-gray-600">Description</th>
            <th className="border p-3 text-center dark:border-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {safeCategories.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-700/50"
            >
              <td className="border p-3 font-mono text-gray-600 dark:border-gray-700 dark:text-gray-400">
                {c.id}
              </td>
              <td className="border p-3 font-medium text-gray-800 dark:border-gray-700 dark:text-gray-200">
                {c.name}
              </td>
              <td className="border p-3 text-gray-600 dark:border-gray-700 dark:text-gray-400">
                {c.description}
              </td>
              <td className="border p-3 text-center space-x-2 whitespace-nowrap dark:border-gray-700">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition shadow-sm"
                  onClick={() => onEdit(c)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition shadow-sm"
                  onClick={() => remove(c.id)}
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
