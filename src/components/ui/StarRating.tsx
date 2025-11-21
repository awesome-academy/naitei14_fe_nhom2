import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { MAX_RATING, DEFAULT_RATING } from '@/constants/common'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating?: number
  maxRating?: number
  showRating?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const StarRating = ({
  rating = DEFAULT_RATING,
  maxRating = MAX_RATING,
  showRating = false,
  size = 'md',
  className,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const iconSize = sizeClasses[size]

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(maxRating)].map((_, i) => {
        const isFilled = i < Math.floor(rating)
        return isFilled ? (
          <StarIconSolid key={i} className={cn(iconSize, 'text-yellow-400')} />
        ) : (
          <StarIcon key={i} className={cn(iconSize, 'text-gray-300')} />
        )
      })}
      {showRating && <span className="ml-1 text-sm text-gray-600">({rating})</span>}
    </div>
  )
}

