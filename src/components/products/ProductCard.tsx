import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Product } from '@/types/product'
import {
  LOCALE,
  MAX_RATING,
  DEFAULT_RATING,
  CLASS_ICON_SIZE_MD,
  CLASS_ICON_SIZE_MD_GRAY,
  MESSAGE_REMOVE_FAVORITE,
  MESSAGE_ADD_FAVORITE,
} from '@/constants/common'
import {
  MagnifyingGlassIcon,
  StarIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

const CLASS_ICON_BUTTON = 'bg-white border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors'
const CLASS_ICON_BUTTON_HOVER = 'bg-white p-3 rounded-full hover:bg-green-primary hover:text-white transition-colors'

interface ProductCardProps {
  product: Product
  isLarge?: boolean
  variant?: 'home' | 'default'
}

export const ProductCard = ({ product, isLarge = false, variant = 'default' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const isHomeVariant = variant === 'home'

  const handleBuyNow = () => {
    // TODO: Navigate to product detail page or add to cart
    // Implementation pending
  }

  const handleQuickView = () => {
    // TODO: Open quick view modal
    // Implementation pending
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // TODO: Add to favorites
    // Implementation pending
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 relative group h-full ${
        isLarge ? 'flex flex-col' : ''
      }`}
      onMouseEnter={() => isHomeVariant && setIsHovered(true)}
      onMouseLeave={() => isHomeVariant && setIsHovered(false)}
      onFocus={() => isHomeVariant && setIsHovered(true)}
      onBlur={() => isHomeVariant && setIsHovered(false)}
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
        
        {isHomeVariant && isHovered && (
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
              className={CLASS_ICON_BUTTON_HOVER}
              aria-label="Xem nhanh sản phẩm"
            >
              <MagnifyingGlassIcon className={CLASS_ICON_SIZE_MD} />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={CLASS_ICON_BUTTON_HOVER}
              aria-label={isFavorite ? MESSAGE_REMOVE_FAVORITE : MESSAGE_ADD_FAVORITE}
            >
              {isFavorite ? (
                <HeartIconSolid className={CLASS_ICON_SIZE_MD} />
              ) : (
                <HeartIcon className={CLASS_ICON_SIZE_MD} />
              )}
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

        {!isHomeVariant && product.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 px-2">{product.description}</p>
        )}

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
        
        {!isHomeVariant && (
          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={handleBuyNow}
              className="bg-green-primary text-white px-4 py-2 rounded-md hover:bg-green-dark transition-colors font-semibold text-sm flex-1"
              aria-label="Mua ngay sản phẩm"
            >
              MUA NGAY
            </button>
            <button
              onClick={handleQuickView}
              className={CLASS_ICON_BUTTON}
              aria-label="Xem nhanh sản phẩm"
            >
              <MagnifyingGlassIcon className={CLASS_ICON_SIZE_MD_GRAY} />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={CLASS_ICON_BUTTON}
              aria-label={isFavorite ? MESSAGE_REMOVE_FAVORITE : MESSAGE_ADD_FAVORITE}
            >
              {isFavorite ? (
                <HeartIconSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className={CLASS_ICON_SIZE_MD_GRAY} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


