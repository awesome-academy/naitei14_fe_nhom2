import React from "react";
import {
  MdWarning,
  MdCheckCircle,
  MdError,
  MdInfo,
  MdEmail,
} from "react-icons/md";
import { cn } from "@/lib/utils";

export type AlertType = "error" | "warning" | "success" | "info";

interface ActionProps {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  loadingText?: string;
}

interface AlertWithActionProps {
  type: AlertType;
  title?: string;
  message: string;
  action: ActionProps;
  className?: string;
}

const alertConfig = {
  error: {
    icon: MdError,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    iconColor: "text-red-500",
    actionBgColor: "bg-red-50",
    actionBorderColor: "border-red-200",
    actionTextColor: "text-red-600",
    actionHoverColor: "hover:bg-red-100",
  },
  warning: {
    icon: MdWarning,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-800",
    iconColor: "text-amber-500",
    actionBgColor: "bg-green-50",
    actionBorderColor: "border-green-200",
    actionTextColor: "text-green-600",
    actionHoverColor: "hover:bg-green-100",
  },
  success: {
    icon: MdCheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    iconColor: "text-green-500",
    actionBgColor: "bg-green-50",
    actionBorderColor: "border-green-200",
    actionTextColor: "text-green-600",
    actionHoverColor: "hover:bg-green-100",
  },
  info: {
    icon: MdInfo,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    iconColor: "text-blue-500",
    actionBgColor: "bg-blue-50",
    actionBorderColor: "border-blue-200",
    actionTextColor: "text-blue-600",
    actionHoverColor: "hover:bg-blue-100",
  },
};

const AlertWithAction: React.FC<AlertWithActionProps> = ({
  type,
  title,
  message,
  action,
  className,
}) => {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div className="space-y-3">
      {/* Alert Box */}
      <div
        className={cn(
          "flex items-start gap-3 p-3 rounded-lg border",
          config.bgColor,
          config.borderColor,
          className
        )}
      >
        <Icon
          className={cn("text-xl flex-shrink-0 mt-0.5", config.iconColor)}
        />
        <div>
          {title && (
            <p className={cn("text-sm font-medium", config.textColor)}>
              {title}
            </p>
          )}
          <p className={cn("text-sm", title ? "mt-1" : "", config.textColor)}>
            {message}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={action.onClick}
        disabled={action.disabled || action.isLoading}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          config.actionBgColor,
          config.actionBorderColor,
          config.actionTextColor,
          config.actionHoverColor
        )}
      >
        {action.isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {action.loadingText || "Đang xử lý..."}
          </>
        ) : (
          <>
            <MdEmail className="text-lg" />
            {action.label}
          </>
        )}
      </button>
    </div>
  );
};

export default AlertWithAction;