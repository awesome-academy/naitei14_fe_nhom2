import { cn } from '@/lib/utils'
import { logError } from '@/lib/logger'
import { FACEBOOK_SHARE_URL, TWITTER_SHARE_URL, GOOGLE_PLUS_SHARE_URL } from '@/constants/common'

interface SocialShareButtonsProps {
  className?: string
  url?: string
  title?: string
  onCopySuccess?: () => void
}

export const RenderSocialShareButtons = ({
  className,
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = '',
  onCopySuccess,
}: SocialShareButtonsProps) => {
  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(title)

  const onFacebookShare = () => {
    window.open(
      `${FACEBOOK_SHARE_URL}?u=${shareUrl}`,
      'facebook-share-dialog',
      'width=626,height=436'
    )
  }

  const onTwitterShare = () => {
    window.open(
      `${TWITTER_SHARE_URL}?url=${shareUrl}&text=${shareTitle}`,
      'twitter-share-dialog',
      'width=626,height=436'
    )
  }

  const onGooglePlusShare = () => {
    window.open(
      `${GOOGLE_PLUS_SHARE_URL}?url=${shareUrl}`,
      'googleplus-share-dialog',
      'width=626,height=436'
    )
  }

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      if (onCopySuccess) {
        onCopySuccess()
      }
    } catch (err) {
      logError({
        error: err,
        context: 'RenderSocialShareButtons',
        action: 'onCopyLink',
        timestamp: new Date().toISOString(),
        url,
        message: 'Failed to copy link',
      })
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        onClick={onFacebookShare}
        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        aria-label="Chia sẻ lên Facebook"
      >
        Like 0
      </button>
      <button
        onClick={onTwitterShare}
        className="px-3 py-1.5 bg-blue-400 text-white text-sm rounded hover:bg-blue-500 transition-colors"
        aria-label="Chia sẻ lên Twitter"
      >
        Tweet
      </button>
      <button
        onClick={onGooglePlusShare}
        className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
        aria-label="Chia sẻ lên Google+"
      >
        G+1 0
      </button>
      <button
        onClick={onCopyLink}
        className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        aria-label="Chia sẻ"
      >
        Share
      </button>
    </div>
  )
}

