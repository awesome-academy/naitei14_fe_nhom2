import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Product } from '../types'
import { LOCALE, MAX_RATING, DEFAULT_RATING } from '@/constants/common'

interface ProductCardProps {
  product: Product
  isLarge?: boolean
}

export const ProductCard = ({ product, isLarge = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 relative group h-full ${
        isLarge ? 'flex flex-col' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.isNew && <Badge variant="new">NEW</Badge>}
      {product.discountPercent && !product.isNew && (
        <Badge variant="discount" discountPercent={product.discountPercent}>
          {product.discountPercent}%
        </Badge>
      )}

      <div
        className={`relative mb-4 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center ${
          isLarge ? 'aspect-[4/5] min-h-0' : 'aspect-square'
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-3 transition-opacity duration-300">
            <button
              className="bg-white text-green-primary px-4 py-2 rounded-md hover:bg-green-primary hover:text-white transition-colors font-semibold text-sm"
              aria-label="Mua ngay sản phẩm"
            >
              MUA NGAY
            </button>
            <button
              className="bg-white p-3 rounded-full hover:bg-green-primary hover:text-white transition-colors"
              aria-label="Xem nhanh sản phẩm"
            >
              <svg
                className="w-5 h-5 text-primary-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="text-center w-full">
        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(MAX_RATING)].map((_, i) => {
            const rating = product.rating ?? DEFAULT_RATING
            return (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'
                }`}
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-green-primary">
            {product.price.toLocaleString(LOCALE)} ₫
          </span>
          {product.oldPrice && product.oldPrice !== product.price && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice.toLocaleString(LOCALE)} ₫
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
