import {
  RegisterRequest,
  RegistrationError,
  ActivationError,
  LoginError,
  ForgotPasswordError,
  ResetPasswordError,
  ChangePasswordError,
} from "../types/auth.types";
import {
  API_BASE_URL,
  TOKEN_EXPIRY_HOURS,
  DEFAULT_USER_ROLE,
} from "@/constants/common";
import { sendActivationEmail, sendResetPasswordEmail } from "./emailService";
import { User } from "@/types/user";

import bcrypt from "bcryptjs";

export const registerUser = async (data: RegisterRequest): Promise<User> => {
  const activationToken = crypto.randomUUID();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userData = {
    id: crypto.randomUUID(),
    ...data,
    password: hashedPassword,
    emailVerified: false,
    activationToken,
    role: DEFAULT_USER_ROLE,
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

    throw new RegistrationError(
      "Không thể gửi email xác nhận. Tài khoản đã được tạo nhưng vui lòng liên hệ hỗ trợ để kích hoạt.",
      emailError instanceof Error
        ? emailError
        : new Error("Unknown email error")
    );
  }

  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await fetch(
    `${API_BASE_URL}/users?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorMessage = `Login API failed with status ${response.status}`;
    console.error("User login API error", {
      message: errorMessage,
      status: response.status,
    });
    throw new LoginError("Đăng nhập thất bại", new Error(errorMessage));
  }

  const users: User[] = await response.json();

  const user = users.find((u) => u.email === email);

  if (!user) {
    const errorMessage = "User not found";
    console.error("Login error", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
    throw new LoginError("Người dùng không tồn tại");
  }

  if (!user.emailVerified) {
    throw new LoginError("Vui lòng xác thực email trước khi đăng nhập");
  }

  if (!user.password) {
    throw new LoginError("Dữ liệu mật khẩu bị thiếu");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const errorMessage = "Invalid password";
    console.error("Login error", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
    throw new LoginError("Mật khẩu không chính xác");
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

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<User> => {
  // Lấy thông tin user
  const getResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!getResponse.ok) {
    const errorMessage = `User fetch failed with status ${getResponse.status}`;
    console.error("User fetch error for change password", {
      message: errorMessage,
      userId,
      status: getResponse.status,
      timestamp: new Date().toISOString(),
    });
    throw new ChangePasswordError(
      "Không tìm thấy người dùng",
      new Error(errorMessage)
    );
  }

  const user = await getResponse.json();

  // Kiểm tra mật khẩu hiện tại
  if (!user.password) {
    throw new ChangePasswordError("Dữ liệu mật khẩu bị thiếu");
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isCurrentPasswordValid) {
    const errorMessage = "Current password is incorrect";
    console.error("Change password error", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
    throw new ChangePasswordError("Mật khẩu hiện tại không chính xác");
  }

  // Hash mật khẩu mới
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Cập nhật mật khẩu
  const updateResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: hashedNewPassword,
      passwordChangedAt: new Date().toISOString(),
    }),
  });

  if (!updateResponse.ok) {
    const errorMessage = `Password change failed with status ${updateResponse.status}`;
    console.error("Password change error", {
      message: errorMessage,
      status: updateResponse.status,
      timestamp: new Date().toISOString(),
    });
    throw new ChangePasswordError(
      "Không thể đổi mật khẩu",
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

export const resendActivationEmail = async (email: string): Promise<void> => {
  // Get all users to find by email
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = `Resend activation API failed with status ${response.status}`;
    console.error("Resend activation error", {
      message: errorMessage,
      status: response.status,
      timestamp: new Date().toISOString(),
    });
    throw new Error("Không thể gửi lại email kích hoạt");
  }

  const users: User[] = await response.json();
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("Người dùng không tồn tại");
  }

  if (user.emailVerified) {
    throw new Error("Tài khoản đã được kích hoạt");
  }

  // Generate new activation token
  const newActivationToken = crypto.randomUUID();

  // Update user with new activation token
  const updateResponse = await fetch(`${API_BASE_URL}/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activationToken: newActivationToken,
    }),
  });

  if (!updateResponse.ok) {
    const errorMessage = `User update failed with status ${updateResponse.status}`;
    console.error("User update error", {
      message: errorMessage,
      userId: user.id,
      status: updateResponse.status,
      timestamp: new Date().toISOString(),
    });
    throw new Error("Không thể cập nhật token kích hoạt");
  }

  // Send activation email
  const activationLink = `${window.location.origin}/auth/activate?userId=${user.id}&token=${newActivationToken}`;

  try {
    await sendActivationEmail(user.email, user.fullName, activationLink);
  } catch (emailError) {
    console.error("Resend activation email failed", {
      message: "Activation email could not be sent",
      cause:
        emailError instanceof Error
          ? emailError.message
          : "Unknown email error",
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
    });
    throw new Error("Không thể gửi email kích hoạt");
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = `Forgot password API failed with status ${response.status}`;
    console.error("Forgot password API error", {
      message: errorMessage,
      status: response.status,
      url: `${API_BASE_URL}/users`,
    });
    throw new ForgotPasswordError(
      "Quên mật khẩu thất bại",
      new Error(errorMessage)
    );
  }

  const users: User[] = await response.json();

  // Find user by email
  const user = users.find((u) => u.email === email);

  if (!user) {
    const errorMessage = "User not found";
    console.error("Forgot password error", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
    throw new ForgotPasswordError("Email không tồn tại trong hệ thống");
  }

  const resetToken = crypto.randomUUID();
  const resetTokenExpiry = new Date(
    Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
  ).toISOString();

  // Update user with reset token
  const updateResponse = await fetch(`${API_BASE_URL}/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resetToken,
      resetTokenExpiry,
    }),
  });

  if (!updateResponse.ok) {
    const errorMessage = `Reset token update failed with status ${updateResponse.status}`;
    console.error("Reset token update error", {
      message: errorMessage,
      status: updateResponse.status,
      timestamp: new Date().toISOString(),
    });
    throw new ForgotPasswordError(
      "Không thể tạo token đặt lại mật khẩu",
      new Error(errorMessage)
    );
  }

  const resetLink = `${window.location.origin}/auth/reset-password?userId=${user.id}&token=${resetToken}`;

  try {
    await sendResetPasswordEmail(user.email, user.fullName, resetLink);
  } catch (emailError) {
    console.error("Reset password email sending failed", {
      message:
        "Reset password email could not be sent but reset token was created",
      cause:
        emailError instanceof Error
          ? emailError.message
          : "Unknown email error",
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
    });
  }
};

export const resetPassword = async (
  userId: string,
  token: string,
  newPassword: string
): Promise<User> => {
  // Lấy thông tin user
  const getResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!getResponse.ok) {
    const errorMessage = `User fetch failed with status ${getResponse.status}`;
    console.error("User fetch error for reset password", {
      message: errorMessage,
      userId,
      status: getResponse.status,
      timestamp: new Date().toISOString(),
    });
    throw new ResetPasswordError(
      "Không tìm thấy người dùng",
      new Error(errorMessage)
    );
  }

  const user = await getResponse.json();

  // Kiểm tra token
  if (user.resetToken !== token) {
    const errorMessage = "Reset token mismatch";
    console.error("Invalid reset token", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
    throw new ResetPasswordError("Token đặt lại mật khẩu không hợp lệ");
  }

  // Kiểm tra thời hạn token
  if (new Date(user.resetTokenExpiry) < new Date()) {
    const errorMessage = "Reset token expired";
    console.error("Reset token expired", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
    throw new ResetPasswordError("Token đặt lại mật khẩu đã hết hạn");
  }

  // Hash mật khẩu mới
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Cập nhật mật khẩu
  const updateResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
      passwordResetAt: new Date().toISOString(),
    }),
  });

  if (!updateResponse.ok) {
    const errorMessage = `Password reset failed with status ${updateResponse.status}`;
    console.error("Password reset error", {
      message: errorMessage,
      status: updateResponse.status,
      timestamp: new Date().toISOString(),
    });
    throw new ResetPasswordError(
      "Không thể đặt lại mật khẩu",
      new Error(errorMessage)
    );
  }

  return updateResponse.json();
};
