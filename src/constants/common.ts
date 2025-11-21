// Locale constants
export const LOCALE = "vi-VN" as const;

// Rating constants
export const MAX_RATING = 5;
export const DEFAULT_RATING = 5;
export const RATING_4 = 4;
export const RATING_5 = 5;

// Discount constants
export const DISCOUNT_50_PERCENT = 50;

// Price constants (in VND)
export const PRICE_150000 = 150000;
export const PRICE_250000 = 250000;
export const PRICE_375000 = 375000;
export const PRICE_500000 = 500000;
export const PRICE_850000 = 850000;
export const PRICE_1000000 = 1000000;

// Token expiration times
export const TOKEN_EXPIRY_HOURS = 24;

// Common messages
export const MESSAGE_DEVELOPING = "Chức năng đang phát triển" as const;
export const MESSAGE_REGISTER_FAILED = "Đăng ký thất bại" as const;
export const MESSAGE_LOGIN_FAILED =
  "Đăng nhập thất bại. Vui lòng thử lại." as const;
export const ACTIVATION_INVALID_LINK = "Link kích hoạt không hợp lệ" as const;
export const ACTIVATION_SUCCESS =
  "Tài khoản đã được kích hoạt thành công!" as const;
export const ACTIVATION_FAILED_DEFAULT = "Kích hoạt thất bại" as const;

// Validation messages
export const VALIDATION_FULL_NAME_REQUIRED = "Họ và tên là bắt buộc.";
export const VALIDATION_PHONE_REQUIRED = "Số điện thoại là bắt buộc.";
export const VALIDATION_PHONE_INVALID = "Số điện thoại không hợp lệ.";
export const VALIDATION_EMAIL_REQUIRED = "Email là bắt buộc.";
export const VALIDATION_EMAIL_INVALID = "Email không hợp lệ.";
export const VALIDATION_EMAIL_EXISTS = "Email đã tồn tại.";
export const VALIDATION_WEBSITE_INVALID = "Website không hợp lệ.";
export const VALIDATION_PASSWORD_REQUIRED = "Mật khẩu là bắt buộc.";
export const VALIDATION_PASSWORD_MIN_LENGTH =
  "Mật khẩu phải có ít nhất 8 ký tự.";
export const VALIDATION_PASSWORD_STRENGTH =
  "Mật khẩu phải chứa ít nhất một chữ cái và một số.";
export const VALIDATION_CONFIRM_PASSWORD_REQUIRED =
  "Xác nhận mật khẩu là bắt buộc.";
export const VALIDATION_PASSWORD_MISMATCH = "Mật khẩu không khớp!";

// Newsletter error messages
export const ERROR_EMAIL_ALREADY_EXISTS =
  "Email này đã được đăng ký. Vui lòng sử dụng email khác." as const;
export const ERROR_NETWORK_CONNECTION =
  "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối và thử lại." as const;
export const ERROR_SERVER = "Lỗi máy chủ. Vui lòng thử lại sau." as const;
export const ERROR_GENERIC = "Đã có lỗi xảy ra. Vui lòng thử lại sau." as const;

// Error keywords for error detection
export const ERROR_KEYWORD_DUPLICATE = "duplicate" as const;
export const ERROR_KEYWORD_ALREADY_EXISTS = "already exists" as const;
export const ERROR_KEYWORD_NETWORK = "network" as const;
export const ERROR_KEYWORD_FETCH = "fetch" as const;
export const ERROR_KEYWORD_SERVER = "server" as const;
export const ERROR_KEYWORD_500 = "500" as const;

// Common class names
export const CLASS_HOVER = "hover:text-green-primary transition-colors";
export const CLASS_DISABLED = "cursor-not-allowed opacity-75";
export const CLASS_FLEX_CENTER_GAP4 = "flex items-center gap-4";
export const CLASS_SVG_ICON = "w-5 h-5";
export const CLASS_SVG_ICON_SM = "w-4 h-4";
export const CLASS_SVG_ICON_MD = "w-6 h-6";
export const CLASS_SVG_VIEWBOX = "0 0 24 24";
export const CLASS_SVG_FILL = "currentColor";
export const CLASS_SECTION_WHITE = "py-12 bg-white";
export const CLASS_DOT_INDICATOR =
  "w-3 h-3 bg-white bg-opacity-50 rounded-full";
export const CLASS_TEXT_SM_GRAY = "text-sm text-gray-400 mb-2";
export const CLASS_FONT_SEMIBOLD_MB4 = "font-semibold mb-4";
export const CLASS_SPACE_Y2_TEXT_SM = "space-y-2 text-sm text-gray-400";

// Auth form class names
export const CLASS_FORM_HEADING = "text-2xl font-bold text-green-primary mb-2";
export const CLASS_FORM_LABEL = "block text-sm font-medium text-gray-700 mb-2";
export const CLASS_FORM_INPUT =
  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500";
export const CLASS_FORM_ERROR = "text-red-500 text-sm mt-1";
export const CLASS_FORM_SUCCESS_MESSAGE =
  "p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm";
export const CLASS_FORM_ERROR_MESSAGE =
  "p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm";
export const CLASS_FORM_BUTTON_CONTAINER = "text-center";
export const CLASS_FORM_PASSWORD_TOGGLE =
  "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors";

// Register form class names
export const CLASS_SECTION_HEADING =
  "text-xl font-bold text-green-primary mb-6";
export const CLASS_GRID_TWO_COL = "grid grid-cols-1 md:grid-cols-2 gap-6";
export const CLASS_LABEL = "block text-sm mb-2";
export const CLASS_INPUT_BASE =
  "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-dark";
export const CLASS_PASSWORD_INPUT =
  "w-full px-4 py-2 pr-12 border border-gray-300 rounded focus:outline-none focus:border-green-dark";
export const CLASS_TOGGLE_BUTTON =
  "absolute right-2 top-1/2 transform -translate-y-1/2 text-green-primary hover:text-green-dark";
export const CLASS_ERROR = "text-red-500 text-sm mt-1";

// Grid layout classes
export const CLASS_GRID_LARGE_CARD_FIRST =
  "sm:col-span-2 lg:col-span-2 lg:row-span-2";
export const CLASS_GRID_LARGE_CARD_SECOND =
  "sm:col-span-2 lg:col-start-3 lg:col-span-2 lg:row-start-2 lg:row-span-2";

export const API_BASE_URL = `http://localhost:${
  import.meta.env.VITE_API_PORT || 3001
}`;

// Slider configuration
const DEFAULT_AUTO_SLIDE_INTERVAL_MS = 5 * 1000;
export const AUTO_SLIDE_INTERVAL_MS = Number(
  import.meta.env.VITE_AUTO_SLIDE_INTERVAL_MS || DEFAULT_AUTO_SLIDE_INTERVAL_MS
);
