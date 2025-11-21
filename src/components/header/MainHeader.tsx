import { Container } from "@/components/ui/Container";
import {
  CLASS_FLEX_CENTER_GAP4,
  CLASS_HOVER,
  CLASS_SVG_ICON_SM,
} from "@/constants/common";
import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { LuLogIn, LuUserPlus, LuLogOut } from "react-icons/lu";
import { useAuth } from "@/contexts/AuthContext";

export const RenderTopHeader = () => {
  const { isLoggedIn, user, logout } = useAuth();

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
            {isLoggedIn ? (
              <>
                <span>Welcome, {user?.fullName}!</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 hover:text-gray-300"
                >
                  <LuLogOut size={16} />
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="auth/login"
                  className="flex items-center gap-1 hover:text-gray-300"
                >
                  <LuLogIn size={16} />
                  Đăng nhập
                </Link>
                <Link
                  to="auth/register"
                  className="flex items-center gap-1 hover:text-gray-300"
                >
                  <LuUserPlus size={16} />
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
