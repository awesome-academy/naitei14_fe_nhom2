import { ProductReview } from './review'

export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  images?: string[]
  isNew?: boolean
  discountPercent?: number
  rating?: number
  description?: string
  shortDescription?: string
  fullDescription?: string
  category?: string
  stock?: number
  color?: string
  tags?: string[]
  reviews?: ProductReview[]
  relatedProducts?: Product[]
}

