import React from "react";
import { MdWarning, MdCheckCircle, MdError, MdInfo } from "react-icons/md";
import { cn } from "@/lib/utils";

export type AlertType = "error" | "warning" | "success" | "info";

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  className?: string;
}

const alertConfig = {
  error: {
    icon: MdError,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    iconColor: "text-red-500",
  },
  warning: {
    icon: MdWarning,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-800",
    iconColor: "text-amber-500",
  },
  success: {
    icon: MdCheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    iconColor: "text-green-500",
  },
  info: {
    icon: MdInfo,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    iconColor: "text-blue-500",
  },
};

const Alert: React.FC<AlertProps> = ({ type, title, message, className }) => {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <Icon className={cn("text-xl flex-shrink-0 mt-0.5", config.iconColor)} />
      <div>
        {title && (
          <p className={cn("text-sm font-medium", config.textColor)}>{title}</p>
        )}
        <p className={cn("text-sm", title ? "mt-1" : "", config.textColor)}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Alert;