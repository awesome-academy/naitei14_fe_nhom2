import emailjs from "@emailjs/browser";
import { EmailJSResponseStatus } from "@emailjs/browser";
import { EmailError } from "../types/auth.types";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_ACTIVATION_TEMPLATE_ID = import.meta.env
  .VITE_EMAILJS_ACTIVATION_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface EmailTemplateParams {
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

  const templateParams: EmailTemplateParams = {
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
