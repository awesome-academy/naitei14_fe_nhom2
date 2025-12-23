import { Product } from "../types";

interface Props {
  products?: Product[] | null;
  onSelect: (p: Product) => void;
  onView: (p: Product) => void;
  onDelete: (id: number | string) => void;
}

export default function ProductTable({
  products,
  onSelect,
  onView,
  onDelete,
}: Props) {
  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 border mt-3 bg-gray-50 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 transition-colors">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border mt-3 bg-white shadow-sm rounded-lg overflow-hidden text-sm dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <thead className="bg-gray-100 text-gray-700 uppercase font-semibold dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="p-3 border-b dark:border-gray-600">ID</th>
            <th className="p-3 border-b dark:border-gray-600">Image</th>
            <th className="p-3 border-b dark:border-gray-600">Name</th>
            <th className="p-3 border-b dark:border-gray-600">Price</th>
            <th className="p-3 border-b dark:border-gray-600">Stock</th>
            <th className="p-3 border-b dark:border-gray-600">Category</th>
            <th className="p-3 border-b text-center dark:border-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {safeProducts.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td className="p-3 font-mono text-gray-500 dark:text-gray-400">
                {p.id}
              </td>
              <td className="p-3">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded border dark:border-gray-600"
                    onError={(e) =>
                      (e.currentTarget.src = "https://placehold.co/40")
                    }
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs dark:bg-gray-700 dark:text-gray-400">
                    No Img
                  </div>
                )}
              </td>
              <td className="p-3 font-medium text-gray-800 dark:text-gray-200">
                {p.name}
              </td>
              <td className="p-3 font-bold text-green-600 dark:text-green-400">
                ${p.price.toLocaleString()}
              </td>
              <td className="p-3 dark:text-gray-300">{p.stock}</td>
              <td className="p-3 text-blue-600 dark:text-blue-400">
                {p.category}
              </td>
              <td className="p-3 text-center space-x-2 whitespace-nowrap">
                <button
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition shadow-sm dark:bg-gray-600 dark:hover:bg-gray-500"
                  onClick={() => onView(p)}
                  title="View Detail"
                >
                  View
                </button>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition shadow-sm dark:bg-blue-600 dark:hover:bg-blue-500"
                  onClick={() => onSelect(p)}
                  title="Edit Product"
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition shadow-sm dark:bg-red-600 dark:hover:bg-red-500"
                  onClick={() => onDelete(p.id)}
                  title="Delete Product"
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
