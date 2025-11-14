export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  isNew?: boolean
  discountPercent?: number
  rating?: number
  description?: string
  category?: string
  stock?: number
}

