import { useState } from 'react'
import { Product } from '@/types/product'
import { StarRating } from '@/components/ui/StarRating'
import { cn } from '@/lib/utils'
import { sanitizeHtml } from '@/lib/sanitize'
import { CLASS_TEXT_GRAY_RELAXED, CLASS_TEXT_GRAY_600 } from '@/constants/common'

interface ProductTabsProps {
  product: Product
}

type TabType = 'info' | 'reviews' | 'tags'

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('info')

  const tabs = [
    { id: 'info' as TabType, label: 'THÔNG TIN SẢN PHẨM' },
    { id: 'reviews' as TabType, label: 'KHÁCH HÀNG ĐÁNH GIÁ' },
    { id: 'tags' as TabType, label: 'THẺ TAG' },
  ]

  return (
    <div className="mt-8">  
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-3 font-semibold text-sm transition-colors',
              activeTab === tab.id
                ? 'text-green-primary border-b-2 border-green-primary'
                : 'text-gray-600 hover:text-green-primary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-6">
        {activeTab === 'info' && (
          <div className="prose max-w-none">
            {product.fullDescription ? (
              <div
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.fullDescription) }}
                className={CLASS_TEXT_GRAY_RELAXED}
              />
            ) : (
              <div className={CLASS_TEXT_GRAY_RELAXED}>
                <p>{product.description || 'Không có thông tin chi tiết về sản phẩm.'}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={review.rating} size="sm" />
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className={CLASS_TEXT_GRAY_600}>Chưa có đánh giá nào cho sản phẩm này.</p>
            )}
          </div>
        )}

        {activeTab === 'tags' && (
          <div className="flex flex-wrap gap-2">
            {product.tags && product.tags.length > 0 ? (
              product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-green-primary hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className={CLASS_TEXT_GRAY_600}>Không có thẻ tag nào.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

