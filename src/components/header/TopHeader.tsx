import { useState, useRef, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import {
  MdLogin,
  MdPersonAdd,
  MdLogout,
  MdKeyboardArrowDown,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export const RenderTopHeader = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    if (user?.id) {
      navigate(`/profile/${user.id}`);
      setIsDropdownOpen(false);
    }
  };

  const handleChangePasswordClick = () => {
    navigate("/auth/change-password");
    setIsDropdownOpen(false);
  };

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
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1 hover:text-gray-300 focus:outline-none"
                  >
                    <span>Welcome, {user?.fullName}!</span>
                    <MdKeyboardArrowDown
                      className={`transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div
                      className={cn(
                        "absolute top-full right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl z-50 border border-gray-200 overflow-hidden",
                        "animate-in fade-in slide-in-from-top-2 duration-300"
                      )}
                    >
                      <div className="py-3">
                        <button
                          onClick={handleProfileClick}
                          className={cn(
                            "flex items-center w-full text-left px-4 py-1 text-sm text-gray-800 font-medium rounded-none",
                            "hover:bg-green-primary hover:bg-opacity-10 hover:text-green-primary transition-all duration-200"
                          )}
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-green-primary bg-opacity-10 rounded-lg mr-4">
                            <MdPerson className="w-5 h-5 text-green-primary" />
                          </div>
                          <span>Profile</span>
                        </button>
                        <div className="border-t border-gray-200 my-1 mx-3"></div>
                        <button
                          onClick={handleChangePasswordClick}
                          className={cn(
                            "flex items-center w-full text-left px-4 py-1 text-sm text-gray-800 font-medium rounded-none",
                            "hover:bg-green-primary hover:bg-opacity-10 hover:text-green-primary transition-all duration-200"
                          )}
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-green-primary bg-opacity-10 rounded-lg mr-4">
                            <MdLock className="w-5 h-5 text-green-primary" />
                          </div>
                          <span>Đổi mật khẩu</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 hover:text-gray-300"
                >
                  <MdLogout size={16} />
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="auth/login"
                  className="flex items-center gap-1 hover:text-gray-300"
                >
                  <MdLogin size={16} />
                  Đăng nhập
                </Link>
                <Link
                  to="auth/register"
                  className="flex items-center gap-1 hover:text-gray-300"
                >
                  <MdPersonAdd size={16} />
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

