import emailjs from "@emailjs/browser";
import { EmailJSResponseStatus } from "@emailjs/browser";
import { EmailError } from "../types/auth.types";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_ACTIVATION_TEMPLATE_ID = import.meta.env
  .VITE_EMAILJS_ACTIVATION_TEMPLATE_ID;
const EMAILJS_RESET_PASSWORD_TEMPLATE_ID = import.meta.env
  .VITE_EMAILJS_RESET_PASSWORD_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// V2 EmailJS configuration for order emails
const EMAILJS_SERVICE_ID_V2 = import.meta.env.VITE_EMAILJS_SERVICE_IDv2;
const EMAILJS_ORDER_CONFIRM_TEMPLATE_ID = import.meta.env
  .VITE_EMAILJS_ORDER_CONFIRM_TEMPLATE_ID;
const EMAILJS_ORDER_CANCEL_TEMPLATE_ID = import.meta.env
  .VITE_EMAILJS_ORDER_CANCEL_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY_V2 = import.meta.env.VITE_EMAILJS_PUBLIC_KEYv2;

interface ActivationEmailParams {
  to_email: string;
  to_name: string;
  activation_link: string;
  from_name: string;
}

export const sendActivationEmail = async (
  userEmail: string,
  userName: string,
  activationLink: string
): Promise<void> => {
  // Kiểm tra config
  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_ACTIVATION_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY
  ) {
    console.warn({
      message: "EmailJS not configured, skipping email send",
      hasServiceId: !!EMAILJS_SERVICE_ID,
      hasTemplateId: !!EMAILJS_ACTIVATION_TEMPLATE_ID,
      hasPublicKey: !!EMAILJS_PUBLIC_KEY,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const templateParams: ActivationEmailParams = {
    to_email: userEmail,
    to_name: userName,
    activation_link: activationLink,
    from_name: "Green Shop",
  };

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ACTIVATION_TEMPLATE_ID,
      templateParams as any,
      {
        publicKey: EMAILJS_PUBLIC_KEY,
      }
    );

    // Email sent successfully (no logging needed for production)
  } catch (err) {
    if (err instanceof EmailJSResponseStatus) {
      const errorMessage = "EmailJS service failure";
      console.error({
        message: errorMessage,
        guidance: "Check EmailJS configuration and account",
        emailjsStatus: err.status,
        emailjsText: err.text,
        timestamp: new Date().toISOString(),
      });
      throw new EmailError(`Gửi email thất bại: ${err.text}`, err);
    }

    const errorMessage = "Unexpected email service error";
    console.error({
      message: errorMessage,
      guidance: "Check network and email service availability",
      originalError: err,
      timestamp: new Date().toISOString(),
    });
    throw new EmailError(
      "Không thể gửi email kích hoạt",
      err instanceof Error ? err : undefined
    );
  }
};

export const sendResetPasswordEmail = async (
  userEmail: string,
  userName: string,
  resetLink: string
): Promise<void> => {
  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_RESET_PASSWORD_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY
  ) {
    console.warn({
      message: "EmailJS not configured, skipping email send",
      hasServiceId: !!EMAILJS_SERVICE_ID,
      hasTemplateId: !!EMAILJS_RESET_PASSWORD_TEMPLATE_ID,
      hasPublicKey: !!EMAILJS_PUBLIC_KEY,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const templateParams = {
    to_email: userEmail,
    to_name: userName,
    reset_link: resetLink,
    from_name: "Green Shop",
  };

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_RESET_PASSWORD_TEMPLATE_ID,
      templateParams as any,
      {
        publicKey: EMAILJS_PUBLIC_KEY,
      }
    );

    // Email sent successfully
  } catch (err) {
    if (err instanceof EmailJSResponseStatus) {
      const errorMessage = "EmailJS service failure";
      console.error({
        message: errorMessage,
        guidance: "Check EmailJS configuration and account",
        emailjsStatus: err.status,
        emailjsText: err.text,
        timestamp: new Date().toISOString(),
      });
      throw new EmailError(
        `Gửi email đặt lại mật khẩu thất bại: ${err.text}`,
        err
      );
    }

    const errorMessage = "Unexpected email service error";
    console.error({
      message: errorMessage,
      guidance: "Check network and email service availability",
      originalError: err,
      timestamp: new Date().toISOString(),
    });
    throw new EmailError(
      "Không thể gửi email đặt lại mật khẩu",
      err instanceof Error ? err : undefined
    );
  }
};

interface OrderEmailParams {
  to_email: string;
  to_name: string;
  order_id: string;
  orders: Array<{
    name: string;
    units: number;
    price: string;
    image_url?: string;
  }>;
  cost: {
    shipping: string;
    tax: string;
    total: string;
  };
  from_name: string;
}

interface OrderCancellationParams extends OrderEmailParams {
  cancellation_reason: string;
}

