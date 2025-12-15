import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import { ProductReview } from '@/types/review'
import { StarRating } from '@/components/ui/StarRating'
import { cn } from '@/lib/utils'
import { sanitizeHtml } from '@/lib/sanitize'
import { 
  CLASS_TEXT_GRAY_RELAXED, 
  CLASS_TEXT_GRAY_600,
  CLASS_MT_8,
  CLASS_SPACE_Y_6,
  CONTEXT_PRODUCT_TABS,
} from '@/constants/common'
import { getReviewsByProductId } from '@/apis/reviews'
import { hasUserPurchasedProduct } from '@/apis/orders'
import { useAuth } from '@/contexts/AuthContext'
import { ReviewForm } from './ReviewForm'
import { Link } from 'react-router-dom'
import { logError } from '@/lib/logger'

interface ProductTabsProps {
  product: Product
}

type TabType = 'info' | 'reviews' | 'tags'

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const { user, isLoggedIn } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('info')
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [canReview, setCanReview] = useState(false)
  const [checkingPurchase, setCheckingPurchase] = useState(false)

  // Load reviews từ API
  useEffect(() => {
    const loadReviews = async () => {
      setLoadingReviews(true)
      try {
        const productReviews = await getReviewsByProductId(product.id)
        setReviews(productReviews)
      } catch (error) {
        logError({
          error,
          context: CONTEXT_PRODUCT_TABS,
          action: 'loadReviews',
          productId: product.id,
          timestamp: new Date().toISOString(),
          message: 'Error loading reviews',
        })
      } finally {
        setLoadingReviews(false)
      }
    }

    loadReviews()
  }, [product.id])

  // Kiểm tra user có thể review không
  useEffect(() => {
    const checkCanReview = async () => {
      if (!isLoggedIn || !user) {
        setCanReview(false)
        return
      }

      setCheckingPurchase(true)
      try {
        const hasPurchased = await hasUserPurchasedProduct(user.id, product.id)
        setCanReview(hasPurchased)
      } catch (error) {
        logError({
          error,
          context: CONTEXT_PRODUCT_TABS,
          action: 'checkCanReview',
          productId: product.id,
          userId: user.id,
          timestamp: new Date().toISOString(),
          message: 'Error checking purchase status',
        })
        setCanReview(false)
      } finally {
        setCheckingPurchase(false)
      }
    }

    checkCanReview()
  }, [isLoggedIn, user, product.id])

  const handleReviewSubmitted = async () => {
    // Reload reviews sau khi submit
    setLoadingReviews(true)
    try {
      const productReviews = await getReviewsByProductId(product.id)
      setReviews(productReviews)
    } catch (error) {
      logError({
        error,
        context: CONTEXT_PRODUCT_TABS,
        action: 'reloadReviews',
        productId: product.id,
        timestamp: new Date().toISOString(),
        message: 'Error reloading reviews',
      })
    } finally {
      setLoadingReviews(false)
    }
  }

  const tabs = [
    { id: 'info' as TabType, label: 'THÔNG TIN SẢN PHẨM' },
    { id: 'reviews' as TabType, label: 'KHÁCH HÀNG ĐÁNH GIÁ' },
    { id: 'tags' as TabType, label: 'THẺ TAG' },
  ]

  return (
    <div className={CLASS_MT_8}>
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
          <div className={CLASS_SPACE_Y_6}>
            {/* Form bình luận */}
            {checkingPurchase ? (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
                <p className="text-gray-600">Đang kiểm tra...</p>
              </div>
            ) : canReview ? (
              <ReviewForm
                productId={product.id}
                onReviewSubmitted={handleReviewSubmitted}
              />
            ) : isLoggedIn ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  Bạn cần mua sản phẩm này thành công trước khi có thể đánh giá.
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 mb-2">
                  Vui lòng{' '}
                  <Link
                    to="/auth/login"
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    đăng nhập
                  </Link>
                  {' '}để có thể đánh giá sản phẩm.
                </p>
              </div>
            )}

            {/* Danh sách đánh giá */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Đánh giá khách hàng ({reviews.length})
              </h4>
              
              {loadingReviews ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Đang tải đánh giá...</p>
                </div>
              ) : reviews.length > 0 ? (
                <div className={CLASS_SPACE_Y_6}>
                  {reviews.map((review) => (
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
                  ))}
                </div>
              ) : (
                <p className={CLASS_TEXT_GRAY_600}>Chưa có đánh giá nào cho sản phẩm này.</p>
              )}
            </div>
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

