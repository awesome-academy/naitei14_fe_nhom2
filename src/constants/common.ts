// Locale constants
export const LOCALE = 'vi-VN' as const

// Rating constants
export const MAX_RATING = 5
export const DEFAULT_RATING = 5
export const RATING_4 = 4
export const RATING_5 = 5

// Discount constants
export const DISCOUNT_50_PERCENT = 50

// Price constants (in VND)
export const PRICE_150000 = 150000
export const PRICE_250000 = 250000
export const PRICE_375000 = 375000
export const PRICE_500000 = 500000
export const PRICE_850000 = 850000
export const PRICE_1000000 = 1000000

// Common messages
export const MESSAGE_DEVELOPING = 'Chức năng đang phát triển' as const

// Newsletter error messages
export const ERROR_EMAIL_ALREADY_EXISTS = 'Email này đã được đăng ký. Vui lòng sử dụng email khác.' as const
export const ERROR_NETWORK_CONNECTION = 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối và thử lại.' as const
export const ERROR_SERVER = 'Lỗi máy chủ. Vui lòng thử lại sau.' as const
export const ERROR_GENERIC = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' as const

// Error keywords for error detection
export const ERROR_KEYWORD_DUPLICATE = 'duplicate' as const
export const ERROR_KEYWORD_ALREADY_EXISTS = 'already exists' as const
export const ERROR_KEYWORD_NETWORK = 'network' as const
export const ERROR_KEYWORD_FETCH = 'fetch' as const
export const ERROR_KEYWORD_SERVER = 'server' as const
export const ERROR_KEYWORD_500 = '500' as const

// Common class names
export const CLASS_HOVER = 'hover:text-green-primary transition-colors'
export const CLASS_DISABLED = 'cursor-not-allowed opacity-75'
export const CLASS_FLEX_CENTER_GAP4 = 'flex items-center gap-4'
export const CLASS_SVG_ICON = 'w-5 h-5'
export const CLASS_SVG_ICON_SM = 'w-4 h-4'
export const CLASS_SVG_ICON_MD = 'w-6 h-6'
export const CLASS_SVG_VIEWBOX = '0 0 24 24'
export const CLASS_SVG_FILL = 'currentColor'
export const CLASS_SECTION_WHITE = 'py-12 bg-white'
export const CLASS_DOT_INDICATOR = 'w-3 h-3 bg-white bg-opacity-50 rounded-full'
export const CLASS_TEXT_SM_GRAY = 'text-sm text-gray-400 mb-2'
export const CLASS_FONT_SEMIBOLD_MB4 = 'font-semibold mb-4'
export const CLASS_SPACE_Y2_TEXT_SM = 'space-y-2 text-sm text-gray-400'

// Grid layout classes
export const CLASS_GRID_LARGE_CARD_FIRST = 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
export const CLASS_GRID_LARGE_CARD_SECOND = 'sm:col-span-2 lg:col-start-3 lg:col-span-2 lg:row-start-2 lg:row-span-2'

// Slider configuration
const DEFAULT_AUTO_SLIDE_INTERVAL_MS = 5 * 1000
export const AUTO_SLIDE_INTERVAL_MS = Number(
  import.meta.env.VITE_AUTO_SLIDE_INTERVAL_MS || DEFAULT_AUTO_SLIDE_INTERVAL_MS
)

