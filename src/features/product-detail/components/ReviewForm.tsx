import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RenderButton } from '@/components/ui/Button'
import { 
  MAX_RATING,
  CLASS_LABEL_REVIEW,
  CLASS_TEXT_RED_500,
  CLASS_ERROR_TEXT,
  CLASS_SVG_FILL_CURRENT,
} from '@/constants/common'
import { createReview, hasUserReviewedProduct } from '@/apis/reviews'
import { useAuth } from '@/contexts/AuthContext'
import { logError } from '@/lib/logger'

interface ReviewFormProps {
  productId: number
  onReviewSubmitted: () => void
}

interface ReviewFormData {
  rating: number
  comment: string
}

export const ReviewForm = ({ productId, onReviewSubmitted }: ReviewFormProps) => {
  const { user } = useAuth()
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasReviewed, setHasReviewed] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: MAX_RATING,
      comment: '',
    },
  })

  const rating = watch('rating')

  // Kiểm tra user đã review chưa
  useEffect(() => {
    if (user) {
      hasUserReviewedProduct(user.id, productId)
        .then(setHasReviewed)
        .catch((err) => {
          logError({
            error: err,
            context: 'ReviewForm',
            action: 'checkHasReviewed',
            productId,
            userId: user.id,
            timestamp: new Date().toISOString(),
            message: 'Error checking if user has reviewed',
          })
          // Default to false to allow review attempt, but log the error
          setHasReviewed(false)
        })
    } else {
      setHasReviewed(false)
    }
  }, [user, productId])

  const handleRatingClick = (value: number) => {
    setValue('rating', value, { shouldValidate: true })
  }

  const onSubmit = async (data: ReviewFormData) => {
    if (!user) {
      setError('Vui lòng đăng nhập để bình luận')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await createReview({
        productId,
        userId: user.id,
        userName: user.fullName,
        rating: data.rating,
        comment: data.comment.trim(),
      })

      setHasReviewed(true)
      onReviewSubmitted()
      
      // Reset form
      setValue('rating', MAX_RATING)
      setValue('comment', '')
    } catch (err) {
      const isErrorMessage = err instanceof Error
      const errorMessage = isErrorMessage ? err.message : 'Không thể gửi đánh giá'
      setError(errorMessage)
      logError({
        error: err,
        context: 'ReviewForm',
        action: 'submitReview',
        productId,
        userId: user.id,
        timestamp: new Date().toISOString(),
        message: 'Error submitting review',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (hasReviewed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <p className="text-green-700 font-medium">
          Bạn đã đánh giá sản phẩm này rồi. Cảm ơn bạn đã đóng góp!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Viết đánh giá</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className={CLASS_LABEL_REVIEW}>
            Đánh giá của bạn <span className={CLASS_TEXT_RED_500}>*</span>
          </label>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1"
              onMouseLeave={() => setHoveredRating(null)}
            >
              {[...Array(MAX_RATING)].map((_, i) => {
                const value = i + 1
                const isFilled = hoveredRating ? value <= hoveredRating : value <= rating
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    className="focus:outline-none transition-transform hover:scale-110"
                    aria-label={`Đánh giá ${value} sao`}
                  >
                    {isFilled ? (
                      <svg
                        className="w-6 h-6 text-yellow-400"
                        fill={CLASS_SVG_FILL_CURRENT}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-300"
                        fill="none"
                        stroke={CLASS_SVG_FILL_CURRENT}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {rating > 0 ? `${rating} sao` : 'Chưa chọn'}
            </span>
          </div>
          <input
            type="hidden"
            {...register('rating', {
              required: 'Vui lòng chọn đánh giá',
              min: { value: 1, message: 'Đánh giá tối thiểu là 1 sao' },
              max: { value: MAX_RATING, message: `Đánh giá tối đa là ${MAX_RATING} sao` },
            })}
          />
          {errors.rating && (
            <p className={CLASS_ERROR_TEXT}>{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="comment" className={CLASS_LABEL_REVIEW}>
            Bình luận <span className={CLASS_TEXT_RED_500}>*</span>
          </label>
          <textarea
            id="comment"
            {...register('comment', {
              required: 'Vui lòng nhập bình luận',
              minLength: {
                value: 10,
                message: 'Bình luận phải có ít nhất 10 ký tự',
              },
              maxLength: {
                value: 1000,
                message: 'Bình luận không được vượt quá 1000 ký tự',
              },
            })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent resize-none"
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
          />
          {errors.comment && (
            <p className={CLASS_ERROR_TEXT}>{errors.comment.message}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-end">
          <RenderButton
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            loadingText="Đang gửi..."
            className="bg-green-primary text-white hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Gửi đánh giá
          </RenderButton>
        </div>
      </form>
    </div>
  )
}

