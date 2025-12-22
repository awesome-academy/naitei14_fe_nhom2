import { TopProduct } from "../types";

interface Props {
  products?: TopProduct[];
}

export default function ProductTopList({ products = [] }: Props) {
  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return (
      <div className="p-4 border rounded-lg shadow-lg mt-4 bg-white text-gray-500 text-center dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 transition-colors duration-300">
        No top products data available.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-lg mt-4 bg-gradient-to-r from-green-50 to-white dark:from-gray-800 dark:to-gray-800 dark:border-gray-700 transition-colors duration-300">
      <h2 className="font-bold text-xl mb-4 text-green-800 dark:text-green-400">
        Top Products
      </h2>
      <ul className="space-y-2">
        {safeProducts.map((p, index) => (
          <li
            key={p.id}
            className={`flex justify-between items-center p-3 rounded transition-all border ${
              index === 0
                ? // Style cho Top 1
                  "bg-yellow-100 font-bold text-yellow-800 border-yellow-200 shadow-sm " +
                  "dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-600/50"
                : // Style cho các Top khác
                  "bg-white hover:bg-green-50 border-gray-100 text-gray-700 " +
                  "dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                  index === 0
                    ? "bg-yellow-500 text-white shadow-sm"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                }`}
              >
                {index + 1}
              </span>
              <span>{p.name}</span>
            </div>
            <span
              className={`font-semibold ${
                index === 0 ? "" : "dark:text-gray-300"
              }`}
            >
              {p.sales} sales
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
