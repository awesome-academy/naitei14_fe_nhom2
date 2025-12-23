import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

interface UseChatTypingProps {
  socket: Socket | null;
  userId?: string;
  isAdmin?: boolean;
}

export const useChatTyping = ({
  socket,
  userId,
  isAdmin,
}: UseChatTypingProps) => {
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});

  // Listen for typing events
  useEffect(() => {
    if (!socket) return;

    const handleUserTyping = ({
      userId: typingUserId,
      isTyping,
      targetUserId,
    }: {
      userId: string;
      isTyping: boolean;
      targetUserId?: string;
    }) => {
      let typingKey: string;

      if (isAdmin) {
        // Admin nhận typing từ user
        typingKey = typingUserId;
      } else {
        // User chỉ nhận typing từ admin gửi cho mình
        if (targetUserId === userId || !targetUserId) {
          typingKey = "admin";
        } else {
          return; // Ignore typing không dành cho user này
        }
      }

      // Cập nhật typing status
      setTypingUsers((prev) => ({
        ...prev,
        [typingKey]: isTyping,
      }));

      // Auto clear typing sau 3s
      if (isTyping) {
        setTimeout(() => {
          setTypingUsers((prev) => ({
            ...prev,
            [typingKey]: false,
          }));
        }, 3000);
      }
    };

    socket.on("user typing", handleUserTyping);

    return () => {
      socket.off("user typing", handleUserTyping);
    };
  }, [socket, userId, isAdmin]);

  // Send typing status
  const sendTyping = (isTyping: boolean, targetUserId?: string) => {
    if (!socket) return;

    const payload: any = { isTyping };

    // Admin cần chỉ định target user
    if (isAdmin && targetUserId) {
      payload.targetUserId = targetUserId;
    }

    socket.emit("typing", payload);
  };

  // Check if a specific conversation is typing
  const isConversationTyping = (conversationKey: string) => {
    return typingUsers[conversationKey] || false;
  };

  return {
    typingUsers,
    sendTyping,
    isConversationTyping,
  };
};
