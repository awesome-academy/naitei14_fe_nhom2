import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { logError } from '@/lib/logger'
import { useAuth } from '@/contexts/AuthContext'
import {
  FACEBOOK_SHARE_URL,
  TWITTER_SHARE_URL,
  WHATSAPP_SHARE_BASE_URL,
  COPY_LINK_TIMEOUT_MS,
  CLASS_ICON_SIZE_SM_4,
  CLASS_HIDDEN_SM_INLINE,
} from '@/constants/common'
import { FaFacebook, FaTwitter, FaWhatsapp, FaLink } from 'react-icons/fa'

interface SocialShareButtonsProps {
  className?: string
  url?: string
  title?: string
  description?: string
  image?: string
  onCopySuccess?: () => void
}

export const RenderSocialShareButtons = ({
  className,
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = '',
  description = '',
  onCopySuccess,
}: SocialShareButtonsProps) => {
  const { isLoggedIn } = useAuth()
  const [copied, setCopied] = useState(false)
  const shareUrl = encodeURIComponent(url)

  const openShareWindow = (shareLink: string, name: string) => {
    window.open(
      shareLink,
      `${name}-share-dialog`,
      'width=626,height=436,menubar=no,toolbar=no,resizable=yes,scrollbars=yes'
    )
  }

  const onFacebookShare = () => {
    if (!isLoggedIn) return
    // Facebook sử dụng quote để thêm text, kết hợp title và description
    const shareText = `${title}${description ? ` - ${description}` : ''}`
    const shareLink = `${FACEBOOK_SHARE_URL}?u=${shareUrl}${shareText ? `&quote=${encodeURIComponent(shareText)}` : ''}`
    openShareWindow(shareLink, 'facebook')
  }

  const onTwitterShare = () => {
    if (!isLoggedIn) return
    // Twitter - kết hợp title và description
    const text = `${title}${description ? ` - ${description}` : ''}`
    const shareLink = `${TWITTER_SHARE_URL}?url=${shareUrl}&text=${encodeURIComponent(text)}`
    openShareWindow(shareLink, 'twitter')
  }

  const onWhatsAppShare = () => {
    if (!isLoggedIn) return
    const text = `${title}${description ? ` - ${description}` : ''} ${url}`
    const shareLink = `${WHATSAPP_SHARE_BASE_URL}?text=${encodeURIComponent(text)}`
    openShareWindow(shareLink, 'whatsapp')
  }

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      if (onCopySuccess) {
        onCopySuccess()
      }
      setTimeout(() => setCopied(false), COPY_LINK_TIMEOUT_MS)
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

  const buttonClass = "flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
  const disabledButtonClass = "flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white opacity-50 cursor-not-allowed"

  if (!isLoggedIn) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
          <p className="text-blue-800 mb-2">
            Vui lòng{' '}
            <Link
              to="/auth/login"
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              đăng nhập
            </Link>
            {' '}để có thể chia sẻ sản phẩm.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            disabled
            className={cn(disabledButtonClass, 'bg-[#1877F2]')}
            aria-label="Chia sẻ lên Facebook (yêu cầu đăng nhập)"
            title="Vui lòng đăng nhập để chia sẻ"
          >
            <FaFacebook className={CLASS_ICON_SIZE_SM_4} />
            <span className={CLASS_HIDDEN_SM_INLINE}>Facebook</span>
          </button>
          
          <button
            disabled
            className={cn(disabledButtonClass, 'bg-[#1DA1F2]')}
            aria-label="Chia sẻ lên Twitter (yêu cầu đăng nhập)"
            title="Vui lòng đăng nhập để chia sẻ"
          >
            <FaTwitter className={CLASS_ICON_SIZE_SM_4} />
            <span className={CLASS_HIDDEN_SM_INLINE}>Twitter</span>
          </button>
          
          <button
            disabled
            className={cn(disabledButtonClass, 'bg-[#25D366]')}
            aria-label="Chia sẻ qua WhatsApp (yêu cầu đăng nhập)"
            title="Vui lòng đăng nhập để chia sẻ"
          >
            <FaWhatsapp className={CLASS_ICON_SIZE_SM_4} />
            <span className={CLASS_HIDDEN_SM_INLINE}>WhatsApp</span>
          </button>
          
          <button
            onClick={onCopyLink}
            className={cn(buttonClass, copied ? 'bg-green-600' : 'bg-gray-600')}
            aria-label="Sao chép liên kết"
            title="Sao chép liên kết"
          >
            <FaLink className={CLASS_ICON_SIZE_SM_4} />
            <span className={CLASS_HIDDEN_SM_INLINE}>{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <button
        onClick={onFacebookShare}
        className={cn(buttonClass, 'bg-[#1877F2]')}
        aria-label="Chia sẻ lên Facebook"
        title="Chia sẻ lên Facebook"
      >
        <FaFacebook className={CLASS_ICON_SIZE_SM_4} />
        <span className={CLASS_HIDDEN_SM_INLINE}>Facebook</span>
      </button>
      
      <button
        onClick={onTwitterShare}
        className={cn(buttonClass, 'bg-[#1DA1F2]')}
        aria-label="Chia sẻ lên Twitter"
        title="Chia sẻ lên Twitter"
      >
        <FaTwitter className={CLASS_ICON_SIZE_SM_4} />
        <span className={CLASS_HIDDEN_SM_INLINE}>Twitter</span>
      </button>
      
      <button
        onClick={onWhatsAppShare}
        className={cn(buttonClass, 'bg-[#25D366]')}
        aria-label="Chia sẻ qua WhatsApp"
        title="Chia sẻ qua WhatsApp"
      >
        <FaWhatsapp className={CLASS_ICON_SIZE_SM_4} />
        <span className={CLASS_HIDDEN_SM_INLINE}>WhatsApp</span>
      </button>
      
      <button
        onClick={onCopyLink}
        className={cn(buttonClass, copied ? 'bg-green-600' : 'bg-gray-600')}
        aria-label="Sao chép liên kết"
        title="Sao chép liên kết"
      >
        <FaLink className={CLASS_ICON_SIZE_SM_4} />
        <span className={CLASS_HIDDEN_SM_INLINE}>{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
      </button>
    </div>
  )
}

