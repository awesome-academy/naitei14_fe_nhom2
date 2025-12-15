import { Product } from "../types";

interface Props {
  product: Product | null;
}

export default function ProductDetail({ product }: Props) {
  if (!product) {
    return (
      <div className="mt-4 p-4 border rounded bg-gray-50 text-gray-500 text-center text-sm">
        Select a product to view details.
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
        Product Detail #{product.id}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          {product.image ? (
            <img
              src={product.image}
              alt="Product"
              className="w-48 h-48 border rounded-lg object-cover shadow-sm"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2 text-sm">
          <p>
            <span className="font-semibold w-24 inline-block">Name:</span>{" "}
            {product.name}
          </p>
          <p>
            <span className="font-semibold w-24 inline-block">Price:</span>{" "}
            <span className="text-green-600 font-bold">
              ${product.price.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="font-semibold w-24 inline-block">Stock:</span>{" "}
            {product.stock}
          </p>
          <p>
            <span className="font-semibold w-24 inline-block">Category:</span>{" "}
            {product.category}
          </p>

          <div className="mt-4">
            <p className="font-semibold mb-1">Description:</p>
            <p className="text-gray-600 bg-gray-50 p-3 rounded border">
              {product.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
