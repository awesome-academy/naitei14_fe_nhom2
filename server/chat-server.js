import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import process from "node:process";

// Cấu hình server
const PORT = process.env.SOCKET_IO_PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const MAX_CHAT_HISTORY = 1000;
const CONNECTION_TIMEOUT = 60000;
const PING_INTERVAL = 25000;

// Khởi tạo Express
const app = express();
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

const httpServer = createServer(app);

// Cấu hình Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
  transports: ["websocket", "polling"],
  pingTimeout: CONNECTION_TIMEOUT,
  pingInterval: PING_INTERVAL,
});

// Lưu trữ messages và users
const chatMessages = [];
const users = new Map();

// Middleware xử lý lỗi
io.use((socket, next) => {
  try {
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    next(error);
  }
});

// Validate message data
const validateMessage = (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid message data");
  }
  if (!data.content || typeof data.content !== "string") {
    throw new Error("Message content is required");
  }
  if (data.content.length > 5000) {
    throw new Error("Message too long");
  }
  return true;
};

// Giới hạn số lượng messages lưu trữ
const trimChatHistory = () => {
  if (chatMessages.length > MAX_CHAT_HISTORY) {
    chatMessages.splice(0, chatMessages.length - MAX_CHAT_HISTORY);
  }
};

// Lấy chat history riêng cho từng user
const getChatHistoryForUser = (userId, userRole) => {
  if (userRole === "admin") {
    // Admin xem tất cả messages
    return chatMessages;
  } else {
    // User chỉ xem messages của họ với admin
    return chatMessages.filter((msg) => {
      // Messages từ user này
      if (msg.userId === userId) return true;
      // Messages từ admin gửi cho user này
      if (msg.targetUserId === userId) return true;
      // Messages broadcast từ admin (không có target cụ thể)
      if (msg.userId === "admin" && !msg.targetUserId) return true;
      return false;
    });
  }
};

// Xử lý khi user join
const handleUserJoin = (socket, userData) => {
  try {
    if (!userData || !userData.userId) {
      socket.emit("error", { message: "Invalid user data" });
      return;
    }

    const user = {
      socketId: socket.id,
      userId: userData.userId,
      username: userData.username,
      role: userData.role || "user",
      joinedAt: new Date().toISOString(),
    };

    // Lưu userId và role vào socket
    socket.userId = userData.userId;
    socket.userRole = userData.role || "user";

    users.set(socket.id, user);

    // Broadcast danh sách users online
    io.emit("users online", Array.from(users.values()));

    // Gửi chat history đã được filter cho user
    const userHistory = getChatHistoryForUser(userData.userId, user.role);
    socket.emit("chat history", userHistory);
  } catch (error) {
    console.error("Error in user join:", error);
    socket.emit("error", { message: "Failed to join" });
  }
};

// Xử lý gửi message
const handleSendMessage = (socket, data, callback) => {
  try {
    validateMessage(data);

    const currentUser = users.get(socket.id);
    const isAdmin = currentUser?.role === "admin";

    // Tạo message object với targetUserId
    const message = {
      id: `${Date.now()}-${socket.id}`,
      socketId: socket.id,
      userId: socket.userId,
      content: data.content.trim(),
      type: data.type || "text",
      status: "sent",
      timestamp: new Date().toISOString(),
      targetUserId: data.targetUserId || null,
    };

    chatMessages.push(message);
    trimChatHistory();

    // Gửi message đến đúng người nhận
    if (isAdmin && data.targetUserId) {
      // Admin gửi cho user cụ thể
      const targetSocketId = Array.from(users.entries()).find(
        ([, user]) => user.userId === data.targetUserId
      )?.[0];

      if (targetSocketId) {
        io.to(targetSocketId).emit("new message", message);
      }
    } else if (!isAdmin) {
      // User gửi cho tất cả admin
      const adminSockets = Array.from(users.entries())
        .filter(([, user]) => user.role === "admin")
        .map(([socketId]) => socketId);

      adminSockets.forEach((adminSocketId) => {
        io.to(adminSocketId).emit("new message", message);
      });
    }

    // Gửi acknowledgement
    if (callback && typeof callback === "function") {
      callback({
        status: "success",
        messageId: message.id,
      });
    }
  } catch (error) {
    console.error("Error sending message:", error);
    if (callback && typeof callback === "function") {
      callback({
        status: "error",
        message: error.message,
      });
    }
  }
};

// Xử lý typing indicator
const handleTyping = (socket, data) => {
  try {
    if (!data || typeof data.isTyping !== "boolean") {
      return;
    }

    const currentUser = users.get(socket.id);
    const typingData = {
      userId: socket.userId,
      username: currentUser?.username,
      isTyping: data.isTyping,
      targetUserId: data.targetUserId,
    };

    // Admin gõ cho user cụ thể
    if (data.targetUserId) {
      const targetSocketId = Array.from(users.entries()).find(
        ([, user]) => user.userId === data.targetUserId
      )?.[0];

      if (targetSocketId) {
        io.to(targetSocketId).emit("user typing", typingData);
      }
    } else {
      // User gõ, gửi cho tất cả admin
      if (currentUser?.role !== "admin") {
        const adminSockets = Array.from(users.entries())
          .filter(([, user]) => user.role === "admin")
          .map(([socketId]) => socketId);

        adminSockets.forEach((adminSocketId) => {
          io.to(adminSocketId).emit("user typing", typingData);
        });
      }
    }
  } catch (error) {
    console.error("Error in typing handler:", error);
  }
};

// Xử lý disconnect
const handleDisconnect = (socket) => {
  try {
    users.delete(socket.id);
    io.emit("users online", Array.from(users.values()));
  } catch (error) {
    console.error("Error in disconnect handler:", error);
  }
};

// Socket connection handler
io.on("connection", (socket) => {
  // Đăng ký event handlers
  socket.on("user join", (userData) => handleUserJoin(socket, userData));
  socket.on("send message", (data, callback) =>
    handleSendMessage(socket, data, callback)
  );
  socket.on("typing", (data) => handleTyping(socket, data));
  socket.on("disconnect", (reason) => handleDisconnect(socket, reason));

  socket.on("error", (error) => {
    console.error(`Socket error (${socket.id}):`, error);
  });
});

// Xử lý lỗi connection
io.engine.on("connection_error", (err) => {
  console.error("Connection error:", {
    message: err.message,
    code: err.code,
    context: err.context,
  });
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown();
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Graceful shutdown
const gracefulShutdown = () => {
  io.close(() => {
    console.log("Socket.io connections closed");
    httpServer.close(() => {
      process.exit(0);
    });
  });

  setTimeout(() => {
    console.error("Forced shutdown");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

// Khởi động server
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export { io, httpServer };
