import { useState, useEffect } from "react";
import { Message } from "../types/chat";
import { User } from "@/types/user";

interface UseChatConversationsProps {
  user: User | null;
  chatHistory: Message[];
  onNewMessage?: (message: Message) => void;
}

export const useChatConversations = ({
  user,
  chatHistory,
  onNewMessage,
}: UseChatConversationsProps) => {
  const [conversations, setConversations] = useState<Record<string, Message[]>>(
    {}
  );
  const [activeChatUsers, setActiveChatUsers] = useState<Set<string>>(
    new Set()
  );

  const isAdmin = user?.role === "admin";

  // Process chat history into conversations
  useEffect(() => {
    if (!user) return;

    const organizedConversations: Record<string, Message[]> = {};

    chatHistory.forEach((message) => {
      let conversationKey: string;

      // Message từ admin
      if (message.userId === user.id) {
        conversationKey = (message as any).targetUserId || "unknown";
      }
      // Message từ user gửi cho admin
      else {
        conversationKey = message.userId;
      }

      if (!organizedConversations[conversationKey]) {
        organizedConversations[conversationKey] = [];
      }
      organizedConversations[conversationKey].push(message);

      // Track users đã chat
      if (message.userId !== user.id && message.userId !== "admin") {
        setActiveChatUsers((prev) => new Set([...prev, message.userId]));
      }
    });

    if (!isAdmin) {
      // User chỉ có conversation với admin
      organizedConversations["admin"] = chatHistory;
    }

    setConversations(organizedConversations);
  }, [chatHistory, user, isAdmin]);

  // Add new message to conversation
  const addMessage = (message: Message) => {
    // Track user đã gửi message
    if (message.userId !== user?.id && message.userId !== "admin") {
      setActiveChatUsers((prev) => new Set([...prev, message.userId]));
    }

    // Xác định conversation key
    let conversationKey: string;

    if (isAdmin) {
      // Admin: Phân loại theo userId hoặc targetUserId
      conversationKey =
        message.userId === user?.id
          ? (message as any).targetUserId || "unknown"
          : message.userId;
    } else {
      // User: Tất cả vào conversation "admin"
      conversationKey = "admin";
    }

    // Thêm message vào conversation
    setConversations((prev) => ({
      ...prev,
      [conversationKey]: [...(prev[conversationKey] || []), message],
    }));

    // Call onNewMessage callback
    onNewMessage?.(message);
  };

  // Add optimistic message (before server confirmation)
  const addOptimisticMessage = (content: string, targetUserId?: string) => {
    if (!user) return;

    const conversationKey =
      isAdmin && targetUserId ? targetUserId : "admin";

    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      socketId: "",
      userId: user.id,
      content,
      type: "text" as any,
      status: "sending" as any,
      timestamp: new Date().toISOString(),
      targetUserId: isAdmin && targetUserId ? targetUserId : undefined,
    } as Message;

    setConversations((prev) => ({
      ...prev,
      [conversationKey]: [...(prev[conversationKey] || []), tempMessage],
    }));

    return tempMessage.id;
  };

  // Remove optimistic message (on error)
  const removeOptimisticMessage = (messageId: string) => {
    setConversations((prev) => {
      const newConversations = { ...prev };
      Object.keys(newConversations).forEach((key) => {
        newConversations[key] = newConversations[key].filter(
          (msg) => msg.id !== messageId
        );
      });
      return newConversations;
    });
  };

  // Get messages for specific conversation
  const getConversationMessages = (conversationKey?: string) => {
    if (!conversationKey) {
      return isAdmin ? [] : conversations["admin"] || [];
    }
    return conversations[conversationKey] || [];
  };

  // Get all active conversation keys
  const getConversationKeys = () => {
    return Object.keys(conversations);
  };

  return {
    conversations,
    activeChatUsers,
    addMessage,
    addOptimisticMessage,
    removeOptimisticMessage,
    getConversationMessages,
    getConversationKeys,
  };
};
