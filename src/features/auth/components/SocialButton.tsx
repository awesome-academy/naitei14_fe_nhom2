import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface SocialButtonProps {
  provider: "google" | "facebook" | "github";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onClick,
  disabled = false,
  className = "",
}) => {
  const { t } = useTranslation();

  const getProviderConfig = (provider: "google" | "facebook" | "github") => {
    switch (provider) {
      case "google":
        return {
          icon: <FcGoogle />,
          label: t("auth.socialLogin.google"),
          bgColor: "bg-white",
          borderColor: "border border-[#dadce0]",
          hoverColor: "hover:bg-[#f8f9fa]",
          textColor: "text-[#3c4043]",
          focusColor: "focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2",
        };
      case "facebook":
        return {
          icon: <FaFacebook className="text-white" />,
          label: t("auth.socialLogin.facebook"),
          bgColor: "bg-[#1877F2]",
          borderColor: "border-0",
          hoverColor: "hover:bg-[#166FE5]",
          textColor: "text-white",
          focusColor: "focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2",
        };
      case "github":
        return {
          icon: <FaGithub className="text-white" />,
          label: t("auth.socialLogin.github"),
          bgColor: "bg-[#24292F]",
          borderColor: "border-0",
          hoverColor: "hover:bg-[#2c3339]",
          textColor: "text-white",
          focusColor: "focus:ring-2 focus:ring-[#24292F] focus:ring-offset-2",
        };
      default:
        return {
          icon: <FcGoogle />,
          label: t("auth.socialLogin.google"),
          bgColor: "bg-white",
          borderColor: "border border-[#dadce0]",
          hoverColor: "hover:bg-[#f8f9fa]",
          textColor: "text-[#3c4043]",
          focusColor: "focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2",
        };
    }
  };

  const config = getProviderConfig(provider);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-md font-medium transition-all duration-200",
        config.bgColor,
        config.borderColor,
        config.hoverColor,
        config.textColor,
        config.focusColor,
        "outline-none",
        disabled ? "opacity-50 cursor-not-allowed" : "active:scale-[0.98]",
        provider === "google" && "shadow-sm",
        className
      )}
      aria-label={config.label}
    >
      <span className="text-xl">{config.icon}</span>
      <span className="text-sm font-medium">{config.label}</span>
    </button>
  );
};

export default SocialButton;
