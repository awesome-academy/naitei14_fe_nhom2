import { CLASS_HOVER, CLASS_SVG_ICON } from '@/constants/common'
import { FaFacebook, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa'

export const RenderSocialLinks = () => {
  return (
    <div className="flex items-center gap-2">
      <a href="#" className={CLASS_HOVER} aria-label="Facebook">
        <FaFacebook className={CLASS_SVG_ICON} />
      </a>
      <a href="#" className={CLASS_HOVER} aria-label="Twitter">
        <FaTwitter className={CLASS_SVG_ICON} />
      </a>
      <a href="#" className={CLASS_HOVER} aria-label="Pinterest">
        <FaPinterest className={CLASS_SVG_ICON} />
      </a>
      <a href="#" className={CLASS_HOVER} aria-label="YouTube">
        <FaYoutube className={CLASS_SVG_ICON} />
      </a>
    </div>
  )
}

