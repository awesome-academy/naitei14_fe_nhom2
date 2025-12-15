export interface Product {
  id: number | string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  description?: string;
  shortDescription?: string;
  fullDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}