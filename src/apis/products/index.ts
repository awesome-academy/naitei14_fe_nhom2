import { Product } from '@/types/product'
import { mockProducts } from './mockProducts'
import { getReviewsByProductId } from './mockReviews'
import { generateDefaultProductDetail } from './mockProductDetails'

const API_DELAY_MS = 100

const createDelayPromise = (ms: number) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await createDelayPromise(API_DELAY_MS)
  return mockProducts.slice(0, 6)
}

export const getAllProducts = async (): Promise<Product[]> => {
  await createDelayPromise(API_DELAY_MS)
  return mockProducts
}

export interface ProductFilters {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  color?: string
}

export const searchProducts = async (filters: ProductFilters): Promise<Product[]> => {
  await createDelayPromise(API_DELAY_MS)
  
  let filteredProducts = [...mockProducts]

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
    )
  }

  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
  }

  if (filters.minPrice !== undefined) {
    const minPrice = filters.minPrice
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice)
  }

  if (filters.maxPrice !== undefined) {
    const maxPrice = filters.maxPrice
    filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice)
  }

  if (filters.color) {
    const color = filters.color
    filteredProducts = filteredProducts.filter((product) => product.color === color)
  }

  return filteredProducts
}

export const getProductById = async (id: number): Promise<Product | null> => {
  await createDelayPromise(API_DELAY_MS)
  
  const product = mockProducts.find((p) => p.id === id)
  if (!product) return null

  const productDetailData = generateDefaultProductDetail(
    product.id,
    product.name,
    product.category,
    product.description
  )

  const productDetail: Product = {
    ...product,
    images: product.images || productDetailData.images || [
      product.image,
      product.image,
      product.image,
      product.image,
      product.image,
    ],
    shortDescription:
      product.shortDescription || productDetailData.shortDescription || product.description || '',
    fullDescription: product.fullDescription || productDetailData.fullDescription || '',
    tags: product.tags || productDetailData.tags || ['Cây cảnh', 'Trang trí', product.category || 'Phổ biến'],
    reviews: product.reviews || getReviewsByProductId(product.id),
    relatedProducts: mockProducts
      .filter((p) => p.id !== product.id && (p.category === product.category || Math.random() > 0.5))
      .slice(0, 4),
  }

  return productDetail
}

