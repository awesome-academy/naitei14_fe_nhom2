import { useState } from 'react'
import {
  ERROR_EMAIL_ALREADY_EXISTS,
  ERROR_NETWORK_CONNECTION,
  ERROR_SERVER,
  ERROR_GENERIC,
  ERROR_KEYWORD_DUPLICATE,
  ERROR_KEYWORD_ALREADY_EXISTS,
  ERROR_KEYWORD_NETWORK,
  ERROR_KEYWORD_FETCH,
  ERROR_KEYWORD_SERVER,
  ERROR_KEYWORD_500,
} from '@/constants/common'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const RenderNewsletter = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Vui lòng nhập email')
      return
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Email không hợp lệ')
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setEmail('')
    } catch (error: unknown) {
      if (import.meta.env.DEV) {
        console.error('Error subscribing to newsletter:', {
          error,
          context: 'Newsletter',
          action: 'handleSubmit',
          timestamp: new Date().toISOString(),
        })
      }
      
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase()
        if (
          errorMessage.includes(ERROR_KEYWORD_DUPLICATE) ||
          errorMessage.includes(ERROR_KEYWORD_ALREADY_EXISTS)
        ) {
          setError(ERROR_EMAIL_ALREADY_EXISTS)
        } else if (
          errorMessage.includes(ERROR_KEYWORD_NETWORK) ||
          errorMessage.includes(ERROR_KEYWORD_FETCH)
        ) {
          setError(ERROR_NETWORK_CONNECTION)
        } else if (
          errorMessage.includes(ERROR_KEYWORD_SERVER) ||
          errorMessage.includes(ERROR_KEYWORD_500)
        ) {
          setError(ERROR_SERVER)
        } else {
          setError(ERROR_GENERIC)
        }
      } else {
        setError(ERROR_GENERIC)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">ĐĂNG KÝ NHẬN EMAIL TỪ CHÚNG TÔI</span>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            placeholder="Nhập email của bạn"
            className="px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
            aria-label="Email đăng ký nhận tin"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'email-error' : undefined}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-primary px-4 py-2 rounded-r-md hover:bg-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Gửi đăng ký email"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi'}
          </button>
        </div>
        {error && (
          <span id="email-error" className="text-red-500 text-xs mt-1" role="alert">
            {error}
          </span>
        )}
      </form>
    </div>
  )
}

