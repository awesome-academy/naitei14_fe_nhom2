import { CLASS_HOVER, CLASS_TEXT_SM_GRAY, CLASS_FONT_SEMIBOLD_MB4, CLASS_SPACE_Y2_TEXT_SM } from '@/constants/common'

interface NavigationSectionProps {
  title: string
  links: string[]
  className?: string
}

const RenderNavigationSection = ({ title, links, className = '' }: NavigationSectionProps) => {
  return (
    <div>
      <div className={CLASS_FONT_SEMIBOLD_MB4}>{title}</div>
      <ul className={`${CLASS_SPACE_Y2_TEXT_SM} ${className}`}>
        {links.map((link) => (
          <li key={link}>
            <a href="#" className={CLASS_HOVER}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const RenderNavigation = () => {
  const customerInfoLinks = ['Hệ thống cửa hàng', 'Tài khoản của tôi', 'Sản phẩm yêu thích', 'Chính sách đổi trả', 'Giao hàng']
  const supportLinks = ['Chính sách giao hàng', 'Hướng dẫn mua hàng', 'Tích điểm đổi quà', 'Câu hỏi thường gặp']
  const policyLinks = ['Chính sách đổi trả', 'Chính sách bảo hành', 'Chính sách hoàn tiền']
  const newsLinks = ['Tin tức', 'Khuyến mãi', 'Tuyển dụng', 'Liên hệ']

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="text-xl font-bold text-green-primary mb-4">Green Shop</div>
        <p className={CLASS_TEXT_SM_GRAY}>Món quà từ thiên nhiên</p>
        <p className={CLASS_TEXT_SM_GRAY}>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
        <p className={CLASS_TEXT_SM_GRAY}>Điện thoại: (04) 6674 2332</p>
        <p className="text-sm text-gray-400">Email: contact@greenshop.com</p>
      </div>

      <RenderNavigationSection title="THÔNG TIN KHÁCH HÀNG" links={customerInfoLinks} />

      <RenderNavigationSection title="HỖ TRỢ DỊCH VỤ" links={supportLinks} />

      <div>
        <RenderNavigationSection title="CHÍNH SÁCH ƯU ĐÃI" links={policyLinks} className="mb-6" />
        <RenderNavigationSection title="TIN TỨC" links={newsLinks} />
      </div>
    </div>
  )
}

