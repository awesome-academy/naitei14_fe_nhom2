import { Order } from "../types";

interface Props {
  order: Order | null;
}

export default function OrderDetail({ order }: Props) {
  if (!order)
    return (
      <div className="p-4 border mt-4 bg-gray-50 rounded text-gray-500 text-center text-sm">
        Select an order to view details.
      </div>
    );

  return (
    <div className="p-6 border mt-4 bg-white shadow-sm rounded-lg">
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">
            Placed on: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <span className="block text-sm text-gray-500">Total Amount</span>
          <span className="text-2xl font-bold text-green-600">
            {order.totalAmount?.toLocaleString()}₫
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Customer Info</h3>
          <p className="text-sm">
            <span className="font-medium">User ID:</span> {order.userId}
          </p>
          {order.shippingInfo && (
            <div className="mt-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {order.shippingInfo.fullName}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {order.shippingInfo.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {order.shippingInfo.address}, {order.shippingInfo.city}
              </p>
              {order.shippingInfo.note && (
                <p className="italic">Note: "{order.shippingInfo.note}"</p>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Payment & Status</h3>
          <p className="text-sm">
            <span className="font-medium">Method:</span>{" "}
            <span className="uppercase">{order.paymentMethod || "COD"}</span>
          </p>
          <p className="text-sm mt-1">
            <span className="font-medium">Status:</span>{" "}
            <span className="uppercase font-bold text-blue-600">
              {order.status}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-gray-800 mb-3">
          Items ({order.items?.length})
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="space-y-3">
            {order.items?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b last:border-0 pb-2 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  {item.productImage && (
                    <img
                      src={item.productImage}
                      alt=""
                      className="w-10 h-10 object-cover rounded border"
                    />
                  )}
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {item.productName || item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Product ID: {item.productId}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <span className="text-gray-600">{item.quantity} x </span>
                  <span className="font-semibold">
                    {item.price.toLocaleString()}₫
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
