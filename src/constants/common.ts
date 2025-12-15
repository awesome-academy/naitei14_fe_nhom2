// Locale constants
export const LOCALE = "vi-VN" as const;
export const VAT_RATE = 0.1;

// Rating constants
export const MAX_RATING = 5;
export const DEFAULT_RATING = 5;
export const RATING_4 = 4;
export const RATING_5 = 5;

// Discount constants
export const DISCOUNT_50_PERCENT = 50;

// Price constants (in VND)
export const PRICE_120000 = 120000;
export const PRICE_150000 = 150000;
export const PRICE_180000 = 180000;
export const PRICE_200000 = 200000;
export const PRICE_250000 = 250000;
export const PRICE_300000 = 300000;
export const PRICE_320000 = 320000;
export const PRICE_350000 = 350000;
export const PRICE_375000 = 375000;
export const PRICE_400000 = 400000;
export const PRICE_450000 = 450000;
export const PRICE_500000 = 500000;
export const PRICE_550000 = 550000;
export const PRICE_850000 = 850000;
export const PRICE_1000000 = 1000000;

// Token expiration times
export const TOKEN_EXPIRY_HOURS = 24;

// Common messages
export const MESSAGE_DEVELOPING = "Chức năng đang phát triển" as const;
export const MESSAGE_REGISTER_FAILED = "Đăng ký thất bại" as const;
export const MESSAGE_LOGIN_FAILED = "Đăng nhập thất bại. Vui lòng thử lại." as const;
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
export const CLASS_FLEX_ITEMS_GAP2 = "flex items-center gap-2";
export const CLASS_SELECT_INPUT =
  "px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent";
export const CLASS_VIEW_TOGGLE_BUTTON = "p-2 rounded transition-colors";
export const CLASS_VIEW_TOGGLE_ACTIVE = "bg-green-primary text-white";
export const CLASS_VIEW_TOGGLE_INACTIVE = "text-gray-600 hover:bg-gray-100";
export const CLASS_TEXT_CENTER_PY12 = "text-center py-12";
export const CLASS_QUANTITY_BUTTON =
  "p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";
export const CLASS_ICON_SIZE_SM = "w-4 h-4";
export const CLASS_IMAGE_COVER = "w-full h-full object-cover";
export const CLASS_FLEX_ITEMS_GAP3 = "flex items-center gap-3";
export const CLASS_ICON_BUTTON_ROUND =
  "p-3 rounded-full border border-gray-300 hover:bg-green-primary hover:text-white hover:border-green-primary transition-colors bg-white";
export const CLASS_TEXT_GRAY_RELAXED = "text-gray-700 leading-relaxed";
export const CLASS_TEXT_GRAY_600 = "text-gray-600";
export const CLASS_NAV_BUTTON =
  "p-2 rounded-full border border-gray-300 hover:bg-green-primary hover:text-white hover:border-green-primary transition-colors";
export const CLASS_ICON_SIZE_MD_5 = "w-5 h-5";

// Icon size classes
export const CLASS_ICON_SIZE_MD = "w-5 h-5";
export const CLASS_ICON_SIZE_MD_GRAY = "w-5 h-5 text-gray-700";

// Favorite messages
export const MESSAGE_REMOVE_FAVORITE = "Bỏ yêu thích" as const;
export const MESSAGE_ADD_FAVORITE = "Thêm vào yêu thích" as const;

// Navigation hover class
export const CLASS_NAV_HOVER =
  "hover:text-green-200 transition-colors font-semibold";

// Context constants
export const CONTEXT_RENDER_PRODUCTS = "RenderProducts" as const;

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

// Social share URLs
export const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer/sharer.php";
export const TWITTER_SHARE_URL = "https://twitter.com/intent/tweet";

// API constants
export const CONTENT_TYPE_JSON = "application/json";
export const FIELD_CREATED_AT = "createdAt";
export const QUERY_PARAM_PRICE_GTE = "price_gte";
export const QUERY_PARAM_PRICE_LTE = "price_lte";
export const DEFAULT_CATEGORY = "Cây cảnh";

// API error messages
export const ERROR_GET_FEATURED_PRODUCTS =
  "Không thể lấy danh sách sản phẩm nổi bật";
export const ERROR_GET_ALL_PRODUCTS = "Không thể lấy danh sách sản phẩm";
export const ERROR_SEARCH_PRODUCTS = "Không thể tìm kiếm sản phẩm";
export const ERROR_GET_PRODUCT = "Không thể lấy thông tin sản phẩm";
export const ERROR_CREATE_ORDER = "Không thể tạo đơn hàng";
export const ERROR_GET_ORDERS = "Không thể lấy danh sách đơn hàng";
export const ERROR_GET_REVIEWS = "Không thể lấy danh sách đánh giá";
export const ERROR_CREATE_REVIEW = "Không thể tạo đánh giá";

// Component class names
export const CLASS_MT_8 = "mt-8";
export const CLASS_SPACE_Y_6 = "space-y-6";
export const CLASS_LABEL_REVIEW =
  "block text-sm font-medium text-gray-700 mb-2";
export const CLASS_TEXT_RED_500 = "text-red-500";
export const CLASS_ERROR_TEXT = "text-red-500 text-sm mt-1";
export const CLASS_SVG_FILL_CURRENT = "currentColor";
export const CONTEXT_PRODUCT_TABS = "ProductTabs";

// Default user role
export const DEFAULT_USER_ROLE = "user";

// Social share constants
export const COPY_LINK_TIMEOUT_MS = 2000;
export const WHATSAPP_SHARE_BASE_URL = "https://wa.me/";
export const CLASS_ICON_SIZE_SM_4 = "w-4 h-4";
export const CLASS_HIDDEN_SM_INLINE = "hidden sm:inline";
