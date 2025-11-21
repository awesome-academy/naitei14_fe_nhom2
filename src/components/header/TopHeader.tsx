import { Container } from '@/components/ui/Container'
import { MESSAGE_DEVELOPING, CLASS_DISABLED, CLASS_FLEX_CENTER_GAP4, CLASS_HOVER, CLASS_SVG_ICON_SM } from '@/constants/common'
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const RenderTopHeader = () => {
  return (
    <div className="bg-gray-dark text-white py-2 text-sm">
      <Container>
        <div className="flex justify-between items-center">
          <div className={CLASS_FLEX_CENTER_GAP4}>
            <span>Giờ mở cửa: 8:00 - 22:00 Thứ Hai - Chủ Nhật</span>
            <div className="flex items-center gap-2">
              <a href="#" className={CLASS_HOVER} aria-label="Facebook">
                <FaFacebook className={CLASS_SVG_ICON_SM} />
              </a>
              <a href="#" className={CLASS_HOVER} aria-label="Twitter">
                <FaTwitter className={CLASS_SVG_ICON_SM} />
              </a>
              <a href="#" className={CLASS_HOVER} aria-label="Pinterest">
                <FaPinterest className={CLASS_SVG_ICON_SM} />
              </a>
              <a href="#" className={CLASS_HOVER} aria-label="Instagram">
                <FaInstagram className={CLASS_SVG_ICON_SM} />
              </a>
            </div>
          </div>
          <div className={CLASS_FLEX_CENTER_GAP4}>
            <span className={CLASS_DISABLED} title={MESSAGE_DEVELOPING}>
              Đăng nhập
            </span>
            <Link to="auth/register">
              Đăng ký
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

