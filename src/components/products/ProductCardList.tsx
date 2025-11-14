import { Badge } from '@/components/ui/Badge'
import { Product } from '../types'
import { LOCALE, MAX_RATING, DEFAULT_RATING, CLASS_SVG_FILL, CLASS_SVG_VIEWBOX } from '@/constants/common'

interface ProductCardListProps {
  product: Product
}

const CLASS_FLEX_ITEMS_GAP2 = 'flex items-center gap-2'
const CLASS_ICON_BUTTON = 'bg-white border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors'
const CLASS_SVG_ICON_GRAY = 'w-5 h-5 text-gray-700'

export const RenderProductCardList = ({ product }: ProductCardListProps) => {
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
                className={CLASS_ICON_BUTTON}
                aria-label="Xem nhanh sản phẩm"
              >
                <svg
                  className={CLASS_SVG_ICON_GRAY}
                  fill="none"
                  stroke={CLASS_SVG_FILL}
                  viewBox={CLASS_SVG_VIEWBOX}
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
              <button
                className={CLASS_ICON_BUTTON}
                aria-label="Thêm vào yêu thích"
              >
                <svg
                  className={CLASS_SVG_ICON_GRAY}
                  fill="none"
                  stroke={CLASS_SVG_FILL}
                  viewBox={CLASS_SVG_VIEWBOX}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

