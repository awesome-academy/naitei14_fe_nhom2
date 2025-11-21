import {
  RegisterRequest,
  User,
  RegistrationError,
  ActivationError,
} from "../types/auth.types";
import { API_BASE_URL } from "@/constants/common";
import { sendActivationEmail } from "./emailService";

export const registerUser = async (data: RegisterRequest): Promise<User> => {
  const activationToken = crypto.randomUUID();

  const userData = {
    id: crypto.randomUUID(),
    ...data,
    emailVerified: false,
    activationToken,
    createdAt: new Date().toISOString(),
  };

  // Lưu user vào json-server
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorMessage = `Registration API failed with status ${response.status}`;
    console.error("User registration API error", {
      message: errorMessage,
      status: response.status,
      url: `${API_BASE_URL}/users`,
      timestamp: new Date().toISOString(),
    });
    throw new RegistrationError("Đăng ký thất bại", new Error(errorMessage));
  }

  const user = await response.json();

  const activationLink = `${window.location.origin}/auth/activate?userId=${user.id}&token=${activationToken}`;

  try {
    await sendActivationEmail(user.email, user.fullName, activationLink);
  } catch (emailError) {
    console.error("Email sending failed after registration", {
      message: "Activation email could not be sent but user was created",
      cause:
        emailError instanceof Error
          ? emailError.message
          : "Unknown email error",
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
    });
  }

  return user;
};

export const activateUserEmail = async (
  userId: string,
  token: string
): Promise<User> => {
  // Lấy thông tin user
  const getResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!getResponse.ok) {
    const errorMessage = `User fetch failed with status ${getResponse.status}`;
    console.error("User fetch error", {
      message: errorMessage,
      userId,
      status: getResponse.status,
      timestamp: new Date().toISOString(),
    });
    throw new ActivationError(
      "Không tìm thấy người dùng",
      new Error(errorMessage)
    );
  }

  const user = await getResponse.json();

  // Kiểm tra token
  if (user.activationToken !== token) {
    const errorMessage = "Activation token mismatch";
    console.error("Invalid activation token", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
    throw new ActivationError("Token kích hoạt không hợp lệ");
  }

  // Kiểm tra đã kích hoạt chưa
  if (user.emailVerified) {
    const errorMessage = "User already verified";
    console.error("User already activated", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
    throw new ActivationError("Tài khoản đã được kích hoạt trước đó");
  }

  // Cập nhật trạng thái kích hoạt
  const updateResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailVerified: true,
      activationToken: null,
      activatedAt: new Date().toISOString(),
    }),
  });

  if (!updateResponse.ok) {
    const errorMessage = `Activation update failed with status ${updateResponse.status}`;
    console.error("Activation update error", {
      message: errorMessage,
      status: updateResponse.status,
      timestamp: new Date().toISOString(),
    });
    throw new ActivationError(
      "Kích hoạt tài khoản thất bại",
      new Error(errorMessage)
    );
  }

  return updateResponse.json();
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await fetch(
    `${API_BASE_URL}/users?email=${encodeURIComponent(email)}&_limit=1`
  );

  if (!response.ok) {
    throw new Error("Email check failed");
  }

  const users = await response.json();
  return users.length > 0;
};
