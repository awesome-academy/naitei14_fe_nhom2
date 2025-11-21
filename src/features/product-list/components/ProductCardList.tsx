import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Product } from '@/types/product'
import {
  LOCALE,
  MAX_RATING,
  DEFAULT_RATING,
  CLASS_ICON_SIZE_MD_GRAY,
  CLASS_FLEX_ITEMS_GAP2,
  MESSAGE_REMOVE_FAVORITE,
  MESSAGE_ADD_FAVORITE,
} from '@/constants/common'
import { MagnifyingGlassIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface ProductCardListProps {
  product: Product
}

const CLASS_ICON_BUTTON = 'bg-white border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors'

export const RenderProductCardList = ({ product }: ProductCardListProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // TODO: Add to favorites
    // Implementation pending
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {product.isNew && <Badge variant="new">NEW</Badge>}
          {product.discountPercent && !product.isNew && (
            <Badge variant="discount" discountPercent={product.discountPercent}>
              {product.discountPercent}%
            </Badge>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>

          <div className="flex items-center gap-1 mb-2">
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

          {product.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          )}

          <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className={CLASS_FLEX_ITEMS_GAP2}>
              <span className="text-xl font-bold text-green-primary">
                {product.price.toLocaleString(LOCALE)} ₫
              </span>
              {product.oldPrice && product.oldPrice !== product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {product.oldPrice.toLocaleString(LOCALE)} ₫
                </span>
              )}
            </div>

            <div className={CLASS_FLEX_ITEMS_GAP2}>
              <button
                className="bg-green-primary text-white px-4 py-2 rounded-md hover:bg-green-dark transition-colors font-semibold text-sm"
                aria-label="Mua ngay sản phẩm"
              >
                MUA NGAY
              </button>
              <button
                onClick={() => {
                  // TODO: Open quick view modal
                }}
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
          </div>
        </div>
      </div>
    </div>
  )
}

