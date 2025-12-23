import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  Message,
  ChatUser,
  MessageType,
  MessagePayload,
  MessageResponse,
} from "../types/chat";
import { User } from "@/types/user";

interface UseChatSocketProps {
  user: User | null;
  serverUrl?: string;
}

export const useChatSocket = ({ user, serverUrl }: UseChatSocketProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [usersOnline, setUsersOnline] = useState<ChatUser[]>([]);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const socketRef = useRef<Socket | null>(null);
  const isAdmin = user?.role === "admin";

  // Kết nối Socket.io
  useEffect(() => {
    if (!user) return;

    const socket = io(serverUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Khi kết nối thành công
    socket.on("connect", () => {
      console.log("Connected to chat server");
      setIsConnected(true);

      // Gửi thông tin user để join
      socket.emit("user join", {
        userId: user.id,
        username: user.fullName,
        role: user.role,
      });
    });

    // Khi mất kết nối
    socket.on("disconnect", () => {
      console.log("Disconnected from chat server");
      setIsConnected(false);
    });

    // Nhận chat history
    socket.on("chat history", (history: Message[]) => {
      console.log("Received chat history:", history.length, "messages");
      setChatHistory(history);
    });

    // Nhận danh sách users online
    socket.on("users online", (users: ChatUser[]) => {
      setUsersOnline(users);
    });

    socket.on("error", (error: { message: string }) => {
      console.error("Socket error:", error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, serverUrl]);

  // Gửi message
  const sendMessage = (content: string, targetUserId?: string) => {
    if (!socketRef.current || !user) return;

    const payload: MessagePayload & { targetUserId?: string } = {
      content,
      type: MessageType.TEXT,
    };

    if (isAdmin && targetUserId) {
      payload.targetUserId = targetUserId;
    }

    // Emit message
    socketRef.current.emit(
      "send message",
      payload,
      (response: MessageResponse) => {
        if (response.status === "error") {
          console.error("Failed to send message:", response.message);
        }
      }
    );
  };

  // Gửi typing status
  const sendTyping = (isTyping: boolean, targetUserId?: string) => {
    if (!socketRef.current) return;

    const payload: any = { isTyping };

    // Admin cần chỉ định target user
    if (isAdmin && targetUserId) {
      payload.targetUserId = targetUserId;
    }

    socketRef.current.emit("typing", payload);
  };

  return {
    socket: socketRef.current,
    isConnected,
    usersOnline,
    chatHistory,
    sendMessage,
    sendTyping,
    isAdmin,
  };
};
