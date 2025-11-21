import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'primary-rounded'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isLoading?: boolean
  loadingText?: string
}

export const RenderButton = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className,
  type = 'button',
  disabled = false,
  isLoading = false,
  loadingText,
}: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-green-primary text-white hover:bg-green-dark',
    secondary: 'bg-gray-dark text-white hover:bg-gray-700',
    outline: 'border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-white',
    'primary-rounded': 'px-8 py-3 bg-green-primary text-white rounded-full hover:bg-green-dark',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'font-semibold rounded-md transition-colors duration-200',
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && 'opacity-50 cursor-not-allowed',
        variant !== 'primary-rounded' && sizeClasses[size],
        className
      )}
    >
      {isLoading && loadingText ? loadingText : children}
    </button>
  )
}