export const sendOrderConfirmationEmail = async (
  userEmail: string,
  userName: string,
  orderId: string,
  orderItems: Array<{
    productName?: string;
    name?: string;
    quantity: number;
    price: number;
    productImage?: string;
  }>,
  orderTotal: number
): Promise<void> => {
  if (
    !EMAILJS_SERVICE_ID_V2 ||
    !EMAILJS_ORDER_CONFIRM_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY_V2
  ) {
    console.warn({
      message: "EmailJS v2 not configured, skipping order confirmation email send",
      hasServiceId: !!EMAILJS_SERVICE_ID_V2,
      hasTemplateId: !!EMAILJS_ORDER_CONFIRM_TEMPLATE_ID,
      hasPublicKey: !!EMAILJS_PUBLIC_KEY_V2,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Map order items to template format
  const orders = orderItems.map(item => ({
    name: item.productName || item.name || "Unknown Product",
    units: item.quantity,
    price: item.price.toLocaleString(),
    image_url: item.productImage || "",
  }));

  // For now, assume shipping is 0 and tax is 0 (can be updated later)
  const templateParams: OrderEmailParams = {
    to_email: userEmail,
    to_name: userName,
    order_id: orderId,
    orders: orders,
    cost: {
      shipping: "0",
      tax: "0",
      total: orderTotal.toLocaleString(),
    },
    from_name: "Green Shop",
  };

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID_V2,
      EMAILJS_ORDER_CONFIRM_TEMPLATE_ID,
      templateParams as any,
      {
        publicKey: EMAILJS_PUBLIC_KEY_V2,
      }
    );

    console.log({
      message: "Order confirmation email sent successfully",
      orderId,
      userEmail,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (err instanceof EmailJSResponseStatus) {
      const errorMessage = "EmailJS v2 service failure";
      console.error({
        message: errorMessage,
        guidance: "Check EmailJS v2 configuration and account",
        emailjsStatus: err.status,
        emailjsText: err.text,
        timestamp: new Date().toISOString(),
      });
      throw new EmailError(`Gửi email xác nhận đơn hàng thất bại: ${err.text}`, err);
    }

    const errorMessage = "Unexpected order confirmation email service error";
    console.error({
      message: errorMessage,
      guidance: "Check network and email service availability",
      originalError: err,
      timestamp: new Date().toISOString(),
    });
    throw new EmailError(
      "Không thể gửi email xác nhận đơn hàng",
      err instanceof Error ? err : undefined
    );
  }
};

export const sendOrderCancellationEmail = async (
  userEmail: string,
  userName: string,
  orderId: string,
  orderItems: Array<{
    productName?: string;
    name?: string;
    quantity: number;
    price: number;
    productImage?: string;
  }>,
  orderTotal: number
): Promise<void> => {
  if (
    !EMAILJS_SERVICE_ID_V2 ||
    !EMAILJS_ORDER_CANCEL_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY_V2
  ) {
    console.warn({
      message: "EmailJS v2 not configured, skipping order cancellation email send",
      hasServiceId: !!EMAILJS_SERVICE_ID_V2,
      hasTemplateId: !!EMAILJS_ORDER_CANCEL_TEMPLATE_ID,
      hasPublicKey: !!EMAILJS_PUBLIC_KEY_V2,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Map order items to template format
  const orders = orderItems.map(item => ({
    name: item.productName || item.name || "Unknown Product",
    units: item.quantity,
    price: item.price.toLocaleString(),
    image_url: item.productImage || "",
  }));

  // For now, assume shipping is 0 and tax is 0 (can be updated later)
  const templateParams: OrderCancellationParams = {
    to_email: userEmail,
    to_name: userName,
    order_id: orderId,
    orders: orders,
    cost: {
      shipping: "0",
      tax: "0",
      total: orderTotal.toLocaleString(),
    },
    cancellation_reason: "Đơn hàng đã bị hủy bởi quản trị viên",
    from_name: "Green Shop",
  };

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID_V2,
      EMAILJS_ORDER_CANCEL_TEMPLATE_ID,
      templateParams as any,
      {
        publicKey: EMAILJS_PUBLIC_KEY_V2,
      }
    );

    console.log({
      message: "Order cancellation email sent successfully",
      orderId,
      userEmail,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (err instanceof EmailJSResponseStatus) {
      const errorMessage = "EmailJS v2 service failure";
      console.error({
        message: errorMessage,
        guidance: "Check EmailJS v2 configuration and account",
        emailjsStatus: err.status,
        emailjsText: err.text,
        timestamp: new Date().toISOString(),
      });
      throw new EmailError(`Gửi email hủy đơn hàng thất bại: ${err.text}`, err);
    }

    const errorMessage = "Unexpected order cancellation email service error";
    console.error({
      message: errorMessage,
      guidance: "Check network and email service availability",
      originalError: err,
      timestamp: new Date().toISOString(),
    });
    throw new EmailError(
      "Không thể gửi email hủy đơn hàng",
      err instanceof Error ? err : undefined
    );
  }
};
