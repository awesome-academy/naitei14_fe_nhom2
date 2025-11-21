import { Product } from '../types'
import {
  PRICE_150000,
  PRICE_250000,
  PRICE_375000,
  PRICE_500000,
  PRICE_850000,
  PRICE_1000000,
  RATING_4,
  RATING_5,
  DISCOUNT_50_PERCENT,
} from '@/constants/common'
import { IMAGES } from '@/constants/images'

// Mock data - Sau này sẽ thay bằng API call
export const getFeaturedProducts = async (): Promise<Product[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Cây chân chim',
          price: PRICE_250000,
          image: IMAGES.PRODUCT_1,
          isNew: true,
          rating: RATING_5,
        },
        {
          id: 2,
          name: 'Cây Dạ Lam',
          price: PRICE_500000,
          oldPrice: PRICE_1000000,
          image: IMAGES.PRODUCT_2,
          discountPercent: DISCOUNT_50_PERCENT,
          rating: RATING_4,
        },
        {
          id: 3,
          name: 'Cây Danh Dự',
          price: PRICE_850000,
          image: IMAGES.PRODUCT_3,
          isNew: true,
          rating: RATING_5,
        },
        {
          id: 4,
          name: 'Cây cọ ta',
          price: PRICE_150000,
          oldPrice: PRICE_250000,
          image: IMAGES.PRODUCT_4,
          rating: RATING_4,
        },
        {
          id: 5,
          name: 'Cây dứa nhỏ',
          price: PRICE_375000,
          oldPrice: PRICE_500000,
          image: IMAGES.PRODUCT_5,
          rating: RATING_4,
        },
        {
          id: 6,
          name: 'Cây đa búp đỏ',
          price: PRICE_500000,
          oldPrice: PRICE_1000000,
          image: IMAGES.PRODUCT_6,
          discountPercent: DISCOUNT_50_PERCENT,
          rating: RATING_5,
        },
      ])
    }, 100)
  })
}

