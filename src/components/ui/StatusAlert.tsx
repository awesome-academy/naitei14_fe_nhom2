import React from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import { cn } from "@/lib/utils";

interface StatusAlertProps {
  type: "success" | "error";
  message: string;
  className?: string;
}

const StatusAlert: React.FC<StatusAlertProps> = ({
  type,
  message,
  className,
}) => {
  const isSuccess = type === "success";
  const Icon = isSuccess ? MdCheckCircle : MdError;

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2.5 rounded-lg text-sm border",
        isSuccess
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200",
        className
      )}
    >
      <Icon className="text-lg flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default StatusAlert;