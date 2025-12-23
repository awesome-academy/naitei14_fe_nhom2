import { Message } from "../types/chat";

/**
 * Format timestamp to localized time string
 */
export const formatMessageTime = (
  timestamp: string,
  locale = "vi-VN"
): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Check if message is from current user
 */
export const isOwnMessage = (
  message: Message,
  currentUserId: string
): boolean => {
  return message.userId === currentUserId;
};

/**
 * Get unread message count for conversations
 */
export const getUnreadCount = (
  conversations: Record<string, Message[]>,
  lastReadTimestamps: Record<string, string>
): Record<string, number> => {
  const unreadCounts: Record<string, number> = {};

  Object.entries(conversations).forEach(([conversationKey, messages]) => {
    const lastRead = lastReadTimestamps[conversationKey];
    if (!lastRead) {
      unreadCounts[conversationKey] = messages.length;
    } else {
      const unreadMessages = messages.filter(
        (msg) => new Date(msg.timestamp) > new Date(lastRead)
      );
      unreadCounts[conversationKey] = unreadMessages.length;
    }
  });

  return unreadCounts;
};

/**
 * Generate unique message ID using crypto.randomUUID() when available
 */
export const generateMessageId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Validate message content
 */
export const validateMessageContent = (content: string): boolean => {
  if (!content || typeof content !== "string") return false;
  if (content.trim().length === 0) return false;
  if (content.length > 5000) return false;
  return true;
};

/**
 * Truncate long messages for display
 */
export const truncateMessage = (content: string, maxLength = 100): string => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + "...";
};

/**
 * Get conversation display name
 */
export const getConversationDisplayName = (
  conversationKey: string,
  usersMap: Record<string, { username: string }>
): string => {
  if (conversationKey === "admin") return "Admin Support";

  const user = usersMap[conversationKey];
  return user?.username || `User ${conversationKey}`;
};

/**
 * Sort conversations by last message timestamp
 */
export const sortConversationsByLastMessage = (
  conversations: Record<string, Message[]>
): string[] => {
  return Object.keys(conversations).sort((a, b) => {
    const lastMessageA = conversations[a][conversations[a].length - 1];
    const lastMessageB = conversations[b][conversations[b].length - 1];

    if (!lastMessageA && !lastMessageB) return 0;
    if (!lastMessageA) return 1;
    if (!lastMessageB) return -1;

    return (
      new Date(lastMessageB.timestamp).getTime() -
      new Date(lastMessageA.timestamp).getTime()
    );
  });
};
