import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Product } from '@/types/product'
import { LOCALE, MAX_RATING, DEFAULT_RATING } from '@/constants/common'
import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface ProductCardProps {
  product: Product
  isLarge?: boolean
}

export const ProductCard = ({ product, isLarge = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleBuyNow = () => {
    // TODO: Navigate to product detail page or add to cart
    // Implementation pending
  }

  const handleQuickView = () => {
    // TODO: Open quick view modal
    // Implementation pending
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 relative group h-full ${
        isLarge ? 'flex flex-col' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
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
              onClick={handleBuyNow}
              className="bg-white text-green-primary px-4 py-2 rounded-md hover:bg-green-primary hover:text-white transition-colors font-semibold text-sm"
              aria-label="Mua ngay sản phẩm"
            >
              MUA NGAY
            </button>
            <button
              onClick={handleQuickView}
              className="bg-white p-3 rounded-full hover:bg-green-primary hover:text-white transition-colors"
              aria-label="Xem nhanh sản phẩm"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
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
            const isFilled = i < Math.floor(rating)
            return isFilled ? (
              <StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />
            ) : (
              <StarIcon key={i} className="w-4 h-4 text-gray-300" />
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


