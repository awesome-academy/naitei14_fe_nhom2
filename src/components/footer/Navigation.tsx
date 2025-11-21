import { CLASS_HOVER, CLASS_TEXT_SM_GRAY, CLASS_FONT_SEMIBOLD_MB4, CLASS_SPACE_Y2_TEXT_SM } from '@/constants/common'

export const RenderNavigation = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="text-xl font-bold text-green-primary mb-4">Green Shop</div>
        <p className={CLASS_TEXT_SM_GRAY}>Món quà từ thiên nhiên</p>
        <p className={CLASS_TEXT_SM_GRAY}>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
        <p className={CLASS_TEXT_SM_GRAY}>Điện thoại: (04) 6674 2332</p>
        <p className="text-sm text-gray-400">Email: contact@greenshop.com</p>
      </div>

      <div>
        <div className={CLASS_FONT_SEMIBOLD_MB4}>THÔNG TIN KHÁCH HÀNG</div>
        <ul className={CLASS_SPACE_Y2_TEXT_SM}>
          <li><a href="#" className={CLASS_HOVER}>Hệ thống cửa hàng</a></li>
          <li><a href="#" className={CLASS_HOVER}>Tài khoản của tôi</a></li>
          <li><a href="#" className={CLASS_HOVER}>Sản phẩm yêu thích</a></li>
          <li><a href="#" className={CLASS_HOVER}>Chính sách đổi trả</a></li>
          <li><a href="#" className={CLASS_HOVER}>Giao hàng</a></li>
        </ul>
      </div>

      <div>
        <div className={CLASS_FONT_SEMIBOLD_MB4}>HỖ TRỢ DỊCH VỤ</div>
        <ul className={CLASS_SPACE_Y2_TEXT_SM}>
          <li><a href="#" className={CLASS_HOVER}>Chính sách giao hàng</a></li>
          <li><a href="#" className={CLASS_HOVER}>Hướng dẫn mua hàng</a></li>
          <li><a href="#" className={CLASS_HOVER}>Tích điểm đổi quà</a></li>
          <li><a href="#" className={CLASS_HOVER}>Câu hỏi thường gặp</a></li>
        </ul>
      </div>

      <div>
        <div className={CLASS_FONT_SEMIBOLD_MB4}>CHÍNH SÁCH ƯU ĐÃI</div>
        <ul className={`${CLASS_SPACE_Y2_TEXT_SM} mb-6`}>
          <li><a href="#" className={CLASS_HOVER}>Chính sách đổi trả</a></li>
          <li><a href="#" className={CLASS_HOVER}>Chính sách bảo hành</a></li>
          <li><a href="#" className={CLASS_HOVER}>Chính sách hoàn tiền</a></li>
        </ul>
        <div className={CLASS_FONT_SEMIBOLD_MB4}>TIN TỨC</div>
        <ul className={CLASS_SPACE_Y2_TEXT_SM}>
          <li><a href="#" className={CLASS_HOVER}>Tin tức</a></li>
          <li><a href="#" className={CLASS_HOVER}>Khuyến mãi</a></li>
          <li><a href="#" className={CLASS_HOVER}>Tuyển dụng</a></li>
          <li><a href="#" className={CLASS_HOVER}>Liên hệ</a></li>
        </ul>
      </div>
    </div>
  )
}

