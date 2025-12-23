import { Product } from "../types";

interface Props {
  product: Product | null;
}

export default function ProductDetail({ product }: Props) {
  if (!product) {
    return (
      <div className="mt-4 p-4 border rounded bg-gray-50 text-gray-500 text-center text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 transition-colors">
        Select a product to view details.
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 dark:text-white dark:border-gray-700">
        Product Detail #{product.id}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          {product.image ? (
            <img
              src={product.image}
              alt="Product"
              className="w-48 h-48 border rounded-lg object-cover shadow-sm dark:border-gray-600"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 dark:bg-gray-700 dark:text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold w-24 inline-block text-gray-900 dark:text-gray-100">
              Name:
            </span>{" "}
            {product.name}
          </p>
          <p>
            <span className="font-semibold w-24 inline-block text-gray-900 dark:text-gray-100">
              Price:
            </span>{" "}
            <span className="text-green-600 font-bold dark:text-green-400">
              ${product.price.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="font-semibold w-24 inline-block text-gray-900 dark:text-gray-100">
              Stock:
            </span>{" "}
            {product.stock}
          </p>
          <p>
            <span className="font-semibold w-24 inline-block text-gray-900 dark:text-gray-100">
              Category:
            </span>{" "}
            {product.category}
          </p>

          <div className="mt-4">
            <p className="font-semibold mb-1 text-gray-900 dark:text-gray-100">
              Description:
            </p>
            <p className="text-gray-600 bg-gray-50 p-3 rounded border dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600">
              {product.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
