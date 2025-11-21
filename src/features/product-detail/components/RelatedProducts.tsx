import { useState } from 'react'
import { Product } from '@/types/product'
import { ProductCard } from '@/components/products/ProductCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { CLASS_NAV_BUTTON, CLASS_ICON_SIZE_MD_5 } from '@/constants/common'

interface RelatedProductsProps {
  products: Product[]
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = currentIndex * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedProducts = products.slice(startIndex, endIndex)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sản phẩm cùng loại</h2>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              className={CLASS_NAV_BUTTON}
              aria-label="Sản phẩm trước"
            >
              <ChevronLeftIcon className={CLASS_ICON_SIZE_MD_5} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={CLASS_NAV_BUTTON}
              aria-label="Sản phẩm sau"
            >
              <ChevronRightIcon className={CLASS_ICON_SIZE_MD_5} />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

