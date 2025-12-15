export interface OrderItem {
  productId: number | string;
  productName?: string;
  name?: string;
  productImage?: string;
  quantity: number;
  price: number;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  note?: string;
}

export interface Order {
  id: number | string;
  userId: number | string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
  shippingInfo?: ShippingInfo;
  paymentMethod?: string;
}