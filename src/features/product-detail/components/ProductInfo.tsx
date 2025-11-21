import { useState } from 'react'
import { Product } from '@/types/product'
import { StarRating } from '@/components/ui/StarRating'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { RenderSocialShareButtons } from '@/components/ui/SocialShareButtons'
import { RenderButton } from '@/components/ui/Button'
import { MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { LOCALE, CLASS_ICON_SIZE_MD, MESSAGE_ADD_FAVORITE, MESSAGE_REMOVE_FAVORITE, CLASS_FLEX_ITEMS_GAP3, CLASS_ICON_BUTTON_ROUND } from '@/constants/common'
import { cn } from '@/lib/utils'

interface ProductInfoProps {
  product: Product
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    // Implementation pending
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // TODO: Implement favorite functionality
  }

  const handleQuickView = () => {
    // TODO: Implement quick view modal
    // Implementation pending
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} size="lg" />
      </div>

      <div className={CLASS_FLEX_ITEMS_GAP3}>
        <span className="text-3xl font-bold text-green-primary">
          {product.price.toLocaleString(LOCALE)} ₫
        </span>
        {product.oldPrice && product.oldPrice !== product.price && (
          <span className="text-xl text-gray-400 line-through">
            {product.oldPrice.toLocaleString(LOCALE)} ₫
          </span>
        )}
      </div>

      {product.shortDescription && (
        <div className="text-gray-600 leading-relaxed">
          <p>{product.shortDescription}</p>
        </div>
      )}

      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        max={product.stock || 999}
      />

      <div className={CLASS_FLEX_ITEMS_GAP3}>
        <RenderButton
          variant="primary"
          size="lg"
          onClick={handleBuyNow}
          className="flex-1"
        >
          MUA NGAY
        </RenderButton>
        <button
          onClick={handleQuickView}
          className={CLASS_ICON_BUTTON_ROUND}
          aria-label="Xem nhanh sản phẩm"
        >
          <MagnifyingGlassIcon className={CLASS_ICON_SIZE_MD} />
        </button>
        <button
          onClick={handleToggleFavorite}
          className={CLASS_ICON_BUTTON_ROUND}
          aria-label={isFavorite ? MESSAGE_REMOVE_FAVORITE : MESSAGE_ADD_FAVORITE}
        >
          {isFavorite ? (
            <HeartIconSolid className={cn(CLASS_ICON_SIZE_MD, 'text-red-500')} />
          ) : (
            <HeartIcon className={CLASS_ICON_SIZE_MD} />
          )}
        </button>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Chia sẻ:</p>
        <RenderSocialShareButtons title={product.name} />
      </div>
    </div>
  )
}

